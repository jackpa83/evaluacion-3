// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SistemaPrestamos {
    struct Prestamo {
        string nombre;
        string apellido;
        string cedula;
        string telefono;
        string trayecto;
        string tipoEquipo; // Ej: "Video Bean" o "Laboratorio"
        uint256 fechaPrestamo;
        bool activo;
    }

    // Mapeo para guardar el préstamo actual por cada dirección de billetera
    mapping(address => Prestamo) public prestamosActivos;

    // Evento para generar el "Reporte" en el frontend
    event NuevoPrestamo(address indexed usuario, string nombre, string equipo, uint256 fecha);

    // FUNCIÓN PRINCIPAL CON VALIDACIÓN
    function solicitarPrestamo(
        string memory _nombre,
        string memory _apellido,
        string memory _cedula,
        string memory _telefono,
        string memory _trayecto,
        string memory _tipoEquipo
    ) public {
        // VALIDACIÓN: Si el usuario ya tiene un equipo, no puede pedir otro
        require(!prestamosActivos[msg.sender].activo, "Ya tienes un equipo en prestamo.");

        // Registro de los datos básicos solicitados
        prestamosActivos[msg.sender] = Prestamo({
            nombre: _nombre,
            apellido: _apellido,
            cedula: _cedula,
            telefono: _telefono,
            trayecto: _trayecto,
            tipoEquipo: _tipoEquipo,
            fechaPrestamo: block.timestamp,
            activo: true
        });

        // Emitir evento para el reporte
        emit NuevoPrestamo(msg.sender, _nombre, _tipoEquipo, block.timestamp);
    }

    function devolverEquipo() public {
        require(prestamosActivos[msg.sender].activo, "No tienes equipos pendientes.");
        prestamosActivos[msg.sender].activo = false;
    }
}
