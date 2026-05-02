import { Outlet, Link, useLocation } from "react-router-dom";

function MainLayout() {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path
            ? "bg-teal-50 text-teal-600 border-1-4 border-teal-600"
            : "text-gray-600 hover:bg-gray-50 border-1-4 border-transparent";
    };

    return (
        <div className="flex h-screen">
            <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
                <div className="bg-teal-600 p-5 flex items-center gap-3 mb-4 rounded-b-2xl">

                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">🌿</div>

                    <h1 className="text-xl font-bold text-white">Aú<span className="text-amber-500">pa</span></h1>
                </div>

                <nav className="flex-1 px-2">
                    <Link
                        to="/dashboard"
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-r-lg mb-1 ${isActive("/dashboard")}`}
                    >Dashboard</Link>

                    <Link
                        to="/pacientes"
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-r-lg mb-1 ${isActive("/pacientes")}`}
                    >Pacientes</Link>
                </nav>

                <div className="border-t border-gray-200 p-4">
                    <Link
                        to="/configuracion"
                        className="flex items-center gap-3 px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg mb-2"
                    >Configuración</Link>

                    <div className="flex items-center gap-3 px-2 py-2">
                        <div className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-[11px] font-bold">AG</div>

                        <div>
                            <p className="text-sm font-medium text-gray-800">Dr. Gonzalez</p>
                            <p className="text-xs text-gray-500">Nutricionista Pediatra</p>
                        </div>
                    </div>

                    <button className="flex items-center gap-2 px-2 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg w-full mt-1">Cerrar Sesión</button>
                </div>
            </aside>

            <main className="flex-1 bg-gray-50 overflow-y-auto">
                <div className="p-6">

                    {!location.pathname.startsWith("/pacientes/") && (
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Buscar paciente..."
                                className="w-full max-w-md px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-400"
                            />
                        </div>
                    )}



                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default MainLayout;