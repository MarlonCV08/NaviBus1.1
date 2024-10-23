-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-10-2024 a las 02:25:29
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaciones`
--

DROP TABLE IF EXISTS `asignaciones`;
CREATE TABLE `asignaciones` (
  `cedula` varchar(10) NOT NULL,
  `codigo_puntoscontrol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asignaciones`
--

INSERT INTO `asignaciones` (`cedula`, `codigo_puntoscontrol`) VALUES
('1543210987', 107),
('1678901234', 108),
('1890123456', 109);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

DROP TABLE IF EXISTS `categoria`;
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
(7, 'C1'),
(8, 'C2'),
(9, 'C3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clasevehiculo`
--

DROP TABLE IF EXISTS `clasevehiculo`;
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
-- Estructura de tabla para la tabla `escaneos`
--

DROP TABLE IF EXISTS `escaneos`;
CREATE TABLE `escaneos` (
  `codigo` int(11) NOT NULL,
  `cedula` varchar(10) DEFAULT NULL,
  `codigo_puntoscontrol` int(11) DEFAULT NULL,
  `hora` datetime DEFAULT NULL,
  `minutos_retraso` int(11) DEFAULT 0,
  `sanciones` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `escaneos`
--

INSERT INTO `escaneos` (`codigo`, `cedula`, `codigo_puntoscontrol`, `hora`, `minutos_retraso`, `sanciones`) VALUES
(71, '1022843145', 110, '2024-10-15 00:55:32', NULL, NULL),
(72, '1022843145', 111, '2024-10-15 00:56:44', NULL, NULL),
(73, '1022843145', 112, '2024-10-15 00:59:20', NULL, NULL),
(74, '1001715665', 107, '2024-10-15 01:11:42', NULL, NULL),
(75, '1001715665', 108, '2024-10-15 01:13:47', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `linea`
--

DROP TABLE IF EXISTS `linea`;
CREATE TABLE `linea` (
  `codigo` int(3) NOT NULL,
  `marca` int(5) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `linea`
--

INSERT INTO `linea` (`codigo`, `marca`, `nombre`) VALUES
(1, 1, 'NPR'),
(2, 1, 'NFR'),
(3, 1, 'NHR'),
(4, 4, ''),
(5, 5, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

DROP TABLE IF EXISTS `marca`;
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
-- Estructura de tabla para la tabla `puntoscontrol`
--

DROP TABLE IF EXISTS `puntoscontrol`;
CREATE TABLE `puntoscontrol` (
  `codigo` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `ruta` int(5) DEFAULT NULL,
  `ultimo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `puntoscontrol`
--

INSERT INTO `puntoscontrol` (`codigo`, `nombre`, `ruta`, `ultimo`) VALUES
(101, 'Barro Blanco', 1, 0),
(102, 'Alto de Vallejo', 1, 0),
(103, 'Abreito', 1, 0),
(104, 'Fonda buenos Aires', 1, 0),
(105, 'El Carmin', 1, 0),
(106, 'Alto de los Correas', 1, 1),
(107, 'San Antonio', 2, 0),
(108, 'Cuatro Esquinas', 2, 0),
(109, 'Centro', 2, 1),
(110, 'Villa Camila', 3, 0),
(111, 'La Pola', 3, 0),
(112, 'La Feria', 3, 0),
(113, 'Cuatro Esquinas', 3, 0),
(114, 'La Lela', 3, 1),
(115, 'Fiscalía', 4, 0),
(116, 'Galería', 4, 0),
(117, 'Olimpica', 4, 0),
(118, 'Savanna', 4, 0),
(119, 'Comfama', 4, 0),
(120, 'Ipanema', 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

DROP TABLE IF EXISTS `rol`;
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

DROP TABLE IF EXISTS `ruta`;
CREATE TABLE `ruta` (
  `codigo` int(5) NOT NULL,
  `nombre` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ruta`
--

INSERT INTO `ruta` (`codigo`, `nombre`) VALUES
(1, '05'),
(2, 'Circular'),
(3, 'Linea_C'),
(4, 'Linea_B');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta_usuarios`
--

DROP TABLE IF EXISTS `ruta_usuarios`;
CREATE TABLE `ruta_usuarios` (
  `ruta_codigo` int(5) NOT NULL,
  `cedula` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta_vehiculo`
--

DROP TABLE IF EXISTS `ruta_vehiculo`;
CREATE TABLE `ruta_vehiculo` (
  `ruta_codigo` int(5) NOT NULL,
  `placa` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ruta_vehiculo`
--

INSERT INTO `ruta_vehiculo` (`ruta_codigo`, `placa`) VALUES
(1, 'AAA000'),
(2, 'BBB111'),
(3, 'CCC222'),
(4, 'DDD333');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipodocumento`
--

DROP TABLE IF EXISTS `tipodocumento`;
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
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `cedula` varchar(10) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `tipoDocumento` int(1) NOT NULL,
  `categoria` int(1) DEFAULT NULL,
  `correo` varchar(90) NOT NULL,
  `rol` int(1) NOT NULL,
  `clave` varchar(90) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`cedula`, `nombres`, `apellidos`, `tipoDocumento`, `categoria`, `correo`, `rol`, `clave`) VALUES
('1001715665', 'Argemiro', 'Vanegas Lopez', 1, 7, 'agemiro@gmail.com', 2, '1001715665'),
('1014254832', 'Alberto', 'Atehortua Bustamante', 1, 5, 'alberto@gmail.com', 2, '1014254832'),
('1015070444', 'Marlon Estiven', 'Castaño Vanegas', 1, 4, 'marlone_castano@soy.sena.edu.co', 1, '1015070444'),
('1022843145', 'Manuel', 'Gomez Alvarez', 1, 5, 'manuelgomez@gmail.com', 2, '1022843145'),
('1028694521', 'Hugo', 'Salazar Hernandez', 1, 5, 'hugo@gmail.com', 2, '1028694521'),
('1032745632', 'Sebastian David', 'Agudelo Ospina', 1, 5, 'sebastiand@gmail.com', 2, '1032745632'),
('1036743213', 'Sofia', 'Gonzales', 1, NULL, 'sofiagonzales@gmail.com', 3, '1036743213'),
('1038965478', 'Andrea', 'Ramirez', 1, NULL, 'andrearamirez@gmail.com', 3, '1038965478'),
('1042578075', 'Jhonnier', 'Zubiria', 1, NULL, 'jonier@gmail.com', 1, '1042578075'),
('1043637455', 'Leonel Steven', 'Sanchez Henao', 1, NULL, 'stevensanchez1024@gmail.com', 1, '1043637455'),
('1234567890', 'Ana María', 'Gómez', 1, NULL, 'anamariag@gmail.com', 3, '1234567890'),
('1234876543', 'Valentina', 'Castaño González', 1, NULL, ' valentina.lopez@gmail.com', 3, '1234876543'),
('1321654987', 'Mariana', 'Torres López', 1, NULL, 'mariana.torres@gmail.com', 3, '1321654987'),
('1543210987', 'Daniela', 'Castro Mejía', 1, NULL, 'daniela.castro@gmail.com', 3, '1543210987'),
('1678901234', 'Isabela', 'Sánchez Restrepo', 1, NULL, 'isabela.sanchez@egmail.com', 3, '1678901234'),
('1890123456', 'Gabriela', 'Morales Hernández', 1, NULL, 'gabrielamorales@gmail.com', 3, '1890123456'),
('1987654321', 'Laura Isabel', 'Pérez Agudelo', 1, NULL, 'lauraisagu@gmail.com', 3, '1987654321'),
('7556341', 'Leonel De Jesus', 'Sanchez Echeverry', 1, 8, 'leosanchez123456p@gmail.com', 2, '7556341');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

DROP TABLE IF EXISTS `vehiculo`;
CREATE TABLE `vehiculo` (
  `placa` varchar(6) NOT NULL,
  `linea` int(3) NOT NULL,
  `clasevehiculo` int(2) NOT NULL,
  `modelo` varchar(4) NOT NULL,
  `numChasis` varchar(18) NOT NULL,
  `numMotor` varchar(20) NOT NULL,
  `numPasajeros` int(2) NOT NULL,
  `cilindrada` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`placa`, `linea`, `clasevehiculo`, `modelo`, `numChasis`, `numMotor`, `numPasajeros`, `cilindrada`) VALUES
('AAA000', 1, 1, '2015', '123456789123456789', '12345678912345678900', 20, '3000'),
('BBB111', 2, 2, '2017', '123456780123456780', '12345678912345678911', 25, '3500'),
('CCC222', 3, 3, '2010', '123456709123456709', '12345678912345678922', 25, '3500'),
('DDD333', 4, 1, '2012', '123456089123456089', '12345678912345678933', 30, '4000'),
('EEE444', 5, 2, '2020', '123450789123450789', '12345678912345678944', 30, '4000');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignaciones`
--
ALTER TABLE `asignaciones`
  ADD PRIMARY KEY (`cedula`,`codigo_puntoscontrol`),
  ADD KEY `FK_asignaciones_puntoscontrol` (`codigo_puntoscontrol`);

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
-- Indices de la tabla `escaneos`
--
ALTER TABLE `escaneos`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `FK_escaneos_usuarios` (`cedula`),
  ADD KEY `FK_escaneos_puntoscontrol` (`codigo_puntoscontrol`);

--
-- Indices de la tabla `linea`
--
ALTER TABLE `linea`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `FK_linea_marca` (`marca`);

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `puntoscontrol`
--
ALTER TABLE `puntoscontrol`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `FK_puntoscontrol_ruta` (`ruta`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `ruta`
--
ALTER TABLE `ruta`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `ruta_usuarios`
--
ALTER TABLE `ruta_usuarios`
  ADD PRIMARY KEY (`ruta_codigo`,`cedula`),
  ADD KEY `FK_rutausuarios_cedula` (`cedula`) USING BTREE;

--
-- Indices de la tabla `ruta_vehiculo`
--
ALTER TABLE `ruta_vehiculo`
  ADD PRIMARY KEY (`ruta_codigo`,`placa`),
  ADD KEY `FK_rutavehiculo_vehiculo` (`placa`);

--
-- Indices de la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`cedula`) USING BTREE,
  ADD KEY `FK_usuarios_categoria` (`categoria`),
  ADD KEY `FK_usuarios_tipodocumento` (`tipoDocumento`),
  ADD KEY `FK_usuarios_rol` (`rol`);

--
-- Indices de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`placa`),
  ADD KEY `FK_vehiculo_linea` (`linea`),
  ADD KEY `FK_vehiculo_clasevehiculo` (`clasevehiculo`);

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
-- AUTO_INCREMENT de la tabla `escaneos`
--
ALTER TABLE `escaneos`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

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
-- AUTO_INCREMENT de la tabla `puntoscontrol`
--
ALTER TABLE `puntoscontrol`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `codigo` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ruta`
--
ALTER TABLE `ruta`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=322;

--
-- AUTO_INCREMENT de la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  MODIFY `codigo` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asignaciones`
--
ALTER TABLE `asignaciones`
  ADD CONSTRAINT `FK_asignaciones_puntoscontrol` FOREIGN KEY (`codigo_puntoscontrol`) REFERENCES `puntoscontrol` (`codigo`),
  ADD CONSTRAINT `FK_asignaciones_usuarios` FOREIGN KEY (`cedula`) REFERENCES `usuarios` (`cedula`);

--
-- Filtros para la tabla `escaneos`
--
ALTER TABLE `escaneos`
  ADD CONSTRAINT `FK_escaneos_puntoscontrol` FOREIGN KEY (`codigo_puntoscontrol`) REFERENCES `puntoscontrol` (`codigo`),
  ADD CONSTRAINT `FK_escaneos_usuarios` FOREIGN KEY (`cedula`) REFERENCES `usuarios` (`cedula`);

--
-- Filtros para la tabla `linea`
--
ALTER TABLE `linea`
  ADD CONSTRAINT `FK_linea_marca` FOREIGN KEY (`marca`) REFERENCES `marca` (`codigo`);

--
-- Filtros para la tabla `puntoscontrol`
--
ALTER TABLE `puntoscontrol`
  ADD CONSTRAINT `FK_puntoscontrol_ruta` FOREIGN KEY (`ruta`) REFERENCES `ruta` (`codigo`);

--
-- Filtros para la tabla `ruta_usuarios`
--
ALTER TABLE `ruta_usuarios`
  ADD CONSTRAINT `FK_rutausuarios_ruta` FOREIGN KEY (`ruta_codigo`) REFERENCES `ruta` (`codigo`),
  ADD CONSTRAINT `ruta_usuarios_ibfk_2` FOREIGN KEY (`cedula`) REFERENCES `usuarios` (`cedula`);

--
-- Filtros para la tabla `ruta_vehiculo`
--
ALTER TABLE `ruta_vehiculo`
  ADD CONSTRAINT `FK_rutavehiculo_ruta` FOREIGN KEY (`ruta_codigo`) REFERENCES `ruta` (`codigo`),
  ADD CONSTRAINT `FK_rutavehiculo_vehiculo` FOREIGN KEY (`placa`) REFERENCES `vehiculo` (`placa`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `FK_usuarios_categoria` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`codigo`),
  ADD CONSTRAINT `FK_usuarios_rol` FOREIGN KEY (`rol`) REFERENCES `rol` (`codigo`),
  ADD CONSTRAINT `FK_usuarios_tipodocumento` FOREIGN KEY (`tipoDocumento`) REFERENCES `tipodocumento` (`codigo`);

--
-- Filtros para la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD CONSTRAINT `FK_vehiculo_clasevehiculo` FOREIGN KEY (`clasevehiculo`) REFERENCES `clasevehiculo` (`codigo`),
  ADD CONSTRAINT `FK_vehiculo_linea` FOREIGN KEY (`linea`) REFERENCES `linea` (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
