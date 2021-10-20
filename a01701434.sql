-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2021 a las 21:43:13
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `a01701434`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateFase` (IN `z_idZombie` INT(3), IN `z_idEstado` TINYINT(3), IN `z_FechaMetamorfosis` TIMESTAMP)  BEGIN

UPDATE historial SET historial.idZombie = z_idZombie,  historial.idEstado = z_idEstado, historial.FechaMetamorfosis = CURRENT_TIMESTAMP WHERE historial.idZombie = z_idZombie;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `estadisticadesorientacion`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `estadisticadesorientacion` (
`Numero Infectados` bigint(21)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `estadisticainfeccion`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `estadisticainfeccion` (
`COUNT(historial.idEstado)` bigint(21)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `estadisticaviolencia`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `estadisticaviolencia` (
`Numero Infectados` bigint(21)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE `estados` (
  `idEstado` tinyint(3) NOT NULL,
  `Estado` enum('Infección','Desorientación','Violencia','Desmayo','Transformación') COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`idEstado`, `Estado`) VALUES
(1, 'Infección'),
(2, 'Desorientación'),
(3, 'Violencia'),
(4, 'Desmayo'),
(5, 'Transformación');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `idZombie_Estado` tinyint(4) NOT NULL,
  `idZombie` tinyint(3) NOT NULL,
  `idEstado` tinyint(3) NOT NULL,
  `FechaMetamorfosis` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`idZombie_Estado`, `idZombie`, `idEstado`, `FechaMetamorfosis`) VALUES
(1, 1, 2, '2021-10-20 17:05:35'),
(2, 2, 5, '2021-10-20 18:02:30'),
(4, 3, 5, '2021-10-20 17:05:35'),
(5, 9, 2, '2021-10-20 17:29:56'),
(6, 2, 2, '2021-10-20 18:17:03'),
(7, 2, 1, '2021-10-20 18:17:03'),
(8, 10, 3, '2021-10-20 19:04:30'),
(9, 11, 1, '2021-10-20 19:05:08'),
(10, 12, 4, '2021-10-20 19:05:32'),
(11, 13, 5, '2021-10-20 19:06:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zombie`
--

CREATE TABLE `zombie` (
  `idZombie` tinyint(4) NOT NULL,
  `NombreCompleto` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `zombie`
--

INSERT INTO `zombie` (`idZombie`, `NombreCompleto`) VALUES
(1, 'David Hernán Fernández García'),
(2, 'Joseph Alessandro García García'),
(3, 'Ricardo C'),
(9, 'Joseph en el examen'),
(10, 'Eduardo García Rogón'),
(11, 'Jorge '),
(12, 'Franco G'),
(13, 'Agustin D');

-- --------------------------------------------------------

--
-- Estructura para la vista `estadisticadesorientacion`
--
DROP TABLE IF EXISTS `estadisticadesorientacion`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `estadisticadesorientacion`  AS   (select count(`historial`.`idEstado`) AS `Numero Infectados` from ((`historial` join `zombie`) join `estados`) where `zombie`.`idZombie` = `historial`.`idZombie` and `estados`.`idEstado` = `historial`.`idEstado` group by `historial`.`idEstado` having count(`historial`.`idEstado`) and `historial`.`idEstado` = 2)  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `estadisticainfeccion`
--
DROP TABLE IF EXISTS `estadisticainfeccion`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `estadisticainfeccion`  AS   (select count(`historial`.`idEstado`) AS `COUNT(historial.idEstado)` from ((`historial` join `zombie`) join `estados`) where `zombie`.`idZombie` = `historial`.`idZombie` and `estados`.`idEstado` = `historial`.`idEstado` group by `historial`.`idEstado` having count(`historial`.`idEstado`) and `historial`.`idEstado` = 1)  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `estadisticaviolencia`
--
DROP TABLE IF EXISTS `estadisticaviolencia`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `estadisticaviolencia`  AS SELECT count(`historial`.`idEstado`) AS `Numero Infectados` FROM ((`historial` join `zombie`) join `estados`) WHERE `zombie`.`idZombie` = `historial`.`idZombie` AND `estados`.`idEstado` = `historial`.`idEstado` GROUP BY `historial`.`idEstado` HAVING count(`historial`.`idEstado`) AND `historial`.`idEstado` = 3 ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`idEstado`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`idZombie_Estado`),
  ADD KEY `idZombie_index` (`idZombie`),
  ADD KEY `idEstado_index` (`idEstado`);

--
-- Indices de la tabla `zombie`
--
ALTER TABLE `zombie`
  ADD PRIMARY KEY (`idZombie`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE `estados`
  MODIFY `idEstado` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `idZombie_Estado` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `zombie`
--
ALTER TABLE `zombie`
  MODIFY `idZombie` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`idZombie`) REFERENCES `zombie` (`idZombie`),
  ADD CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`idEstado`) REFERENCES `estados` (`idEstado`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
