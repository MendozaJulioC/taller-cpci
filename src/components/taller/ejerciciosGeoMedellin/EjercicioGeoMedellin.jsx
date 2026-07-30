// src/components/taller/ejerciciosGeoMedellin/EjercicioGeoMedellin.jsx
'use client'

import { useState } from 'react';
import { 
  Download, 
  FileText, 
  Search, 
  Table, 
  Map, 
  Database,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';

export default function EjercicioGeoMedellin() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Cabecera */}
      <div 
        className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50/50 border-b border-slate-200/60 cursor-pointer hover:bg-gradient-to-r hover:from-blue-100/50 hover:to-indigo-100/50 transition-all duration-200"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">
                Ejercicios Prácticos - GeoMedellín
              </h3>
              <p className="text-xs text-slate-500">
                Catálogo geográfico y datos abiertos
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/data/Ejercicio01_GeoMedellin.docx"
              download
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="w-3.5 h-3.5" />
              Descargar
            </a>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              {expanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Contenido expandible */}
      {expanded && (
        <div className="px-6 py-5 space-y-5 bg-white">
          {/* Objetivo */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
              Objetivo
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Explorar el <span className="font-semibold">Catálogo Geográfico de Medellín</span> para localizar un conjunto
              de datos relacionado con catastro y registrar su ficha de metadatos:
              responsable, fecha de actualización, escala, formato y servicio asociado.
            </p>
            <p className="text-xs text-slate-500 mt-1.5 bg-blue-50/50 border border-blue-100/50 rounded-lg p-2.5">
              💡 El catastro multipropósito depende de que los datos que lo alimentan sean trazables y confiables.
              La ficha de metadatos documenta el origen, la vigencia y la calidad de un dato.
            </p>
          </div>

          {/* Ejercicio 1 - Catálogo Geográfico */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
              Ejercicio 1 - Catálogo Geográfico: Ficha de Metadatos
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-1.5">Actividades a realizar:</p>
                <ul className="space-y-1.5">
                  {[
                    'Ingresar a GeoMedellín ir a Contenidos Destacados / Gestión de Información Geográfica / Aplicaciones',
                    'Identificar las diferencias entre Catálogo de Mapas y Catálogo Geográfico',
                    'Ingresar palabra clave para iniciar la búsqueda (ej. "catastro", "estrato", "lote" o "multipropósito")',
                    'Registrar los datos analizados (máximo 3)'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="text-blue-500 font-bold mt-0.5">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tabla de elementos a analizar */}
              <div className="bg-slate-50/80 rounded-lg border border-slate-200/60 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200">
                      <th className="text-left px-3 py-2 font-semibold text-slate-600">Elemento a analizar</th>
                      <th className="text-left px-3 py-2 font-semibold text-slate-600">Resultado obtenido</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Nombres de los conjuntos de datos', rows: 3 },
                      { label: 'Dependencia responsable', rows: 3 },
                      { label: 'Fecha de última actualización', rows: 3 },
                      { label: 'Descriptores de datos', rows: 3 },
                      { label: 'Licencia o restricciones de uso', rows: 3 },
                      { label: 'Estado (vigente, histórico)', rows: 3 },
                      { label: 'Comentarios sobre los datos', rows: 3 },
                    ].map((item, idx) => (
                      <tr key={idx} className="border-b border-slate-100 last:border-0">
                        <td className="px-3 py-2 font-medium text-slate-700">{item.label}</td>
                        <td className="px-3 py-2 text-slate-500">
                          {Array.from({ length: item.rows }).map((_, i) => (
                            <div key={i} className="py-0.5">{i + 1}.</div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50/60 border border-amber-200/60 rounded-lg p-3">
                <p className="text-xs font-semibold text-amber-700 mb-1">📝 Preguntas sobre los datos analizados:</p>
                <ul className="space-y-1 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>¿Qué elementos de esta ficha permitirían a otra entidad decidir si puede confiar en este dato para actualizar su catastro?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>¿Qué información esperarías encontrar que no aparece aquí?</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Ejercicio 2 - Datos Abiertos */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
              Ejercicio 2 - Datos Abiertos: Descarga y Exploración Tabular
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-1.5">Actividades a realizar:</p>
                <ul className="space-y-1.5">
                  {[
                    'Ingresar a GeoMedellín ir a Datos Abiertos',
                    'Realizar la búsqueda de datos relacionados con "catastro" mediante la herramienta de búsqueda o mediante la temática',
                    'Descargar los conjuntos de datos en formato CSV',
                    'Descargar los descriptores de datos para la comprensión de los campos',
                    'Registrar los datos analizados (máximo 3)'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="text-purple-500 font-bold mt-0.5">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tabla de elementos a analizar */}
              <div className="bg-slate-50/80 rounded-lg border border-slate-200/60 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200">
                      <th className="text-left px-3 py-2 font-semibold text-slate-600">Elemento a analizar</th>
                      <th className="text-left px-3 py-2 font-semibold text-slate-600">Resultado obtenido</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Conjunto datos descargado', rows: 3 },
                      { label: 'Número total de registros', rows: 3 },
                      { label: 'Los descriptores de datos ayudan a conocer los datos', rows: 3 },
                      { label: 'Comentarios sobre los datos', rows: 3 },
                    ].map((item, idx) => (
                      <tr key={idx} className="border-b border-slate-100 last:border-0">
                        <td className="px-3 py-2 font-medium text-slate-700">{item.label}</td>
                        <td className="px-3 py-2 text-slate-500">
                          {Array.from({ length: item.rows }).map((_, i) => (
                            <div key={i} className="py-0.5">{i + 1}.</div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-purple-50/60 border border-purple-200/60 rounded-lg p-3">
                <p className="text-xs font-semibold text-purple-700 mb-1">📝 Preguntas sobre los datos analizados:</p>
                <ul className="space-y-1 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-0.5">•</span>
                    <span>¿Qué tan útil es este conjunto de datos, tal como está publicado, para alimentar un catastro multipropósito sin procesamiento adicional?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-0.5">•</span>
                    <span>¿Qué pasos de limpieza o estandarización serían necesarios antes de realizar aprovechamiento de la información?</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contexto adicional */}
          <div className="bg-slate-50/80 border border-slate-200/60 rounded-lg p-3">
            <p className="text-xs text-slate-600 flex items-start gap-2">
              <span className="text-slate-400">💡</span>
              <span>
                <span className="font-semibold">Contexto:</span> La apertura de datos es un componente clave del catastro multipropósito moderno: 
                habilita el uso del dato catastral por otras entidades (planeación, ambiente, movilidad) sin depender de un visor específico.
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}