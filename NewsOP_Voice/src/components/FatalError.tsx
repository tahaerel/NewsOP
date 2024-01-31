import { AlertTriangle } from "lucide-react";

import { NoStreamError } from "../core/meeper";

import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

export default function FatalError({
  error,
}: {
  error: Error | string | null;
}) {
  const noStreamError = error instanceof NoStreamError;

  return (
    <div className="min-h-screen px-4 flex flex-col items-center justify-center">
      <Alert className="max-w-[40rem] prose prose-slate">
        <AlertTriangle className="h-6 w-6 stroke-yellow-600" />
        <AlertTitle className="ml-2">
          {noStreamError ? "Try a new one" : "Failed"}
        </AlertTitle>
        <AlertDescription className="ml-2">
          {noStreamError ? (
            <>
              <p>
              Önceki transkriptlere devam etmek mümkün değildir.
              Lütfen yeni bir tane başlatın.

              </p>

              <p>
              NewsOP açılır penceresini açarak önceki transkriptleri bulabilirsiniz.
              Bunu yapmak için tarayıcı araç çubuğunda NewsOP simgesini bulun
              ve bu simgeye tıklayın.
              </p>
            </>
          ) : typeof error === "string" ? (
            error
          ) : (
            error?.message ?? "Bir şeyler ters gitti."
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}
