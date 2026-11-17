/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.6-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: system
-- ------------------------------------------------------
-- Server version	11.8.6-MariaDB-0+deb13u1 from Debian

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `requestid` int(11) NOT NULL,
  `device` varchar(255) NOT NULL,
  `status` int(11) DEFAULT 0,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
INSERT INTO `request` VALUES
(10,1,'3',1,'21'),
(11,2,'2',1,'7'),
(12,1,'3',1,'7'),
(13,1,'4',1,'7'),
(14,1,'4',2,'7'),
(15,1,'4',0,'7'),
(16,1,'1',2,'7'),
(17,1,'1',1,'7'),
(18,1,'1',2,'7'),
(19,1,'1',0,'7'),
(20,1,'1',0,'7'),
(21,1,'1',1,'7'),
(22,1,'1',0,'7'),
(23,1,'1',0,'7'),
(24,1,'2',0,'23'),
(25,1,'2',0,'23'),
(26,1,'3',0,'23'),
(27,4,'3',0,'23'),
(28,1,'2',0,'23'),
(29,2,'2',0,'23'),
(30,1,'2',0,'23'),
(31,1,'8',0,'23'),
(32,5,'6',0,'23'),
(33,3,'8',0,'23'),
(34,1,'5',0,'23'),
(35,1,'4',0,'23'),
(36,1,'1',0,'23');
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'123456','$2b$10$.WVubgiULmcfR/NCCcY3FeBxYj9wuU7YtoFBxnpmZZVaq9G4vSJiq'),
(2,'12345621313','$2b$10$CYyYUDUaLm2UMU06De7tCO/Fce46CM.Te5n/cr.0bzFQGFFNktPaa'),
(3,'text1','$2b$10$fgMQ9M.iGESZjgtbHaeiA.LRd/D6/8nFpR9K2tkv3sd4APrr.4mVG'),
(4,'text2','$2b$10$CHuiDEDFJo6YNpp4xgmgxuXKoJXC91xET3euxR9YG02Gf1vUS7N2q'),
(5,'text3','$2b$10$wbHonik6JjHwmN6dGRaYx.RpiJyxvMCV0VKTvBQw3q6paUcYbTbh6'),
(6,'text4','$2b$10$XD6Xnr9Fi7MVBQg3cGB9neax8wKSJhs/MWaS4yrAePZcCOAvp8tuS'),
(7,'text5','$2b$10$MgxsmAY3SO9r04thH048T.BXnd1SaettntW53ORaxmJdK7rId8XWu'),
(8,'text6','$2b$10$OZ8nYZRkuILerk6zc39MjeSqulWDn0Da7.YdzupfJlXrjbnYyRKJ2'),
(12,'admin','$2b$10$qapzudu.ssKeVW0QlC203umaw.97fkvyeD.Crc1/mXYiNc3ShMkFS'),
(15,'','$2b$10$0vueCtUaOwxcBF9YT7ehFu7thnsPMrFfkEQUoz51jKNzwT4DbSLwW'),
(16,'123','$2b$10$.AlJLxgJTnuWKdX88zr33.v2Oji74rPFKoyNhF/pSfEm4.o6rguLa'),
(17,'4444','$2b$10$34KXbE/h0Jtf9HreVvpydOYNRWnjUW2eDU1GBE26X5EF2lAIshWEa'),
(19,'404','$2b$10$LByigxE2gfaAqAKwFb5wvewTgXXhyCqttTQTNImqKEDMz81TaFwoa'),
(20,'11','$2b$10$tvchUXC/XZ5rxwR6gvB5NuRTQ8GQNjmVjRVUNkjo48gQUVHI9zPSG'),
(21,'8888','$2b$10$9NcNuR8jC/jp9cnPqximjOfDWSsr2NIfv9S.Da.Pi179XbjPj81UK'),
(23,'user','$2b$10$pbj6z2TGlRdQeW/zq/huK.s6JWNeLI8h38E87Ao5sghrLiwBLGOwS'),
(24,'onioawneoia','$2b$10$uvdhCodLRWP2g6MV9ZKWzuIOUgz5IwmmmKGKVb0h9RqiqntC.QTNa');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-11-15 22:38:02
