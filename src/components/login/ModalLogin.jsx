"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function ModalLogin({
  isOpen,
  onClose,
}) {
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Error al iniciar sesión."
        );
      }

      login(
        data.token,
        data.usuario
      );

      onClose();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      onClick={(e) =>
        e.target === e.currentTarget &&
        onClose()
      }
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">

        <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-5">
          <h2 className="text-white text-xl font-semibold">
            Iniciar sesión
          </h2>

          <p className="text-blue-100 text-sm mt-1">
            Accede a la plataforma del
            Taller CPCI
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              Usuario
            </label>

            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Contraseña
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 border rounded-lg py-2"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-700 text-white rounded-lg py-2 hover:bg-blue-800"
            >
              {loading
                ? "Ingresando..."
                : "Ingresar"}
            </button>

          </div>
        </form>

      </div>
    </div>
  );
}