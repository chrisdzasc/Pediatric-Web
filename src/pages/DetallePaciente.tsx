import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Baby,
  User,
  Cake,
  Calendar,
  Users,
  Phone,
  Mail,
  TriangleAlert,
  Utensils,
} from "lucide-react";
import ModalAgregarConsulta from "../components/ModalAgregarConsulta";

interface Medicion {
  fecha: string;
  pesoKg: number;
  tallaCm: number;
  perimetroCm: number;
}

const pacienteEjemplo = {
  id: 2,
  numeroExpediente: "EXP-0002",
  nombre: "Mateo García López",
  iniciales: "MG",
  sexo: "M" as "M" | "F",
  fechaNacimiento: "15 Mar 2024",
  edadMeses: 27,
  activo: true,
  tipoAlimentacion: "Lactancia Materna Exclusiva (LME)",
  inicioComplementaria: "A los 6 meses",
  alergias: ["Alergia al huevo", "Alergia a la penicilina"],
  condicionesCronicas: ["Diabetes tipo 1", "Asma"],
  tutor: {
    nombre: "María López García",
    parentesco: "Madre",
    telefono: "33 1243 4323",
    email: "maria.lopez@ejemplo.com",
  },
  mediciones: [
    { fecha: "15 Sep 2027", pesoKg: 11.8, tallaCm: 83.5, perimetroCm: 47.2 },
    { fecha: "15 Jun 2027", pesoKg: 10.5, tallaCm: 79.0, perimetroCm: 46.6 },
    { fecha: "15 Mar 2027", pesoKg: 9.2, tallaCm: 74.5, perimetroCm: 45.8 },
    { fecha: "15 Dic 2026", pesoKg: 8.1, tallaCm: 70.2, perimetroCm: 44.5 },
    { fecha: "15 Sep 2026", pesoKg: 6.8, tallaCm: 65.0, perimetroCm: 43.0 },
  ] as Medicion[],
};

function DetallePaciente() {
  const { id } = useParams();
  const [tabActiva, setTabActiva] = useState("Mediciones");
  const [modalAbierto, setModalAbierto] = useState(false);
  const paciente = pacienteEjemplo;

  const obtenerCasoAlimentacion = (meses : number): 1 | 2 | 3 => {
    if (meses < 6) return 1;
    if (meses < 24) return 2;
    return 3;
  };

  const casoAlim = obtenerCasoAlimentacion(paciente.edadMeses);

  const etiquetaAlimentacion = 
    casoAlim === 1
      ? "Alimentación actual"
      : casoAlim === 2
      ? "Alimentación primeros 6 meses"
      : "Alimentación primeros 6 meses";
  
  const etiquetaComplementaria =
    casoAlim === 2 ? "Introducción de sólidos" : "Inicio de alimentación complementaria";
  
  const dosDatos = casoAlim === 2 || casoAlim === 3;

  const tabs = ["Mediciones", "Graficas", "Alimentacion"];

  const sexoTexto = paciente.sexo === "F" ? "Femenino" : "Masculino";
  const tieneAlertas =
    paciente.alergias.length > 0 || paciente.condicionesCronicas.length > 0;

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        to="/pacientes"
        className="text-teal-600 text-sm hover:underline mb-4 inline-block"
      >
        &larr; Volver a Pacientes
      </Link>

      {/* ===== TARJETA DE DATOS DEL PACIENTE ===== */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">

        {/* Barra superior: distintivo y estado */}
        <div className="bg-gray-50 border-b border-gray-100 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-medium">
              <Baby size={14} className="text-teal-600" />
              Expediente Pediátrico
            </span>
            <span className="text-gray-400 font-mono">{paciente.numeroExpediente}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <span
              className={`w-2 h-2 rounded-full ${
                paciente.activo ? "bg-emerald-500" : "bg-gray-400"
              }`}
            ></span>
            {paciente.activo ? "Paciente activo" : "Paciente inactivo"}
          </div>
        </div>

        {/* Cuerpo */}
        <div className="p-6 space-y-6">

          {/* Fila superior: Identidad + Tutor */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* ZONA 1: Identidad */}
            <section className="lg:col-span-7 flex items-start gap-4">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-xl sm:text-2xl font-semibold shrink-0 ${
                  paciente.sexo === "F"
                    ? "bg-pink-100 text-pink-600"
                    : "bg-teal-100 text-teal-700"
                }`}
              >
                {paciente.iniciales}
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  {paciente.nombre}
                </h1>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-sm text-gray-600 font-medium mt-2">
                  <span className="inline-flex items-center gap-1">
                    <User size={15} className="text-gray-400" />
                    {sexoTexto}
                  </span>
                  <span className="text-gray-300 font-bold">•</span>
                  <span className="inline-flex items-center gap-1 text-gray-900 font-semibold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">
                    <Cake size={14} className="text-teal-600" />
                    {paciente.edadMeses} Meses
                  </span>
                  <span className="text-gray-300 font-bold">•</span>
                  <span className="inline-flex items-center gap-1 text-gray-500">
                    <Calendar size={14} className="text-gray-400" />
                    {paciente.fechaNacimiento}
                  </span>
                </div>
              </div>
            </section>

            {/* ZONA 4: Contacto del tutor */}
            <section className="lg:col-span-5 bg-gray-50 rounded-lg p-4 border border-gray-200 w-full">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200 mb-2.5">
                <span className="uppercase tracking-wider font-semibold text-[11px] text-gray-500 flex items-center gap-1.5">
                  <Users size={14} className="text-gray-400" />
                  Contacto del tutor
                </span>
                <span className="text-gray-400 text-[10px] font-medium bg-white px-1.5 py-0.5 rounded border border-gray-200">
                  {paciente.tutor.parentesco}
                </span>
              </div>

              <p className="text-sm font-semibold text-gray-900 mb-2">
                {paciente.tutor.nombre}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
                <a
                  href={`tel:${paciente.tutor.telefono}`}
                  className="inline-flex items-center gap-1.5 hover:text-teal-700 transition-colors group"
                >
                  <Phone size={14} className="text-gray-400 group-hover:text-teal-600 shrink-0" />
                  <span className="font-mono text-xs">{paciente.tutor.telefono}</span>
                </a>
                <a
                  href={`mailto:${paciente.tutor.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-teal-700 transition-colors group min-w-0"
                >
                  <Mail size={14} className="text-gray-400 group-hover:text-teal-600 shrink-0" />
                  <span className="truncate text-xs">{paciente.tutor.email}</span>
                </a>
              </div>
            </section>
          </div>

          <hr className="border-gray-100" />

          {/* Fila: Alertas (+ alimentación si es caso 1) */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
  {/* ZONA 2: Alertas médicas */}
  <section className={`${dosDatos ? "md:col-span-12" : "md:col-span-7"} bg-red-50/50 rounded-lg p-4 border border-red-200`}>
    <div className="flex items-center gap-1.5 mb-3">
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
      </span>
      <h2 className="text-xs font-bold uppercase tracking-wider text-red-800">
        Alertas Médicas
      </h2>
    </div>

    {tieneAlertas ? (
      <div className="flex flex-wrap items-center gap-2">
        {paciente.alergias.map((alergia, i) => (
          <span
            key={`a-${i}`}
            className="inline-flex items-center gap-1.5 bg-red-100 text-red-800 border border-red-200 px-3 py-1 rounded-full text-xs font-semibold"
          >
            <TriangleAlert size={13} className="text-red-600 shrink-0" />
            {alergia}
          </span>
        ))}
        {paciente.condicionesCronicas.map((condicion, i) => (
          <span
            key={`c-${i}`}
            className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
            {condicion}
          </span>
        ))}
      </div>
    ) : (
      <p className="text-xs text-gray-400 italic">Sin alertas registradas</p>
    )}
  </section>

  {/* ZONA 3 (solo caso 1): Alimentación de un dato, comparte fila */}
  {!dosDatos && (
    <section className="md:col-span-5 bg-teal-50/50 rounded-lg p-4 border border-teal-100">
      <div className="flex items-center gap-1.5 mb-2">
        <Utensils size={15} className="text-teal-600" />
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-teal-600/70">
          {etiquetaAlimentacion}
        </h2>
      </div>
      <p className="text-base font-bold text-gray-800 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-teal-500 shrink-0"></span>
        {paciente.tipoAlimentacion}
      </p>
    </section>
  )}
</div>

{/* Fila propia de alimentación (casos 2 y 3): dos mini-bloques */}
{dosDatos && (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
    <section className="bg-teal-50/50 rounded-lg p-4 border border-teal-100">
      <div className="flex items-center gap-1.5 mb-2">
        <Utensils size={15} className="text-teal-600" />
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-teal-600/70">
          {etiquetaAlimentacion}
        </h2>
      </div>
      <p className="text-base font-bold text-gray-800 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-teal-500 shrink-0"></span>
        {paciente.tipoAlimentacion}
      </p>
    </section>

    <section className="bg-teal-50/50 rounded-lg p-4 border border-teal-100">
      <div className="flex items-center gap-1.5 mb-2">
        <Utensils size={15} className="text-teal-600" />
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-teal-600/70">
          {etiquetaComplementaria}
        </h2>
      </div>
      <p className="text-base font-bold text-gray-800 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-teal-500 shrink-0"></span>
        {paciente.inicioComplementaria}
      </p>
    </section>
  </div>
)}

        </div>
      </div>

      {/* ===== TABS ===== */}
      <div className="flex gap-6 border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setTabActiva(tab)}
            className={`pb-3 text-sm font-medium ${
              tabActiva === tab
                ? "text-teal-600 border-b-2 border-teal-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {tabActiva === "Mediciones" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Historial de Crecimiento</h2>
            <div className="flex gap-3">
              <button
                onClick={() => setModalAbierto(true)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                Agendar consulta
              </button>
              <Link
                to={`/pacientes/${id}/nueva-medicion`}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 flex items-center gap-2"
              >
                + Nueva Medición
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Peso (Kg)</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Talla (cm)</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Perímetro cefálico</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Acción</th>
                </tr>
              </thead>
              <tbody>
                {paciente.mediciones.map((m, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">{m.fecha}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{m.pesoKg}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{m.tallaCm}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{m.perimetroCm}</td>
                    <td className="px-6 py-4">
                      <button className="text-teal-500 hover:text-teal-700 text-lg">&rarr;</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="px-6 py-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">
                Mostrando {paciente.mediciones.length} de {paciente.mediciones.length} mediciones registradas.
              </span>
            </div>
          </div>
        </div>
      )}

      {tabActiva === "Graficas" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-500">Las gráficas de crecimiento OMS se implementarán aquí.</p>
        </div>
      )}

      {tabActiva === "Alimentacion" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-500">El plan de alimentación y checklist se implementarán aquí.</p>
        </div>
      )}

      <ModalAgregarConsulta
        pacienteNombre={paciente.nombre}
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
      />
    </div>
  );
}

export default DetallePaciente;
