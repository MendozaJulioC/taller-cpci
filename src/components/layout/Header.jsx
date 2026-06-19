'use client'

import React, { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-slate-900 border-b border-slate-800/50 sticky top-0 z-50 backdrop-blur-md bg-slate-900/90">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo / Identificación institucional */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-500 animate-pulse"></span>
            Taller CPCI
          </h1>
          <p className="text-xs font-medium text-slate-400 mt-0.5 tracking-wide uppercase">
            Comité Permanente sobre el Catastro en Iberoamérica
          </p>
        </div>

        {/* Navegación para escritorio */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
            About
          </a>
          <a href="#countries" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
            Countries
          </a>
          <a href="#history" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
            History
          </a>
          <a href="#objectives" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
            Objectives
          </a>
          <a href="#catastro" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
            Catastro
          </a>
          <a href="#taller" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
            Taller
          </a>
          <a 
            href="#contacto" 
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-blue-500/20 shadow-blue-500/10"
          >
            Contacto
          </a>
        </nav>

        {/* Botón de menú hamburguesa para móviles */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-white focus:outline-none"
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
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-6 py-5 flex flex-col gap-4 shadow-lg animate-fadeIn">
          <a href="#about" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-300 py-2 border-b border-slate-800/40">About</a>
          <a href="#countries" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-300 py-2 border-b border-slate-800/40">Countries</a>
          <a href="#history" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-300 py-2 border-b border-slate-800/40">History</a>
          <a href="#objectives" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-300 py-2 border-b border-slate-800/40">Objectives</a>
          <a href="#catastro" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-300 py-2 border-b border-slate-800/40">Catastro</a>
          <a href="#taller" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-300 py-2 border-b border-slate-800/40">Taller</a>
          <a 
            href="#contacto" 
            onClick={() => setIsOpen(false)}
            className="bg-blue-600 text-center text-white px-4 py-3 rounded-lg text-base font-semibold mt-2"
          >
            Contacto
          </a>
        </div>
      )}
    </header>
  );
}