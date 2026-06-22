export default function TallerPage() {
  const actividades = [
    {
      num: 1,
      color: 'blue',
      titulo: 'Health check de la base espacial',
      subtitulo: 'Conexión y limpieza de datos',
      dinamica: 'Los participantes conectan Power BI a una base de datos PostGIS o similar, y realizan un proceso de ETL orientado a lo territorial.',
      reto: 'Identificar y corregir inconsistencias: predios con área cero, registros duplicados o errores de tipología en el uso del suelo, antes de cargar los datos al modelo.',
    },
    {
      num: 2,
      color: 'green',
      titulo: 'Diseño de mapas coropléticos e integración ArcGIS',
      subtitulo: 'Visualización espacial avanzada',
      dinamica: 'Configuración de visualizaciones espaciales avanzadas utilizando el objeto visual de ArcGIS o Mapbox dentro de Power BI.',
      reto: 'Crear un mapa coroplético que muestre la distribución de un indicador clave (densidad poblacional, acceso a servicios, etc.) a nivel de distrito o comuna con datos reales.',
    },
    {
      num: 3,
      color: 'amber',
      titulo: 'Simulación para tomadores de decisión',
      subtitulo: 'Roleplay estratégico',
      dinamica: 'En grupos, los analistas diseñan un tablero de "Control de Metas" para un Secretario o Director de área.',
      reto: 'Simular una reunión donde los participantes presenten su tablero y respondan preguntas críticas sobre interpretación de datos y recomendaciones estratégicas.',
    },
  ];

  const numColors = {
    blue:  'bg-blue-50 border border-blue-100 text-blue-700',
    green: 'bg-emerald-50 border border-emerald-100 text-emerald-700',
    amber: 'bg-amber-50 border border-amber-100 text-amber-700',
  };

  const retoColors = {
    blue: 'border-blue-100/60 bg-blue-50/30',
    green: 'border-emerald-100/60 bg-emerald-50/30',
    amber: 'border-amber-100/60 bg-amber-50/30',
  };

  const objetivos = [
    { icon: '🔌', text: 'Conectar Power BI a bases de datos espaciales (PostGIS) y ejecutar procesos ETL territoriales.' },
    { icon: '🗺️', text: 'Diseñar visualizaciones espaciales con ArcGIS y mapas coropléticos de indicadores clave.' },
    { icon: '📊', text: 'Presentar tableros a tomadores de decisión y sustentar recomendaciones estratégicas.' },
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 antialiased">

      {/* Hero Section */}
      <div className="relative border-b border-slate-200/80 pb-12 mb-12">
        <span className="inline-flex items-center gap-1.5 bg-blue-50/80 backdrop-blur-sm text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 tracking-wide border border-blue-100/50">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></span>
          CPCI · Taller 1
        </span>
        <h1 className="text-4xl md:text-[40px] font-extrabold text-slate-900 mb-4 tracking-tight leading-[1.12]">
          Visualización Avanzada con Power BI
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed max-w-2xl font-medium">
          Aprende a transformar datos crudos de bases espaciales en herramientas de decisión
          estratégica usando Power BI, ArcGIS y técnicas de ETL territorial.
        </p>
        <div className="flex flex-wrap gap-2.5 mt-6">
          {['Comité Permanente sobre el Catastro en Iberoamérica', '3 actividades', 'Datos espaciales'].map(tag => (
            <span key={tag} className="text-xs font-medium text-slate-600 bg-slate-100/80 border border-slate-200/60 rounded-full px-3.5 py-1.5">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Objetivos del Taller */}
      <div className="mb-14">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
          Objetivos del taller
          <span className="h-px flex-1 bg-slate-100"></span>
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {objetivos.map((o, i) => (
            <div key={i} className="bg-white border border-slate-200/60 shadow-sm shadow-slate-100/50 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:border-slate-300">
              <span className="text-2xl block">{o.icon}</span>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">{o.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actividades */}
      <div className="mb-6">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
          Actividades
          <span className="h-px flex-1 bg-slate-100"></span>
        </h2>
        <div className="flex flex-col gap-6">
          {actividades.map((a) => (
            <div key={a.num} className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 md:p-7 transition-all duration-200 hover:shadow-md hover:border-slate-300/80">
              
              {/* Cabecera de Actividad */}
              <div className="flex items-start gap-4 mb-6">
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${numColors[a.color]}`}>
                  {a.num}
                </span>
                <div className="flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">{a.titulo}</h3>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{a.subtitulo}</span>
                </div>
              </div>

              {/* Dinámica y Reto */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2.5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                    Dinámica
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">{a.dinamica}</p>
                </div>
                <div className={`border rounded-xl p-5 ${retoColors[a.color]}`}>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.15em] mb-2.5 flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${a.color === 'blue' ? 'bg-blue-600' : a.color === 'green' ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
                    Reto
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">{a.reto}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
}