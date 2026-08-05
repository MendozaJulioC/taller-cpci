'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ModalInscripcion from '@/components/ui/ModalInscripcion';
import ModalLogin from "@/components/login/ModalLogin";
import { useAuth } from "@/contexts/AuthContext";
import ModalRecuperarPassword from "@/components/login/ModalRecuperarPassword";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [menuUsuario, setMenuUsuario] = useState(false);
  const [showInscripcionesMenu, setShowInscripcionesMenu] = useState(false);
  const [rolModal, setRolModal] = useState('participante');

  const { usuario, logout } = useAuth();
  const router = useRouter();

  // Cerrar el menú de inscripciones al hacer clic fuera
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showInscripcionesMenu && !event.target.closest('.inscripciones-dropdown')) {
        setShowInscripcionesMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showInscripcionesMenu]);

  return (
    <>
      <ModalInscripcion 
        isOpen={modalOpen} 
        onClose={() => {
          setModalOpen(false);
          setShowInscripcionesMenu(false);
        }} 
        rolInicial={rolModal}
      />
      <ModalLogin 
        isOpen={loginOpen} 
        onClose={() => setLoginOpen(false)} 
        onOpenRecovery={() => { 
          setLoginOpen(false); 
          setRecoveryOpen(true); 
        }} 
      />
      <ModalRecuperarPassword 
        isOpen={recoveryOpen} 
        onClose={() => setRecoveryOpen(false)} 
        onBackToLogin={() => { 
          setRecoveryOpen(false); 
          setLoginOpen(true); 
        }} 
      />
      
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">

          {/* Logo / Identificación institucional */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <div className="shrink-0">
              <Image
                src="/Img/logocpci.png"
                alt="Logo CPCI"
                width={90}
                height={90}
                style={{
                  width: 'auto',
                  height: 'auto'
                }}
                className="object-contain w-10 h-10 sm:w-16 sm:h-16 md:w-[90px] md:h-[90px]"
              />
            </div>

            <div className="flex flex-col justify-center min-w-0">
              <h1 className="text-base sm:text-xl md:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2 truncate">
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-blue-600 animate-pulse shrink-0"></span>
                <span className="truncate">Taller CPCI</span>
              </h1>
              <p className="hidden sm:block text-[10px] md:text-xs font-medium text-slate-600 mt-0.5 tracking-wide uppercase truncate">
                Comité Permanente sobre el Catastro en Iberoamérica
              </p>
            </div>
          </div>

          {/* Navegación para escritorio usando <Link /> de Next.js */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200">
              Home
            </Link>
            <Link href="/countries" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200">
              Countries
            </Link>
            <Link href="/taller" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200">
              Talleres
            </Link>
          </nav>

          {/* Botones de escritorio (Inscripciones / Login / Usuario) */}
          <div className="hidden md:flex items-center gap-3 relative">
            {!usuario && (
              <div className="relative inscripciones-dropdown">
                <button
                  onClick={() => setShowInscripcionesMenu(!showInscripcionesMenu)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm flex items-center gap-1"
                >
                  Inscripciones
                  <svg className={`w-4 h-4 transition-transform duration-200 ${showInscripcionesMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showInscripcionesMenu && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 z-50 overflow-hidden">
                    <button
                      onClick={() => {
                        setRolModal('participante');
                        setModalOpen(true);
                        setShowInscripcionesMenu(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-slate-100 flex items-center gap-3 transition-colors"
                    >
                      <span className="text-xl">👤</span>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Inscribirse como Participante</p>
                        <p className="text-xs text-slate-500">Accede a los talleres y sube tus ejercicios</p>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setRolModal('formador');
                        setModalOpen(true);
                        setShowInscripcionesMenu(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-rose-50 flex items-center gap-3 transition-colors"
                    >
                      <span className="text-xl">📋</span>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Inscribirse como Formador</p>
                        <p className="text-xs text-slate-500">Moderador y calificador de los ejercicios</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}

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
                  onClick={() => setMenuUsuario(!menuUsuario)}
                  className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-slate-100"
                >
                  Hola, {usuario.nombres}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${menuUsuario ? 'rotate-180' : ''}`}
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
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 z-50 overflow-hidden">
                    <button className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100">
                      👤 Mi perfil
                    </button>
                    <button 
                      onClick={() => {
                        setMenuUsuario(false);
                        router.push("/mis-talleres");
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 flex items-center gap-3"
                    >
                      <span className="text-xl">📚</span>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Mis talleres</p>
                        <p className="text-xs text-slate-500">Gestiona tus talleres y calificaciones</p>
                      </div>
                    </button>
                    <hr />
                    <button
                      onClick={() => {
                        logout();
                        setMenuUsuario(false);
                        router.push("/");
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

          {/* Botón hamburguesa (solo móvil) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Abrir menú"
            aria-expanded={isOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menú desplegable para móviles */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-6 py-5 flex flex-col gap-4 shadow-lg animate-fadeIn">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-600 py-2 border-b border-slate-50">Home</Link>
            <Link href="/countries" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-600 py-2 border-b border-slate-50">Countries</Link>
            <Link href="/taller" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-600 py-2 border-b border-slate-50">Talleres</Link>

            {!usuario && (
              <>
                <button
                  onClick={() => {
                    setRolModal('participante');
                    setModalOpen(true);
                    setIsOpen(false);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm"
                >
                  👤 Inscribirse como Participante
                </button>
                <button
                  onClick={() => {
                    setRolModal('formador');
                    setModalOpen(true);
                    setIsOpen(false);
                  }}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm"
                >
                  📋 Inscribirse como Formador
                </button>
              </>
            )}

            {!usuario ? (
              <button
                onClick={() => { setLoginOpen(true); setIsOpen(false); }}
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                Iniciar sesión
              </button>
            ) : (
              <div className="border-t border-slate-100 pt-3 flex flex-col gap-1">
                <p className="text-sm font-semibold text-slate-700 px-1 pb-1">Hola, {usuario.nombres}</p>
                <button className="w-full text-left px-1 py-2 hover:bg-slate-50 rounded">
                  👤 Mi perfil
                </button>
                <button 
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/mis-talleres");
                    }}
                    className="w-full text-left px-1 py-2 hover:bg-slate-50 rounded flex items-center gap-2"
                  >
                    <span className="text-lg">📚</span>
                    Mis talleres
                  </button>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                    router.push("/");
                  }}
                  className="w-full text-left px-1 py-2 text-red-600 hover:bg-red-50 rounded"
                >
                  🚪 Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
}