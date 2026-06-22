import Image from 'next/image'


export default function Hero() {
  return (
  <section className="relative w-full py-24 bg-slate-900 border-b border-slate-800 overflow-hidden">
  {/* Elemento decorativo de fondo */}
  <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
     <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
  </div>

  <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
    
    {/* Insignia pequeña */}
    <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-blue-400 bg-blue-900/30 border border-blue-800 rounded-full">
      Desde 2006
    </div>

    {/* Título */}
    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">
      Comité Permanente sobre el Catastro <br className="hidden md:block" />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
        en Iberoamérica
      </span>
    </h1>

    {/* Descripción */}
    <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
      Foro técnico internacional que articula a las instituciones públicas con funciones 
      catastrales de los países iberoamericanos para fortalecer la gestión y el desarrollo 
      territorial en la región.
    </p>

    {/* Acciones opcionales */}
    <div className="mt-10 flex justify-center gap-4">
      <button className="px-6 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition-colors">
        Conocer más
      </button>
    </div>
  </div>
</section>
  );
}