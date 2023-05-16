-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2022 at 08:53 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simplechatappdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `sessiontbl`
--

CREATE TABLE `sessiontbl` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user1_tbl`
--

CREATE TABLE `user1_tbl` (
  `id` varchar(500) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `lastname` text NOT NULL,
  `firstname` text NOT NULL,
  `connection` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user1_tbl`
--

INSERT INTO `user1_tbl` (`id`, `username`, `password`, `lastname`, `firstname`, `connection`) VALUES
('no1618l6uew2j0', 'username', '$2b$10$zZQc6zJuvOw5jkQmjvEPfOsu/lidx9qUi95lmxOoy7T3SezG.dXtG', 'Dela Cruz', 'Arturo', 'offline');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sessiontbl`
--
ALTER TABLE `sessiontbl`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `user1_tbl`
--
ALTER TABLE `user1_tbl`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
