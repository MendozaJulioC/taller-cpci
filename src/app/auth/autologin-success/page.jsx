"use client";

import { Suspense } from "react";
import AutoLoginClient from "./AutoLoginClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">
              Iniciando sesión automáticamente...
            </p>
          </div>
        </div>
      }
    >
      <AutoLoginClient />
    </Suspense>
  );
}