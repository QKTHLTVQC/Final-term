/*
Navicat MySQL Data Transfer

Source Server         : Connection
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : daugia

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-06-30 12:08:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for lich_su_dau_gia
-- ----------------------------
DROP TABLE IF EXISTS `lich_su_dau_gia`;
CREATE TABLE `lich_su_dau_gia` (
  `LichSuId` int(11) NOT NULL AUTO_INCREMENT,
  `NguoiDauGiaId` int(11) DEFAULT NULL,
  `SoTien` int(11) NOT NULL,
  `ThoiGianDauGia` bigint(20) NOT NULL,
  `SanPhamId` int(11) DEFAULT NULL,
  PRIMARY KEY (`LichSuId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lich_su_dau_gia
-- ----------------------------
INSERT INTO `lich_su_dau_gia` VALUES ('1', '100', '550000', '1498799109783', '1');
