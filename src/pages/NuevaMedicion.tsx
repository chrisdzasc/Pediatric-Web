import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function NuevaMedicion() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [fechaConsulta, setFechaConsulta] = useState("");
    const [peso, setPeso] = useState("");
    const [talla, setTalla] = useState("");
    const [perimetroBraquial, setPerimetroBraquial] = useState("");
    const [perimetroCefalico, setPerimetroCefalico] = useState("");
    const [cintura, setCintura] = useState("");
    const [abdomen, setAbdomen] = useState("");
    const [cadera, setCadera] = useState("");
    const [pantorrilla, setPantorrilla] = useState("");

    const handleGuardar = () => {
        alert("Medición guardada! :) (simulación)");
        navigate(`/pacientes/${id}`);
    };

    return (
        <div>
            <Link to={`/pacientes/{id}`} className="text-blue-600 text-sm hover:underline mb-4 inline-block">&larr; Volver al perfil del paciente</Link>

            <h1 className="text-2xl font-bold text-gray-900 mb-1">Nueva Medición</h1>
            <p className="text-gray-500 text-sm mb-6">Registra las mediciones de la consulta actual</p>

            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-lg">📅</span>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Datos de la consulta</h2>

                        <p className="text-sm text-gray-500">Información de la visita</p>
                    </div>
                </div>

                <div className="max-w-xs mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de consulta <span className="text-red-500">*</span></label>
                    
                    <input 
                        type="date"
                        value={fechaConsulta}
                        onChange={(e) => setFechaConsulta(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                    />
                </div>

                <div className="border-t border-gray-200 my-6"></div>

                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-lg">📏</span>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Mediciones</h2>

                        <p className="text-sm text-gray-500">Registro antropométrico del paciente</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg) <span className="text-red-500">*</span></label>

                        <input 
                            type="number"
                            step="0.01"
                            value={peso}
                            onChange={(e) => setPeso(e.target.value)}
                            placeholder="0.00"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Longitud / Estatura (cm) <span className="text-red-500">*</span></label>

                        <input 
                            type="number"
                            step="0.1"
                            value={talla}
                            onChange={(e) => setTalla(e.target.value)}
                            placeholder="0.0"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Perimetro Braquial (cm) <span className="text-red-500">*</span></label>

                        <input 
                            type="number"
                            step="0.1"
                            value={perimetroBraquial}
                            onChange={(e) => setPerimetroBraquial(e.target.value)}
                            placeholder="0.0"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cintura (cm)</label>

                        <input 
                            type="number"
                            step="0.1"
                            value={cintura}
                            onChange={(e) => setCintura(e.target.value)}
                            placeholder="0.0"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cadera (cm)</label>

                        <input 
                            type="number"
                            step="0.1"
                            value={cadera}
                            onChange={(e) => setCadera(e.target.value)}
                            placeholder="0.0"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Abdomen (cm)</label>

                        <input 
                            type="number"
                            step="0.1"
                            value={abdomen}
                            onChange={(e) => setAbdomen(e.target.value)}
                            placeholder="0.0"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pantorrilla (cm)</label>

                        <input 
                            type="number"
                            step="0.1"
                            value={pantorrilla}
                            onChange={(e) => setPantorrilla(e.target.value)}
                            placeholder="0.0"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Perimetro Céfalico (cm)</label>

                        <input 
                            type="number"
                            step="0.1"
                            value={perimetroCefalico}
                            onChange={(e) => setPerimetroCefalico(e.target.value)}
                            placeholder="0.0"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 mb-8">
                <Link to={`/pacientes/${id}`} className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Cancelar</Link>

                <button onClick={handleGuardar} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Guardar Medición</button>
            </div>
        </div>
    );
}

export default NuevaMedicion;