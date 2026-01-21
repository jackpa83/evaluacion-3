"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const LoanPage: NextPage = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    trayecto: "",
    tipoEquipo: "Video Bean",
  });

  const { writeContractAsync } = useScaffoldWriteContract({
    contractName: "SistemaPrestamos",
  });

  // Validación numérica para Cédula (Máximo 8)
  const handleCedulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 8) setForm({ ...form, cedula: value });
  };

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) setForm({ ...form, telefono: value });
  };

  const isFormIncomplete =
    !form.nombre || !form.apellido || form.cedula.length < 7 || form.telefono.length < 10 || !form.trayecto;

  const handleSolicitar = async () => {
    try {
      await writeContractAsync({
        functionName: "solicitarPrestamo",
        args: [form.nombre, form.apellido, form.cedula, form.telefono, form.trayecto, form.tipoEquipo],
      });
    } catch (e: any) {
      console.log(e);
      // toast.error("Error: " + (e.shortMessage || "Verifique sus datos."));
    }
  };

  return (
    <div className="flex justify-center p-8">
      <div className="card max-w-xl w-full bg-base-100 shadow-xl border border-gray-200">
        <div className="card-body p-8">
          <h2 className="card-title text-2xl font-bold mb-1">Solicitud de Equipo</h2>
          <p className="text-sm mb-8 opacity-60">Complete los campos numéricos y personales.</p>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-medium">Nombre</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej. Juan"
                  className="input input-bordered w-full"
                  value={form.nombre}
                  onChange={e => setForm({ ...form, nombre: e.target.value })}
                />
              </div>
              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-medium">Apellido</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej. Pérez"
                  className="input input-bordered w-full"
                  value={form.apellido}
                  onChange={e => setForm({ ...form, apellido: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-medium">Cédula</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="294123456"
                  className="input input-bordered w-full"
                  value={form.cedula}
                  onChange={handleCedulaChange}
                />
              </div>
              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-medium">Teléfono</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Ej. 04121234567"
                  className="input input-bordered w-full"
                  value={form.telefono}
                  onChange={handleTelefonoChange}
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-medium">Trayecto</span>
              </label>
              <input
                type="text"
                placeholder="Ej. Trayecto II"
                className="input input-bordered w-full"
                value={form.trayecto}
                onChange={e => setForm({ ...form, trayecto: e.target.value })}
              />
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-medium">Tipo de Equipo</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={form.tipoEquipo}
                onChange={e => setForm({ ...form, tipoEquipo: e.target.value })}
              >
                <option>Video Bean</option>
                <option>Laboratorio</option>
              </select>
            </div>

            <div className="card-actions mt-6">
              <button
                className="btn btn-primary w-full shadow-md"
                onClick={handleSolicitar}
                disabled={isFormIncomplete}
              >
                Hacer préstamo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanPage;
