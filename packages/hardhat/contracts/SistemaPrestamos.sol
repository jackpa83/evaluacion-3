// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SistemaPrestamos {
    struct Prestamo {
        uint256 id;
        string nombre;
        string apellido;
        string cedula;
        string telefono;
        string trayecto;
        string tipoEquipo;
        uint256 fechaPrestamo;
        bool activo;
    }

    uint256 public proximoId;
    mapping(uint256 => Prestamo) public todosLosPrestamos;
    mapping(address => uint256) public prestamoActualPorUsuario;

    // Guardamos los IDs para poder iterar sobre ellos
    uint256[] private IDs;

    function solicitarPrestamo(
        string memory _nombre,
        string memory _apellido,
        string memory _cedula,
        string memory _telefono,
        string memory _trayecto,
        string memory _tipoEquipo
    ) public {
        uint256 idActual = prestamoActualPorUsuario[msg.sender];
        require(!todosLosPrestamos[idActual].activo, "Ya tienes un equipo en prestamo.");

        proximoId++;
        Prestamo memory nuevo = Prestamo({
            id: proximoId,
            nombre: _nombre,
            apellido: _apellido,
            cedula: _cedula,
            telefono: _telefono,
            trayecto: _trayecto,
            tipoEquipo: _tipoEquipo,
            fechaPrestamo: block.timestamp,
            activo: true
        });

        todosLosPrestamos[proximoId] = nuevo;
        IDs.push(proximoId);
        prestamoActualPorUsuario[msg.sender] = proximoId;
    }

    // LA FUNCIÓN CLAVE: Devuelve todo el array de una vez
    function obtenerTodosLosPrestamos() public view returns (Prestamo[] memory) {
        Prestamo[] memory lista = new Prestamo[](IDs.length);
        for (uint256 i = 0; i < IDs.length; i++) {
            lista[i] = todosLosPrestamos[IDs[i]];
        }
        return lista;
    }

    function devolverEquipo(uint256 _id) public {
        // Validar que el préstamo existe y está activo
        require(todosLosPrestamos[_id].id != 0, "El prestamo no existe.");
        require(todosLosPrestamos[_id].activo, "El equipo ya fue devuelto.");

        // Solo el dueño del contrato o la persona que pidió el equipo debería poder devolverlo
        // (Opcional: para el MVP dejémoslo abierto o solo para el sender)
        todosLosPrestamos[_id].activo = false;
    }
}
