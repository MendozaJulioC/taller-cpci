"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AutoLoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const iniciar = async () => {
      const token = searchParams.get("token");

      if (!token) {
        router.replace("/?error=autologin_failed");
        return;
      }

      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        router.replace("/?error=autologin_failed");
        return;
      }

      const data = await response.json();

      login(token, data.usuario);

      router.replace("/");
    };

    iniciar();
  }, [searchParams, login, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">
          Iniciando sesión automáticamente...
        </p>
      </div>
    </div>
  );
}