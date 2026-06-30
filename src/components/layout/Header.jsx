'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from "react";
import ModalInscripcion from '@/components/ui/ModalInscripcion';
import ModalLogin from "@/components/login/ModalLogin";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [menuUsuario, setMenuUsuario] = useState(false);

  const { usuario, logout } = useAuth();

  return (
    <>
      <ModalInscripcion isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <ModalLogin isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <header className="bg-slate-50 border-b border-slate-200 sticky top-3 z-40 backdrop-blur-md bg-slate-50/90">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo / Identificación institucional */}
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-slate-500">
             <Image
                src="/Img/logocpci.png"
                alt="Logo CPCI"
                width={100}      // Valor base
                height={100}     // Valor base
                style={{ 
                  width: 'auto', 
                  height: 'auto' 
                }}
                className="object-contain" // Asegura que no se deforme
              />
              </p>
            </div>
            
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-600 animate-pulse"></span>
                Taller CPCI
              </h1>
              <p className="text-xs font-medium text-slate-600 mt-0.5 tracking-wide uppercase">
                Comité Permanente sobre el Catastro en Iberoamérica
              </p>
            </div>
          </div>

          {/* Navegación para escritorio usando <Link /> de Next.js */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200">
              Home
            </Link>
            {/* AQUÍ ESTÁ EL CAMBIO: Redirección a la página /countries */}
            <Link href="/countries" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200">
              Countries
            </Link>
            <Link href="/taller" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200">
              Talleres
            </Link>
            {/* Botón Inscripciones — reemplaza donde lo tengas */}
          </nav>
          {/* Botón de menú hamburguesa para móviles */}
          <div className="flex items-center gap-3 relative">
            <button
                onClick={() => setModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm"
            >
                Inscripciones
            </button>

            {!usuario ? (

                <button
                    onClick={() => setLoginOpen(true)}
                    className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-semibold transition"
                >
                    Iniciar sesión
                </button>

            ) : (

                <div className="relative">
                    <button
                        onClick={() =>
                            setMenuUsuario(!menuUsuario)
                        }
                        className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-slate-100"
                    >
                        Hola, {usuario.nombres}

                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {menuUsuario && (

                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border">
                            <button
                                className="w-full text-left px-4 py-3 hover:bg-slate-50"
                            >
                                👤 Mi perfil
                            </button>

                            <button
                                className="w-full text-left px-4 py-3 hover:bg-slate-50"
                            >
                                📚 Mis talleres
                            </button>
                            <hr />
                            <button
                                onClick={() => {
                                    logout();
                                    setMenuUsuario(false);
                                }}
                                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                            >
                                🚪 Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
        </div>

        {/* Menú desplegable para móviles */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-6 py-5 flex flex-col gap-4 shadow-lg animate-fadeIn">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-600 py-2 border-b border-slate-50">Home</Link>
            {/* AQUÍ TAMBIÉN: Menú responsive apuntando a /countries */}
            <Link href="/countries" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-600 py-2 border-b border-slate-50">Countries</Link>
            <Link href="/#objectives" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-600 py-2 border-b border-slate-50">Objectives</Link>
            <Link href="/taller" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-600 py-2 border-b border-slate-50">Talleres</Link>
            {/* Botón Inscripciones — reemplaza donde lo tengas */}
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm"
            >
              Inscripciones
            </button>
          </div>
        )}
      </header>
    </>
  );
}