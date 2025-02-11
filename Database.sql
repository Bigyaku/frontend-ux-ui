-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for user_db
CREATE DATABASE IF NOT EXISTS `user_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `user_db`;

-- Dumping structure for table user_db.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table user_db.sequelizemeta: ~1 rows (approximately)
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20250205120737-add-email-column-to-users.js');

-- Dumping structure for table user_db.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `reset_token` varchar(255) DEFAULT NULL,
  `token_expiration` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table user_db.users: ~6 rows (approximately)
INSERT INTO `users` (`id`, `username`, `password`, `email`, `createdAt`, `updatedAt`, `reset_token`, `token_expiration`) VALUES
	(9, '1234', '$2a$10$8FQ.UZycOLcru7zJN68aeuTgEUfx/LSEr.eVWrf4./y3WAGpmM22W', 'howardziri@gmail.com', '2025-02-06 16:12:04', '2025-02-07 20:10:44', 'ac66d1c8957373b373ee727ca67b0ebfc0cb7247', 1738937444309),
	(10, 'dddd', '$2a$10$nRUuZfm58myq.4fZULWrY.ml3V8mQ3gf0iE2DuKttHN.PFL5Pmsg2', '111@up.ac.th', '2025-02-06 16:17:05', '2025-02-06 16:17:05', NULL, NULL),
	(11, 'ssss', '$2a$10$QOrF4cDGBGHs9JIya/Jbfu2f0FkrsaOFnXTsyiv0bkHCDDx8geCe.', 'ssss@gmail.com', '2025-02-06 17:07:37', '2025-02-06 17:07:37', NULL, NULL),
	(12, 'aaaa', '$2a$10$Y2rglCGeSXx6mCVrGzfBBujsiMwhFKs1rMEsGvMsvpNasDkNsJgRG', 'aaaa@up.ac.th', '2025-02-06 17:33:24', '2025-02-06 17:33:24', NULL, NULL),
	(13, 'zzzz', '$2a$10$eD03p4VxhMtEJJyByZByp.EJbJ3KNGUgC0ZtYQ/eqKfU.a4ls6lBy', 'zzzz@gmail.com', '2025-02-06 19:15:50', '2025-02-06 19:15:50', NULL, NULL),
	(14, 'xxxx', '$2a$10$3I7ZNLNJ0i9V8IRrnaDsFecuC6QJEsEdSOMJJTQEJ9iB1QSgmnE5y', 'xxxx@gmail.com', '2025-02-07 20:18:12', '2025-02-07 20:18:12', NULL, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
