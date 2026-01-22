// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SistemaPrestamos {
    struct Equipo {
        string nombre;
        uint256 cantidadTotal;
        uint256 cantidadPrestada;
        bool existe;
    }

    struct Prestamo {
        uint256 id;
        address solicitante;
        string nombre;
        string apellido;
        string cedula;
        string telefono;
        string trayecto;
        string tipoEquipo;
        uint256 fechaAgendada;
        bool activo;
    }

    mapping(string => Equipo) public inventario;
    string[] public nombresEquipos;

    mapping(uint256 => Prestamo) public todosLosPrestamos;
    mapping(address => uint256) public prestamoActualPorUsuario;
    uint256[] private IDs;
    uint256 public proximoId;

    constructor() {
        _agregarEquipo("Video Beam", 2);
        _agregarEquipo("Laboratorio de Programacion", 1);
        _agregarEquipo("Laboratorio de Diseno", 1);
        _agregarEquipo("Laboratorio de Diseno II", 1);
        _agregarEquipo("Apoyo Docente", 1);
    }

    function _agregarEquipo(string memory _nombre, uint256 _cantidad) internal {
        inventario[_nombre] = Equipo(_nombre, _cantidad, 0, true);
        nombresEquipos.push(_nombre);
    }

    function solicitarPrestamo(
        string memory _nombre,
        string memory _apellido,
        string memory _cedula,
        string memory _telefono,
        string memory _trayecto,
        string memory _tipoEquipo,
        uint256 _fechaAgendada
    ) public {
        require(inventario[_tipoEquipo].existe, "El equipo no existe en inventario.");

        // Validar si hay disponibilidad
        // Para simplificar el MVP y no complicar con fechas futuras,
        // validamos disponibilidad inmediata o actual:
        require(
            inventario[_tipoEquipo].cantidadPrestada < inventario[_tipoEquipo].cantidadTotal,
            "No hay disponibilidad para este equipo."
        );

        uint256 idActual = prestamoActualPorUsuario[msg.sender];
        if (idActual != 0) {
            require(!todosLosPrestamos[idActual].activo, "Ya tienes un prestamo activo.");
        }

        proximoId++;
        todosLosPrestamos[proximoId] = Prestamo({
            id: proximoId,
            solicitante: msg.sender,
            nombre: _nombre,
            apellido: _apellido,
            cedula: _cedula,
            telefono: _telefono,
            trayecto: _trayecto,
            tipoEquipo: _tipoEquipo,
            fechaAgendada: _fechaAgendada,
            activo: true
        });

        // Actualizamos inventario
        inventario[_tipoEquipo].cantidadPrestada++;

        IDs.push(proximoId);
        prestamoActualPorUsuario[msg.sender] = proximoId;
    }

    function devolverEquipo(uint256 _id) public {
        Prestamo storage p = todosLosPrestamos[_id];
        require(p.activo, "Ya devuelto.");
        require(p.solicitante == msg.sender, "No eres el dueno.");

        p.activo = false;
        // Liberamos el equipo en el inventario
        inventario[p.tipoEquipo].cantidadPrestada--;
    }

    // Funcion para que el Select del frontend sea dinamico
    function obtenerInventarioCompleto() public view returns (Equipo[] memory) {
        Equipo[] memory lista = new Equipo[](nombresEquipos.length);
        for (uint i = 0; i < nombresEquipos.length; i++) {
            lista[i] = inventario[nombresEquipos[i]];
        }
        return lista;
    }

    function obtenerTodosLosPrestamos() public view returns (Prestamo[] memory) {
        Prestamo[] memory lista = new Prestamo[](IDs.length);
        for (uint256 i = 0; i < IDs.length; i++) {
            lista[i] = todosLosPrestamos[IDs[i]];
        }
        return lista;
    }
}
