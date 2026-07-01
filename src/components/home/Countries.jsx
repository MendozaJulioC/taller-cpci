import React from 'react';

export default function Countries() {
  // Lista de países miembros con la cantidad de entidades y un código para la bandera
  const members = [
    { name: 'Argentina', count: 22, code: 'ar' },
    { name: 'Bolivia', count: 2, code: 'bo' },
    { name: 'Brasil', count: 2, code: 'br' },
    { name: 'Chile', count: 1, code: 'cl' },
    { name: 'Colombia', count: 5, code: 'co' },
    { name: 'Costa Rica', count: 2, code: 'cr' },
    { name: 'Ecuador', count: 5, code: 'ec' },
    { name: 'El Salvador', count: 1, code: 'sv' },
    { name: 'España', count: 2, code: 'es' },
    { name: 'Guatemala', count: 3, code: 'gt' },
    { name: 'México', count: 9, code: 'mx' },
    { name: 'Nicaragua', count: 2, code: 'ni' },
    { name: 'Panamá', count: 2, code: 'pa' },
    { name: 'Paraguay', count: 1, code: 'py' },
    { name: 'Perú', count: 3, code: 'pe' },
    { name: 'Portugal', count: 1, code: 'pt' },
    { name: 'Puerto Rico', count: 1, code: 'pr' },
    { name: 'República Dominicana', count: 1, code: 'do' },
    { name: 'Uruguay', count: 2, code: 'uy' },
    { name: 'Venezuela', count: 1, code: 've' },
  ];

  const institutionalRepresentations = [
    { 
      country: 'Argentina', 
      url: 'https://www.aref.gob.ar/gerencia-de-catastro-provincial/',
      entities: 
        'Dirección General del Catastro y Agencia de Recaudación Fueguina.' 
    },
    { 
      country: 'Brasil', 
      url: 'https://www.gov.br/receitafederal/pt-br',
      entities: 
        'Receita Federal del Brasil.' },
    { 
      country: 'Colombia', 
      url: 'https://www.igac.gov.co/',
      entities: 
        'Instituto Geográfico Agustín Codazzi (IGAC), junto a otras autoridades catastrales regionales.' },
    { 
      country: 'Chile', 
      url: 'https://www.bienesnacionales.cl/catastro-de-la-propiedad/',
      entities: 
        'Representada a través de sus servicios nacionales.' },
    { 
      country: 'El Salvador', 
      url: 'https://www.cnr.gob.sv/',
      entities: 
        'Centro Nacional de Registros (CNR) e Instituto Geográfico y del Catastro Nacional.' },
    { 
      country: 'España', 
      url: 'https://www.sedecatastro.gob.es/',
      entities: 
        'Dirección General del Catastro.' },
    { 
      country: 'México', 
      url: 'https://igece.qroo.gob.mx/',
      entities: 
        'Representaciones estatales (como la Dirección General del Instituto Geográfico y Catastral del Estado de Quintana Roo).' },
    { 
      country: 'Panamá', 
      url: 'https://sinia.gob.pa/autoridad-nacional-de-administracion-tierras-anati/',
      entities: 
        'Autoridad Nacional de Administración de Tierras (ANATI).' },
    { 
      country: 'Paraguay', 
      url: 'https://www.indert.gov.py/indert/index.php',
      entities: 
        'Instituto Nacional de Desarrollo Rural y de la Tierra (INDERT).' },
    { 
      country: 'Perú', 
      url: 'https://sncp.gob.pe/',
      entities: 
        'Consejo Nacional de Catastro y el Sistema Nacional Integrado de Información Catastral Predial (SNCP).' },
    { 
      country: 'República Dominicana',
      url: 'https://www.catastro.gob.do/', 
      entities: 
        'Dirección General del Catastro Nacional.' },
    { 
      country: 'Uruguay', 
      url: 'https://www.gub.uy/ministerio-economia-finanzas/direccion-nacional-catastro',
      entities: 
        'Dirección Nacional de Catastro.' },
  ];

  const observersAndAllies = [
    { name: 'Estados Unidos', entities: 'Participación como miembro observador (2 entidades).' },
    { name: 'Banco Interamericano de Desarrollo (BID)', desc: 'Aliado clave en la financiación y desarrollo de proyectos de modernización y adopción de catastros multipropósito en América Latina.' },
    { name: 'Organización de los Estados Americanos (OEA) / RICRP', desc: 'Miembro observador que utiliza el catastro para fortalecer el estado de derecho.' },
    { name: 'EUROsociAL Fiscalidad', desc: 'Programa de cooperación de la Unión Europea para el desarrollo de sistemas fiscales y catastros.' }
  ];

  return (
    <section id="countries" className="py-24 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Encabezado de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-xs font-bold tracking-[0.15em] uppercase mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            Países y Miembros
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Red Iberoamericana de Catastro
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            El Comité Permanente sobre el Catastro en Iberoamérica (CPCI) es una red internacional que agrupa a más de 20 instituciones catastrales. Su objetivo es promover la cooperación técnica, el intercambio de buenas prácticas y la modernización tecnológica.
          </p>
        </div>

        {/* Grid de Países Miembros y banderas */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
              Países Miembros (Total: 68 entidades)
            </h3>
            <span className="h-px flex-1 bg-slate-200"></span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {members.map((member) => (
              <div 
                key={member.name} 
                className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center justify-between text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Bandera simulada usando banderas de la web (CDN estático de banderas) */}
                <div className="w-14 h-10 relative mb-4 rounded-lg overflow-hidden border border-slate-100 shadow-sm bg-slate-100 flex items-center justify-center">
                  <img 
                    src={`https://flagcdn.com/w40/${member.code}.png`} 
                    alt={`Bandera de ${member.name}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h4 className="text-sm font-bold text-slate-800 mb-1">
                  {member.name}
                </h4>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-xs font-semibold text-slate-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  {member.count} {member.count === 1 ? 'entidad' : 'entidades'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Instituciones Oficiales Representativas */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Instituciones representativas
              </h3>
              <p className="text-sm text-slate-500 font-medium">
                Entidades oficiales que representan a sus respectivos países en el CPCI.
              </p>
            </div>

            <div className="space-y-4">
              {institutionalRepresentations.map((item) => (
                <div key={item.country} className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex items-start gap-4">
                  <div className="w-6 h-4 mt-0.5 flex-shrink-0 rounded overflow-hidden border border-slate-200">
                    <img 
                      src={`https://flagcdn.com/w40/${members.find(m => m.name === item.country)?.code || 'un'}.png`} 
                      alt="" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          text-blue-700
                          hover:text-blue-900
                          hover:underline
                          transition-colors
                          duration-200
                        "
                      >
                        {item.country}
                      </a>
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.entities}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Aliados estratégicos y observadores */}
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Aliados estratégicos y observadores
              </h3>
              <p className="text-sm text-slate-500 font-medium">
                Organismos colaboradores que impulsan la administración de tierras en la región.
              </p>
            </div>

            <div className="space-y-4">
              {observersAndAllies.map((ally) => (
                <div key={ally.name} className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm">
                  <h4 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                    {ally.desc ? '🏛️' : '🌐'} {ally.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {ally.entities || ally.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}