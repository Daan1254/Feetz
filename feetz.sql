-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server versie:                5.7.36 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Versie:              11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Databasestructuur van feetz wordt geschreven
CREATE DATABASE IF NOT EXISTS `feetz` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `feetz`;

-- Structuur van  tabel feetz.chat wordt geschreven
CREATE TABLE IF NOT EXISTS `chat` (
  `chat_id` int(11) NOT NULL AUTO_INCREMENT,
  `allowed_users` json NOT NULL,
  `messages` json NOT NULL,
  PRIMARY KEY (`chat_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumpen data van tabel feetz.chat: 1 rows
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` (`chat_id`, `allowed_users`, `messages`) VALUES
	(2, '{"users": [1, 2]}', '[]');
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;

-- Structuur van  tabel feetz.jobs wordt geschreven
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `title` varchar(300) NOT NULL,
  `information` varchar(500) NOT NULL,
  `backgroundImg` longtext,
  `price` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumpen data van tabel feetz.jobs: ~4 rows (ongeveer)
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` (`id`, `userid`, `title`, `information`, `backgroundImg`, `price`) VALUES
	(1, 2, 'Website programmeren', 'ik programmeer een profecionele website voor je', 'https://cdn.discordapp.com/attachments/750272962590015498/981919803625332777/WIN_20210629_14_49_23_Pro.jpg', NULL),
	(2, 2, 'website programmeren', 'ik programmeer een profecionele website voor je', 'https://cdn.discordapp.com/attachments/750272962590015498/981919803625332777/WIN_20210629_14_49_23_Pro.jpg', NULL),
	(3, 2, 'website programmeren', 'ik programmeer een profecionele website voor je', 'https://cdn.discordapp.com/attachments/750272962590015498/981919803625332777/WIN_20210629_14_49_23_Pro.jpg', NULL),
	(4, 2, 'website programmeren', 'ik programmeer een profecionele website voor je', 'https://cdn.discordapp.com/attachments/750272962590015498/981919803625332777/WIN_20210629_14_49_23_Pro.jpg', NULL);
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;

-- Structuur van  tabel feetz.users wordt geschreven
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(200) NOT NULL,
  `password` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumpen data van tabel feetz.users: ~2 rows (ongeveer)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `password`) VALUES
	(1, 'admin', 'admin'),
	(2, 'tijn', 'tijn');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
