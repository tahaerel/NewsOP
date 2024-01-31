require("dotenv").config();

const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");
const { clean: cleanPlugin } = require("esbuild-plugin-clean");
const { copy: copyPlugin } = require("esbuild-plugin-copy");
const stylePlugin = require("esbuild-style-plugin");
const { default: wasmPlugin } = require("esbuild-plugin-wasm");
const { zip } = require("zip-a-folder");

const { NODE_ENV = "development" } = process.env;

const DEV = NODE_ENV === "development";
const PROD = NODE_ENV === "production";

const ENV_VARS_WHITELIST = [
  ["NODE_ENV", NODE_ENV],
  "WEBSITE_URL",
  "ENCRYPTION_KEY",
];

const entryPoints = [
  "common.css",
  "background.ts",
  "content.ts",
  "inpage.tsx",
  "inpage-styles.css",
  "popup.tsx",
  "main.tsx",
  DEV && "_dev/hotreload.ts",
]
  .filter(Boolean)
  .map((p) => `src/${p}`);

(async () => {
  const ctx = await esbuild.context({
    entryPoints,
    outdir: "ext/assets",
    bundle: true,
    sourcemap: DEV,
    minify: PROD,
    platform: "browser",
    target: "es2019",
    conditions: ["development"], // for `floating-ui` modules
    format: "esm",
    define: Object.fromEntries(
      ENV_VARS_WHITELIST.map((item) => {
        const key = Array.isArray(item) ? item[0] : item;
        const value = Array.isArray(item) ? item[1] : process.env[key] ?? "";

        return [`process.env.${key}`, `"${value}"`];
      })
    ),
    drop: PROD ? ["console", "debugger"] : undefined,
    plugins: [
      cleanPlugin({
        patterns: ["ext/assets"],
      }),
      stylePlugin({
        postcss: {
          plugins: [
            require("tailwindcss"),
            PROD && require("autoprefixer"),
          ].filter(Boolean),
        },
      }),
      wasmPlugin({
        mode: "embedded",
      }),
      DEV &&
        copyPlugin({
          assets: {
            from: ["src/_dev/hotreload.html"],
            to: ["./_dev"],
          },
          watch: true,
        }),
      PROD && {
        name: "clean-useless-files",
        setup(build) {
          build.onEnd((result) => {
            if (result.errors.length === 0) {
              // This empty file generated by `esbuild-style-plugin` >_<
              fs.rmSync(path.join(process.cwd(), "/ext/assets/common.js"));
            }
          });
        },
      },
      PROD && {
        name: "zip-build",
        setup(build) {
          build.onEnd((result) => {
            if (result.errors.length === 0) {
              fs.mkdirSync(path.join(process.cwd(), "dist"));

              return zip(
                path.join(process.cwd(), "ext"),
                path.join(process.cwd(), "dist/ext.zip")
              );
            }
          });
        },
      },
      {
        name: "success-logger",
        setup(build) {
          build.onEnd((result) => {
            if (result.errors.length === 0) {
              console.info("✅ Successfully bundled.");
            }
          });
        },
      },
    ].filter(Boolean),
  });

  if (DEV) {
    await ctx.watch();
  } else {
    await ctx.rebuild();
    ctx.dispose();
  }
})();