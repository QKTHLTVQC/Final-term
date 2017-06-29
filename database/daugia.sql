-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 29, 2017 lúc 11:32 CH
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
-- Cấu trúc bảng cho bảng `bang_danh_gia`
--

CREATE TABLE `bang_danh_gia` (
  `NguoiDangId` int(11) NOT NULL,
  `NguoiNhanId` int(11) NOT NULL,
  `NoiDung` varchar(256) DEFAULT NULL,
  `DiemDanhGia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `bang_danh_gia`
--

INSERT INTO `bang_danh_gia` (`NguoiDangId`, `NguoiNhanId`, `NoiDung`, `DiemDanhGia`) VALUES
(1, 84, 'testMinus', -1),
(87, 84, 'testPlus', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danh_muc`
--

CREATE TABLE `danh_muc` (
  `DanhMucId` int(11) DEFAULT NULL,
  `TenDanhMuc` varchar(128) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `danh_muc`
--

INSERT INTO `danh_muc` (`DanhMucId`, `TenDanhMuc`) VALUES
(1, 'Áo'),
(2, 'Quần');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ds_khach_hang`
--

CREATE TABLE `ds_khach_hang` (
  `DSKhachHangId` int(11) NOT NULL,
  `IdKhachHang` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ds_nguoi_dang_ra_gia`
--

CREATE TABLE `ds_nguoi_dang_ra_gia` (
  `SanPhamId` int(11) NOT NULL,
  `IdDSKhachHang` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ds_san_pham`
--

CREATE TABLE `ds_san_pham` (
  `KhachHangId` int(11) NOT NULL,
  `SanPhamId` int(11) NOT NULL,
  `LoaiDSSP` varchar(128) CHARACTER SET utf8 NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `ds_san_pham`
--

INSERT INTO `ds_san_pham` (`KhachHangId`, `SanPhamId`, `LoaiDSSP`) VALUES
(89, 1, '1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ds_xin_quyen_ban`
--

CREATE TABLE `ds_xin_quyen_ban` (
  `DSXinQuyenBanId` int(11) NOT NULL,
  `IdNguoiMua` int(11) DEFAULT NULL,
  `ThoiGianXin` mediumtext
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `ds_xin_quyen_ban`
--

INSERT INTO `ds_xin_quyen_ban` (`DSXinQuyenBanId`, `IdNguoiMua`, `ThoiGianXin`) VALUES
(1, 89, '1498778351860');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khach_hang`
--

CREATE TABLE `khach_hang` (
  `KhachHangId` int(11) NOT NULL,
  `DiemDGDuong` int(11) DEFAULT '20' COMMENT 'Điểm đánh giá dương',
  `HoTen` varchar(128) DEFAULT NULL COMMENT 'sell or buy',
  `DiaChi` varchar(256) DEFAULT NULL,
  `Email` varchar(128) DEFAULT NULL,
  `MatKhau` varchar(128) DEFAULT NULL,
  `LoaiKhachHang` varchar(128) DEFAULT NULL,
  `DiemDGAm` int(11) DEFAULT '0' COMMENT 'điểm đánh giá âm'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `khach_hang`
--

INSERT INTO `khach_hang` (`KhachHangId`, `DiemDGDuong`, `HoTen`, `DiaChi`, `Email`, `MatKhau`, `LoaiKhachHang`, `DiemDGAm`) VALUES
(84, 20, 'Tiên', '123456', 'tien@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'buy', 0),
(87, 20, '12345', 'sdfas', 'tien1@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'buy', 0),
(89, 20, 'Trần Văn A', 'HCMC', 'tva@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'sell', 0);

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
  `ChiTietSanPham` text CHARACTER SET utf8,
  `BuocGia` int(11) DEFAULT NULL,
  `TuDongGiaHan` tinyint(1) DEFAULT NULL,
  `HinhAnh` varchar(128) DEFAULT NULL,
  `HinhAnh3` varchar(128) CHARACTER SET utf8mb4 DEFAULT NULL,
  `HinhAnh2` varchar(128) CHARACTER SET utf8mb4 DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `san_pham`
--

INSERT INTO `san_pham` (`SanPhamId`, `TenSanPham`, `GiaHienTai`, `GiaMuaNgay`, `LuotRaGia`, `ThoiGianKetThuc`, `ThoiGianBatDau`, `IdKHGiuGia`, `IdLoaiDanhMuc`, `IdKHBan`, `ChiTietSanPham`, `BuocGia`, `TuDongGiaHan`, `HinhAnh`, `HinhAnh3`, `HinhAnh2`) VALUES
(1, 'Sản phẩm 1', 20000, NULL, 9, 1498582671520, 1498530000000, 1, 1, 1, '<P><STRONG>Jewelry Information</STRONG></P>\n<UL>\n    <LI>Loại hàng: Hàng trong nước</LI>\n</UL>\n', NULL, NULL, NULL, '', ''),
(2, 'Sản phẩm 2', 60000, NULL, 7, 1498592671520, NULL, 1, 1, 1, NULL, NULL, NULL, NULL, '', ''),
(3, 'Sản phẩm 3', 200000, NULL, 3, 1498592671520, NULL, 1, 1, 1, NULL, NULL, NULL, NULL, '', ''),
(4, 'Sản phẩm 4', 600000, NULL, 3, 1498572971520, NULL, 1, 1, 1, NULL, NULL, NULL, NULL, '', ''),
(5, 'Sản phẩm 5', 650000, NULL, 10, 1498574771520, NULL, 1, 1, 1, NULL, NULL, NULL, NULL, '', ''),
(6, 'Sản phẩm 6', 100000, 250000, NULL, NULL, 1498719956900, NULL, 1, 89, '<P><STRONG>Jewelry Information</STRONG></P>\n<UL>\n    <LI>Loại hàng: Hàng trong nước</LI>\n</UL>\n', 5000, 1, 'aaa', '', ''),
(8, 'AAA', 100000, 250000, NULL, 1498725869448, 1498725669448, 84, 1, 89, 'edsfafds', 5000, 1, '', '', ''),
(9, 'Sản phẩm 7', 100000, 250000, NULL, NULL, 1498732092368, NULL, 1, 89, '&lt;ul&gt;\n	&lt;li&gt;Metal stamp: 14k&lt;&#x2F;li&gt;\n	&lt;li&gt;Metal: yellow-ld&lt;&#x2F;li&gt;\n	&lt;li&gt;Material Type: amethyst, citrine, ld, pearl, peridot&lt;&#x2F;li&gt;\n	&lt;li&gt;Gem Type: citrine, peridot, amethyst&lt;&#x2F;li&gt;\n	&lt;li&gt;Length: 7.5 inches&lt;&#x2F;li&gt;\n	&lt;li&gt;Clasp Type: filigree-box&lt;&#x2F;li&gt;\n	&lt;li&gt;Total metal weight: 0.6 Grams&lt;&#x2F;li&gt;\n&lt;&#x2F;ul&gt;\n\n&lt;p&gt;&lt;strong&gt;Pearl Information&lt;&#x2F;strong&gt;&lt;&#x2F;p&gt;\n\n&lt;p&gt;&amp;nbsp;&lt;&#x2F;p&gt;\n\n&lt;ul&gt;\n	&lt;li&gt;Pearl type: freshwater-cultured&lt;&#x2F;li&gt;\n&lt;&#x2F;ul&gt;\n\n&lt;p&gt;&lt;strong&gt;Packaging Information&lt;&#x2F;strong&gt;&lt;&#x2F;p&gt;\n\n&lt;p&gt;&amp;nbsp;&lt;&#x2F;p&gt;\n\n&lt;p&gt;&amp;nbsp;&lt;&#x2F;p&gt;\n\n&lt;ul&gt;\n	&lt;li&gt;Package: Regal Blue Sueded-Cloth Pouch&lt;&#x2F;li&gt;\n&lt;&#x2F;ul&gt;\n\n&lt;p&gt;&amp;nbsp;&lt;&#x2F;p&gt;\n', 5000, 1, '', '', ''),
(10, 'Sản phẩm 8', 100000, 250000, NULL, NULL, 1498732200263, NULL, 1, 89, '<P><STRONG>Jewelry Information</STRONG></P>\n<UL>\n    <LI>Loại hàng: Hàng trong nước</LI>\n</UL>\n', 5000, 1, '', '', ''),
(11, 'Sản phẩm 9', 100000, 250000, NULL, NULL, 1498732447437, NULL, 1, 89, '<P><STRONG>Jewelry Information</STRONG></P>\n<UL>\n    <LI>Loại hàng: Hàng trong nước</LI>\n</UL>\n', 5000, 1, '', '', ''),
(12, 'Sản phẩm 6', 100000, 250000, NULL, NULL, 1498733039726, NULL, 1, 89, '<P><STRONG>Jewelry Information</STRONG></P>\n<UL>\n    <LI>Loại hàng: Hàng trong nước</LI>\n</UL>\n', 5000, 0, '', '', ''),
(13, 'Sản phẩm 6', 10000, 20000, NULL, NULL, 1498733118418, NULL, 2, 89, '<P><STRONG>Jewelry Information</STRONG></P>\n<UL>\n    <LI>Loại hàng: Hàng trong nước</LI>\n</UL>\n', 5000, 0, '', '', ''),
(14, 'Sản phẩm 6', 100000, 20000, NULL, NULL, 1498733169684, NULL, 1, 89, '<P><STRONG>Jewelry Information</STRONG></P>\n<UL>\n    <LI>Loại hàng: Hàng trong nước</LI>\n</UL>\n', 5000, 0, '', '', ''),
(15, 'Sản phẩm 10', 100000, 250000, NULL, 1498962577495, 1498760577495, 84, 1, 89, '<UL>\n    <LI>Quần áo bé trai</LI>\n    <LI>Loại hàng: Hàng trong nước</LI>\n    <LI>Xuất xứ: Tp Hồ Chí Minh</LI>\n</UL>\n', 5000, 0, '', '', ''),
(16, 'Sản phẩm 11', 100000, 250000, NULL, NULL, 1498761785424, NULL, 1, 89, '<UL>\n    <LI>Quần áo bé trai</LI>\n    <LI>Loại hàng: Hàng trong nước</LI>\n    <LI>Xuất xứ: Tp Hồ Chí Minh</LI>\n</UL>\n', 5000, 0, '1.jpg', 'main.jpg', '2.jpg'),
(17, 'SADsad', 100000, 250000, NULL, NULL, 1498764830285, NULL, 1, 89, '<p> aaaa </p>', 5000, 0, '1.jpg', 'main_thumbs.jpg', 'main.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('Ci3qdO0eB-iabRmsuPCbunPaUmZGDK1z', 1498824068, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"isLogged":true,"user":{"khachhangid":89,"matkhau":"e10adc3949ba59abbe56e057f20f883e","hoten":"Trần Văn A","diachi":"HCMC","email":"tva@gmail.com","diemdanhgia":100,"loaikhachhang":"sell"},"cart":[]}'),
('ZSvQKnRX1-9AKMGbjIFW9b-bK9LsRJAq', 1498865519, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"isLogged":true,"user":{"khachhangid":89,"matkhau":"e10adc3949ba59abbe56e057f20f883e","hoten":"Trần Văn A","diachi":"HCMC","email":"tva@gmail.com","diemdanhgia":100,"loaikhachhang":"sell"},"cart":[]}');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bang_danh_gia`
--
ALTER TABLE `bang_danh_gia`
  ADD PRIMARY KEY (`NguoiDangId`,`NguoiNhanId`);

--
-- Chỉ mục cho bảng `ds_khach_hang`
--
ALTER TABLE `ds_khach_hang`
  ADD PRIMARY KEY (`DSKhachHangId`);

--
-- Chỉ mục cho bảng `ds_nguoi_dang_ra_gia`
--
ALTER TABLE `ds_nguoi_dang_ra_gia`
  ADD PRIMARY KEY (`SanPhamId`);

--
-- Chỉ mục cho bảng `ds_san_pham`
--
ALTER TABLE `ds_san_pham`
  ADD PRIMARY KEY (`KhachHangId`,`SanPhamId`,`LoaiDSSP`);

--
-- Chỉ mục cho bảng `ds_xin_quyen_ban`
--
ALTER TABLE `ds_xin_quyen_ban`
  ADD PRIMARY KEY (`DSXinQuyenBanId`);

--
-- Chỉ mục cho bảng `khach_hang`
--
ALTER TABLE `khach_hang`
  ADD PRIMARY KEY (`KhachHangId`);

--
-- Chỉ mục cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  ADD PRIMARY KEY (`SanPhamId`);

--
-- Chỉ mục cho bảng `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `ds_khach_hang`
--
ALTER TABLE `ds_khach_hang`
  MODIFY `DSKhachHangId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `ds_nguoi_dang_ra_gia`
--
ALTER TABLE `ds_nguoi_dang_ra_gia`
  MODIFY `SanPhamId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `ds_xin_quyen_ban`
--
ALTER TABLE `ds_xin_quyen_ban`
  MODIFY `DSXinQuyenBanId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `khach_hang`
--
ALTER TABLE `khach_hang`
  MODIFY `KhachHangId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;
--
-- AUTO_INCREMENT cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  MODIFY `SanPhamId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
