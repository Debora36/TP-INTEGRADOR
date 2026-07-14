-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: sistemahospital
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `administracion_medicacion`
--

DROP TABLE IF EXISTS `administracion_medicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administracion_medicacion` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_Tratamiento` int DEFAULT NULL,
  `ID_Enfermero` int DEFAULT NULL,
  `tipo_administracion` varchar(255) NOT NULL DEFAULT 'Prescripto',
  `Fecha_Hora` datetime DEFAULT NULL,
  `Dosis_Aplicada` varchar(50) DEFAULT NULL,
  `Notas` varchar(200) DEFAULT NULL,
  `ID_Internacion` int DEFAULT NULL,
  `ID_Medicacion` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Tratamiento` (`ID_Tratamiento`),
  KEY `ID_Enfermero` (`ID_Enfermero`),
  KEY `administracion_medicacion_ibfk_3` (`ID_Internacion`),
  CONSTRAINT `administracion_medicacion_ibfk_1` FOREIGN KEY (`ID_Tratamiento`) REFERENCES `tratamiento` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `administracion_medicacion_ibfk_2` FOREIGN KEY (`ID_Enfermero`) REFERENCES `enfermero` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `administracion_medicacion_ibfk_3` FOREIGN KEY (`ID_Internacion`) REFERENCES `internacion` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administracion_medicacion`
--

LOCK TABLES `administracion_medicacion` WRITE;
/*!40000 ALTER TABLE `administracion_medicacion` DISABLE KEYS */;
INSERT INTO `administracion_medicacion` VALUES (5,NULL,1,'Habitual','2026-07-06 18:00:18','200','j',2,3),(6,NULL,1,'Alivio del Dolor','2026-07-06 18:00:28','200','´k',2,2),(7,NULL,1,'Alivio del Dolor','2026-07-13 17:38:50','500','el paciente presenta dolor agudo',9,4),(8,NULL,1,'Prescripto','2026-07-13 17:47:13','200','normal',9,10);
/*!40000 ALTER TABLE `administracion_medicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ala_hospital`
--

DROP TABLE IF EXISTS `ala_hospital`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ala_hospital` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nombre_ala` varchar(255) NOT NULL,
  `piso` tinyint NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ala_hospital`
--

LOCK TABLES `ala_hospital` WRITE;
/*!40000 ALTER TABLE `ala_hospital` DISABLE KEYS */;
INSERT INTO `ala_hospital` VALUES (1,'Guardia y Emergencias',0),(2,'Cuidados Intensivos (UTI)',1),(3,'Internación General',2),(4,'Maternidad',3),(5,'Infantil',1),(6,'Psiquiatria',2),(7,'Oncologia',2),(8,'Ginecologia',3);
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
  `ID_Habitacion` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `disponible` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`),
  KEY `ID_Habitacion` (`ID_Habitacion`),
  CONSTRAINT `cama_ibfk_1` FOREIGN KEY (`ID_Habitacion`) REFERENCES `habitacion` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cama`
--

LOCK TABLES `cama` WRITE;
/*!40000 ALTER TABLE `cama` DISABLE KEYS */;
INSERT INTO `cama` VALUES (1,1,'101',1),(2,1,'103',1),(3,2,'201',1),(4,2,'202',1),(5,2,'203',1),(6,3,'204',1),(7,3,'205',1),(8,4,'301',1),(9,4,'302',1),(10,5,'400',1),(11,6,'450',1),(12,7,'500',1),(13,7,'501',1),(14,8,'150',1),(15,8,'151',1),(16,9,'250',1),(17,10,'350',1),(18,11,'550',1),(19,11,'551',1),(20,12,'600',1),(21,13,'651',1),(22,14,'260',1),(23,14,'261',1),(24,15,'320',0),(25,16,'610',1),(26,16,'611',0),(27,17,'612',1),(28,18,'613',1),(29,18,'614',1),(30,19,'615',1),(31,20,'616',1),(32,20,'617',1),(33,21,'618',1),(34,22,'619',1),(35,22,'620',0),(36,23,'621',1);
/*!40000 ALTER TABLE `cama` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_alergias`
--

DROP TABLE IF EXISTS `catalogo_alergias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catalogo_alergias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_alergias`
--

LOCK TABLES `catalogo_alergias` WRITE;
/*!40000 ALTER TABLE `catalogo_alergias` DISABLE KEYS */;
INSERT INTO `catalogo_alergias` VALUES (9,'Ácaros del polvo'),(8,'Aspirina'),(2,'Ibuprofeno'),(3,'Látex'),(10,'Maní'),(1,'Penicilina'),(4,'Polen'),(5,'Sin alergias conocidas'),(6,'Sulfamidas'),(7,'Yodo');
/*!40000 ALTER TABLE `catalogo_alergias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_patologias`
--

DROP TABLE IF EXISTS `catalogo_patologias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catalogo_patologias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_patologias`
--

LOCK TABLES `catalogo_patologias` WRITE;
/*!40000 ALTER TABLE `catalogo_patologias` DISABLE KEYS */;
INSERT INTO `catalogo_patologias` VALUES (7,'Artritis Reumatoide'),(3,'Asma'),(2,'Diabetes Tipo 2'),(9,'Enfermedad Celíaca'),(5,'EPOC'),(1,'Hipertensión Arterial'),(4,'Hipotiroidismo'),(6,'Insuficiencia Cardíaca'),(8,'Insuficiencia Renal Crónica');
/*!40000 ALTER TABLE `catalogo_patologias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enfermero`
--

DROP TABLE IF EXISTS `enfermero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enfermero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `matricula` varchar(100) NOT NULL,
  `ID_Usuario` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `matricula` (`matricula`),
  KEY `ID_Usuario` (`ID_Usuario`),
  CONSTRAINT `enfermero_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuario` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enfermero`
--

LOCK TABLES `enfermero` WRITE;
/*!40000 ALTER TABLE `enfermero` DISABLE KEYS */;
INSERT INTO `enfermero` VALUES (1,'Susana','1234',2);
/*!40000 ALTER TABLE `enfermero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidad` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nombre_especialidad` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidad`
--

LOCK TABLES `especialidad` WRITE;
/*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
INSERT INTO `especialidad` VALUES (1,'Clínica Médica'),(2,'Pediatría'),(3,'Traumatología'),(4,'Cardiología'),(5,'Cirugía General');
/*!40000 ALTER TABLE `especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudio_diagnostico`
--

DROP TABLE IF EXISTS `estudio_diagnostico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudio_diagnostico` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ID_EvolucionMedica` int NOT NULL,
  `tipo_estudio` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_solicitud` datetime DEFAULT NULL,
  `resultado` text,
  PRIMARY KEY (`id`),
  KEY `ID_EvolucionMedica` (`ID_EvolucionMedica`),
  CONSTRAINT `estudio_diagnostico_ibfk_1` FOREIGN KEY (`ID_EvolucionMedica`) REFERENCES `evolucion_medica` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudio_diagnostico`
--

LOCK TABLES `estudio_diagnostico` WRITE;
/*!40000 ALTER TABLE `estudio_diagnostico` DISABLE KEYS */;
INSERT INTO `estudio_diagnostico` VALUES (1,8,'Laboratorio','orina completo','2026-06-21 23:48:13','bjlvgblihgjgbhjkbkjbbo'),(5,25,'Ecografía','intravaginal','2026-07-13 17:42:28',NULL);
/*!40000 ALTER TABLE `estudio_diagnostico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluacion_ingreso`
--

DROP TABLE IF EXISTS `evaluacion_ingreso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluacion_ingreso` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_Internacion` int NOT NULL,
  `ID_Enfermero` int NOT NULL,
  `Fecha_Hora` datetime NOT NULL,
  `Motivo_Principal` text,
  `Sintomas_Desc` varchar(255) DEFAULT NULL,
  `Prioridad` varchar(255) DEFAULT NULL,
  `Plan_Cuidados_Preliminar` text,
  PRIMARY KEY (`ID`),
  KEY `ID_Internacion` (`ID_Internacion`),
  KEY `ID_Enfermero` (`ID_Enfermero`),
  CONSTRAINT `evaluacion_ingreso_ibfk_1` FOREIGN KEY (`ID_Internacion`) REFERENCES `internacion` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `evaluacion_ingreso_ibfk_2` FOREIGN KEY (`ID_Enfermero`) REFERENCES `enfermero` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluacion_ingreso`
--

LOCK TABLES `evaluacion_ingreso` WRITE;
/*!40000 ALTER TABLE `evaluacion_ingreso` DISABLE KEYS */;
INSERT INTO `evaluacion_ingreso` VALUES (1,2,1,'2026-06-14 01:06:36','Dolor abdominal','nauseas','Baja','reposo'),(3,8,1,'2026-07-13 02:42:01','Apendicitis','dolor agudo','Alta','ayuno absoluto'),(4,9,1,'2026-07-13 17:36:09','quiste ovarico','dolor zona abdominal','Alta','reposo');
/*!40000 ALTER TABLE `evaluacion_ingreso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evolucion_medica`
--

DROP TABLE IF EXISTS `evolucion_medica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evolucion_medica` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_Internacion` int DEFAULT NULL,
  `ID_Medico` int DEFAULT NULL,
  `Fecha` datetime DEFAULT NULL,
  `Diagnostico_Evolutivo` text,
  `Observaciones` text,
  `plan_atencion` text,
  PRIMARY KEY (`ID`),
  KEY `ID_Internacion` (`ID_Internacion`),
  KEY `ID_Medico` (`ID_Medico`),
  CONSTRAINT `evolucion_medica_ibfk_1` FOREIGN KEY (`ID_Internacion`) REFERENCES `internacion` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `evolucion_medica_ibfk_2` FOREIGN KEY (`ID_Medico`) REFERENCES `medico` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evolucion_medica`
--

LOCK TABLES `evolucion_medica` WRITE;
/*!40000 ALTER TABLE `evolucion_medica` DISABLE KEYS */;
INSERT INTO `evolucion_medica` VALUES (1,2,1,'2026-06-21 20:33:09','gastroenteritis','lucido','dieta'),(2,2,1,'2026-06-21 20:34:24','gastroenteritis','igual','lo mismo'),(8,2,1,'2026-06-21 23:48:13','fiebre','Paciente lucido','continuar medicacion'),(23,2,1,'2026-07-08 18:56:32','neumonia','lucido','cpntinuar'),(25,9,1,'2026-07-13 17:42:28','quiste en tratamiento','paciente lucido','administrar la medicacion, reposo absoluto');
/*!40000 ALTER TABLE `evolucion_medica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evolucion_signos_vitales`
--

DROP TABLE IF EXISTS `evolucion_signos_vitales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evolucion_signos_vitales` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_Internacion` int DEFAULT NULL,
  `ID_Enfermero` int DEFAULT NULL,
  `Fecha_Hora` datetime DEFAULT NULL,
  `Presion_Arterial` varchar(20) DEFAULT NULL,
  `Frecuencia_Cardiaca` int DEFAULT NULL,
  `Frecuencia_Respiratoria` int DEFAULT NULL,
  `Temperatura` decimal(4,1) DEFAULT NULL,
  `Observaciones` text,
  PRIMARY KEY (`ID`),
  KEY `ID_Internacion` (`ID_Internacion`),
  KEY `ID_Enfermero` (`ID_Enfermero`),
  CONSTRAINT `evolucion_signos_vitales_ibfk_1` FOREIGN KEY (`ID_Internacion`) REFERENCES `internacion` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `evolucion_signos_vitales_ibfk_2` FOREIGN KEY (`ID_Enfermero`) REFERENCES `enfermero` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evolucion_signos_vitales`
--

LOCK TABLES `evolucion_signos_vitales` WRITE;
/*!40000 ALTER TABLE `evolucion_signos_vitales` DISABLE KEYS */;
INSERT INTO `evolucion_signos_vitales` VALUES (1,2,1,'2026-06-14 01:05:37','120/75',80,16,36.8,'Piel: Normal | Estímulos: 5'),(6,2,1,'2026-07-06 17:56:29','120/75',70,15,36.5,'Piel: Pálido | Estímulos: 4'),(7,8,1,'2026-07-13 01:45:28','121/77',80,15,36.5,'Piel: Normal | Estímulos: 5'),(8,9,1,'2026-07-13 17:38:08','120/80',80,16,37.0,'Piel: Pálido | Estímulos: 4');
/*!40000 ALTER TABLE `evolucion_signos_vitales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitacion`
--

DROP TABLE IF EXISTS `habitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitacion` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_ala_hospital` int NOT NULL,
  `Numero` int NOT NULL,
  `camas_disponibles` tinyint NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_ala_hospital` (`ID_ala_hospital`),
  CONSTRAINT `habitacion_ibfk_1` FOREIGN KEY (`ID_ala_hospital`) REFERENCES `ala_hospital` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitacion`
--

LOCK TABLES `habitacion` WRITE;
/*!40000 ALTER TABLE `habitacion` DISABLE KEYS */;
INSERT INTO `habitacion` VALUES (1,2,101,2),(2,3,201,3),(3,3,202,2),(4,1,301,2),(5,2,102,1),(6,2,103,1),(7,2,104,2),(8,3,203,2),(9,3,204,1),(10,3,205,1),(11,1,302,2),(12,1,303,1),(13,1,304,1),(14,4,250,2),(15,4,260,1),(16,5,350,2),(17,5,351,1),(18,6,352,2),(19,6,353,1),(20,7,354,2),(21,7,355,1),(22,8,356,2),(23,8,357,1);
/*!40000 ALTER TABLE `habitacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internacion`
--

DROP TABLE IF EXISTS `internacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `internacion` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_Paciente` int NOT NULL,
  `ID_Habitacion` int NOT NULL,
  `ID_Cama` int NOT NULL,
  `FechaIngreso` datetime NOT NULL,
  `FechaAlta` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Paciente` (`ID_Paciente`),
  KEY `ID_Habitacion` (`ID_Habitacion`),
  KEY `ID_Cama` (`ID_Cama`),
  CONSTRAINT `internacion_ibfk_1` FOREIGN KEY (`ID_Paciente`) REFERENCES `paciente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `internacion_ibfk_2` FOREIGN KEY (`ID_Habitacion`) REFERENCES `habitacion` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `internacion_ibfk_3` FOREIGN KEY (`ID_Cama`) REFERENCES `cama` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_fechas_internacion` CHECK (((`FechaAlta` is null) or (`FechaAlta` > `FechaIngreso`)))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internacion`
--

LOCK TABLES `internacion` WRITE;
/*!40000 ALTER TABLE `internacion` DISABLE KEYS */;
INSERT INTO `internacion` VALUES (2,1,15,24,'2026-06-13 22:01:15',NULL),(7,3,7,12,'2026-07-12 23:02:43','2026-07-13 01:47:24'),(8,3,16,26,'2026-07-12 23:04:20',NULL),(9,11,22,35,'2026-07-13 17:33:30',NULL);
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
  `Nombre` varchar(30) DEFAULT NULL,
  `Descripcion` text,
  `Presentacion` enum('Comprimido','Capsula','Inyectable','Jarabe','Aerosol','Otro','Pastillas') DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicacion`
--

LOCK TABLES `medicacion` WRITE;
/*!40000 ALTER TABLE `medicacion` DISABLE KEYS */;
INSERT INTO `medicacion` VALUES (1,'Diclofenac','Antiinflamatorio','Inyectable'),(2,'Dipirona','Analgésico','Inyectable'),(3,'Dexametasona','Corticoide','Inyectable'),(4,'Ibuprofeno','Analgésico, antipirético y antiinflamatorio no esteroideo.','Comprimido'),(5,'Amoxicilina','Antibiótico de amplio espectro para el tratamiento de infecciones bacterianas.','Capsula'),(6,'Omeprazol','Inhibidor de la bomba de protones, utilizado como protector gástrico.','Capsula'),(7,'Paracetamol','Analgésico y antipirético para el alivio del dolor leve a moderado y la fiebre.','Comprimido'),(8,'Salbutamol','Broncodilatador de acción rápida indicado para el alivio del asma y broncoespasmos.','Aerosol'),(9,'Loratadina','Antihistamínico de segunda generación para el control de cuadros alérgicos.','Comprimido'),(10,'Metoclopramida','Antiemético y procinético indicado para el alivio de náuseas y vómitos.','Inyectable');
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
  `nombre` varchar(50) NOT NULL,
  `matricula` varchar(100) NOT NULL,
  `ID_Usuario` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `matricula` (`matricula`),
  KEY `ID_especialidad` (`ID_especialidad`),
  KEY `ID_Usuario` (`ID_Usuario`),
  CONSTRAINT `medico_ibfk_1` FOREIGN KEY (`ID_especialidad`) REFERENCES `especialidad` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `medico_ibfk_2` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuario` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medico`
--

LOCK TABLES `medico` WRITE;
/*!40000 ALTER TABLE `medico` DISABLE KEYS */;
INSERT INTO `medico` VALUES (1,NULL,'Carlos','12345',3);
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
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nacionalidad`
--

LOCK TABLES `nacionalidad` WRITE;
/*!40000 ALTER TABLE `nacionalidad` DISABLE KEYS */;
INSERT INTO `nacionalidad` VALUES (1,'Argentina'),(2,'Brasil'),(3,'Chile'),(4,'Uruguay'),(5,'Bolivia'),(6,'Mexico'),(7,'Paraguay'),(8,'Peru'),(9,'Colombia');
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
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obra_social`
--

LOCK TABLES `obra_social` WRITE;
/*!40000 ALTER TABLE `obra_social` DISABLE KEYS */;
INSERT INTO `obra_social` VALUES (1,'DOSEP'),(2,'PAMI'),(3,'OSDE'),(4,'Swiss Medical'),(5,'Galeno'),(6,'Sin Obra Social');
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
  UNIQUE KEY `DNI` (`DNI`),
  KEY `ID_Obra_social` (`ID_Obra_social`),
  KEY `plan_id` (`plan_id`),
  CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`ID_Obra_social`) REFERENCES `obra_social` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `paciente_ibfk_2` FOREIGN KEY (`plan_id`) REFERENCES `plan_obra_social` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `chk_genero` CHECK ((`Genero` in (_utf8mb4'H',_utf8mb4'M')))
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
INSERT INTO `paciente` VALUES (1,'Debora','Moyano','38221576','1994-09-05 00:00:00','Sarmiento 2228','+542662525250','debora.m.moyano@gmail.com','M','+542664189417',1,2,5,432),(3,'Juan','Perez','33333333','1989-04-01 00:00:00','junin 123','+54266252525','juan@gmail.com','H','+542664111111',3,2,5,2),(11,'Micaela','Jofre','12370330','1982-09-21 00:00:00','Juan Saa 333','+54266252525','mjofre@gmail.com','M','+54222222222',1,4,10,963);
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente_alergias`
--

DROP TABLE IF EXISTS `paciente_alergias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paciente_alergias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_paciente` int NOT NULL,
  `id_alergia` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `paciente_alergias_id_alergia_id_paciente_unique` (`id_paciente`,`id_alergia`),
  KEY `id_alergia` (`id_alergia`),
  CONSTRAINT `paciente_alergias_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paciente_alergias_ibfk_2` FOREIGN KEY (`id_alergia`) REFERENCES `catalogo_alergias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente_alergias`
--

LOCK TABLES `paciente_alergias` WRITE;
/*!40000 ALTER TABLE `paciente_alergias` DISABLE KEYS */;
INSERT INTO `paciente_alergias` VALUES (61,1,4),(63,3,1),(62,3,3),(65,11,5);
/*!40000 ALTER TABLE `paciente_alergias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente_antecedentes_familiares`
--

DROP TABLE IF EXISTS `paciente_antecedentes_familiares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paciente_antecedentes_familiares` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_paciente` int NOT NULL,
  `id_patologia` int NOT NULL,
  `parentesco` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_paciente` (`id_paciente`),
  KEY `id_patologia` (`id_patologia`),
  CONSTRAINT `paciente_antecedentes_familiares_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paciente_antecedentes_familiares_ibfk_2` FOREIGN KEY (`id_patologia`) REFERENCES `catalogo_patologias` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente_antecedentes_familiares`
--

LOCK TABLES `paciente_antecedentes_familiares` WRITE;
/*!40000 ALTER TABLE `paciente_antecedentes_familiares` DISABLE KEYS */;
INSERT INTO `paciente_antecedentes_familiares` VALUES (38,3,2,'Hermano/a'),(39,3,1,'Abuelo/a'),(45,1,2,'Padre'),(46,11,4,'Madre');
/*!40000 ALTER TABLE `paciente_antecedentes_familiares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente_cirugias`
--

DROP TABLE IF EXISTS `paciente_cirugias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paciente_cirugias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_paciente` int NOT NULL,
  `cirugia` varchar(255) NOT NULL,
  `fecha` date DEFAULT NULL,
  `observaciones` text,
  PRIMARY KEY (`id`),
  KEY `id_paciente` (`id_paciente`),
  CONSTRAINT `paciente_cirugias_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente_cirugias`
--

LOCK TABLES `paciente_cirugias` WRITE;
/*!40000 ALTER TABLE `paciente_cirugias` DISABLE KEYS */;
INSERT INTO `paciente_cirugias` VALUES (7,3,'Biopsia','2026-06-01','Benigno'),(12,11,'cesaria','2025-11-01','sin complicaciones');
/*!40000 ALTER TABLE `paciente_cirugias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente_enfermedades`
--

DROP TABLE IF EXISTS `paciente_enfermedades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paciente_enfermedades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_paciente` int NOT NULL,
  `id_patologia` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `paciente_enfermedades_id_patologia_id_paciente_unique` (`id_paciente`,`id_patologia`),
  KEY `id_patologia` (`id_patologia`),
  CONSTRAINT `paciente_enfermedades_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paciente_enfermedades_ibfk_2` FOREIGN KEY (`id_patologia`) REFERENCES `catalogo_patologias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente_enfermedades`
--

LOCK TABLES `paciente_enfermedades` WRITE;
/*!40000 ALTER TABLE `paciente_enfermedades` DISABLE KEYS */;
INSERT INTO `paciente_enfermedades` VALUES (47,1,3),(48,3,3),(50,11,4);
/*!40000 ALTER TABLE `paciente_enfermedades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente_medicacion_habitual`
--

DROP TABLE IF EXISTS `paciente_medicacion_habitual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paciente_medicacion_habitual` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_paciente` int NOT NULL,
  `id_medicacion` int NOT NULL,
  `dosis_diaria` varchar(100) DEFAULT NULL,
  `frecuencia` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_paciente` (`id_paciente`),
  KEY `id_medicacion` (`id_medicacion`),
  CONSTRAINT `paciente_medicacion_habitual_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paciente_medicacion_habitual_ibfk_2` FOREIGN KEY (`id_medicacion`) REFERENCES `medicacion` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente_medicacion_habitual`
--

LOCK TABLES `paciente_medicacion_habitual` WRITE;
/*!40000 ALTER TABLE `paciente_medicacion_habitual` DISABLE KEYS */;
INSERT INTO `paciente_medicacion_habitual` VALUES (38,3,3,'200','24'),(39,3,1,'75','7'),(42,1,2,'75','24');
/*!40000 ALTER TABLE `paciente_medicacion_habitual` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan_obra_social`
--

DROP TABLE IF EXISTS `plan_obra_social`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan_obra_social` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_plan` varchar(255) NOT NULL,
  `obra_social_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `obra_social_id` (`obra_social_id`),
  CONSTRAINT `plan_obra_social_ibfk_1` FOREIGN KEY (`obra_social_id`) REFERENCES `obra_social` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_obra_social`
--

LOCK TABLES `plan_obra_social` WRITE;
/*!40000 ALTER TABLE `plan_obra_social` DISABLE KEYS */;
INSERT INTO `plan_obra_social` VALUES (1,'basico',1),(2,'familiar',1),(3,'premium',1),(4,'bronce',2),(5,'plata',2),(6,'oro',2),(7,'plus',3),(8,'basico',3),(9,'familia',4),(10,'individual',4),(11,'basico',5),(12,'familiar',5),(13,'bronce',6),(14,'plata',6),(15,'oro',6),(16,'diamante',6);
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
  `ID_EvolucionMedica` int DEFAULT NULL,
  `ID_Medico` int DEFAULT NULL,
  `Descripcion` varchar(50) DEFAULT NULL,
  `Duracion` varchar(50) DEFAULT NULL,
  `tipo_tratamiento` varchar(100) NOT NULL,
  `estado` varchar(20) DEFAULT 'Activo',
  PRIMARY KEY (`id`),
  KEY `ID_EvolucionMedica` (`ID_EvolucionMedica`),
  KEY `ID_Medico` (`ID_Medico`),
  CONSTRAINT `tratamiento_ibfk_1` FOREIGN KEY (`ID_EvolucionMedica`) REFERENCES `evolucion_medica` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tratamiento_ibfk_2` FOREIGN KEY (`ID_Medico`) REFERENCES `medico` (`id`),
  CONSTRAINT `chk_estado_tratamiento` CHECK ((`estado` in (_utf8mb4'Activo',_utf8mb4'Finalizado',_utf8mb4'Suspendido')))
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tratamiento`
--

LOCK TABLES `tratamiento` WRITE;
/*!40000 ALTER TABLE `tratamiento` DISABLE KEYS */;
INSERT INTO `tratamiento` VALUES (11,23,1,'con las comidas','14','Farmacológico','Activo'),(13,25,NULL,'con las comidas','3 dias','Farmacológico','Activo');
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
  `Dosis` varchar(50) DEFAULT NULL,
  `Frecuencia` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `tratamientomedicacion_ID_Medicacion_ID_Tratamiento_unique` (`ID_Tratamiento`,`ID_Medicacion`),
  KEY `ID_Medicacion` (`ID_Medicacion`),
  CONSTRAINT `tratamientomedicacion_ibfk_1` FOREIGN KEY (`ID_Tratamiento`) REFERENCES `tratamiento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tratamientomedicacion_ibfk_2` FOREIGN KEY (`ID_Medicacion`) REFERENCES `medicacion` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tratamientomedicacion`
--

LOCK TABLES `tratamientomedicacion` WRITE;
/*!40000 ALTER TABLE `tratamientomedicacion` DISABLE KEYS */;
INSERT INTO `tratamientomedicacion` VALUES (6,11,1,'200','12'),(8,13,10,'200','6hs');
/*!40000 ALTER TABLE `tratamientomedicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turno`
--

DROP TABLE IF EXISTS `turno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turno` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_paciente` int NOT NULL,
  `medico_id` int NOT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `estado` varchar(20) DEFAULT 'Pendiente',
  PRIMARY KEY (`id`),
  KEY `id_paciente` (`id_paciente`),
  KEY `medico_id` (`medico_id`),
  CONSTRAINT `turno_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `turno_ibfk_2` FOREIGN KEY (`medico_id`) REFERENCES `medico` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_estado_turno` CHECK ((`estado` in (_utf8mb4'Pendiente',_utf8mb4'Presente')))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turno`
--

LOCK TABLES `turno` WRITE;
/*!40000 ALTER TABLE `turno` DISABLE KEYS */;
INSERT INTO `turno` VALUES (1,1,1,'2026-06-27','16:35:00','Presente'),(3,1,1,'2026-06-20','19:15:00','Presente'),(4,3,1,'2026-06-20','16:30:00','Presente'),(5,3,1,'2026-06-22','11:30:35','Presente'),(6,3,1,'2026-06-23','16:30:00','Pendiente'),(7,1,1,'2026-07-08','20:00:00','Pendiente');
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
  UNIQUE KEY `nombre_usuario` (`nombre_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Maria123','$2b$10$l6UVD3czMmCfC81RbYB0qeOhwXCRCAHPWZxtzqfMHcAt4PODbCQa2','Recepcionista'),(2,'Susana','$2b$10$vLr/hjk7OaFrkkpJ3ac9GeKYIi.6.acu2C.jigh3/k4yQ6CrckTxK','Enfermero'),(3,'Carlos','$2b$10$JQkMegRXYqqjhQ5jyyZpuun4b17uiSBB0eLTLAACgh4D.zGBDRNyW','Médico');
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

-- Dump completed on 2026-07-14 20:20:29
