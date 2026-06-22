'use client'
import Image from 'next/image';

import React, { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-slate-50 border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md bg-slate-50/90">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            <Image
              src="/Img/logocpci.png"
              alt="Picture of the author"
              width={100}
              height={100}
            />
          </p>
        </div>
        
        {/* Logo / Identificación institucional */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-600 animate-pulse"></span>
            Taller CPCI
          </h1>
          <p className="text-xs font-medium text-slate-600 mt-0.5 tracking-wide uppercase">
            Comité Permanente sobre el Catastro en Iberoamérica
          </p>
        </div>

        {/* Navegación para escritorio */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200">
            About
          </a>
          <a href="#countries" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200">
            Countries
          </a>
          <a href="#history" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200">
            History
          </a>
          <a href="#objectives" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200">
            Objectives
          </a>
          <a href="#catastro" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200">
            Catastro
          </a>
          <a href="#taller" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200">
            Taller
          </a>
          <a 
            href="#contacto" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm"
          >
            Contacto
          </a>
        </nav>

        {/* Botón de menú hamburguesa para móviles */}

      </div>
      {/* Menú desplegable para móviles */}

    </header>
  );
}