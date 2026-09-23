'use client'

import { useState } from 'react';
import { Video, Play, ExternalLink, Calendar, Clock, X, AlertCircle } from 'lucide-react';

export default function GrabacionesClases() {
  const [grabacionActiva, setGrabacionActiva] = useState(null);

  // 👇 Configuración de las grabaciones
  const grabaciones = [
    {
      id: 1,
      titulo: 'Taller 1: Plataforma Geográfica del Distrito de Medellín',
      fecha: '21 de septiembre del 2026',
      duracion: '3 horas aprox.',
      descripcion: 'Grabación de la primera sesión del taller, donde se presentó la plataforma geográfica del Distrito de Medellín y se realizaron ejercicios con información catastral.',
      urlSharePoint: 'https://medellingovco-my.sharepoint.com/personal/414704_medellin_gov_co/_layouts/15/stream.aspx?id=%2Fpersonal%2F414704%5Fmedellin%5Fgov%5Fco%2FDocuments%2FGrabaciones%2FTaller%20visualizaci%C3%B3n%20de%20datos%20para%20Catastro%2E%20Taller%201%2D20260921%5F081246%2DGrabaci%C3%B3n%20de%20la%20reuni%C3%B3n%2Emp4&ga=1&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E7fb39cfd%2Db623%2D496c%2D9d09%2D5a5cbda882f3',
      urlEmbed: 'https://medellingovco-my.sharepoint.com/personal/414704_medellin_gov_co/_layouts/15/embed.aspx?UniqueId=f70442f7-117e-419c-9ba1-6e2896afc6dc&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create',
      color: 'blue',
      icono: '🗺️',
      disponible: true,
    },
    // Puedes agregar más grabaciones aquí cuando estén disponibles:
    // {
    //   id: 2,
    //   titulo: 'Taller 2: Visualización de Datos',
    //   fecha: '23 de septiembre del 2026',
    //   duracion: '3 horas aprox.',
    //   descripcion: '...',
    //   urlSharePoint: '...',
    //   urlEmbed: '...',
    //   color: 'emerald',
    //   icono: '📊',
    //   disponible: true,
    // },
  ];

  const colores = {
    blue: {
      gradient: 'from-blue-500 to-blue-600',
      gradientHover: 'hover:from-blue-600 hover:to-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      shadow: 'shadow-blue-500/20',
      icon: 'text-blue-600',
    },
    emerald: {
      gradient: 'from-emerald-500 to-emerald-600',
      gradientHover: 'hover:from-emerald-600 hover:to-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      shadow: 'shadow-emerald-500/20',
      icon: 'text-emerald-600',
    },
    purple: {
      gradient: 'from-purple-500 to-purple-600',
      gradientHover: 'hover:from-purple-600 hover:to-purple-700',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-700',
      shadow: 'shadow-purple-500/20',
      icon: 'text-purple-600',
    },
    amber: {
      gradient: 'from-amber-500 to-amber-600',
      gradientHover: 'hover:from-amber-600 hover:to-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-700',
      shadow: 'shadow-amber-500/20',
      icon: 'text-amber-600',
    },
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/30 overflow-hidden">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-rose-600 to-pink-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <Video className="w-5 h-5 text-white/80" />
            <div>
              <h3 className="text-white font-bold text-sm">Grabaciones de las Clases</h3>
              <p className="text-rose-100 text-[10px] font-medium">
                Revive las sesiones del taller cuando quieras
              </p>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {grabaciones.length === 0 ? (
            <div className="text-center py-8">
              <Video className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">
                Aún no hay grabaciones disponibles.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {grabaciones.map((grabacion) => {
                const color = colores[grabacion.color];
                const estaDisponible = grabacion.disponible && grabacion.urlSharePoint;

                return (
                  <div
                    key={grabacion.id}
                    className={`${
                      estaDisponible
                        ? `bg-gradient-to-br ${color.bg} border-2 ${color.border} hover:shadow-xl hover:-translate-y-1`
                        : 'bg-slate-50 border-2 border-slate-200 opacity-60'
                    } rounded-2xl p-6 transition-all duration-300`}
                  >
                    {/* Icono y estado */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 bg-white rounded-xl shadow-sm ${estaDisponible ? color.icon : 'text-slate-400'} text-2xl`}>
                        {grabacion.icono}
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full bg-white ${
                        estaDisponible ? color.text : 'text-slate-500'
                      } uppercase tracking-wider`}>
                        {estaDisponible ? 'Disponible' : 'Próximamente'}
                      </span>
                    </div>

                    {/* Título */}
                    <h4 className={`text-base font-bold mb-3 ${estaDisponible ? color.text : 'text-slate-500'}`}>
                      {grabacion.titulo}
                    </h4>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-3 mb-4 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {grabacion.fecha}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {grabacion.duracion}
                      </span>
                    </div>

                    {/* Descripción */}
                    {grabacion.descripcion && (
                      <p className="text-sm text-slate-600 leading-relaxed mb-5">
                        {grabacion.descripcion}
                      </p>
                    )}

                    {/* Botones */}
                    {estaDisponible ? (
                      <div className="flex flex-col sm:flex-row gap-2">
                        {grabacion.urlEmbed ? (
                          <button
                            onClick={() => setGrabacionActiva(grabacion)}
                            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${color.gradient} ${color.gradientHover} text-white text-sm font-bold rounded-xl transition-all shadow-lg ${color.shadow} hover:shadow-xl`}
                          >
                            <Play className="w-4 h-4" />
                            Ver grabación
                          </button>
                        ) : (
                          <a
                            href={grabacion.urlSharePoint}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${color.gradient} ${color.gradientHover} text-white text-sm font-bold rounded-xl transition-all shadow-lg ${color.shadow} hover:shadow-xl`}
                          >
                            <Play className="w-4 h-4" />
                            Ver grabación
                          </a>
                        )}

                        <a
                          href={grabacion.urlSharePoint}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 text-sm font-semibold rounded-xl transition-all"
                          title="Abrir en SharePoint"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="sm:hidden">SharePoint</span>
                        </a>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/60 border border-slate-200 rounded-xl p-3">
                        <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span>Esta grabación estará disponible próximamente.</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Nota informativa */}
          <div className="mt-6 bg-rose-50/50 border border-rose-100 rounded-xl p-4">
            <p className="text-xs text-slate-600 flex items-start gap-2">
              <span className="text-rose-500 text-sm">💡</span>
              <span>
                Las grabaciones se publican después de cada sesión. 
                Si no puedes ver el video embebido, usa el botón <strong>"Abrir en SharePoint"</strong>.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Modal de video embebido */}
      {grabacionActiva && grabacionActiva.urlEmbed && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => e.target === e.currentTarget && setGrabacionActiva(null)}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            {/* Header del modal */}
            <div className="bg-gradient-to-r from-rose-600 to-pink-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <Video className="w-5 h-5" />
                <div>
                  <h3 className="font-bold text-sm">{grabacionActiva.titulo}</h3>
                  <p className="text-rose-100 text-[10px]">
                    {grabacionActiva.fecha} · {grabacionActiva.duracion}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={grabacionActiva.urlSharePoint}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                  title="Abrir en SharePoint"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setGrabacionActiva(null)}
                  className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                  title="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video embebido */}
            <div className="bg-black aspect-video max-h-[70vh]">
                <iframe
                    src={grabacionActiva.urlEmbed}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; encrypted-media; picture-in-picture"
                    title={grabacionActiva.titulo}
                ></iframe>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 px-6 py-4 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Si el video no carga correctamente, ábrelo directamente en SharePoint
              </span>
              <a
                href={grabacionActiva.urlSharePoint}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Abrir en SharePoint
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}