-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         8.2.0 - MySQL Community Server - GPL
-- SO del servidor:              Linux
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para sig-prueba
CREATE DATABASE IF NOT EXISTS `sig-prueba` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sig-prueba`;

-- Volcando estructura para tabla sig-prueba.conexion_db
CREATE TABLE IF NOT EXISTS `conexion_db` (
  `id_conexion_db` int NOT NULL AUTO_INCREMENT,
  `id_empresa` int NOT NULL,
  `nombre_conexion_db` varchar(120) NOT NULL,
  `conexion_driver_library` varchar(255) NOT NULL,
  `conexion_driver_class` varchar(255) NOT NULL,
  `conexion_string` varchar(255) NOT NULL,
  `conexion_user` varchar(255) NOT NULL,
  `conexion_password` varchar(255) NOT NULL,
  `usuario_insercion` int NOT NULL,
  `fecha_insercion` date NOT NULL,
  `usuario_actualizacion` int DEFAULT NULL,
  `fecha_actualizacion` date DEFAULT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'A' COMMENT 'Estado defecto A',
  PRIMARY KEY (`id_conexion_db`),
  KEY `id_empresa` (`id_empresa`),
  KEY `usuario_insercion` (`usuario_insercion`),
  KEY `usuario_actualizacion` (`usuario_actualizacion`),
  CONSTRAINT `conexion_db_ibfk_803` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`),
  CONSTRAINT `conexion_db_ibfk_804` FOREIGN KEY (`usuario_insercion`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `conexion_db_ibfk_805` FOREIGN KEY (`usuario_actualizacion`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla sig-prueba.conexion_db: ~4 rows (aproximadamente)
INSERT INTO `conexion_db` (`id_conexion_db`, `id_empresa`, `nombre_conexion_db`, `conexion_driver_library`, `conexion_driver_class`, `conexion_string`, `conexion_user`, `conexion_password`, `usuario_insercion`, `fecha_insercion`, `usuario_actualizacion`, `fecha_actualizacion`, `estado`) VALUES
	(1, 2, 'Conexion Empresa Prueba 1', 'C:\\Users\\Hector Jose\\Documents\\elastickstack\\logstash-8.15.1\\bin\\mysql-connector-java-8.0.23.jar', 'com.mysql.jdbc.Driver', 'jdbc:mysql://localhost:3306/planificatech-db', 'root', '1234', 1, '2024-11-28', NULL, NULL, 'A'),
	(2, 8, 'Conexion Empresa Prueba General 1', 'C:\\Users\\Hector Jose\\Documents\\elastickstack\\logstash-8.15.1\\bin\\mysql-connector-java-8.0.23.jar', 'com.mysql.jdbc.Driver', 'jdbc:mysql://localhost:3306/planificatech-db', 'root', '1234', 7, '2025-01-05', 7, '2025-01-05', 'A'),
	(3, 9, 'Conexion Empresa Presentacion', 'C:\\Users\\Hector Jose\\Documents\\elastickstack\\logstash-8.15.1\\bin\\mysql-connector-java-8.0.23.jar', 'com.mysql.jdbc.Driver', 'jdbc:mysql://localhost:3306/planificatech-db', 'root', '1234', 1, '2025-01-07', NULL, NULL, 'A'),
	(4, 10, 'Conexion Editada Empresa Prueba General 2', 'C:\\Users\\Hector Jose\\Documents\\elastickstack\\logstash-8.15.1\\bin\\mysql-connector-java-8.0.23.jar', 'com.mysql.jdbc.Driver', 'jdbc:mysql://localhost:3306/planificatech-db', 'root', '1234', 34, '2025-01-15', 34, '2025-01-15', 'A'),
	(7, 13, 'Conexion a Soluciones Martin', 'C:\\Users\\Hector Jose\\Documents\\elastickstack\\logstash-8.15.1\\bin\\mysql-connector-java-8.0.23.jar', 'com.mysql.jdbc.Driver', 'jdbc:mysql://localhost:3306/planificatech-db', 'root', '1234', 40, '2025-01-16', NULL, NULL, 'A');

-- Volcando estructura para tabla sig-prueba.conexion_elastic
CREATE TABLE IF NOT EXISTS `conexion_elastic` (
  `id_conexion_elastic` int NOT NULL AUTO_INCREMENT,
  `hosts_elastic` varchar(255) NOT NULL COMMENT 'IP DE ElasticSearch',
  `usuario_insercion` int NOT NULL,
  `fecha_insercion` date NOT NULL,
  `usuario_actualizacion` int DEFAULT NULL,
  `fecha_actualizacion` date DEFAULT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'A' COMMENT 'Estado defecto A',
  PRIMARY KEY (`id_conexion_elastic`),
  KEY `usuario_insercion` (`usuario_insercion`),
  KEY `usuario_actualizacion` (`usuario_actualizacion`),
  CONSTRAINT `conexion_elastic_ibfk_1` FOREIGN KEY (`usuario_insercion`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `conexion_elastic_ibfk_2` FOREIGN KEY (`usuario_actualizacion`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla sig-prueba.conexion_elastic: ~0 rows (aproximadamente)
INSERT INTO `conexion_elastic` (`id_conexion_elastic`, `hosts_elastic`, `usuario_insercion`, `fecha_insercion`, `usuario_actualizacion`, `fecha_actualizacion`, `estado`) VALUES
	(1, 'localhost:9200', 1, '2024-11-30', 1, '2024-12-06', 'A');

-- Volcando estructura para tabla sig-prueba.consulta_dashboard
CREATE TABLE IF NOT EXISTS `consulta_dashboard` (
  `id_consulta_dashboard` int NOT NULL AUTO_INCREMENT,
  `id_consulta_extraccion` int NOT NULL,
  `id_dashboard_kibana` int NOT NULL,
  `usuario_insercion` int NOT NULL,
  `fecha_insercion` date NOT NULL,
  `usuario_actualizacion` int DEFAULT NULL,
  `fecha_actualizacion` date DEFAULT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'A' COMMENT 'Estado defecto A',
  PRIMARY KEY (`id_consulta_dashboard`),
  KEY `id_consulta_extraccion` (`id_consulta_extraccion`),
  KEY `id_dashboard_kibana` (`id_dashboard_kibana`),
  KEY `usuario_insercion` (`usuario_insercion`),
  KEY `usuario_actualizacion` (`usuario_actualizacion`),
  CONSTRAINT `consulta_dashboard_ibfk_1057` FOREIGN KEY (`id_consulta_extraccion`) REFERENCES `consulta_extraccion` (`id_consulta_extraccion`),
  CONSTRAINT `consulta_dashboard_ibfk_1058` FOREIGN KEY (`id_dashboard_kibana`) REFERENCES `dashboard_kibana` (`id_dashboard_kibana`),
  CONSTRAINT `consulta_dashboard_ibfk_1059` FOREIGN KEY (`usuario_insercion`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `consulta_dashboard_ibfk_1060` FOREIGN KEY (`usuario_actualizacion`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla sig-prueba.consulta_dashboard: ~10 rows (aproximadamente)
INSERT INTO `consulta_dashboard` (`id_consulta_dashboard`, `id_consulta_extraccion`, `id_dashboard_kibana`, `usuario_insercion`, `fecha_insercion`, `usuario_actualizacion`, `fecha_actualizacion`, `estado`) VALUES
	(1, 1, 1, 1, '2024-12-19', NULL, NULL, 'A'),
	(2, 2, 1, 1, '2024-12-19', 1, '2024-12-21', 'I'),
	(3, 2, 8, 1, '2024-12-23', 1, '2024-12-23', 'I'),
	(4, 2, 8, 1, '2024-12-23', NULL, NULL, 'A'),
	(5, 1, 8, 1, '2024-12-23', NULL, NULL, 'A'),
	(6, 2, 7, 1, '2024-12-24', 1, '2024-12-24', 'I'),
	(7, 1, 7, 1, '2024-12-24', 1, '2024-12-24', 'I'),
	(8, 2, 7, 1, '2024-12-24', 1, '2024-12-24', 'I'),
	(9, 3, 9, 7, '2025-01-05', NULL, NULL, 'A'),
	(10, 3, 10, 34, '2025-01-15', NULL, NULL, 'A'),
	(13, 6, 13, 40, '2025-01-16', NULL, NULL, 'A');

-- Volcando estructura para tabla sig-prueba.consulta_extraccion
CREATE TABLE IF NOT EXISTS `consulta_extraccion` (
  `id_consulta_extraccion` int NOT NULL AUTO_INCREMENT,
  `id_conexion_db` int NOT NULL,
  `consulta_data` longtext NOT NULL COMMENT 'Consulta SQL',
  `transformacion_data` longtext NOT NULL,
  `index_data` varchar(255) NOT NULL COMMENT 'Nombre id extraccion',
  `data_stream` varchar(255) NOT NULL,
  `use_columns_value` varchar(20) NOT NULL,
  `tracking_columns` varchar(120) NOT NULL COMMENT 'Primary key de la tabla',
  `type` varchar(120) NOT NULL COMMENT 'Nombre de la tabla',
  `id_conexion_elastic` int NOT NULL,
  `usuario_insercion` int NOT NULL,
  `fecha_insercion` date NOT NULL,
  `usuario_actualizacion` int DEFAULT NULL,
  `fecha_actualizacion` date DEFAULT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'A' COMMENT 'Estado defecto A',
  PRIMARY KEY (`id_consulta_extraccion`),
  KEY `id_conexion_db` (`id_conexion_db`),
  KEY `id_conexion_elastic` (`id_conexion_elastic`),
  KEY `usuario_insercion` (`usuario_insercion`),
  KEY `usuario_actualizacion` (`usuario_actualizacion`),
  CONSTRAINT `consulta_extraccion_ibfk_1033` FOREIGN KEY (`id_conexion_db`) REFERENCES `conexion_db` (`id_conexion_db`),
  CONSTRAINT `consulta_extraccion_ibfk_1034` FOREIGN KEY (`id_conexion_elastic`) REFERENCES `conexion_elastic` (`id_conexion_elastic`),
  CONSTRAINT `consulta_extraccion_ibfk_1035` FOREIGN KEY (`usuario_insercion`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `consulta_extraccion_ibfk_1036` FOREIGN KEY (`usuario_actualizacion`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla sig-prueba.consulta_extraccion: ~3 rows (aproximadamente)
INSERT INTO `consulta_extraccion` (`id_consulta_extraccion`, `id_conexion_db`, `consulta_data`, `transformacion_data`, `index_data`, `data_stream`, `use_columns_value`, `tracking_columns`, `type`, `id_conexion_elastic`, `usuario_insercion`, `fecha_insercion`, `usuario_actualizacion`, `fecha_actualizacion`, `estado`) VALUES
	(1, 1, 'SELECT \r\n        e.fecha_nacimiento,\r\n        e.fecha_ingreso_empresa,\r\n        e.id_empleado,\r\n        e.cedula,\r\n        e.nombres,\r\n        e.apellidos,\r\n        e.nivel_academico,\r\n        e.numero_telefonico,\r\n        e.correo,\r\n        e.sexo,\r\n        e.salario,\r\n        e.lugar_nacimiento,\r\n        e.direccion_residencia,\r\n        d.nombre_departamento AS nombre_departamento,\r\n        p.nombre_puesto AS nombre_puesto\r\n      FROM \r\n        empleados e\r\n      JOIN \r\n        departamentos d ON e.id_departamento = d.id_departamento\r\n      JOIN\r\n        puestos p ON e.id_puesto = p.id_puesto', '  grok {\r\n    match => { "fecha_nacimiento" => "%{YEAR:year_nacimiento}-%{MONTHNUM:month_nacimiento}-%{MONTHDAY:day_nacimiento}" }\r\n  }\r\n  grok {\r\n    match => { "fecha_ingreso_empresa" => \r\n      "%{YEAR:year_ingreso_empresa}-%{MONTHNUM:month_ingreso_empresa}-%{MONTHDAY:day_ingreso_empresa}" \r\n    }\r\n  }\r\n\r\n  mutate {\r\n    remove_field => ["@version"]\r\n    remove_field => ["@timestamp"]\r\n    remove_field => ["type"]\r\n    remove_field => ["fecha_nacimiento"]\r\n    remove_field => ["fecha_ingreso_empresa"]\r\n\r\n    remove_field => ["month_nacimiento"]\r\n    remove_field => ["day_nacimiento"]\r\n    remove_field => ["month_ingreso_empresa"]\r\n    remove_field => ["day_ingreso_empresa"]\r\n\r\n    add_field => {\r\n      "empleado_json" => \'{\r\n        "fecha_nacimiento": "%{year_nacimiento}",\r\n        "fecha_ingreso_empresa": "%{year_ingreso_empresa}",\r\n        "id_empleado": "%{id_empleado}",\r\n        "cedula": "%{cedula}",\r\n        "nombres": "%{nombres}",\r\n        "apellidos": "%{apellidos}",\r\n        "nivel_academico": "%{nivel_academico}",\r\n        "numero_telefonico": "%{numero_telefonico}",\r\n        "correo": "%{correo}",\r\n        "sexo": "%{sexo}",\r\n        "salario": "%{salario}",\r\n        "lugar_nacimiento": "%{lugar_nacimiento}",\r\n        "direccion_residencia": "%{direccion_residencia}",\r\n        "nombre_departamento": "%{nombre_departamento}",\r\n        "nombre_puesto": "%{nombre_puesto}"\r\n      }\'\r\n    }\r\n  }', 'empleados_idx', 'false', 'true', 'id_empleado', 'empleados', 1, 1, '2024-12-01', 1, '2024-12-03', 'A'),
	(2, 1, 'SELECT \n        e.id_empleado,\n        e.cedula,\n        e.nombres,\n        e.apellidos,\n        e.salario,\n        e. sexo\nFROM \n        empleados e', 'mutate {\n    remove_field => ["@version"]\n    remove_field => ["@timestamp"]\n    remove_field => ["type"]\n}', 'salarios_idx', 'false', 'true', 'id_empleado', 'empleados', 1, 1, '2024-12-03', 1, '2024-12-09', 'A'),
	(3, 4, 'SELECT\n        p.id_proyecto,\n	p.nombre_proyecto,\n	p.descripcion_proyecto,\n	p.fecha_inicio,\n	p.estado_proyecto,\n	g.nombres\nFROM\n	proyectos p\nJOIN\n	gerentes g ON g.id_gerente = p.id_gerente;', 'mutate {\n    remove_field => ["@version"]\n    remove_field => ["@timestamp"]\n    remove_field => ["type"]\n}', 'proyecto_idx', 'false', 'true', 'id_proyecto', 'proyectos', 1, 7, '2025-01-05', 34, '2025-01-15', 'A'),
	(6, 7, 'SELECT\n        p.id_proyecto,\n	p.nombre_proyecto,\n	p.descripcion_proyecto,\n	p.fecha_inicio,\n	p.estado_proyecto,\n	g.nombres\nFROM\n	proyectos p\nJOIN\n	gerentes g ON g.id_gerente = p.id_gerente;', 'mutate {\n    remove_field => ["@version"]\n    remove_field => ["@timestamp"]\n    remove_field => ["type"]\n}', 'proyectos_idx', 'false', 'true', 'id_proyecto', 'proyectos', 1, 40, '2025-01-16', NULL, NULL, 'A');

-- Volcando estructura para tabla sig-prueba.dashboard_kibana
CREATE TABLE IF NOT EXISTS `dashboard_kibana` (
  `id_dashboard_kibana` int NOT NULL AUTO_INCREMENT,
  `nombre_dashboard` varchar(120) NOT NULL,
  `dashboard_source` varchar(255) NOT NULL,
  `id_empresa` int NOT NULL,
  `usuario_insercion` int NOT NULL,
  `fecha_insercion` date NOT NULL,
  `usuario_actualizacion` int DEFAULT NULL,
  `fecha_actualizacion` date DEFAULT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'A' COMMENT 'Estado defecto A',
  PRIMARY KEY (`id_dashboard_kibana`),
  KEY `id_empresa` (`id_empresa`),
  KEY `usuario_insercion` (`usuario_insercion`),
  KEY `usuario_actualizacion` (`usuario_actualizacion`),
  CONSTRAINT `dashboard_kibana_ibfk_784` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`),
  CONSTRAINT `dashboard_kibana_ibfk_785` FOREIGN KEY (`usuario_insercion`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `dashboard_kibana_ibfk_786` FOREIGN KEY (`usuario_actualizacion`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla sig-prueba.dashboard_kibana: ~10 rows (aproximadamente)
INSERT INTO `dashboard_kibana` (`id_dashboard_kibana`, `nombre_dashboard`, `dashboard_source`, `id_empresa`, `usuario_insercion`, `fecha_insercion`, `usuario_actualizacion`, `fecha_actualizacion`, `estado`) VALUES
	(1, 'Dashboard PlanificaTech Suite', 'http://localhost:5601/app/dashboards#/view/020c4c67-574f-4d89-88d3-28f943bad2f3?_g=()&embed=true', 2, 1, '2024-10-15', NULL, NULL, 'A'),
	(2, 'Dashboard Prueba 1', 'Source Prueba', 2, 1, '2024-11-16', NULL, NULL, 'A'),
	(3, 'Dashboard Prueba 2', 'Source Prueba 2', 3, 1, '2024-11-17', NULL, NULL, 'A'),
	(4, 'Dashboard Prueba 3', 'Source Dashboard 3', 1, 1, '2024-11-17', NULL, NULL, 'A'),
	(5, 'Dashboard Prueba 4', 'Source Prueba 4', 2, 1, '2024-11-17', NULL, NULL, 'A'),
	(6, 'Dashboard Prueba 5 Actualizado', 'Source Prueba 5', 1, 1, '2024-11-17', 1, '2024-11-17', 'A'),
	(7, 'Dashboard Prueba 6', 'Prueba con fecha insercion', 2, 1, '2024-11-26', NULL, NULL, 'A'),
	(8, 'Dashboard Salario', 'http://localhost:5601/app/dashboards#/view/020c4c67-574f-4d89-88d3-28f943bad2f3?_g=()&embed=true', 2, 1, '2024-12-09', NULL, NULL, 'A'),
	(9, 'Dashboard Proyectos Prueba General 1', 'http://localhost:5601/app/dashboards#/view/1f2c9538-c8d8-4095-8c30-5494be54a7ef?_g=()&embed=true', 8, 7, '2025-01-05', NULL, NULL, 'A'),
	(10, 'Dashboard Proyectos Prueba General 2', 'http://localhost:5601/app/dashboards#/view/1f2c9538-c8d8-4095-8c30-5494be54a7ef?_g=()&embed=true', 10, 34, '2025-01-15', 34, '2025-01-15', 'A'),
	(13, 'Dashboard Tesis', 'http://localhost:5601/app/dashboards#/view/4f766111-4907-4cba-bf21-a2d37eba92da?_g=&embed=true', 13, 40, '2025-01-16', NULL, NULL, 'A');

-- Volcando estructura para tabla sig-prueba.elk_ubicacion
CREATE TABLE IF NOT EXISTS `elk_ubicacion` (
  `id_elk_ubicacion` int NOT NULL AUTO_INCREMENT,
  `nombre_elk` varchar(120) NOT NULL,
  `ubicacion_elk` varchar(255) DEFAULT NULL,
  `usuario_insercion` int NOT NULL,
  `fecha_insercion` date NOT NULL,
  `usuario_actualizacion` int DEFAULT NULL,
  `fecha_actualizacion` date DEFAULT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'A' COMMENT 'Estado defecto A',
  PRIMARY KEY (`id_elk_ubicacion`),
  UNIQUE KEY `nombre_elk` (`nombre_elk`),
  KEY `usuario_insercion` (`usuario_insercion`),
  KEY `usuario_actualizacion` (`usuario_actualizacion`),
  CONSTRAINT `elk_ubicacion_ibfk_1` FOREIGN KEY (`usuario_insercion`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `elk_ubicacion_ibfk_2` FOREIGN KEY (`usuario_actualizacion`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla sig-prueba.elk_ubicacion: ~3 rows (aproximadamente)
INSERT INTO `elk_ubicacion` (`id_elk_ubicacion`, `nombre_elk`, `ubicacion_elk`, `usuario_insercion`, `fecha_insercion`, `usuario_actualizacion`, `fecha_actualizacion`, `estado`) VALUES
	(1, 'Logstash', 'C:\\Users\\Hector Jose\\Documents\\elastickstack\\logstash-8.15.1', 1, '2024-10-21', 1, '2024-10-23', 'A'),
	(2, 'ElasticSearch', 'C:\\Users\\Hector Jose\\Documents\\elastickstack\\elasticsearch-8.15.1', 1, '2024-10-21', 1, '2025-01-16', 'A'),
	(3, 'Kibana', NULL, 1, '2024-10-21', 1, '2024-10-23', 'A');

-- Volcando estructura para tabla sig-prueba.empresas
CREATE TABLE IF NOT EXISTS `empresas` (
  `id_empresa` int NOT NULL AUTO_INCREMENT,
  `rnc_empresa` bigint NOT NULL,
  `nombre_empresa` varchar(120) NOT NULL,
  `telefono_empresa` bigint NOT NULL,
  `usuario_insercion` int NOT NULL,
  `fecha_insercion` date NOT NULL,
  `usuario_actualizacion` int DEFAULT NULL,
  `fecha_actualizacion` date DEFAULT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'A' COMMENT 'Estado defecto A',
  PRIMARY KEY (`id_empresa`),
  UNIQUE KEY `rnc_empresa` (`rnc_empresa`),
  KEY `usuario_insercion` (`usuario_insercion`),
  KEY `usuario_actualizacion` (`usuario_actualizacion`),
  CONSTRAINT `empresas_ibfk_1` FOREIGN KEY (`usuario_insercion`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `empresas_ibfk_2` FOREIGN KEY (`usuario_actualizacion`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla sig-prueba.empresas: ~10 rows (aproximadamente)
INSERT INTO `empresas` (`id_empresa`, `rnc_empresa`, `nombre_empresa`, `telefono_empresa`, `usuario_insercion`, `fecha_insercion`, `usuario_actualizacion`, `fecha_actualizacion`, `estado`) VALUES
	(1, 1234567890120, 'Vegamovil', 8097532584, 1, '2024-10-15', NULL, NULL, 'A'),
	(2, 7418529630258, 'Empresa Prueba 1', 8092059874, 1, '2024-10-15', 1, '2024-11-28', 'A'),
	(3, 7896541230785, 'Empresa Prueba 2 D', 8091548230, 1, '2024-10-15', 1, '2024-11-29', 'A'),
	(4, 9876543210987, 'Empresa Prueba 3', 8094505897, 1, '2024-10-15', 1, '2024-11-28', 'I'),
	(5, 1023879450230, 'Nueva Empresa', 8094605986, 1, '2024-10-15', 1, '2024-11-28', 'I'),
	(6, 6584561890984, 'Nueva Empresa 2', 8092034598, 1, '2024-10-15', NULL, NULL, 'I'),
	(7, 8460084658489, 'Nueva Empresa 3', 8098453015, 1, '2024-10-15', 1, '2024-11-28', 'I'),
	(8, 8503269871542, 'Empresa Prueba General 1', 8096523324, 7, '2025-01-05', NULL, NULL, 'A'),
	(9, 789456152360125, 'Empresa Presentacion 1', 8296542588, 1, '2025-01-07', NULL, NULL, 'A'),
	(10, 5203245980126, 'Empresa Prueba General 2', 8096521463, 34, '2025-01-14', NULL, NULL, 'A'),
	(13, 2341680749159, 'Soluciones Martin', 8097653481, 40, '2025-01-16', NULL, NULL, 'A');

-- Volcando estructura para tabla sig-prueba.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `username` varchar(120) NOT NULL,
  `password` varchar(120) NOT NULL,
  `id_rol` int NOT NULL COMMENT '1 = admin, 2 = gerente',
  `nombres` varchar(120) NOT NULL,
  `apellidos` varchar(120) NOT NULL,
  `cedula` bigint NOT NULL,
  `email` varchar(19) NOT NULL,
  `numero_telefono` bigint DEFAULT NULL,
  `id_empresa` int DEFAULT NULL,
  `fecha_insercion` date NOT NULL,
  `fecha_actualizacion` date DEFAULT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'A' COMMENT 'Estado defecto A',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `cedula` (`cedula`),
  UNIQUE KEY `usuario` (`username`) USING BTREE,
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla sig-prueba.usuarios: ~15 rows (aproximadamente)
INSERT INTO `usuarios` (`id_usuario`, `username`, `password`, `id_rol`, `nombres`, `apellidos`, `cedula`, `email`, `numero_telefono`, `id_empresa`, `fecha_insercion`, `fecha_actualizacion`, `estado`) VALUES
	(1, 'admin', '$2b$10$z1TGt1E.pB0GqzCrbT..3ufBlK4peZ2CAvaiDDYqHTORgO68sG.Qm', 1, 'Hector José', 'Aramboles', 40214129518, 'hjac10@hotmail.com', 8293688053, NULL, '2024-11-29', '2025-01-05', 'A'),
	(2, 'juan', '$2b$10$gTVRH9rYuSUB33Tl0bLuf.9YV1WTB0Dvi9gFctTTbh4xY9nGDIiWa', 2, 'Juan', 'Santos', 123456789012, 'juan@correo.com', 8293456789, 2, '2024-11-29', NULL, 'A'),
	(3, 'lucas', '$2b$10$gTVRH9rYuSUB33Tl0bLuf.9YV1WTB0Dvi9gFctTTbh4xY9nGDIiWa', 2, 'Lucas', 'Ovalles', 98765432132, 'lucasova@correo.com', 8290867523, 2, '2024-11-29', NULL, 'A'),
	(4, 'jose', '$2b$10$gTVRH9rYuSUB33Tl0bLuf.9YV1WTB0Dvi9gFctTTbh4xY9nGDIiWa', 2, 'Jose', 'Santos', 75201514896, 'josess@hotmail.com', 8296547458, 3, '2024-11-29', NULL, 'A'),
	(5, 'emma', '$2b$10$gTVRH9rYuSUB33Tl0bLuf.9YV1WTB0Dvi9gFctTTbh4xY9nGDIiWa', 2, 'Emma', 'Fernandez', 12456785439, 'emmaf@gmail.com', 8290876410, 2, '2024-11-30', NULL, 'A'),
	(6, 'admin2', '$2b$10$gTVRH9rYuSUB33Tl0bLuf.9YV1WTB0Dvi9gFctTTbh4xY9nGDIiWa', 1, 'Julian ', 'Duarte', 484521635029, 'jduarte@gmail.com', NULL, NULL, '2025-01-05', '2025-01-05', 'I'),
	(7, 'nacho', '$2b$10$gTVRH9rYuSUB33Tl0bLuf.9YV1WTB0Dvi9gFctTTbh4xY9nGDIiWa', 1, 'Nacho', 'Gonzalez', 58365201159, 'nachozz@hotmail.com', 8296541478, NULL, '2025-01-05', '2025-01-05', 'A'),
	(8, 'alex', '$2b$10$gTVRH9rYuSUB33Tl0bLuf.9YV1WTB0Dvi9gFctTTbh4xY9nGDIiWa', 2, 'Alejandro', 'Mejia', 96320150628, 'alexm@gmail.com', 82965233201, 8, '2025-01-05', NULL, 'A'),
	(9, 'lucia', '$2b$10$gTVRH9rYuSUB33Tl0bLuf.9YV1WTB0Dvi9gFctTTbh4xY9nGDIiWa', 2, 'Lucia', 'Alvarez', 23456789087, 'lucy@hotmail.com', 8293456670, 8, '2025-01-07', NULL, 'A'),
	(10, 'ramon', '$2b$10$sOw/3mNYS.jydzUTXyVfu.kVIkxyyNPTrrx75dkLRY9jIW6DWCwhW', 2, 'Ramon', 'Santos', 78945123015, 'ramon@hotmail.com', 82965411474, 9, '2025-01-07', '2025-01-07', 'A'),
	(11, 'ester', '$2b$10$HM.9K4WBFiOkvwQi6fC/4uRQuJYmDlPfQ2fIsqkZ/8fx0HBgJOJoK', 1, 'Ester', 'Peralta', 85201329504, 'esterp', NULL, NULL, '2025-01-11', NULL, 'A'),
	(31, 'admin3', '$2b$10$P7OF082xnx7cuH5ScX1kXOahQuEYxm9bgaFxy/uMaY0bvQ0A890rq', 1, 'Thomas', 'Hernandez', 8560210359, 'thom@hotmail.com', NULL, NULL, '2025-01-11', NULL, 'A'),
	(33, 'admin4', '$2b$10$qzBBcTfdrloiYDZVQVimau8hlAyBhRx5o8VxlRFiUVFZ3Ec2BFWga', 1, 'Pedro', 'De Leon', 52301205612, 'pdl@correo.com', NULL, NULL, '2025-01-11', NULL, 'A'),
	(34, 'enrique', '$2b$10$j9NpPQDszwBGY9hxL.Jj5.jCuuAMmOjd3i1M1Vl9wTr1JudEAkgoS', 1, 'Enrique', 'Adames', 745201665983, 'enria@hotmail.com', 8296512033, NULL, '2025-01-14', NULL, 'A'),
	(35, 'martin', '$2b$10$a6PHKliWj0ip.wKTTDG43eKaoEvMYv.2ra1gU1iz7Lhli1lQqN712', 2, 'Martin', 'Cespeda', 65023145029, 'mart@hotmail.com', 8296354177, 10, '2025-01-14', '2025-01-15', 'A'),
	(40, 'manuel', '$2b$10$Kfi.mRKKtThmjuFz.i8SleU1TICiM2WaCEJH/7UiXfdaaq2FsHwG6', 1, 'Manuel', 'Estevez', 34512346785, 'man12@hotmail.com', 8095674322, NULL, '2025-01-16', NULL, 'A'),
	(41, 'lucy', '$2b$10$fcQ1Q3EzP1BJQ9hPALElju9xplKb4.YUpBetaozDlhzuzm8J3WVdu', 2, 'Lucia', 'Capellan', 45378091268, 'lucy@gmail.com', 8290853186, 13, '2025-01-16', NULL, 'A');

-- Volcando estructura para tabla sig-prueba.usuarios_dashboard
CREATE TABLE IF NOT EXISTS `usuarios_dashboard` (
  `id_usuario_dashboard` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_dashboard_kibana` int NOT NULL,
  `usuario_insercion` int NOT NULL,
  `fecha_insercion` date NOT NULL,
  `usuario_actualizacion` int DEFAULT NULL,
  `fecha_actualizacion` date DEFAULT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'A' COMMENT 'Estado defecto A',
  PRIMARY KEY (`id_usuario_dashboard`) USING BTREE,
  KEY `FK_usuarios_graficas_nombres_graficas` (`id_dashboard_kibana`) USING BTREE,
  KEY `id_usuario` (`id_usuario`),
  KEY `usuario_insercion` (`usuario_insercion`),
  KEY `usuario_actualizacion` (`usuario_actualizacion`),
  CONSTRAINT `usuarios_dashboard_ibfk_527` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `usuarios_dashboard_ibfk_528` FOREIGN KEY (`id_dashboard_kibana`) REFERENCES `dashboard_kibana` (`id_dashboard_kibana`),
  CONSTRAINT `usuarios_dashboard_ibfk_529` FOREIGN KEY (`usuario_insercion`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `usuarios_dashboard_ibfk_530` FOREIGN KEY (`usuario_actualizacion`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla sig-prueba.usuarios_dashboard: ~10 rows (aproximadamente)
INSERT INTO `usuarios_dashboard` (`id_usuario_dashboard`, `id_usuario`, `id_dashboard_kibana`, `usuario_insercion`, `fecha_insercion`, `usuario_actualizacion`, `fecha_actualizacion`, `estado`) VALUES
	(1, 2, 1, 1, '2024-10-16', 1, '2024-11-24', 'A'),
	(2, 2, 2, 1, '2024-10-16', 1, '2024-11-24', 'A'),
	(3, 2, 6, 1, '2024-11-24', 1, '2024-12-15', 'I'),
	(4, 3, 2, 1, '2024-11-24', NULL, NULL, 'A'),
	(5, 3, 8, 1, '2024-12-09', NULL, NULL, 'A'),
	(6, 8, 9, 7, '2025-01-05', NULL, NULL, 'A'),
	(7, 10, 1, 1, '2025-01-07', NULL, NULL, 'A'),
	(8, 35, 10, 34, '2025-01-15', NULL, NULL, 'A'),
	(9, 35, 8, 34, '2025-01-15', NULL, NULL, 'A'),
	(10, 35, 1, 34, '2025-01-15', NULL, NULL, 'A'),
	(13, 41, 13, 40, '2025-01-16', NULL, NULL, 'A'),
	(14, 41, 8, 40, '2025-01-16', NULL, NULL, 'A');

-- Volcando estructura para tabla sig-prueba.usuarios_pedidos
CREATE TABLE IF NOT EXISTS `usuarios_pedidos` (
  `id_usuario_pedido` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `descripcion_pedido` varchar(255) NOT NULL,
  `fecha_pedido` date NOT NULL,
  `id_usuario_asignado` int DEFAULT NULL,
  `fecha_actualizacion` date DEFAULT NULL,
  `estado_pedido` varchar(50) NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'A' COMMENT 'Estado defecto A',
  PRIMARY KEY (`id_usuario_pedido`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_usuario_asignado` (`id_usuario_asignado`),
  CONSTRAINT `usuarios_pedidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `usuarios_pedidos_ibfk_2` FOREIGN KEY (`id_usuario_asignado`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla sig-prueba.usuarios_pedidos: ~9 rows (aproximadamente)
INSERT INTO `usuarios_pedidos` (`id_usuario_pedido`, `id_usuario`, `descripcion_pedido`, `fecha_pedido`, `id_usuario_asignado`, `fecha_actualizacion`, `estado_pedido`, `estado`) VALUES
	(1, 2, 'Se requiere una grafica que muestre los empleados por departamentos de mi empresa', '2024-09-16', 1, '2025-01-15', 'C', 'I'),
	(5, 4, 'Prueba de solicitud de graficos', '2024-11-30', 1, '2025-01-15', 'C', 'I'),
	(6, 3, 'Necesito un grafico que muestre los empleados por salario', '2024-12-09', 1, '2025-01-01', 'C', 'I'),
	(7, 8, 'Necesito un grafico con los datos de los proyectos de la empresa junto con los gerentes encargados de dichos proyectos.', '2025-01-05', 7, '2025-01-15', 'C', 'I'),
	(8, 10, 'Se necesita un grafico que muestre los poryectos de la empresa por estado.', '2025-01-07', 1, '2025-01-16', 'T', 'A'),
	(9, 35, 'Solicitud grafico prueba general 2', '2025-01-14', NULL, NULL, 'P', 'I'),
	(10, 35, 'Solicitud 2 de Graficos Prueba General 2', '2025-01-14', NULL, NULL, 'P', 'I'),
	(11, 35, 'Solicitud 3 de Graficos Prueba General 2', '2025-01-14', 34, '2025-01-15', 'T', 'A'),
	(15, 41, 'Requiero tener un grafico que presente los proyectos de la empresa divididos por estado.', '2025-01-16', 40, '2025-01-16', 'C', 'A');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
