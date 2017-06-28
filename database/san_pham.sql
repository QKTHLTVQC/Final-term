-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 28, 2017 lúc 06:48 CH
-- Phiên bản máy phục vụ: 5.7.14
-- Phiên bản PHP: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `daugia`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `san_pham`
--

CREATE TABLE `san_pham` (
  `SanPhamId` int(11) NOT NULL,
  `TenSanPham` varchar(128) CHARACTER SET utf8 DEFAULT NULL,
  `GiaHienTai` int(11) DEFAULT NULL,
  `GiaMuaNgay` int(11) DEFAULT NULL,
  `LuotRaGia` int(11) DEFAULT NULL,
  `ThoiGianKetThuc` bigint(20) DEFAULT NULL,
  `ThoiGianBatDau` bigint(20) DEFAULT NULL,
  `IdKHGiuGia` int(11) DEFAULT NULL,
  `IdLoaiDanhMuc` int(11) DEFAULT NULL,
  `IdKHBan` int(11) DEFAULT NULL,
  `ChiTietSanPham` varchar(1024) CHARACTER SET utf8 DEFAULT NULL,
  `BuocGia` int(11) DEFAULT NULL,
  `TuDongGiaHan` tinyint(1) DEFAULT NULL,
  `HinhAnh` varchar(128) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `san_pham`
--

INSERT INTO `san_pham` (`SanPhamId`, `TenSanPham`, `GiaHienTai`, `GiaMuaNgay`, `LuotRaGia`, `ThoiGianKetThuc`, `ThoiGianBatDau`, `IdKHGiuGia`, `IdLoaiDanhMuc`, `IdKHBan`, `ChiTietSanPham`, `BuocGia`, `TuDongGiaHan`, `HinhAnh`) VALUES
(1, 'Sản phẩm 1', 20000, NULL, 9, 1498582671520, NULL, 1, 1, 1, NULL, NULL, NULL, NULL),
(2, 'Sản phẩm 2', 60000, NULL, 7, 1498592671520, NULL, 1, 1, 1, NULL, NULL, NULL, NULL),
(3, 'Sản phẩm 3', 200000, NULL, 3, 1498592671520, NULL, 1, 1, 1, NULL, NULL, NULL, NULL),
(4, 'Sản phẩm 4', 600000, NULL, 3, 1498572971520, NULL, 1, 1, 1, NULL, NULL, NULL, NULL),
(5, 'Sản phẩm 5', 650000, NULL, 10, 1498574771520, NULL, 1, 1, 1, NULL, NULL, NULL, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  ADD PRIMARY KEY (`SanPhamId`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  MODIFY `SanPhamId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
