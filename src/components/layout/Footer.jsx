import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white text-slate-700 py-6 sm:py-8 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">

        {/* Logos (fila en móvil, izquierda en desktop) */}
        <div className="flex items-center gap-6 sm:gap-0 order-1 sm:order-none">
          {/* Logo izquierda */}
          <div className="flex-shrink-0">
            <Image
              src="/Img/logocpci.png"
              alt="Logo CPCI"
              width={65}
              height={65}
              style={{ width: 'auto', height: 'auto' }}
              className="opacity-90 hover:opacity-100 transition-opacity w-10 h-10 sm:w-[65px] sm:h-[65px]"
            />
          </div>

          {/* Logo derecha, visible junto al izquierdo solo en móvil */}
          <div className="flex-shrink-0 sm:hidden">
            <Image
              src="/Img/logo_2022.png"
              alt="Logo 2022"
              width={110}
              height={110}
              style={{ width: 'auto', height: 'auto' }}
              className="opacity-90 hover:opacity-100 transition-opacity w-16 h-16"
            />
          </div>
        </div>

        {/* Texto central */}
        <div className="flex flex-col items-center text-center order-2 sm:order-none">
          <p className="text-xs font-medium text-slate-700">
            © 2026 Taller CPCI
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5 max-w-[280px] sm:max-w-none">
            Comité Permanente sobre el Catastro en Iberoamérica
          </p>
        </div>

        {/* Logo derecha (solo visible en sm+, ya que en móvil se muestra arriba) */}
        <div className="hidden sm:block flex-shrink-0 order-3 sm:order-none">
          <Image
            src="/Img/logo_2022.png"
            alt="Logo 2022"
            width={110}
            height={110}
            style={{ width: 'auto', height: 'auto' }}
            className="opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>

      </div>
    </footer>
  );
}