import { useState } from "react";
import { Link } from "react-router-dom";

interface Consulta {
    hora: string;
    nombre: string;
    iniciales: string;
    edad: string;
    estado: "Completada" | "En curso" | "Pendiente";
}

const consultasHoy: Consulta[] = [
    { hora: "08:00", nombre: "Christian Diaz", iniciales: "CD", edad: "6 meses", estado: "Completada"},
    { hora: "09:00", nombre: "Diego Mora", iniciales: "DM", edad: "2 años", estado: "Completada"},
    { hora: "10:30", nombre: "Miguel Velazquez", iniciales: "MV", edad: "4 años", estado: "En curso"},
    { hora: "12:00", nombre: "Joel Cortés", iniciales: "JC", edad: "8 meses", estado: "Pendiente"},
    { hora: "14:30", nombre: "Jahir Velazquez", iniciales: "JV", edad: "5 años", estado: "Pendiente"},
    { hora: "16:00", nombre: "Pablo Gonzalez", iniciales: "PG", edad: "18 meses", estado: "Pendiente"},
];

function Dashboard() {

    const [fecha, setFecha] = useState("Jueves, 24 Octubre");

    const estiloEstado = (estado: string) => {
        switch (estado) {
            case "Completada":
                return "bg-gray-100 text-gray-700";
            
            case "En curso":
                return "bg-teal-100 text-teal-700";

            case "Pendiente":
                return "bg-orange-100 text-orange-700";
            
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div>
            <div className="bg-teal-50 rounded-xl p-6 mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Buenos días, Dr. Alberto Gonzalez</h1>

                    <p className="text-gray-500 mt-1">Tú agenda del día</p>
                </div>

                <div className="flex items-center gap-3 bg-white rounded-lg px-4
                py-2 border border-gray-200">
                    <button className="text-gray-400 hover:text-gray-600">&lt;</button>
                    <span className="text-sm font-medium text-teal-600">{fecha}</span>
                    <button className="text-gray-400 hover:text-gray-600">&gt;</button>
                </div>

            </div>

            <div className="bg-white rounded-xl border border-gray-200">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Hora</th>

                            <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Paciente</th>

                            <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Edad</th>

                            <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Estado</th>

                            <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Acción</th> 
                        </tr>
                    </thead>

                    <tbody>
                        {consultasHoy.map((c, i) => (
                            <tr key={i} className={`border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${c.estado === "En curso" ? "bg-teal-50/50" : ""}`}>

                                <td className={`px-6 py-4 text-sm ${ c.estado === "En curso" ? "text-teal-600 font-medium" : "text-gray-600" }`}>{c.hora}</td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-[11px] font-bold">{c.iniciales}</div>

                                        <span className={`text-sm ${ c.estado === "En curso" ? "font-medium text-gray-900" : "text-gray-700" }`}>{c.nombre}</span>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-600">{c.edad}</td>

                                <td className="px-6 py-4">
                                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${ estiloEstado(c.estado) }`}>{c.estado}</span>
                                </td>

                                <td className="px-6 py-4">
                                    <Link to={`/pacientes/${i + 1}`} className="text-teal-500 hover:text-teal-700 text-lg">&rarr;</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>    
        </div>
    );
}

export default Dashboard;