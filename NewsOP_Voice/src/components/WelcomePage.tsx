import classNames from "clsx";

import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useApiKeyState } from "./ApiKeyDialog";

export default function WelcomePage() {
  const { apiKeyEntered, openApiKeyDialog } = useApiKeyState();

  return (
    <div className={classNames("min-h-screen flex flex-col items-center")}>
      <div className="my-6 flex items-start select-none">
        <div
          className={classNames("w-[12rem] h-[12rem]", "bg-no-repeat bg-cover")}
          style={{
            backgroundImage: "url(/misc/Newsoplogo.png)",
            backgroundSize: "100% auto",
          }}
        />

        <div className={classNames("flex flex-col", "mt-12 ml-12")}>
          <span className="text-lg font-semibold text-muted-foreground opacity-75">
             Hoşgeldiniz
          </span>
          <span className="text-5xl font-bold text-foreground">NewsOP Röportaj</span>
          <span className="mt-6 text-sm font-semibold text-muted-foreground">
            Yeni nesil röportaj deneyimine hazırlanın!
          </span>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl">
        <Separator orientation="horizontal" className="h-px w-full" />
      </div>

      <article className="my-8 w-full prose prose-slate">
        <h2>Kurulum Adımları</h2>

        <ol
          style={{ ["--tw-prose-counters"]: "var(--tw-prose-headings)" } as any}
        >
          <li>
             API anahtarınızı girin {" "}
            <a
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://platform.openai.com/account/api-keys"
            >
              Open AI Arayüzü
            </a>
            .
          </li>

          <li>
            <div className="flex items-center">
              <Button
                type="button"
                onClick={() => openApiKeyDialog()}
                disabled={apiKeyEntered}
                className="disabled:opacity-50"
              >
                Api Anahtarı Gir
              </Button>

              {apiKeyEntered && (
                <div className="ml-4">✅ Başarıyla giriş yapıldı.</div>
              )}
            </div>
          </li>

          <li>
            NewsOP'u tarayıcınıza pinleyin.
            {/* <img
              src="/misc/chrome_toolbar.png"
              alt=""
              className="w-[20rem] h-auto"
            /> */}
          </li>

          <li>
            Kullanmaya başlayın!{" "}
            {/* <img
              src="/misc/start_toolbar.png"
              alt=""
              className="w-[20rem] h-auto"
            /> */}
          </li>

          <li>Bu sayfayı kapatabilirsiniz.</li>
        </ol>
      </article>
    </div>
  );
}
