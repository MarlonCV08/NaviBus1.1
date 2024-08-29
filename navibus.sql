-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-08-2024 a las 22:44:31
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `navibus`
--
CREATE DATABASE IF NOT EXISTS `navibus` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `navibus`;

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_CategoriaActualizar` (IN `_codigo` INT(1), IN `_nombre` VARCHAR(2))   BEGIN 
UPDATE categoria
SET codigo= _codigo,
nombre= _nombre
WHERE codigo= _codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_CategoriaConsultarCodigo` (IN `_Codigo` INT(1))   BEGIN
SELECT CA.codigo,CA.nombre AS 'Categoria'
FROM categoria AS CA
WHERE CA.codigo = _Codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_CategoriaConsultarTodos` ()   BEGIN
SELECT CA.codigo,CA.nombre AS 'Categoria'
FROM categoria AS CA;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_CategoriaEliminar` (IN `_codigo` INT(1))   BEGIN 
DELETE FROM categoria
WHERE codigo= _codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ClaseVehiculoActualizar` (IN `_codigo` INT(2), IN `_nombre` VARCHAR(40))   BEGIN 

UPDATE clasevehiculo
SET codigo= _codigo,
nombre= _nombre
WHERE codigo= _codigo;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ClaseVehiculoConsultarCodigo` (IN `_Codigo` INT(2))   BEGIN
SELECT CV.codigo,CV.nombre AS 'Clase de Vehiculo'
FROM clasevehiculo AS CV
WHERE CV.codigo = _Codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ClaseVehiculoConsultarTodos` ()   BEGIN
SELECT CV.codigo,CV.nombre AS 'Clase de Vehiculo'
FROM clasevehiculo AS CV;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ClaseVehiculoEliminar` (IN `_codigo` INT(2))   BEGIN 
DELETE FROM clasevehiculo
WHERE codigo= _codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ColorActualizar` (IN `_codigo` VARCHAR(12), IN `_nombre` VARCHAR(20))   BEGIN 

UPDATE color
SET codigo= _codigo,
nombre= _nombre
WHERE codigo= _codigo;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ColorConsultarCodigo` (IN `_Codigo` VARCHAR(12))   BEGIN
SELECT CO.codigo,CO.nombre AS 'Color'
FROM color AS CO
WHERE CO.codigo = _Codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ColorConsultarTodos` ()   BEGIN
SELECT CO.codigo,CO.nombre AS 'Color'
FROM color AS CO;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ColorEliminar` (IN `_codigo` VARCHAR(12))   BEGIN 
DELETE FROM color
WHERE codigo= _codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ConductorActualizar` (IN `_codigo` INT(3), IN `_licencia` VARCHAR(13))   BEGIN 

UPDATE conductor
SET codigo= _codigo,
licencia= _licencia
WHERE codigo= _codigo;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ConductorConsultarCodigo` (IN `_codigo` INT(3))   BEGIN
SELECT CO.codigo,LI.nombre
FROM conductor AS CO INNER JOIN licencia AS LI
ON CO.licencia = LI.codigo
WHERE CO.codigo = _Codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ConductorConsultarTodos` ()   BEGIN
SELECT CO.codigo,LI.nombre
FROM conductor AS CO INNER JOIN licencia AS LI
ON CO.licencia = LI.codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ConductorEliminar` (IN `_codigo` INT(3))   BEGIN 
DELETE FROM conductor
WHERE codigo= _codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_DestinoActualizar` (IN `_codigo` INT(2), IN `_nombre` VARCHAR(20))   BEGIN 

UPDATE destino
SET codigo= _codigo,
nombre= _nombre
WHERE codigo= _codigo;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_DestinoConsultarCodigo` (IN `_Codigo` INT(2))   BEGIN
SELECT DE.codigo,DE.nombre AS 'Destino'
FROM destino AS DE
WHERE DE.codigo = _Codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_DestinoConsultarTodos` ()   BEGIN
SELECT DE.codigo,DE.nombre AS 'Destino'
FROM destino AS DE;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_DestinoEliminar` (IN `_codigo` INT(2))   BEGIN 
DELETE FROM destino
WHERE codigo= _codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_LicenciaActualizar` (IN `_codigo` VARCHAR(13), IN `_nombre` VARCHAR(200), IN `_fechaNac` DATE, IN `_fechaExp` DATE, IN `_RH` INT(1), IN `_restricciones` VARCHAR(200), IN `_categoria` INT(1), IN `_docid` VARCHAR(10))   BEGIN 

UPDATE licencia
SET codigo= _codigo,
nombre= _nombre,
fechaNac= _fechaNac,
fechaExp= _fechaExp,
RH= _RH,
restricciones= _restricciones,
categoria= _categoria,
docid= _docid
WHERE codigo= _codigo;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_LicenciaConsultarCodigo` (IN `_Codigo` VARCHAR(13))   BEGIN
SELECT LI.codigo,LI.docid,LI.fechaNac,LI.fechaExp,rh.nombre AS 'RH',LI.restricciones,CA.nombre AS 'Categoria'
FROM licencia AS LI INNER JOIN rh
ON LI.RH = rh.codigo
INNER JOIN categoria AS CA
ON LI.categoria = CA.codigo
WHERE LI.codigo = _Codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_LicenciaConsultarTodos` ()   BEGIN
SELECT LI.codigo,LI.docid,LI.fechaNac,LI.fechaExp,rh.nombre AS 'RH',LI.restricciones,CA.nombre AS 'Categoria'
FROM licencia AS LI INNER JOIN rh
ON LI.RH = rh.codigo
INNER JOIN categoria AS CA
ON LI.categoria = CA.codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_LicenciaEliminar` (IN `_codigo` VARCHAR(13))   BEGIN 
DELETE FROM licencia
WHERE codigo= _codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_LineaActualizar` (IN `_codigo` INT(3), IN `_marca` INT(5), IN `_claseVehiculo` INT(2))   BEGIN 

UPDATE linea
SET codigo= _codigo,
marca= _marca,
clasevehiculo= _claseVehiculo
WHERE codigo= _codigo;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_LineaConsultarCodigo` (IN `_Codigo` INT(3))   BEGIN
SELECT LIN.codigo,MA.nombre AS 'Marca',CV.nombre AS 'Clase Vehiculo'
FROM linea AS LIN INNER JOIN marca AS MA
ON LIN.marca = MA.codigo
INNER JOIN clasevehiculo AS CV
ON LIN.clasevehiculo = CV.codigo
WHERE LIN.codigo = _codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_LineaConsultarTodos` ()   BEGIN
SELECT LIN.codigo,MA.nombre AS 'Marca',CV.nombre AS 'Clase Vehiculo'
FROM linea AS LIN INNER JOIN marca AS MA
ON LIN.marca = MA.codigo
INNER JOIN clasevehiculo AS CV
ON LIN.clasevehiculo = CV.codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_LineaEliminar` (IN `_codigo` INT(3))   BEGIN 
DELETE FROM linea
WHERE codigo= _codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_LoginActualizar` (IN `_usuario` VARCHAR(30), IN `_clave` VARCHAR(90))   BEGIN 

UPDATE login
SET usuario= _usuario,
clave= _clave
WHERE usuario= _usuario;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_LoginConsultarTodos` ()   BEGIN 
SELECT *
FROM login;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_LoginConsultarUsuario` (IN `_Usuario` VARCHAR(10))   BEGIN
SELECT *
FROM login
WHERE login.usuario = _Usuario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_LoginEliminar` (IN `_usuario` VARCHAR(30))   BEGIN 
DELETE FROM login
WHERE usuario= _usuario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_MarcaActualizar` (IN `_codigo` INT(5), IN `_nombre` VARCHAR(40))   BEGIN 

UPDATE marca
SET codigo= _codigo,
nombre= _nombre
WHERE codigo= _codigo;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_MarcaConsultarCodigo` (IN `_Codigo` INT(5))   BEGIN
SELECT MA.codigo,MA.nombre AS 'Marca' 
FROM marca AS MA
WHERE MA.codigo = _Codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_MarcaConsultarTodos` ()   BEGIN
SELECT MA.codigo,MA.nombre AS 'Marca' 
FROM marca AS MA;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_MarcaEliminar` (IN `_codigo` INT(5))   BEGIN 
DELETE FROM marca
WHERE codigo= _codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_OrigenActualizar` (IN `_codigo` INT(2), IN `_nombre` VARCHAR(20))   BEGIN 

UPDATE origen
SET codigo= _codigo,
nombre= _nombre
WHERE codigo= _codigo;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_OrigenConsultarCodigo` (IN `_Codigo` INT(2))   BEGIN
SELECT ORI.codigo,ORI.nombre AS 'Origen'
FROM origen AS ORI
WHERE ORI.codigo = _Codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_OrigenConsultarTodos` ()   BEGIN
SELECT ORI.codigo,ORI.nombre AS 'Origen'
FROM origen AS ORI;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_OrigenEliminar` (IN `_codigo` INT(2))   BEGIN 
DELETE FROM origen
WHERE codigo= _codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_RHActualizar` (IN `_codigo` INT(1), IN `_nombre` VARCHAR(3))   BEGIN 

UPDATE rh
SET codigo= _codigo,
nombre= _nombre
WHERE codigo= _codigo;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_RHConsultarCodigo` (IN `_Codigo` INT(1))   BEGIN
SELECT rh.codigo,rh.nombre AS 'RH'
FROM rh
WHERE rh.codigo = _Codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_RHConsultarTodos` ()   BEGIN
SELECT rh.codigo,rh.nombre AS 'RH'
FROM rh;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_RHEliminar` (IN `_codigo` INT(1))   BEGIN 
DELETE FROM rh
WHERE codigo= _codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_RutaActualizar` (IN `_codigo` VARCHAR(3), IN `_horaSalida` DATETIME, IN `_horaLlegada` DATETIME, IN `_origen` INT(2), IN `_destino` INT(2))   BEGIN 

UPDATE ruta
SET codigo= _codigo,
horaSalida= _horaSalida,
horaLlegada= _horaLlegada,
origen= _origen,
destino= _destino
WHERE codigo= _codigo;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_RutaConsultarCodigo` (IN `_Codigo` VARCHAR(3))   BEGIN
SELECT RU.codigo,RU.horaSalida,RU.horaLlegada,ORI.nombre AS 'Origen',DE.nombre AS 'Destino'
FROM ruta AS RU INNER JOIN origen AS ORI
ON RU.origen = ORI.codigo
INNER JOIN destino AS DE
ON RU.destino = DE.codigo
WHERE RU.codigo = _Codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_RutaConsultarTodos` ()   BEGIN
SELECT RU.codigo,RU.horaSalida,RU.horaLlegada,ORI.nombre AS 'Origen',DE.nombre AS 'Destino'
FROM ruta AS RU INNER JOIN origen AS ORI
ON RU.origen = ORI.codigo
INNER JOIN destino AS DE
ON RU.destino = DE.codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_RutaEliminar` (IN `_codigo` VARCHAR(3))   BEGIN 
DELETE FROM ruta
WHERE codigo= _codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_UsuarioActualizar` (IN `_docid` VARCHAR(10), IN `_nombre` VARCHAR(90), IN `_apellido` VARCHAR(100), IN `_correo` VARCHAR(80), IN `_clave` VARCHAR(90))   BEGIN 

UPDATE usuario
SET docid= _docid,
nombre= _nombre,
apellido= _apellido,
correo= _correo,
clave= _clave
WHERE docid= _docid;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_UsuarioConsultarDocid` (IN `_Docid` VARCHAR(10))   BEGIN
SELECT *
FROM usuario
WHERE usuario.docid = _Docid;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_UsuarioEliminar` (IN `_docid` VARCHAR(10))   BEGIN 
DELETE FROM usuario
WHERE docid= _docid;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_VehiculoActualizar` (IN `_placa` VARCHAR(6), IN `_linea` INT(3), IN `_modelo` VARCHAR(4), IN `_numChasis` VARCHAR(18), IN `_numMotor` VARCHAR(20), IN `_numPasajeros` INT(2), IN `_cilindrada` VARCHAR(4))   BEGIN 

UPDATE vehiculo
SET placa= _placa,
linea= _linea,
modelo= _modelo,
numChasis= _numChasis,
numMotor= _numMotor,
numPasajeros= _numPasajeros,
cilindrada= _cilindrada
WHERE placa= _placa;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_VehiculoColorActualizar` (IN `_placaVehiculo` VARCHAR(6), IN `_codigoColor` VARCHAR(12))   BEGIN 

UPDATE vehiculocolor
SET placaVehiculo= _placaVehiculo,
codigoColor= _codigoColor
WHERE placaVehiculo= _placaVehiculo;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_VehiculoColorConsultarPlaca` (IN `_Placa` VARCHAR(6))   BEGIN
SELECT placavehiculo AS 'Placa',codigocolor AS 'Color'
FROM vehiculocolor
WHERE vehiculocolor.placaVehiculo = _Placa;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_VehiculoColorConsultarTodos` ()   BEGIN
SELECT placavehiculo AS 'Placa',codigocolor AS 'Color'
FROM vehiculocolor;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_VehiculoColorEliminar` (IN `_placaVehiculo` VARCHAR(6), IN `_codigoColor` VARCHAR(12))   BEGIN 
DELETE FROM vehiculocolor
WHERE placaVehiculo= _placaVehiculo AND 
codigoColor= _codigoColor;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_VehiculoConsultarTodos` ()   BEGIN
SELECT VE.placa,LIN.nombre AS 'Linea',VE.modelo,VE.numChasis,VE.numMotor,VE.numPasajeros,VE.cilindrada
FROM vehiculo AS VE INNER JOIN linea AS LIN
ON VE.linea = LIN.codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_VehiculoConultarCodigo` (IN `_Placa` VARCHAR(6))   BEGIN
SELECT VE.placa,LIN.nombre AS 'Linea',VE.modelo,VE.numChasis,VE.numMotor,VE.numPasajeros,VE.cilindrada
FROM vehiculo AS VE INNER JOIN linea AS LIN
ON VE.linea = LIN.codigo
WHERE VE.placa = _Placa;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_VehiculoEliminar` (IN `_placa` VARCHAR(6))   BEGIN 
DELETE FROM vehiculo
WHERE placa= _placa;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `codigo` int(1) NOT NULL,
  `nombre` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`codigo`, `nombre`) VALUES
(2, 'A1'),
(3, 'A2'),
(4, 'B1'),
(5, 'B2'),
(6, 'B3'),
(7, 'C1'),
(8, 'C2'),
(9, 'C3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clasevehiculo`
--

CREATE TABLE `clasevehiculo` (
  `codigo` int(2) NOT NULL,
  `nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clasevehiculo`
--

INSERT INTO `clasevehiculo` (`codigo`, `nombre`) VALUES
(1, 'Microbus'),
(2, 'Bus'),
(3, 'Buseta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `color`
--

CREATE TABLE `color` (
  `codigo` varchar(12) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `color`
--

INSERT INTO `color` (`codigo`, `nombre`) VALUES
('#0000FF', 'Azul'),
('#008000', 'Verde'),
('#FF0000', 'Rojo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conductor`
--

CREATE TABLE `conductor` (
  `codigo` varchar(10) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `tipoDocumento` int(1) NOT NULL,
  `categoria` int(1) NOT NULL,
  `correo` varchar(90) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `conductor`
--

INSERT INTO `conductor` (`codigo`, `nombres`, `apellidos`, `tipoDocumento`, `categoria`, `correo`) VALUES
('1', 'Hugo', 'Salazar Hernandez', 1, 5, 'hugo@gmail.com'),
('2', 'Sebastian David', 'Agudelo Ospina', 1, 5, 'sebastiand@gmail.com'),
('3', 'Alberto', 'Atehortua Bustamante', 1, 5, 'alberto@gmail.com'),
('4', 'Manuel', 'Gomez Alvarez', 1, 5, 'manuelgomez@gmail.com'),
('5', 'Argemiro', 'Vanegas Lopez', 1, 5, 'agemiro@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `destino`
--

CREATE TABLE `destino` (
  `codigo` int(2) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `destino`
--

INSERT INTO `destino` (`codigo`, `nombre`) VALUES
(1, 'El porvenir'),
(2, 'San antonio'),
(3, 'Fontibon'),
(4, 'UdeA'),
(5, 'Aeropuerto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `linea`
--

CREATE TABLE `linea` (
  `codigo` int(3) NOT NULL,
  `marca` int(5) NOT NULL,
  `claseVehiculo` int(2) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `linea`
--

INSERT INTO `linea` (`codigo`, `marca`, `claseVehiculo`, `nombre`) VALUES
(1, 2, 3, ''),
(2, 1, 1, ''),
(3, 2, 1, ''),
(4, 5, 2, ''),
(5, 4, 2, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `usuario` varchar(30) NOT NULL,
  `clave` varchar(90) NOT NULL,
  `rol` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`usuario`, `clave`, `rol`) VALUES
('10150704', '1234', 3),
('101507044', '1234', 2),
('1015070444', '1234', 1),
('10425780', '1234', 3),
('104257807', '1234', 2),
('1042578075', '1234', 1),
('10436374', '1234', 3),
('104363745', '1234', 2),
('1043637455', '1234', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE `marca` (
  `codigo` int(5) NOT NULL,
  `nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`codigo`, `nombre`) VALUES
(1, 'Chevrolet'),
(2, 'Hino'),
(3, 'Mercedes'),
(4, 'Foton'),
(5, 'Volvo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `origen`
--

CREATE TABLE `origen` (
  `codigo` int(2) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `origen`
--

INSERT INTO `origen` (`codigo`, `nombre`) VALUES
(1, 'El porvenir'),
(2, 'San antonio'),
(3, 'Fontibon'),
(4, 'UdeA'),
(5, 'Aeropuerto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `codigo` int(1) NOT NULL,
  `descripcion` varchar(20) NOT NULL,
  `imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`codigo`, `descripcion`, `imagen`) VALUES
(1, 'Administrador', 'Admin.svg'),
(2, 'Conductor', 'Licencia.svg'),
(3, 'Despachador', 'Despachador.svg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta`
--

CREATE TABLE `ruta` (
  `codigo` varchar(3) NOT NULL,
  `nombre` varchar(35) NOT NULL,
  `horaSalida` datetime NOT NULL,
  `horaLlegada` datetime NOT NULL,
  `origen` int(2) NOT NULL,
  `destino` int(2) NOT NULL,
  `vehiculo` varchar(6) NOT NULL,
  `conductor` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ruta`
--

INSERT INTO `ruta` (`codigo`, `nombre`, `horaSalida`, `horaLlegada`, `origen`, `destino`, `vehiculo`, `conductor`) VALUES
('123', '05', '2023-07-30 06:00:00', '2023-07-30 21:00:00', 1, 2, 'AAA000', '1'),
('124', 'circular', '2023-07-30 06:00:00', '2023-07-30 21:00:00', 3, 4, 'BBB111', '2'),
('125', 'ruta b', '2023-07-30 06:00:00', '2023-07-30 21:00:00', 4, 1, 'CCC222', '3'),
('321', 'ruta a', '2023-07-30 06:00:00', '2023-07-30 21:00:00', 2, 3, 'DDD333', '4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipodocumento`
--

CREATE TABLE `tipodocumento` (
  `codigo` int(1) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipodocumento`
--

INSERT INTO `tipodocumento` (`codigo`, `nombre`) VALUES
(1, 'cedula de ciudadania'),
(2, 'cedula de extranjeria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

CREATE TABLE `vehiculo` (
  `placa` varchar(6) NOT NULL,
  `linea` int(3) NOT NULL,
  `modelo` varchar(4) NOT NULL,
  `numChasis` varchar(18) NOT NULL,
  `numMotor` varchar(20) NOT NULL,
  `numPasajeros` int(2) NOT NULL,
  `cilindrada` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`placa`, `linea`, `modelo`, `numChasis`, `numMotor`, `numPasajeros`, `cilindrada`) VALUES
('AAA000', 1, '2015', '123456789123456789', '12345678912345678900', 20, '3000'),
('BBB111', 2, '2017', '123456780123456780', '12345678912345678911', 25, '3500'),
('CCC222', 3, '2010', '123456709123456709', '12345678912345678922', 25, '3500'),
('DDD333', 4, '2012', '123456089123456089', '12345678912345678933', 30, '4000'),
('EEE444', 5, '2020', '123450789123450789', '12345678912345678944', 30, '4000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculocolor`
--

CREATE TABLE `vehiculocolor` (
  `placaVehiculo` varchar(6) NOT NULL,
  `codigoColor` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vehiculocolor`
--

INSERT INTO `vehiculocolor` (`placaVehiculo`, `codigoColor`) VALUES
('AAA000', '#FF0000'),
('BBB111', '#0000FF'),
('CCC222', '#008000'),
('DDD333', '#008000'),
('EEE444', '#0000FF');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `clasevehiculo`
--
ALTER TABLE `clasevehiculo`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `conductor`
--
ALTER TABLE `conductor`
  ADD PRIMARY KEY (`codigo`) USING BTREE,
  ADD KEY `FK_categoria_conductor` (`categoria`),
  ADD KEY `FK_tipodocumento_conductor` (`tipoDocumento`);

--
-- Indices de la tabla `destino`
--
ALTER TABLE `destino`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `linea`
--
ALTER TABLE `linea`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `FK_linea_marca` (`marca`),
  ADD KEY `FK_linea_clasevehiculo` (`claseVehiculo`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`usuario`),
  ADD KEY `FK_login_rol` (`rol`);

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `origen`
--
ALTER TABLE `origen`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `ruta`
--
ALTER TABLE `ruta`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `FK_ruta_origen` (`origen`),
  ADD KEY `FK_ruta_destino` (`destino`),
  ADD KEY `FK_ruta_conductor` (`conductor`),
  ADD KEY `FK_RUTA_VEHICULO` (`vehiculo`);

--
-- Indices de la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`placa`),
  ADD KEY `FK_vehiculo_linea` (`linea`);

--
-- Indices de la tabla `vehiculocolor`
--
ALTER TABLE `vehiculocolor`
  ADD PRIMARY KEY (`placaVehiculo`,`codigoColor`),
  ADD KEY `FK_vehiculocolor_color` (`codigoColor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `codigo` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `clasevehiculo`
--
ALTER TABLE `clasevehiculo`
  MODIFY `codigo` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `destino`
--
ALTER TABLE `destino`
  MODIFY `codigo` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `linea`
--
ALTER TABLE `linea`
  MODIFY `codigo` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `marca`
--
ALTER TABLE `marca`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `origen`
--
ALTER TABLE `origen`
  MODIFY `codigo` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `codigo` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  MODIFY `codigo` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `conductor`
--
ALTER TABLE `conductor`
  ADD CONSTRAINT `FK_categoria_conductor` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`codigo`),
  ADD CONSTRAINT `FK_tipodocumento_conductor` FOREIGN KEY (`tipoDocumento`) REFERENCES `tipodocumento` (`codigo`);

--
-- Filtros para la tabla `linea`
--
ALTER TABLE `linea`
  ADD CONSTRAINT `FK_linea_clasevehiculo` FOREIGN KEY (`claseVehiculo`) REFERENCES `clasevehiculo` (`codigo`),
  ADD CONSTRAINT `FK_linea_marca` FOREIGN KEY (`marca`) REFERENCES `marca` (`codigo`);

--
-- Filtros para la tabla `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `FK_login_rol` FOREIGN KEY (`rol`) REFERENCES `rol` (`codigo`);

--
-- Filtros para la tabla `ruta`
--
ALTER TABLE `ruta`
  ADD CONSTRAINT `FK_RUTA_VEHICULO` FOREIGN KEY (`vehiculo`) REFERENCES `vehiculo` (`placa`),
  ADD CONSTRAINT `FK_ruta_conductor` FOREIGN KEY (`conductor`) REFERENCES `conductor` (`codigo`),
  ADD CONSTRAINT `FK_ruta_destino` FOREIGN KEY (`destino`) REFERENCES `destino` (`codigo`),
  ADD CONSTRAINT `FK_ruta_origen` FOREIGN KEY (`origen`) REFERENCES `origen` (`codigo`);

--
-- Filtros para la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD CONSTRAINT `FK_vehiculo_linea` FOREIGN KEY (`linea`) REFERENCES `linea` (`codigo`);

--
-- Filtros para la tabla `vehiculocolor`
--
ALTER TABLE `vehiculocolor`
  ADD CONSTRAINT `FK_vehiculocolor_color` FOREIGN KEY (`codigoColor`) REFERENCES `color` (`codigo`),
  ADD CONSTRAINT `FK_vehiculocolor_vehiculo` FOREIGN KEY (`placaVehiculo`) REFERENCES `vehiculo` (`placa`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
