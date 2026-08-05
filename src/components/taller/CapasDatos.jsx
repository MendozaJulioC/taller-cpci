// src/components/taller/CapasDatos.jsx
'use client'

import { useState } from 'react';
import { Database, FileSpreadsheet, Map, FileJson, HardDrive, Download, X, Check, FileArchive, Layers } from 'lucide-react';

export default function CapasDatos() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [formatoSeleccionado, setFormatoSeleccionado] = useState(null);
  const [capasSeleccionadas, setCapasSeleccionadas] = useState([]);

  // Definir todas las capas con sus formatos disponibles
  const capasData = [
    // CAPAS EJERCICIOS
    { 
      nombre: 'TallerComunas', 
      shp: true, 
      geojson: true, 
      csv: true, 
      peso: '423 KB',
      archivos: {
        shp: '/data/shp/ComunasMED.shp',
        geojson: '/data/geojson/ComunasMED.geojson',
        csv: '/data/csv/ComunasMED.csv'
      }
    },
    { 
      nombre: 'TallerBarrios', 
      shp: true, 
      geojson: true, 
      csv: true, 
      peso: '199 KB',
      archivos: {
        shp: '/data/shp/BarriosMED.shp',
        geojson: '/data/geojson/BarriosMED.geojson',
        csv: '/data/csv/BarriosMED.csv'
      }
    },
    { 
      nombre: 'TallerLotesPredios', 
      shp: true, 
      geojson: true, 
      csv: true, 
      peso: '12.01 MB',
      archivos: {
        shp: '/data/shp/LotesPredioMDE.shp',
        geojson: '/data/geojson/LotesPredioMDE.geojson',
        csv: '/data/csv/LotesPredioMDE.csv'
      }
    },
    { 
      nombre: 'TallerConstruccion', 
      shp: true, 
      geojson: true, 
      csv: true, 
      peso: '35 MB',
      archivos: {
        shp: '/data/shp/ConstruccionMDE.shp',
        geojson: '/data/geojson/ConstruccionMDE.geojson',
        csv: '/data/csv/ConstruccionMDE.csv'
      }
    },
    // CAPAS COMPLEMENTARIAS
    { 
      nombre: 'LimiteCatastralComunaCorregimiento', 
      shp: true, 
      geojson: true, 
      csv: true, 
      peso: '843.9 MB',
      archivos: {
        shp: '/data/shp/LimiteCatastralComunaCorregimiento.shp',
        geojson: '/data/geojson/LimiteCatastralComunaCorregimiento.geojson',
        csv: '/data/csv/LimiteCatastralComunaCorregimiento.csv'
      }
    },
    { 
      nombre: 'LimiteCatastralBarrioVereda', 
      shp: true, 
      geojson: true, 
      csv: true, 
      peso: '512.3 MB',
      archivos: {
        shp: '/data/shp/LimiteCatastralBarrioVereda.shp',
        geojson: '/data/geojson/LimiteCatastralBarrioVereda.geojson',
        csv: '/data/csv/LimiteCatastralBarrioVereda.csv'
      }
    },
    { 
      nombre: 'InventarioEquipamientos', 
      shp: true, 
      geojson: true, 
      csv: true, 
      peso: '156.7 MB',
      archivos: {
        shp: '/data/shp/InventarioEquipamientos.shp',
        geojson: '/data/geojson/InventarioEquipamientos.geojson',
        csv: '/data/csv/InventarioEquipamientos.csv'
      }
    },
    { 
      nombre: 'InventarioEspacioPublico', 
      shp: true, 
      geojson: true, 
      csv: true, 
      peso: '89.2 MB',
      archivos: {
        shp: '/data/shp/InventarioEspacioPublico.shp',
        geojson: '/data/geojson/InventarioEspacioPublico.geojson',
        csv: '/data/csv/InventarioEspacioPublico.csv'
      }
    },
    { 
      nombre: 'RioMedellin', 
      shp: true, 
      geojson: true, 
      csv: true, 
      peso: '45.1 MB',
      archivos: {
        shp: '/data/shp/RioMedellin.shp',
        geojson: '/data/geojson/RioMedellin.geojson',
        csv: '/data/csv/RioMedellin.csv'
      }
    },
  ];

  // Separar capas por categoría
  const capasEjercicios = capasData.slice(0, 4);
  const capasComplementarias = capasData.slice(4);

  // Calcular peso total de todas las capas disponibles
  const pesoTotal = capasData.reduce((total, capa) => {
    const pesoNumerico = parseFloat(capa.peso);
    if (!isNaN(pesoNumerico)) {
      return total + pesoNumerico;
    }
    return total;
  }, 0);

  // Función para descargar archivo individual
  const handleDownload = (url, nombreArchivo) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Función para obtener el nombre del archivo desde la URL
  const getFileName = (url) => {
    return url.split('/').pop();
  };

  // Abrir modal de descarga por formato
  const abrirModalDescarga = (formato) => {
    setFormatoSeleccionado(formato);
    // Seleccionar todas las capas que tienen ese formato disponible
    setCapasSeleccionadas(
      capasData
        .filter(capa => capa.archivos?.[formato])
        .map(capa => capa.nombre)
    );
    setModalAbierto(true);
  };

  // Cerrar modal
  const cerrarModal = () => {
    setModalAbierto(false);
    setFormatoSeleccionado(null);
  };

  // Toggle selección de capa
  const toggleCapa = (nombre) => {
    setCapasSeleccionadas(prev => 
      prev.includes(nombre) 
        ? prev.filter(n => n !== nombre)
        : [...prev, nombre]
    );
  };

  // Seleccionar/Deseleccionar todas
  const toggleTodas = () => {
    const capasDisponibles = capasData.filter(capa => capa.archivos?.[formatoSeleccionado]);
    if (capasSeleccionadas.length === capasDisponibles.length) {
      setCapasSeleccionadas([]);
    } else {
      setCapasSeleccionadas(capasDisponibles.map(capa => capa.nombre));
    }
  };

  // Descargar capas seleccionadas en el formato elegido
  const descargarSeleccionadas = () => {
    const capasADescargar = capasData.filter(capa => 
      capasSeleccionadas.includes(capa.nombre) && capa.archivos?.[formatoSeleccionado]
    );
    
    capasADescargar.forEach(capa => {
      const url = capa.archivos[formatoSeleccionado];
      if (url) {
        handleDownload(url, getFileName(url));
      }
    });
    
    cerrarModal();
  };

  // Obtener el nombre del formato para mostrar
  const getFormatoNombre = (formato) => {
    const nombres = {
      shp: 'SHP',
      geojson: 'GeoJSON',
      csv: 'CSV'
    };
    return nombres[formato] || formato;
  };

  // Obtener el icono del formato
  const getFormatoIcono = (formato) => {
    const iconos = {
      shp: <Map className="w-3.5 h-3.5" />,
      geojson: <FileJson className="w-3.5 h-3.5" />,
      csv: <FileSpreadsheet className="w-3.5 h-3.5" />
    };
    return iconos[formato] || null;
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/30 overflow-hidden">
        {/* Encabezado de la tabla */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-white/80" />
            <div>
              <h3 className="text-white font-bold text-sm">Capas de Datos del Taller</h3>
              <p className="text-blue-100 text-[10px] font-medium">
                Datos espaciales disponibles para los ejercicios prácticos
              </p>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-50/80 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  CAPAS EJERCICIOS
                </th>
                <th className="text-center px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center justify-center gap-1.5">
                    <Map className="w-3.5 h-3.5" />
                    SHP
                  </div>
                </th>
                <th className="text-center px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center justify-center gap-1.5">
                    <FileJson className="w-3.5 h-3.5" />
                    GeoJSON
                  </div>
                </th>
                <th className="text-center px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center justify-center gap-1.5">
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    CSV
                  </div>
                </th>
                <th className="text-right px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center justify-end gap-1.5">
                    <HardDrive className="w-3.5 h-3.5" />
                    Peso Total
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* CAPAS EJERCICIOS */}
              {capasEjercicios.map((capa, index) => (
                <tr 
                  key={index}
                  className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-700">
                        {capa.nombre}
                      </span>
                    </div>
                  </td>
                  <td className="text-center px-4 py-3">
                    {capa.shp ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>
                  <td className="text-center px-4 py-3">
                    {capa.geojson ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>
                  <td className="text-center px-4 py-3">
                    {capa.csv ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs text-slate-400">{capa.peso}</span>
                  </td>
                </tr>
              ))}

              {/* SEPARADOR - CAPAS COMPLEMENTARIAS */}
              <tr>
                <td colSpan="5" className="px-4 py-2 bg-blue-50/80 border-t border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    CAPAS COMPLEMENTARIAS
                  </span>
                </td>
              </tr>

              {/* CAPAS COMPLEMENTARIAS */}
              {capasComplementarias.map((capa, index) => (
                <tr 
                  key={index}
                  className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-700">
                        {capa.nombre}
                      </span>
                    </div>
                  </td>
                  <td className="text-center px-4 py-3">
                    {capa.shp ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>
                  <td className="text-center px-4 py-3">
                    {capa.geojson ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>
                  <td className="text-center px-4 py-3">
                    {capa.csv ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs text-slate-400">{capa.peso}</span>
                  </td>
                </tr>
              ))}

              {/* FILA DE BOTONES DE DESCARGA POR FORMATO */}
              <tr>
                <td className="px-4 py-3 bg-slate-50/80 border-t border-slate-200/60">
                  <span className="text-[10px] font-medium text-slate-500">Descargar todas las capas en:</span>
                </td>
                {['shp', 'geojson', 'csv'].map((formato) => (
                  <td key={formato} className="px-4 py-3 text-center bg-slate-50/80 border-t border-slate-200/60">
                    <button
                      onClick={() => abrirModalDescarga(formato)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all text-[10px] font-medium shadow-sm shadow-blue-500/20"
                    >
                      <Download className="w-3.5 h-3.5" />
                      {getFormatoNombre(formato)}
                    </button>
                  </td>
                ))}
                <td className="px-4 py-3 bg-slate-50/80 border-t border-slate-200/60"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer de la tabla con desglose de pesos */}
        <div className="bg-slate-50/80 border-t border-slate-200/60 px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-4 text-[10px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100 text-emerald-600">
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Formato disponible
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-slate-300">—</span>
                Formato no disponible
              </span>
            </div>
            <div className="flex items-center gap-3 text-[9px] text-slate-500">
              <span className="font-medium text-slate-600">Desglose de pesos:</span>
              {[
                { formato: 'SHP', peso: '687.9 MB', icono: <Map className="w-3 h-3" /> },
                { formato: 'GeoJSON', peso: '94.3 MB', icono: <FileJson className="w-3 h-3" /> },
                { formato: 'CSV', peso: '61.7 MB', icono: <FileSpreadsheet className="w-3 h-3" /> },
              ].map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-0.5 bg-white px-1.5 py-0.5 rounded border border-slate-200/60">
                  {item.icono}
                  {item.peso}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-200/60">
            <div className="flex items-center gap-3 text-[10px] text-slate-600">
              <span className="font-medium">Peso total de capas disponibles:</span>
              <span className="font-bold text-blue-700">{pesoTotal.toFixed(2)} MB</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <span className="font-medium">Personas incluyen:</span>
              <span className="font-bold text-emerald-600">2</span>
              <span className="text-slate-300">|</span>
              <span className="font-medium">En vivo:</span>
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="font-bold text-emerald-600">3</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de descarga por formato */}
      {modalAbierto && formatoSeleccionado && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && cerrarModal()}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            {/* Header del modal */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <FileArchive className="w-5 h-5" />
                <div>
                  <h3 className="font-bold text-sm">Descargar en {getFormatoNombre(formatoSeleccionado)}</h3>
                  <p className="text-blue-100 text-[10px]">Selecciona las capas que deseas descargar</p>
                </div>
              </div>
              <button
                onClick={cerrarModal}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lista de capas */}
            <div className="p-4 overflow-y-auto max-h-[50vh]">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                <button
                  onClick={toggleTodas}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {capasSeleccionadas.length === capasData.filter(c => c.archivos?.[formatoSeleccionado]).length 
                    ? 'Deseleccionar todas' 
                    : 'Seleccionar todas'}
                </button>
                <span className="text-[10px] text-slate-500">
                  {capasSeleccionadas.length} de {capasData.filter(c => c.archivos?.[formatoSeleccionado]).length} seleccionadas
                </span>
              </div>

              {capasData.map((capa) => {
                const tieneFormato = capa.archivos?.[formatoSeleccionado];
                if (!tieneFormato) return null;
                
                return (
                  <label
                    key={capa.nombre}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      capasSeleccionadas.includes(capa.nombre)
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={capasSeleccionadas.includes(capa.nombre)}
                      onChange={() => toggleCapa(capa.nombre)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700">{capa.nombre}</p>
                      <p className="text-[10px] text-slate-400">{capa.peso} · {getFormatoNombre(formatoSeleccionado)}</p>
                    </div>
                    {capasSeleccionadas.includes(capa.nombre) && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </label>
                );
              })}
            </div>

            {/* Footer del modal */}
            <div className="bg-slate-50/80 border-t border-slate-200/60 px-6 py-4 flex gap-3">
              <button
                onClick={cerrarModal}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={descargarSeleccionadas}
                disabled={capasSeleccionadas.length === 0}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Descargar ({capasSeleccionadas.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}