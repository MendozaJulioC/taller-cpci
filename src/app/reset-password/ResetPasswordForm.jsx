"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!password || !confirmPassword) {
      return setError("Todos los campos son obligatorios.");
    }

    if (password !== confirmPassword) {
      return setError("Las contraseñas no coinciden.");
    }

    const regex =
      /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!regex.test(password)) {
      return setError(
        "La contraseña debe tener mínimo 8 caracteres, una letra y un número."
      );
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSuccess(true);

      setTimeout(() => {
        router.push("/");
      }, 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-100">

        <div className="bg-white rounded-xl shadow-lg p-10 text-center">

          <h2 className="text-2xl font-bold text-red-600">
            Enlace inválido
          </h2>

          <p className="text-slate-600 mt-3">
            El enlace de recuperación no es válido.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Volver al inicio
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex justify-center items-center px-4">

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-center py-8 px-8">

          <Image
            src="/Img/logocpci.png"
            width={80}
            height={80}
            alt="CPCI"
            className="mx-auto mb-4"
          />

          <h1 className="text-white text-2xl font-bold">

            Restablecer contraseña

          </h1>

          <p className="text-blue-100 mt-2">

            Crea una nueva contraseña para acceder nuevamente a la plataforma.

          </p>

        </div>

        {/* BODY */}

        <div className="p-8">

          {success ? (

            <div className="text-center">

              <CheckCircle2
                size={60}
                className="mx-auto text-green-600 mb-4"
              />

              <h2 className="text-2xl font-bold text-green-700">

                Contraseña actualizada

              </h2>

              <p className="mt-3 text-slate-600">

                Tu contraseña fue modificada correctamente.

              </p>

              <p className="text-sm text-slate-500 mt-2">

                Serás redirigido al inicio...

              </p>

            </div>

          ) : (

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {error && (

                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">

                  {error}

                </div>

              )}

              {/* PASSWORD */}

              <div>

                <label className="font-medium text-slate-700 text-sm">

                  Nueva contraseña

                </label>

                <div className="relative mt-1">

                  <Lock
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    className="w-full border rounded-lg pl-10 pr-12 py-3"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-3 top-3"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>

              {/* CONFIRM */}

              <div>

                <label className="font-medium text-slate-700 text-sm">

                  Confirmar contraseña

                </label>

                <div className="relative mt-1">

                  <Lock
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    className="w-full border rounded-lg pl-10 pr-12 py-3"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-3 top-3"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg py-3 font-semibold transition"
              >
                {loading
                  ? "Actualizando..."
                  : "Actualizar contraseña"}
              </button>

            </form>

          )}

        </div>

      </div>

    </div>
  );
}