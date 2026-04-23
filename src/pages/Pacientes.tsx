import { useState } from "react";
import { Link } from "react-router-dom";

interface Paciente {
    id: number;
    nombre: string;
    iniciales: string;
    edad: string;
    sexo: "M" | "F";
    ultimaConsulta: string;
}

const pacientesData: Paciente[] = [
    { id: 1, nombre: "Christian Diaz", iniciales: "CD", edad: "6 meses", sexo: "M", ultimaConsulta: "22 Abr 2026" },
    { id: 2, nombre: "Diego Mora", iniciales: "DM", edad: "2 años", sexo: "F", ultimaConsulta: "21 Abr 2026" },
    { id: 3, nombre: "Miguel Velazquez", iniciales: "MV", edad: "4 años", sexo: "M", ultimaConsulta: "20 Abr 2026" },
    { id: 4, nombre: "Joel Cortés", iniciales: "JC", edad: "8 meses", sexo: "F", ultimaConsulta: "19 Abr 2026" },
    { id: 5, nombre: "Jahir Velazquez", iniciales: "JV", edad: "5 años", sexo: "M", ultimaConsulta: "18 Abr 2026" },
    { id: 6, nombre: "Pablo González", iniciales: "PG", edad: "18 meses", sexo: "F", ultimaConsulta: "17 Abr 2026" },
    { id: 7, nombre: "Oscar Robles", iniciales: "OR", edad: "4 años", sexo: "M", ultimaConsulta: "16 Abr 2026" },
    { id: 8, nombre: "José Diaz", iniciales: "JD", edad: "7 meses", sexo: "F", ultimaConsulta: "15 Abr 2026" },
]

function Pacientes() {

    const [filtro, setFiltro] = useState("Todos");
    const [busqueda, setBusqueda] = useState("");

    const pacientesFiltrados = pacientesData.filter((p) =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div>
            <div className="bg-orange-50 rounded-xl p-6 mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">+ Nuevo Paciente</button>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-2">
                    {["Todos", "Activos", "Inactivos"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFiltro(f)}
                            className={`px-4 py-2 rounded-full text-sm font-medium ${ filtro === f ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50" }`}
                        >{f}</button>
                    ))}
                </div>

                <input 
                    type="text"
                    placeholder="Filtrar por nombre..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="ml-auto px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 w-64"
                 />
            </div>

            <div className="bg-white rounded-xl border border-gray-200">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Paciente</th>

                            <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Edad</th>

                            <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Género</th>

                            <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Última consulta</th>

                            <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Acción</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pacientesFiltrados.map((p) => (
                            <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold ${ p.sexo === "M" ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600" }`}>{p.iniciales}
                                        </div>

                                        <span className="text-sm text-gray-700">{p.nombre}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-600">{p.edad}</td>

                                <td className="px-6 py-4">
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${ p.sexo === "M" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700" }`}>{p.sexo}</span>
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-600">{p.ultimaConsulta}</td>

                                <td className="px-6 py-4">
                                    <Link to={`/paciente/${p.id}`} className="text-blue-500 hover:text-blue-700 text-lg">&rarr;</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Mostrando 1-{pacientesFiltrados.length} de {pacientesData.length} pacientes</span>

                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">&lt;</button>

                        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg">1</button>

                        <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">2</button>

                        <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">3</button>

                        <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pacientes;