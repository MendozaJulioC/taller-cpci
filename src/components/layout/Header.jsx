export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-slate-900 border-b border-slate-800/50 sticky top-0 z-50 backdrop-blur-md bg-slate-900/90">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Taller CPCI
          </h1>

          <p className="text-sm text-slate-500">
            Comité Permanente sobre el Catastro en Iberoamérica
          </p>
        </div>
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



 
