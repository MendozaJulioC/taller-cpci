export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
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
    </header>
  );
}