import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ModalAgregarConsulta from "../components/ModalAgregarConsulta";

interface Medicion {
    fecha: string;
    pesoKg: number;
    tallaCm: number;
    perimetroCm: number;
}

const pacienteEjemplo = {
    id: 2,
    nombre: "Diego Mora",
    iniciales: "DM",
    sexo: "F" as const,
    fechaNacimiento: "25 Dic 2002",
    edad: "23 años",
    contacto: {
        nombre: "Gerardo Enciso",
        parentesco: "Padre",
        telefono: "33 1243 4323",
    },
    mediciones: [
        { fecha: "15 Sep 2027", pesoKg: 11.8, tallaCm: 83.5, perimetroCm: 47.2 },
        { fecha: "15 Jun 2027", pesoKg: 10.5, tallaCm: 79.0, perimetroCm: 46.6 },
        { fecha: "15 Mar 2027", pesoKg: 9.2, tallaCm: 74.5, perimetroCm: 45.8 },
        { fecha: "15 Dic 2027", pesoKg: 8.1, tallaCm: 70.2, perimetroCm: 44.5 },
        { fecha: "15 Sep 2027", pesoKg: 6.8, tallaCm: 65.0, perimetroCm: 43.0 },
    ],
};

function DetallePaciente() {
    const { id } = useParams();
    const [tabActiva, setTabActiva] = useState("Mediciones");
    const [modalAbierto, setModalAbierto] = useState(false);
    const paciente = pacienteEjemplo;

    const tabs = ["Mediciones", "Graficas", "Alimentacion"];

    return (
        <div>
            <Link to="/pacientes" className="text-blue-600 text-sm hover:underline mb-4 inline-block">&larr; Volver a Pacientes</Link>

            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold ${ paciente.sexo === "F" ? "bg-pink-100 text-pink-600" : "bg-blue-100 text-blue-600" }`}>{paciente.iniciales}</div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{paciente.nombre}</h1>
                    </div>

                    <div className="ml-auto flex gap-8">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-medium">F. Nacimiento</p>
                            
                            <p className="text-sm text-gray-800 mt-1">{paciente.fechaNacimiento}</p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 uppercase font-medium">Edad Actual</p>

                            <p className="text-sm text-blue-600 mt-1">{paciente.edad}</p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 uppercase font-medium">Contacto Familiar</p>

                            <p className="text-sm text-gray-800 mt-1">{paciente.contacto.nombre} ({paciente.contacto.telefono})</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-6 border-b border-gray-200 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setTabActiva(tab)}
                        className={`pb-3 text-sm font-medium ${ tabActiva === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700" }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            { tabActiva === "Mediciones" && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Historial de Crecimiento</h2>

                        <div className="flex gap-3">
                            <button onClick={() => setModalAbierto(true)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">Agendar consulta</button>

                            <Link to={`/pacientes/${id}/nueva-medicion`} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">+ Nueva Medición</Link>
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
                                            <button className="text-blue-500 hover:text-blue-700 text-lg">&rarr;</button>
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
                    <p className="text-gray-500">Las gráficas de crecimiento OMS se implementarán aqui.</p>
                </div>
            )}

            {tabActiva === "Alimentacion" && (
                <div className="bg-white rounded-xl border-gray-200 p-6">
                    <p className="text-gray-500">El plan de alimentacion y checklist se implementarán aquí</p>
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