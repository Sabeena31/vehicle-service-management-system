-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vehicle_service
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `request_id` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `comments` text,
  PRIMARY KEY (`feedback_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,8,7,3,'fknefn');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `invoice_view`
--

DROP TABLE IF EXISTS `invoice_view`;
/*!50001 DROP VIEW IF EXISTS `invoice_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `invoice_view` AS SELECT 
 1 AS `id`,
 1 AS `vehicle_number`,
 1 AS `service_name`,
 1 AS `price`,
 1 AS `total_amount`,
 1 AS `discount`,
 1 AS `tax`,
 1 AS `final_amount`,
 1 AS `payment_status`,
 1 AS `booking_date`,
 1 AS `status`,
 1 AS `user_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `service_id` int DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `payment_status` varchar(50) DEFAULT 'Unpaid',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `request_id` int DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (1,9,500.00,'paid','2026-03-29 12:01:01',NULL,0.00),(3,11,2000.00,'paid','2026-03-29 12:43:47',NULL,0.00),(4,12,1500.00,'paid','2026-03-29 12:54:45',NULL,0.00),(5,13,500.00,'paid','2026-03-29 13:33:50',NULL,0.00),(6,14,2000.00,'paid','2026-03-29 13:35:31',NULL,0.00),(7,15,1500.00,'paid','2026-03-29 14:36:54',NULL,0.00),(8,16,2000.00,'paid','2026-03-29 15:08:29',NULL,0.00),(9,17,2000.00,'Unpaid','2026-03-29 16:32:01',NULL,100.00),(10,18,2000.00,'Unpaid','2026-03-29 16:43:08',NULL,100.00),(11,19,2000.00,'Unpaid','2026-03-29 16:52:01',NULL,100.00);
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `invoice_id` int DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,500.00,'UPI','2026-03-29 12:01:13'),(2,2,500.00,'UPI','2026-03-29 12:31:38'),(3,3,2000.00,'UPI','2026-03-29 12:50:41'),(4,4,1500.00,'UPI','2026-03-29 12:55:44'),(5,5,500.00,'UPI','2026-03-29 13:33:54'),(6,6,2000.00,'UPI','2026-03-29 13:44:46'),(7,7,1500.00,'UPI','2026-03-29 15:06:00'),(8,8,2000.00,'UPI','2026-03-29 15:15:26'),(9,8,2000.00,'UPI','2026-03-29 15:15:29');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_history`
--

DROP TABLE IF EXISTS `service_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_history` (
  `history_id` int NOT NULL AUTO_INCREMENT,
  `vehicle_id` int DEFAULT NULL,
  `request_id` int DEFAULT NULL,
  `service_date` date DEFAULT NULL,
  `remarks` text,
  PRIMARY KEY (`history_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_history`
--

LOCK TABLES `service_history` WRITE;
/*!40000 ALTER TABLE `service_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_list`
--

DROP TABLE IF EXISTS `service_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_list` (
  `service_id` int NOT NULL AUTO_INCREMENT,
  `service_name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_list`
--

LOCK TABLES `service_list` WRITE;
/*!40000 ALTER TABLE `service_list` DISABLE KEYS */;
INSERT INTO `service_list` VALUES (1,'Basic Service',500.00),(2,'Major Service',1500.00),(3,'Repair',2000.00);
/*!40000 ALTER TABLE `service_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_requests`
--

DROP TABLE IF EXISTS `service_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_requests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `vehicle_id` int DEFAULT NULL,
  `service_type` varchar(100) DEFAULT NULL,
  `booking_date` date DEFAULT NULL,
  `status` enum('pending','accepted','in_progress','completed') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `service_id` int DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `user_id` (`user_id`),
  KEY `vehicle_id` (`vehicle_id`),
  CONSTRAINT `service_requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `service_requests_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_requests`
--

LOCK TABLES `service_requests` WRITE;
/*!40000 ALTER TABLE `service_requests` DISABLE KEYS */;
INSERT INTO `service_requests` VALUES (1,6,4,'Basic','2026-03-03','completed','2026-03-29 08:41:59',NULL),(2,6,3,'Repair','2026-03-30','completed','2026-03-29 11:13:26',NULL);
/*!40000 ALTER TABLE `service_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vehicle_id` int DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `booking_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `service_id` int DEFAULT NULL,
  `mechanic_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vehicle_id` (`vehicle_id`),
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (9,4,'completed','2026-03-31','2026-03-29 12:01:01',1,NULL),(11,4,'completed','2026-03-30','2026-03-29 12:43:47',3,NULL),(12,3,'completed','2026-03-31','2026-03-29 12:54:45',2,NULL),(13,3,'completed','2026-03-26','2026-03-29 13:33:50',1,NULL),(14,4,'completed','2026-03-07','2026-03-29 13:35:31',3,11),(15,5,'completed','2026-03-31','2026-03-29 14:36:54',2,11),(16,5,'Completed','2026-03-31','2026-03-29 15:08:29',3,11),(17,6,'Pending','2026-03-31','2026-03-29 16:32:01',3,NULL),(18,5,'Pending','2026-04-04','2026-03-29 16:43:08',3,NULL),(19,5,'Pending','2026-03-31','2026-03-29 16:52:01',3,NULL);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role` enum('admin','customer','mechanic') DEFAULT 'customer',
  `phone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'Rex','lll@test.com','12345','2026-03-28 14:21:50','customer',NULL),(5,'Reonel','reonel123@g.com','321','2026-03-28 14:46:35','customer',NULL),(6,'Rex','rex123@gmail.com','12345','2026-03-28 16:22:44','customer',NULL),(7,'Admin','admin@test.com','123456','2026-03-28 17:53:54','admin',NULL),(8,'Fred Li','fredli@test.com','12345','2026-03-29 14:01:49','customer','91012345'),(11,'Wesly','wesly@test.com','12345','2026-03-29 15:55:37','mechanic',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `vehicle_number` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `brand` varchar(50) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `type` enum('2-wheeler','4-wheeler') DEFAULT NULL,
  `year` int DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES (1,4,'KA2545','2026-03-28 14:40:26',NULL,NULL,NULL,NULL,NULL),(2,5,'0000','2026-03-28 14:47:06',NULL,NULL,NULL,NULL,NULL),(3,6,'000215','2026-03-28 16:23:30',NULL,NULL,NULL,NULL,NULL),(4,6,'020102','2026-03-29 08:41:46',NULL,NULL,NULL,NULL,NULL),(5,8,'KA03542','2026-03-29 14:36:37','Bajaj','Pulsar 150','2-wheeler',2019,'Red'),(6,8,'124556K','2026-03-29 16:31:48','fefef','234','4-wheeler',1324,'fefe');
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `invoice_view`
--

/*!50001 DROP VIEW IF EXISTS `invoice_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `invoice_view` AS select `i`.`id` AS `id`,`v`.`vehicle_number` AS `vehicle_number`,`sl`.`service_name` AS `service_name`,`sl`.`price` AS `price`,`i`.`total_amount` AS `total_amount`,ifnull(`i`.`discount`,0) AS `discount`,round((`i`.`total_amount` * 0.1),0) AS `tax`,((`i`.`total_amount` + round((`i`.`total_amount` * 0.1),0)) - ifnull(`i`.`discount`,0)) AS `final_amount`,`i`.`payment_status` AS `payment_status`,`s`.`booking_date` AS `booking_date`,`s`.`status` AS `status`,`v`.`user_id` AS `user_id` from (((`invoices` `i` join `services` `s` on((`i`.`service_id` = `s`.`id`))) join `vehicles` `v` on((`s`.`vehicle_id` = `v`.`id`))) join `service_list` `sl` on((`s`.`service_id` = `sl`.`service_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-30  0:42:41
