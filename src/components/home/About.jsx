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
           Transformar datos crudos de bases espaciales en herramientas de decisión estratégica.
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
              <div className="mb-5">
                {objective.icon}
              </div>
   
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                
                {objective.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                    <span className='font-bold'>Dinámica: </span> 
                {objective.description}
              </p>
              <span className='font-bold'>Reto: </span> 
                <p className="text-slate-600 leading-relaxed">
                {objective.reto}
              </p>
            </div>
          ))}
        </div>
      </div>
        
    </section>
  );
}