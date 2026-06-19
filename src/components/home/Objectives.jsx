import {
  FaHandshake,
  FaExchangeAlt,
  FaMapMarkedAlt,
  FaGlobeAmericas,
  FaChartLine,
} from "react-icons/fa";

export default function Objectives() {
  const objectives = [
    {
      title: "Cooperación institucional",
      icon: <FaHandshake className="text-3xl text-blue-600" />,
      description:
        "Fortalecer la colaboración entre las instituciones catastrales de Iberoamérica mediante iniciativas conjuntas y espacios de trabajo compartidos.",
    },
    {
      title: "Intercambio de experiencias",
      icon: <FaExchangeAlt className="text-3xl text-green-600" />,
      description:
        "Promover el aprendizaje mutuo y la transferencia de conocimiento técnico entre los países miembros.",
    },
    {
      title: "Modernización catastral",
      icon: <FaChartLine className="text-3xl text-orange-600" />,
      description:
        "Impulsar la innovación y transformación digital de los sistemas catastrales para mejorar su eficiencia y sostenibilidad.",
    },
    {
      title: "Gestión territorial",
      icon: <FaMapMarkedAlt className="text-3xl text-red-600" />,
      description:
        "Apoyar la planificación y administración del territorio mediante información catastral confiable y actualizada.",
    },
    {
      title: "Innovación geoespacial",
      icon: <FaGlobeAmericas className="text-3xl text-indigo-600" />,
      description:
        "Fomentar el uso de tecnologías geoespaciales para fortalecer la gestión de la información territorial.",
    },
  ];

  return (
    <section
      id="objetivos"
      className="bg-slate-50 py-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Encabezado */}
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

        {/* Tarjetas */}
        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-2">
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
                {objective.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}