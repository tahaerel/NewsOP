import { useState, useEffect, useCallback } from "react";
import classNames from "clsx";
import { Loader2, IndentIcon } from "lucide-react";

import { getSummary } from "../core/summary";
import { DBContent, DBRecord, dbContents, dbRecords } from "../core/db";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import Header from "./Header";
import FatalError from "./FatalError";
import PrettyDate, { getPrettyDuration } from "./PrettyDate";
import { useNoApiKeyToast } from "./ApiKeyDialog";

export default function ExplorePage({ recordId }: { recordId: string }) {
  const noApiKeyToast = useNoApiKeyToast();

  const [_loading, setLoading] = useState(false);
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [record, setRecord] = useState<DBRecord & DBContent>();
  const [fatalError, setFatalError] = useState<Error | string | null>(null);

  const fetchRecord = useCallback(async () => {
    const [dbRecord, dbContent] = await Promise.all([
      dbRecords.get(recordId),
      dbContents.get(recordId),
    ]);

    if (!dbRecord || !dbContent) throw new Error("Not Found");

    return { ...dbRecord, ...dbContent };
  }, [recordId]);

  useEffect(() => {
    setLoading(true);

    fetchRecord()
      .then(setRecord)
      .catch(setFatalError)
      .finally(() => setLoading(false));
  }, [fetchRecord]);

  const generateSummary = useCallback(async () => {
    if (!record) return;

    if (generatingSummary) return;
    setGeneratingSummary(true);

    try {
      const summary = await getSummary(content);
      await dbContents.update(record.id, { summary }).catch(console.error);

      setRecord({ ...record, summary });
    } catch (err: any) {
      console.error(err);
      noApiKeyToast(err);
    }

    setGeneratingSummary(false);
  }, [record, generatingSummary, noApiKeyToast]);

  useEffect(() => {
    if (!generatingSummary) return;

    try {
      window.onbeforeunload = () =>
        "Bu sayfadan ayrılmayı denediniz. Emin misiniz?\nÖzet oluşturma süreci durdurulacak!";

      return () => {
        window.onbeforeunload = null;
      };
    } catch {
      return;
    }
  }, [generatingSummary]);

  if (fatalError) {
    return <FatalError error={fatalError} />;
  }

  if (!record) {
    return null;
  }

  const { tab, content, createdAt, lastSyncAt, finishedAt, summary } = record;
  const durationEndDate = finishedAt ?? lastSyncAt ?? Date.now();

  return (
    <div className={classNames("min-h-screen flex flex-col")}>
      <Header
        tab={tab}
        toolbar={
          <div className="flex flex-col items-end justify-between">
            <Badge variant="outline" className="rounded-sm">
              {getPrettyDuration(createdAt, durationEndDate)}
            </Badge>
            <span className="mt-1 text-xs leading-none text-muted-foreground whitespace-nowrap">
              <PrettyDate date={createdAt} />
            </span>
          </div>
        }
      />

      <main className="flex-1 container mx-auto max-w-3xl px-4 py-8 grow bg-white">
        <article className="prose prose-slate mx-auto pb-48">
          {content.length > 0 ? (
            <>
              <h2 className="relative">
                Haber & Röportaj Metni
                {summary ? <CopyToCB text={summary} /> : null}
              </h2>

              {summary ? (
                <>
                  <p>{summary}</p>

                  <Button
                    type="button"
                    size="sm"
                    disabled={generatingSummary}
                    onClick={() => generateSummary()}
                  >
                    {!generatingSummary ? (
                      <>
                        <IndentIcon className="mr-2 h-4 w-4" />
                        Bir kez daha oluştur
                      </>
                    ) : (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Oluşturuluyor...
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="my-0">
                    Yapay zeka destekli Transkript Haber ve Röportaj Üretimi! 🚀✨
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="-my-2">
                    <CardDescription className="text-sm text-foreground">
                    Transkriptleriniz için haber ve röportaj metinlerizi zahmetsizce oluşturun.
                    Artık uzun transkriptleri kısa sürede haber ve röportaj metinlerine dönüştürebilirsiniz.
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex">
                    <Button
                      type="button"
                      disabled={generatingSummary}
                      onClick={() => generateSummary()}
                    >
                      {!generatingSummary ? (
                        <>
                          <IndentIcon className="mr-2 h-4 w-4" />
                          Haber & Röportaj Metni Oluştur
                        </>
                      ) : (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Oluşturuluyor...
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}

              <h2 className="relative">
              Transkripsiyon
                <CopyToCB text={content.join("\n\n")} />
              </h2>

              {content.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </>
          ) : (
            "İçerik yok"
          )}
        </article>
      </main>
    </div>
  );
}

function CopyToCB({ text }: { text: string }) {
  const [copying, setСopying] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => {
        setCopied(false);
      }, 1_000);
      return () => clearTimeout(t);
    }
    return;
  }, [copied, setCopied]);

  const handleClick = async () => {
    if (copying || copied) return;
    setСopying(true);

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err: any) {
      alert(`Panoya kopyalarken hata oluştu: ${err?.message ?? "Bilinmeyen hata."}`);
    }

    setСopying(false);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={classNames(
        "absolute bottom-0 right-0",
        copying && "opacity-50",
        copied && "pointer-events-none",
      )}
      onClick={handleClick}
    >
      {!copied ? "Panoya kopyala" : "Kopyalandı."}
    </Button>
  );
}
