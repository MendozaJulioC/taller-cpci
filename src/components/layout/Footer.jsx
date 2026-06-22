import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white text-slate-700 py-8 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between gap-6">
        
        {/* Logo izquierda */}
        <div className="flex-shrink-0">
          <Image
            src="/Img/logocpci.png"
            alt="Logo CPCI"
            width={65}
            height={65}
            style={{ width: 'auto', height: 'auto' }}
            className="opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>
        
        {/* Texto central */}
        <div className="flex flex-col items-center">
          <p className="text-xs font-medium text-slate-700">
            © 2026 Taller CPCI
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Comité Permanente sobre el Catastro en Iberoamérica
          </p>
        </div>
        
        {/* Logo derecha */}
        <div className="flex-shrink-0">
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