"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const ListadoPage: NextPage = () => {
  const [selectedPrestamo, setSelectedPrestamo] = useState<any>(null);

  const { data: prestamos, isLoading } = useScaffoldReadContract({
    contractName: "SistemaPrestamos",
    functionName: "obtenerTodosLosPrestamos",
  });

  const { writeContractAsync: devolverEquipo } = useScaffoldWriteContract({
    contractName: "SistemaPrestamos",
  });

  const handleDevolver = async (id: bigint) => {
    try {
      await devolverEquipo({
        functionName: "devolverEquipo",
        args: [id],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="max-w-5xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-primary">Historial de Préstamos</h2>

        <div className="card bg-base-100 shadow-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-center">
              <thead className="bg-primary text-white text-lg">
                <tr>
                  <th>Cédula</th>
                  <th>Estudiante</th>
                  <th>Equipo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-20">
                      <span className="loading loading-spinner loading-lg text-primary"></span>
                    </td>
                  </tr>
                ) : !prestamos || prestamos.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center">
                      <div className="flex flex-col items-center opacity-40">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16 mb-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        <p className="text-xl font-semibold">No hay préstamos registrados</p>
                        <p>Los nuevos préstamos aparecerán aquí automáticamente.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  prestamos.map((p: any) => (
                    <tr key={p.id.toString()} className="hover">
                      <td className="font-bold">V-{p.cedula}</td>
                      <td>
                        {p.nombre} {p.apellido}
                      </td>
                      <td>
                        <div className="badge badge-outline">{p.tipoEquipo}</div>
                      </td>
                      <td>
                        {p.activo ? (
                          <span className="badge badge-success text-white px-3">Activo</span>
                        ) : (
                          <span className="badge badge-ghost opacity-50">Entregado</span>
                        )}
                      </td>
                      <td className="flex justify-center gap-2">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => {
                            setSelectedPrestamo(p);
                            (document.getElementById("modal_detalle") as HTMLDialogElement).showModal();
                          }}
                        >
                          Ver Reporte
                        </button>
                        {p.activo && (
                          <button className="btn btn-sm btn-secondary" onClick={() => handleDevolver(p.id)}>
                            Devolver
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL DETALLE COMPACTO */}
      <dialog id="modal_detalle" className="modal">
        <div className="modal-box max-w-sm border-t-8 border-primary p-6">
          <h3 className="font-bold text-xl mb-4 border-b pb-2">Resumen de Operación</h3>

          {selectedPrestamo && (
            <div className="text-sm space-y-1">
              <div className="flex justify-between py-1 border-b border-base-200">
                <span className="font-semibold opacity-70">Cédula:</span>
                <span>V-{selectedPrestamo.cedula}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-base-200">
                <span className="font-semibold opacity-70">Estudiante:</span>
                <span>
                  {selectedPrestamo.nombre} {selectedPrestamo.apellido}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-base-200">
                <span className="font-semibold opacity-70">Teléfono:</span>
                <span>{selectedPrestamo.telefono}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-base-200">
                <span className="font-semibold opacity-70">Trayecto:</span>
                <span>{selectedPrestamo.trayecto}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-base-200">
                <span className="font-semibold opacity-70">Equipo:</span>
                <span className="badge badge-sm badge-outline">{selectedPrestamo.tipoEquipo}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-base-200">
                <span className="font-semibold opacity-70">Fecha:</span>
                <span className="text-[11px]">
                  {new Date(Number(selectedPrestamo.fechaPrestamo) * 1000).toLocaleString("es-VE")}
                </span>
              </div>

              <div className="mt-6 flex justify-center">
                <div
                  className={`badge badge-md font-bold w-full py-4 ${selectedPrestamo.activo ? "badge-success" : "badge-ghost"}`}
                >
                  {selectedPrestamo.activo ? "ESTADO: ACTIVO" : "ESTADO: DEVUELTO"}
                </div>
              </div>
            </div>
          )}

          <div className="modal-action mt-6">
            <form method="dialog">
              <button className="btn btn-block btn-outline">Cerrar Reporte</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ListadoPage;
