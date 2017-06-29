/*
Navicat MySQL Data Transfer

Source Server         : Connection
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : daugia

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-06-29 12:19:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for khach_hang
-- ----------------------------
DROP TABLE IF EXISTS `khach_hang`;
CREATE TABLE `khach_hang` (
  `KhachHangId` int(11) NOT NULL AUTO_INCREMENT,
  `DiemDGDuong` int(11) DEFAULT '20' COMMENT 'Điểm đánh giá dương',
  `HoTen` varchar(128) DEFAULT NULL COMMENT 'sell or buy',
  `DiaChi` varchar(256) DEFAULT NULL,
  `Email` varchar(128) DEFAULT NULL,
  `MatKhau` varchar(128) DEFAULT NULL,
  `LoaiKhachHang` varchar(128) DEFAULT NULL,
  `DiemDGAm` int(11) DEFAULT '0' COMMENT 'điểm đánh giá âm',
  PRIMARY KEY (`KhachHangId`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of khach_hang
-- ----------------------------
INSERT INTO `khach_hang` VALUES ('84', '20', '12345', '123456', 'tien@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'buy', '0');
INSERT INTO `khach_hang` VALUES ('87', '20', '12345', 'sdfas', 'tien1@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'buy', '0');
