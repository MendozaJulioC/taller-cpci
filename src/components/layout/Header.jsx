'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-slate-50 border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md bg-slate-50/90">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo / Identificación institucional */}
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm text-slate-500">
              <Image
                src="/Img/logocpci.png"
                alt="Logo CPCI"
                width={100}
                height={100}
                priority
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
          <Link href="/#about" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200">
            About
          </Link>
          <Link href="/countries" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200">
            Countries
          </Link>
          <Link href="/#objectives" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200">
            Objectives
          </Link>
          <Link href="/#catastro" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200">
            Catastro
          </Link>
          <Link href="/taller" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200">
            Talleres
          </Link>
          <Link 
            href="/#contacto" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm"
          >
            Contacto
          </Link>
        </nav>

        {/* Botón de menú hamburguesa para móviles */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-700 hover:text-blue-600 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
          <Link href="/#about" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-600 py-2 border-b border-slate-50">About</Link>
          <Link href="/#countries" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-600 py-2 border-b border-slate-50">Countries</Link>
          <Link href="/#objectives" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-600 py-2 border-b border-slate-50">Objectives</Link>
          <Link href="/#catastro" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-600 py-2 border-b border-slate-50">Catastro</Link>
          <Link href="/taller" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-600 py-2 border-b border-slate-50">Talleres</Link>
          <Link 
            href="/#contacto" 
            onClick={() => setIsOpen(false)}
            className="bg-blue-600 text-center text-white px-4 py-3 rounded-lg text-base font-semibold mt-2 shadow-sm block"
          >
            Contacto
          </Link>
        </div>
      )}
    </header>
  );
}