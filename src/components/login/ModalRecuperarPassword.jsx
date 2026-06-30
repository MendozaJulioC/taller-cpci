"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Mail, ArrowLeft } from "lucide-react";

export default function ModalRecuperarPassword({
  isOpen,
  onClose,
  onBackToLogin,
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError("El correo electrónico es obligatorio");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const response = await fetch("/api/auth/recuperar-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo_electronico: email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al enviar el correo");
      }

      setSuccess(true);
      // Opcional: cerrar después de 3 segundos
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setEmail("");
      }, 3000);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full shadow-lg">
                <Image
                  src="/Img/logocpci.png"
                  alt="Logo CPCI"
                  width={56}
                  height={56}
                  className="w-14 h-14 object-contain"
                />
              </div>
            </div>
            <h2 className="text-white text-xl font-bold">
              Recuperar contraseña
            </h2>
            <p className="text-blue-100 text-sm mt-1 font-light">
              Te enviaremos un enlace para restablecerla
            </p>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-lg text-center">
              <p className="font-medium">✅ ¡Correo enviado!</p>
              <p className="text-sm mt-1">Revisa tu bandeja de entrada</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="tu@email.com"
                    required
                    disabled={loading}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1.5">
                  Ingresa el correo con el que te registraste
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-lg py-2.5 font-medium hover:from-blue-800 hover:to-blue-700 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    "Enviar enlace de recuperación"
                  )}
                </button>

                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                >
                  <ArrowLeft size={16} />
                  Volver al inicio de sesión
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}