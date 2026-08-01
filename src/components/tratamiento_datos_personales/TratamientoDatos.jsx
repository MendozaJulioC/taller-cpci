// src/components/tratamiento_datos_personales/TratamientoDatos.jsx
'use client'

import Link from 'next/link';
import { ArrowLeft, ExternalLink, Shield, Lock, FileText, Users, CheckCircle } from 'lucide-react';

export default function TratamientoDatos() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/60 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Botón de volver */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>

        {/* Tarjeta principal */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
          
          {/* Cabecera */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 px-8 py-10 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-8 h-8 text-blue-200" />
              <span className="text-xs font-bold text-blue-200 uppercase tracking-[0.2em]">
                Política de Tratamiento de Datos
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              Política de Tratamiento de Datos Personales
            </h1>
            <p className="text-blue-100 text-sm">
              Elaborada conforme a la Ley 1581 de 2012, el Decreto 1377 de 2013 y demás normas concordantes de la República de Colombia
            </p>
          </div>

          {/* Contenido */}
          <div className="px-8 py-8 space-y-8">
            
            {/* Información de la empresa */}
            <div className="bg-slate-50/80 rounded-xl border border-slate-200/60 p-6">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Información del Responsable
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">Razón social</span>
                  <p className="font-medium text-slate-800">Comité Permanente sobre el Catastro en Iberoamérica - CPCI</p>
                </div>
                <div>
                  <span className="text-slate-500">Correo de contacto</span>
                  <p className="font-medium text-slate-800">equipocatastroapp@gmail.com</p>
                </div>
                <div>
                  <span className="text-slate-500">Domicilio</span>
                  <p className="font-medium text-slate-800">Medellín, Colombia</p>
                </div>
                <div>
                  <span className="text-slate-500">Sitio web</span>
                  <p className="font-medium text-slate-800">https://taller-cpci.vercel.app/</p>
                </div>
              </div>
            </div>

            {/* Objeto */}
            <div>
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                Objeto
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                La presente Política de Tratamiento de Datos Personales tiene por objeto establecer los criterios, 
                procedimientos y condiciones bajo las cuales el <strong>Comité Permanente sobre el Catastro en Iberoamérica (CPCI)</strong> 
                recolecta, almacena, usa, circula, suprime y en general trata los datos personales de los usuarios 
                registrados en la aplicación, garantizando el derecho constitucional al Habeas Data y el cumplimiento 
                de la normatividad colombiana vigente en materia de protección de datos personales.
              </p>
            </div>

            {/* Marco Legal */}
            <div>
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
                Marco Legal
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed mb-3">
                Esta Política se fundamenta y da cumplimiento a las siguientes normas del ordenamiento jurídico colombiano:
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Constitución Política de Colombia</strong>, artículo 15 (derecho al Habeas Data e intimidad).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Ley Estatutaria 1581 de 2012</strong>, por la cual se dictan disposiciones generales para la protección de datos personales.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Decreto 1377 de 2013</strong>, reglamentario de la Ley 1581 de 2012.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Decreto 886 de 2014</strong>, que reglamenta el Registro Nacional de Bases de Datos (RNBD).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Decreto Único Reglamentario 1074 de 2015</strong>, Sector Comercio, Industria y Turismo (Título 2, Capítulo 25 y 26).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Ley 1266 de 2008</strong>, sobre manejo de información contenida en bases de datos personales (en lo que resulte aplicable).</span>
                </li>
              </ul>
              <div className="mt-3 bg-blue-50/60 border border-blue-200/60 rounded-lg p-3">
                <p className="text-xs text-slate-600 flex items-start gap-2">
                  <span className="text-blue-500 text-sm">📌</span>
                  <span>
                    <strong>Consulta la norma completa:</strong>{' '}
                    <a 
                      href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline font-medium inline-flex items-center gap-1"
                    >
                      Ley 1581 de 2012
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </span>
                </p>
              </div>
            </div>

            {/* Definiciones */}
            <div>
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
                Definiciones
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="bg-purple-50/50 border border-purple-100/60 rounded-lg p-3">
                  <h4 className="font-bold text-slate-800">Dato personal</h4>
                  <p className="text-slate-600 text-xs mt-0.5">Cualquier información vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables.</p>
                </div>
                <div className="bg-purple-50/50 border border-purple-100/60 rounded-lg p-3">
                  <h4 className="font-bold text-slate-800">Dato sensible</h4>
                  <p className="text-slate-600 text-xs mt-0.5">Dato que afecta la intimidad del titular o cuyo uso indebido puede generar discriminación (origen racial, orientación política, convicciones religiosas, datos de salud, etc.).</p>
                </div>
                <div className="bg-purple-50/50 border border-purple-100/60 rounded-lg p-3">
                  <h4 className="font-bold text-slate-800">Titular</h4>
                  <p className="text-slate-600 text-xs mt-0.5">Persona natural cuyos datos personales son objeto de tratamiento.</p>
                </div>
                <div className="bg-purple-50/50 border border-purple-100/60 rounded-lg p-3">
                  <h4 className="font-bold text-slate-800">Tratamiento</h4>
                  <p className="text-slate-600 text-xs mt-0.5">Cualquier operación sobre datos personales: recolección, almacenamiento, uso, circulación o supresión.</p>
                </div>
                <div className="bg-purple-50/50 border border-purple-100/60 rounded-lg p-3">
                  <h4 className="font-bold text-slate-800">Autorización</h4>
                  <p className="text-slate-600 text-xs mt-0.5">Consentimiento previo, expreso e informado del titular para llevar a cabo el tratamiento de sus datos personales.</p>
                </div>
                <div className="bg-purple-50/50 border border-purple-100/60 rounded-lg p-3">
                  <h4 className="font-bold text-slate-800">Responsable del Tratamiento</h4>
                  <p className="text-slate-600 text-xs mt-0.5">Persona que decide sobre la base de datos y/o el tratamiento de los datos.</p>
                </div>
              </div>
            </div>

            {/* Principios Rectores */}
            <div>
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-amber-500 rounded-full"></span>
                Principios Rectores del Tratamiento
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { title: 'Legalidad', desc: 'El tratamiento se sujeta a lo establecido en la ley y demás disposiciones aplicables.' },
                  { title: 'Finalidad', desc: 'El tratamiento obedece a una finalidad legítima, informada al titular.' },
                  { title: 'Libertad', desc: 'El tratamiento solo se ejerce con el consentimiento previo, expreso e informado del titular.' },
                  { title: 'Veracidad o calidad', desc: 'La información debe ser veraz, completa, exacta, actualizada, comprobable y comprensible.' },
                  { title: 'Transparencia', desc: 'Se garantiza el derecho del titular a obtener información sobre la existencia de datos que le conciernan.' },
                  { title: 'Seguridad', desc: 'La información se maneja con las medidas necesarias para evitar adulteración, pérdida o acceso no autorizado.' },
                  { title: 'Confidencialidad', desc: 'Las personas que intervienen en el tratamiento están obligadas a garantizar la reserva de la información.' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-amber-50/50 border border-amber-100/60 rounded-lg p-3">
                    <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                    <p className="text-slate-600 text-xs mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Derechos de los Titulares */}
            <div>
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-rose-500 rounded-full"></span>
                Derechos de los Titulares
              </h2>
              <ul className="space-y-2 text-sm text-slate-600">
                {[
                  'Conocer, actualizar y rectificar sus datos personales frente al Responsable del Tratamiento.',
                  'Solicitar prueba de la autorización otorgada.',
                  'Ser informado sobre el uso que se ha dado a sus datos personales.',
                  'Presentar ante la Superintendencia de Industria y Comercio quejas por infracciones.',
                  'Revocar la autorización y/o solicitar la supresión del dato.',
                  'Acceder de forma gratuita a sus datos personales que hayan sido objeto de tratamiento.'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold mt-0.5">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Canal de Atención */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200/60 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider">Área Responsable y Canal de Atención</h3>
                  <p className="text-sm text-slate-700 mt-2">
                    Las solicitudes, consultas, reclamos y peticiones relacionadas con el tratamiento de datos personales 
                    podrán dirigirse al <strong>Oficial de Protección de Datos</strong> a través del correo electrónico:
                  </p>
                  <p className="text-sm font-medium text-blue-600 mt-1">equipocatastroapp@gmail.com</p>
                  <p className="text-xs text-slate-500 mt-2">
                    Término para consultas: 10 días hábiles · Término para reclamos: 15 días hábiles
                  </p>
                </div>
              </div>
            </div>

            {/* Footer de la política */}
            <div className="border-t border-slate-200/60 pt-6 text-center">
              <p className="text-xs text-slate-400">
                Política de Tratamiento de Datos Personales · Vigente a partir de su aceptación
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                *Este documento es una plantilla elaborada con fines de referencia general y no constituye asesoría legal.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}