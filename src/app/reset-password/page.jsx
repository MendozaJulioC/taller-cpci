import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-slate-600">
            Cargando...
          </p>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}