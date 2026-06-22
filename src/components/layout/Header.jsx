'use client'
import Image from 'next/image';
import Link from 'next/link'; // Importación necesaria
import React, { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="bg-slate-50 border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md bg-slate-50/90">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo Institucional */}
        <div className="flex items-center">
          <Image
            src="/Img/logocpci.png"
            alt="Logo CPCI"
            width={100}
            height={100}
            className="w-auto h-12"
          />
        </div>
        
        {/* Identificación del Taller */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-500 animate-pulse"></span>
            Taller CPCI
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-0.5 tracking-wide uppercase">
            Comité Permanente sobre el Catastro en Iberoamérica
          </p>
        </div>

        {/* Navegación para escritorio */}
        <nav className="hidden md:flex items-center gap-8">
          {['About', 'Countries', 'History', 'Objectives', 'Catastro', 'Taller'].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200"
            >
              {item}
            </Link>
          ))}
          <Link 
            href="#contacto" 
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-blue-500/20"
          >
          Inscripciones
          </Link>
        </nav>
      </div>
    </header>
  );
}