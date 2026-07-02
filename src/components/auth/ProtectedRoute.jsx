"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute({
  children,
}) {
  const {
    isAuthenticated,
    loading,
  } = useAuth();

  // Mientras carga el contexto
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-slate-500">
          Cargando...
        </div>
      </div>
    );
  }

  // Usuario NO autenticado
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl shadow-xl p-10 text-center">

          <div className="text-6xl mb-5">
            🔒
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Acceso restringido
          </h1>

          <p className="text-slate-600 leading-relaxed">
            Debes registrarte e iniciar sesión para acceder al contenido de este taller.
          </p>

          <div className="mt-8 text-sm text-slate-400">
            Una vez hayas iniciado sesión podrás visualizar todas las actividades,
            recursos, archivos y material disponible.
          </div>

        </div>
      </div>
    );
  }

  // Usuario autenticado
  return children;
}