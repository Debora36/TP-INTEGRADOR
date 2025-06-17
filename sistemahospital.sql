-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: sistemahospital
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ala_hospital`
--

DROP TABLE IF EXISTS `ala_hospital`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ala_hospital` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nombre_ala` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `piso` tinyint NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ala_hospital`
--

LOCK TABLES `ala_hospital` WRITE;
/*!40000 ALTER TABLE `ala_hospital` DISABLE KEYS */;
INSERT INTO `ala_hospital` VALUES (1,'Terapia intensiva',1),(2,'Cirugia general',2),(3,'Traumatología',2),(4,'Maternidad',2),(5,'Obstetricia y Gineco',3);
/*!40000 ALTER TABLE `ala_hospital` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cama`
--

DROP TABLE IF EXISTS `cama`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cama` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_habitacion` int NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `disponible` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`ID`),
  KEY `ID_habitacion` (`ID_habitacion`),
  CONSTRAINT `cama_ibfk_1` FOREIGN KEY (`ID_habitacion`) REFERENCES `habitacion` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cama`
--

LOCK TABLES `cama` WRITE;
/*!40000 ALTER TABLE `cama` DISABLE KEYS */;
INSERT INTO `cama` VALUES (1,1,'1',0),(2,2,'2',1),(3,3,'3',1),(4,2,'4',1),(5,1,'5',0),(6,3,'3',1),(7,4,'6',0),(8,4,'7',1),(9,5,'10',0),(10,6,'11',0),(11,7,'12',0),(12,8,'13',1),(14,9,'14',1),(15,9,'15',1),(16,10,'16',1),(17,11,'17',0),(18,10,'18',1),(19,11,'19',1),(20,12,'20',1),(21,12,'21',1),(22,13,'22',1),(23,13,'23',1),(24,14,'24',1),(25,14,'25',1),(26,15,'26',1),(27,16,'27',1),(28,17,'28',1),(29,18,'29',1),(30,19,'30',1),(31,20,'31',1),(32,21,'32',1),(33,22,'33',1),(34,22,'34',1),(35,23,'35',0),(36,23,'36',1);
/*!40000 ALTER TABLE `cama` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidad` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nombre_especialidad` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidad`
--

LOCK TABLES `especialidad` WRITE;
/*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
INSERT INTO `especialidad` VALUES (1,'cardiología'),(2,'traumatología'),(3,'cirujia'),(4,'neurología'),(5,'obstetricia'),(6,'oftalmología');
/*!40000 ALTER TABLE `especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitacion`
--

DROP TABLE IF EXISTS `habitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitacion` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_ala_hospital` int DEFAULT NULL,
  `Numero` int NOT NULL,
  `camas_disponibles` tinyint NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_ala_hospital` (`ID_ala_hospital`),
  CONSTRAINT `habitacion_ibfk_1` FOREIGN KEY (`ID_ala_hospital`) REFERENCES `ala_hospital` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitacion`
--

LOCK TABLES `habitacion` WRITE;
/*!40000 ALTER TABLE `habitacion` DISABLE KEYS */;
INSERT INTO `habitacion` VALUES (1,1,10,2),(2,2,49,2),(3,2,50,2),(4,1,11,2),(5,3,100,1),(6,3,101,1),(7,4,33,1),(8,5,123,1),(9,1,12,2),(10,2,51,2),(11,2,53,2),(12,3,99,2),(13,4,34,2),(14,4,35,2),(15,5,120,2),(16,5,121,1),(17,1,9,1),(18,1,8,1),(19,2,48,1),(20,4,34,1),(21,4,35,1),(22,5,118,2),(23,5,119,2);
/*!40000 ALTER TABLE `habitacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialmedico`
--

DROP TABLE IF EXISTS `historialmedico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historialmedico` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_Paciente` int DEFAULT NULL,
  `ID_Doctor` int DEFAULT NULL,
  `Fecha` datetime DEFAULT NULL,
  `Diagnostico` text COLLATE utf8mb4_general_ci,
  `Observaciones` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`ID`),
  KEY `ID_Paciente` (`ID_Paciente`),
  KEY `ID_Doctor` (`ID_Doctor`),
  CONSTRAINT `historialmedico_ibfk_2` FOREIGN KEY (`ID_Doctor`) REFERENCES `medico` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialmedico`
--

LOCK TABLES `historialmedico` WRITE;
/*!40000 ALTER TABLE `historialmedico` DISABLE KEYS */;
/*!40000 ALTER TABLE `historialmedico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internacion`
--

DROP TABLE IF EXISTS `internacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `internacion` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_Paciente` int DEFAULT NULL,
  `ID_Habitacion` int DEFAULT NULL,
  `FechaIngreso` datetime DEFAULT NULL,
  `FechaAlta` datetime DEFAULT NULL,
  `ID_Cama` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Paciente` (`ID_Paciente`),
  KEY `ID_Habitacion` (`ID_Habitacion`),
  KEY `ID_Cama` (`ID_Cama`),
  CONSTRAINT `internacion_ibfk_2` FOREIGN KEY (`ID_Habitacion`) REFERENCES `habitacion` (`ID`),
  CONSTRAINT `internacion_ibfk_3` FOREIGN KEY (`ID_Cama`) REFERENCES `cama` (`ID`),
  CONSTRAINT `internacion_paciente_FK` FOREIGN KEY (`ID_Paciente`) REFERENCES `paciente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internacion`
--

LOCK TABLES `internacion` WRITE;
/*!40000 ALTER TABLE `internacion` DISABLE KEYS */;
INSERT INTO `internacion` VALUES (34,27,4,'2025-06-10 02:55:05',NULL,7),(37,2,1,'2025-06-12 03:18:13',NULL,5),(43,33,23,'2025-06-15 17:14:19',NULL,35),(47,6,1,'2025-06-16 00:57:24',NULL,1),(48,31,5,'2025-06-16 22:12:24',NULL,9),(49,32,7,'2025-06-16 22:12:49',NULL,11),(50,2,11,'2025-06-17 00:15:56',NULL,19),(51,2,11,'2025-06-17 00:16:34',NULL,17),(52,28,6,'2025-06-17 00:19:46',NULL,10);
/*!40000 ALTER TABLE `internacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicacion`
--

DROP TABLE IF EXISTS `medicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicacion` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Descripcion` text COLLATE utf8mb4_general_ci,
  `Presentacion` enum('Pastillas','Inyectable','Jarabe','Otro') COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicacion`
--

LOCK TABLES `medicacion` WRITE;
/*!40000 ALTER TABLE `medicacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `medicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medico`
--

DROP TABLE IF EXISTS `medico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medico` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ID_especialidad` int DEFAULT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `matricula` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `medico_unique` (`matricula`),
  KEY `ID_especialidad` (`ID_especialidad`),
  CONSTRAINT `medico_ibfk_1` FOREIGN KEY (`ID_especialidad`) REFERENCES `especialidad` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medico`
--

LOCK TABLES `medico` WRITE;
/*!40000 ALTER TABLE `medico` DISABLE KEYS */;
INSERT INTO `medico` VALUES (1,1,' Juan Pérez','ABC123'),(2,2,'Maria Muñoz','DEF456'),(3,3,'Hector Rodrigez','GHI789'),(4,4,'Ana Gomez','LMN101'),(5,5,'Carlos Ruíz','OPQ111'),(6,6,'Marta Quiroga','RST213');
/*!40000 ALTER TABLE `medico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nacionalidad`
--

DROP TABLE IF EXISTS `nacionalidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nacionalidad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nacionalidad`
--

LOCK TABLES `nacionalidad` WRITE;
/*!40000 ALTER TABLE `nacionalidad` DISABLE KEYS */;
INSERT INTO `nacionalidad` VALUES (1,'Argentina'),(2,'Uruguay'),(3,'Paraguay'),(4,'Chile'),(5,'Bolivia'),(6,'Peru'),(7,'Costa Rica'),(8,'Colombia'),(9,'Mexico');
/*!40000 ALTER TABLE `nacionalidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obra_social`
--

DROP TABLE IF EXISTS `obra_social`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `obra_social` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obra_social`
--

LOCK TABLES `obra_social` WRITE;
/*!40000 ALTER TABLE `obra_social` DISABLE KEYS */;
INSERT INTO `obra_social` VALUES (1,'OSECAC'),(2,'Femesa'),(3,'ANDAR'),(4,'Construir salud'),(5,'DOSEP'),(6,'Andes salud'),(7,'Medife'),(8,'PAMI'),(9,'visitar');
/*!40000 ALTER TABLE `obra_social` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente`
--

DROP TABLE IF EXISTS `paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paciente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) NOT NULL,
  `Apellido` varchar(255) NOT NULL,
  `DNI` varchar(255) NOT NULL,
  `FechaNacimiento` datetime NOT NULL,
  `Direccion` varchar(255) NOT NULL,
  `Telefono` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Genero` char(1) NOT NULL,
  `Contacto_emergencia` varchar(255) NOT NULL,
  `ID_Nacionalidad` int NOT NULL,
  `ID_Obra_social` int DEFAULT NULL,
  `plan_id` int DEFAULT NULL,
  `numero_afiliado` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `DNI` (`DNI`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
INSERT INTO `paciente` VALUES (2,'Juan','Perez','33333333','2000-06-20 00:00:00','calle 1234','+54233123123','juan@gmail.com','H','+542664111111',2,1,2,123456),(3,'Julieta','Moyano','32123123','1992-09-08 00:00:00','Sarmiento','+542665321213','julieta@gmail.com','M','+542664111111',1,3,13,1234),(6,'ramon','bbb','22222222','1999-09-09 00:00:00','abc','+11111111111','aaabbb@gmail.com','H','+54222222222',1,3,12,5432),(12,'Lucia','Suarez','32333222','1999-08-31 00:00:00','av. 123','+5425123123','Lucia@gmail.com','M','+5445676562',6,3,14,213),(14,'Mario','lopez','13543456','2000-10-10 00:00:00','grl paz','+5412312312','Mariolo@gmail.com','H','+0987654321',7,3,13,123456),(17,'flor','perez','27453457','1987-04-06 00:00:00','hnadsljkbfj','+54123456789','flor@gmail.com','M','+541298765432',4,2,8,423),(19,'Pablo','errdas','28234567','1980-08-07 00:00:00','Sarmiento','+542665036260','pablo@gmail.com','H','+542665123123',3,3,13,876),(20,'federico','frsffs','21768987','2005-10-06 00:00:00','dajkf','+542665038765','fede@gmail.com','H','+54987654321',1,2,6,1245),(25,'margarita','Moyano','48221576','1994-09-05 00:00:00','Sarmiento','+42665036260','debora.m.moyano@gmail.com','M','+542665123123',1,2,6,123),(26,'luciana','gonzalez','40221576','2002-03-12 00:00:00','bsbs','+5411345765','luli@gmail.com','M','+0987654321',7,1,3,55),(27,'Marcos','Zapata','12370330','1994-10-10 00:00:00','Guemes','+542665036260','zapata@gmail.com','H','+54222222222',2,3,12,13),(28,'Pepita','Gonzalez','50000000','2010-08-05 00:00:00','illia','+542665036260','pepa@gmail.com','M','+542664111111',1,3,14,123),(29,'Nicolas','Perez','35200200','1991-07-07 00:00:00','bssbsb','+542665036280','nico@gmail.com','H','+542664111111',1,2,6,1234),(30,'susana','lalala','10435234','1969-05-04 00:00:00','lala','+54665036260','suss@gmail.com','M','+542664111111',3,NULL,NULL,NULL),(31,'Debora','Moyano','38221576','1994-09-05 00:00:00','Av. Sarmiento 2228','+542665036260','debora.m.moyano@gmail.com','M','+542664189417',1,2,7,1234),(32,'Micaela','Sanchez','11111111','1995-11-04 00:00:00','babab','+54288987123','mica@gmail.com','M','+54222222222',1,2,5,5463),(33,'Guadalupe','Brotzu','45212334','2009-10-14 00:00:00','mendoza','+54266789898','guada@gmail.com','M','+542665036250',1,3,14,1234),(45,'Carolina','Medina','25255255','1980-12-25 00:00:00','Sarmiento 2090','+54266252525','caro@gmail.com','M','+542665123123',1,2,7,963),(48,'Gabriela','Fernandez','55100100','1985-05-04 00:00:00','lsaklflkabf','+5425551114','gabt@gmail.com','M','+54222222222',6,3,12,123);
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan_obra_social`
--

DROP TABLE IF EXISTS `plan_obra_social`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan_obra_social` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_plan` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `obra_social_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `obra_social_id` (`obra_social_id`),
  CONSTRAINT `plan_obra_social_ibfk_1` FOREIGN KEY (`obra_social_id`) REFERENCES `obra_social` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_obra_social`
--

LOCK TABLES `plan_obra_social` WRITE;
/*!40000 ALTER TABLE `plan_obra_social` DISABLE KEYS */;
INSERT INTO `plan_obra_social` VALUES (1,'basico',1),(2,'plata',1),(3,'bronce',1),(4,'oro',1),(5,'basico',2),(6,'integral',2),(7,'privilegio',2),(8,'primordial',2),(9,'inclución',5),(10,'materno',5),(11,'mujer',5),(12,'integral',3),(13,'premium',3),(14,'familiar',3),(15,'basico',4),(16,'premium',4),(17,'intermedio',4),(18,'bronce',6),(19,'plata',6),(20,'oro',6),(21,'diamante',6),(22,'familiar',7),(23,'completo',7),(24,'privilegio',8),(25,'maternidad',8),(26,'premium',8),(27,'basic',9),(28,'medium',9),(29,'premium',9);
/*!40000 ALTER TABLE `plan_obra_social` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tratamiento`
--

DROP TABLE IF EXISTS `tratamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tratamiento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ID_HistorialMedico` int DEFAULT NULL,
  `ID_Doctor` int DEFAULT NULL,
  `Descripcion` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Frecuencia` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Duracion` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ID_HistorialMedico` (`ID_HistorialMedico`),
  KEY `ID_Doctor` (`ID_Doctor`),
  CONSTRAINT `tratamiento_ibfk_1` FOREIGN KEY (`ID_HistorialMedico`) REFERENCES `historialmedico` (`ID`),
  CONSTRAINT `tratamiento_ibfk_2` FOREIGN KEY (`ID_Doctor`) REFERENCES `medico` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tratamiento`
--

LOCK TABLES `tratamiento` WRITE;
/*!40000 ALTER TABLE `tratamiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `tratamiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tratamientomedicacion`
--

DROP TABLE IF EXISTS `tratamientomedicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tratamientomedicacion` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_Tratamiento` int DEFAULT NULL,
  `ID_Medicacion` int DEFAULT NULL,
  `Dosis` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Frecuencia` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Tratamiento` (`ID_Tratamiento`),
  KEY `ID_Medicacion` (`ID_Medicacion`),
  CONSTRAINT `tratamientomedicacion_ibfk_1` FOREIGN KEY (`ID_Tratamiento`) REFERENCES `tratamiento` (`id`),
  CONSTRAINT `tratamientomedicacion_ibfk_2` FOREIGN KEY (`ID_Medicacion`) REFERENCES `medicacion` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tratamientomedicacion`
--

LOCK TABLES `tratamientomedicacion` WRITE;
/*!40000 ALTER TABLE `tratamientomedicacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `tratamientomedicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turno`
--

DROP TABLE IF EXISTS `turno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turno` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `id_paciente` int DEFAULT NULL,
  `medico_id` int DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `paciente_id` (`id_paciente`),
  KEY `medico_id` (`medico_id`),
  CONSTRAINT `turno_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id`),
  CONSTRAINT `turno_ibfk_2` FOREIGN KEY (`medico_id`) REFERENCES `medico` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turno`
--

LOCK TABLES `turno` WRITE;
/*!40000 ALTER TABLE `turno` DISABLE KEYS */;
INSERT INTO `turno` VALUES (12,29,5,'2025-06-26','21:09:00'),(13,31,2,'2025-06-30','10:30:00'),(14,2,1,'2025-07-04','11:10:00');
/*!40000 ALTER TABLE `turno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rol` enum('Recepcionista','Enfermero','Médico') NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_2` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_3` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_4` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_5` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_6` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_7` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_8` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_9` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_10` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_11` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_12` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_13` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_14` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_15` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_16` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_17` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_18` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_19` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_20` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_21` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_22` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_23` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_24` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_25` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_26` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_27` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_28` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_29` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_30` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_31` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_32` (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario_33` (`nombre_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Maria123','1234','Recepcionista');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'sistemahospital'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-16 21:29:37
