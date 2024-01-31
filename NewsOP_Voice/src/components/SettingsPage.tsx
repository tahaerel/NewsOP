import classNames from "clsx";

import { WEBSITE_URL } from "../config/env";

import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useApiKeyState } from "./ApiKeyDialog";

export default function SettingsPage() {
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

        <div className={classNames("flex flex-col", "mt-[4.5rem] ml-12")}>
          <span className="text-5xl font-bold text-foreground">NewsOP</span>

          <span className="mt-4 text-xl font-semibold text-muted-foreground opacity-75">
            Ayarlar
          </span>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl">
        <Separator orientation="horizontal" className="h-px w-full" />
      </div>

      <article className="my-8 w-full prose prose-slate">
        <h2>OpenAI API Anahtarı</h2>

        <p>
API Anahtarınız tarayıcınızda yerel olarak saklanır ve hiçbir zaman hiçbir yere gönderilmez
        </p>

        <div className="flex items-center">
          <Button type="button" onClick={() => openApiKeyDialog()}>
            {!apiKeyEntered ? "API Anahtarı Gir" : "API Anahtarını Düzenle"}
          </Button>

          {apiKeyEntered && <div className="ml-4">✅ Girildi.</div>}
        </div>

        {WEBSITE_URL && (
          <>
            <h2>Linkler</h2>

            <ul>
              <li>
                Website:{" "}
                <a
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={"https://pushup.games"}
                >
                  pushup.games
                </a>
              </li>

              <li>
                Github:{" "}
                <a
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/tahaerel"
                >
                  tahaerel
                </a>
              </li>

              <li>
                Terms:{" "}
                <a
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${"https://pushup.games"}`}
                >
                  pushup.games
                </a>
              </li>

              <li>
                Privacy:{" "}
                <a
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${"https://pushup.games"}`}
                >
                  pushup.games
                </a>
              </li>
            </ul>
          </>
        )}
      </article>
    </div>
  );
}
