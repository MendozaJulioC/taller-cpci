import Image from 'next/image'
import {
  FaHandshake,
  FaExchangeAlt,
  FaMapMarkedAlt,
  FaGlobeAmericas,
  FaChartLine,
} from "react-icons/fa";


export default function About() {
      const objectives = [
        {
          title: 'Actividad 1: Health Check" de la Base Espacial (Conexión y Limpieza)',
          icon: <FaHandshake className="text-3xl text-blue-600" />,
          description:
            'Los participantes deben conectar Power BI a una base de datos (PostGIS o similar) y realizar un proceso de ETL orientado a lo territorial.',
          reto: 'Reto:  Identificar y corregir inconsistencias comunes, como predios con área cero, registros duplicados o errores de tipología en el uso del suelo, antes de cargar los datos al modelo.',
        },
        {
          title: 'Actividad 2: Diseño de Mapas Coropléticos e Integración ArcGIS for Power BI',
          icon: <FaExchangeAlt className="text-3xl text-green-600" />,
          description:
            "Configuración de visualizaciones espaciales avanzadas utilizando el objeto visual de ArcGIS o Mapbox dentro de Power BI.",
            reto: 'Reto:  Crear un mapa coroplético que muestre la distribución de un indicador clave (por ejemplo, densidad poblacional, acceso a servicios, etc.) a nivel de distrito o comuna, utilizando datos reales de una base espacial.',
        },
        {
          title: "Actividad 3: Simulación para Tomadores de Decisión (Roleplay)",
          icon: <FaChartLine className="text-3xl text-orange-600" />,
          description:
            'En grupos, los analistas deben diseñar un tablero de "Control de Metas" para un Secretario o Director',
            reto: 'Reto:  Simular una reunión de toma de decisiones donde los participantes presenten su tablero a un "Secretario" o "Director" (interpretado por un instructor o facilitador) y respondan preguntas críticas sobre la interpretación de los datos y las recomendaciones estratégicas basadas en sus visualizaciones.',
        }
       
      ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">
          Taller 1: Visualización Avanzada con Power BI
        </h2>
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            CPCI
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Objetivos Estratégicos
          </h2>

          <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Transformar datos crudos de bases espaciales en herramientas de
            decisión estratégica.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-4xl font-bold text-slate-900">
            Actividades
          </h2>
        </div>

        {/* Tarjetas */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {objectives.map((objective) => (
            <div
              key={objective.title}
              className="
                bg-white
                rounded-2xl
                p-8
                border
                border-slate-200
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >
              <div className="mb-5">{objective.icon}</div>

              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                {objective.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                <span className="font-bold">Dinámica: </span>
                {objective.description}
              </p>
              <span className="font-bold">Reto: </span>
              <p className="text-slate-600 leading-relaxed">{objective.reto}</p>
            </div>
          ))}
        </div>

   <div className="mt-20 flex flex-col md:flex-row items-center md:items-start gap-8 p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
  
  {/* Imagen */}
  <div className="flex-shrink-0">
    <img
      alt="Jordi Guerrero Martínez"
      src="https://media.licdn.com/dms/image/v2/D4D03AQH25_FkQQx6JQ/profile-displayphoto-shrink_800_800/B4DZVSyuinHIAc-/0/1740850785102?e=1783555200&v=beta&t=Ws9U7TE4k8XLhq7BU4ORkECNWdemYgcHvDb54fCcOT4"
      className="size-48 md:size-60 rounded-full object-cover border-4 border-blue-50 outline outline-2 -outline-offset-2 outline-blue-400"
    />
  </div>

  {/* Información */}
  <div className="flex flex-col text-left">Nuesto facilitador..
    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
      Jordi Guerrero Martínez
    </h2>
    <p className="text-lg font-semibold text-blue-600 mb-4">
      Especialista en Infraestructura Geoespacial y Gemelos Digitales
    </p>
    
    <p className="text-gray-700 leading-relaxed mb-6">
      Líder estratégico con más de 20 años de experiencia transformando datos complejos en activos de decisión para los sectores público y privado. Pionero en la implementación del primer Gemelo Digital en Colombia y experto en transformación digital urbana mediante arquitecturas ArcGIS Enterprise, analítica avanzada y Python.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <h4 className="font-bold text-slate-800">Gestión Pública y Urbana</h4>
        <p className="text-sm text-gray-600 mt-1">Experto en consultoría estratégica para Smart Cities, interoperabilidad y contratación pública tecnológica.</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <h4 className="font-bold text-slate-800">Experiencia Técnica</h4>
        <p className="text-sm text-gray-600 mt-1">Especialista en BI (Power BI/Tableau), PostgreSQL/PostGIS y metodologías ágiles (SCRUM).</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <h4 className="font-bold text-slate-800">Trayectoria Institucional</h4>
        <p className="text-sm text-gray-600 mt-1">Liderazgo en la Alcaldía de Medellín, destacando la reingeniería de GeoMedellín y modelado 3D.</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <h4 className="font-bold text-slate-800">Formación y Docencia</h4>
        <p className="text-sm text-gray-600 mt-1">Máster UPC. Docente en UPB, UdeA y EIA, y conferencista internacional en ciudades inteligentes.</p>
      </div>
    </div>
  </div>
</div>
      </div>
  
    </section>
  );
}