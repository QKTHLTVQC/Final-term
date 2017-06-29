/*
Navicat MySQL Data Transfer

Source Server         : Connection
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : daugia

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-06-29 12:20:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for bang_danh_gia
-- ----------------------------
DROP TABLE IF EXISTS `bang_danh_gia`;
CREATE TABLE `bang_danh_gia` (
  `NguoiDangId` int(11) NOT NULL,
  `NguoiNhanId` int(11) NOT NULL,
  `NoiDung` varchar(256) DEFAULT NULL,
  `DiemDanhGia` int(11) NOT NULL,
  PRIMARY KEY (`NguoiDangId`,`NguoiNhanId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bang_danh_gia
-- ----------------------------
INSERT INTO `bang_danh_gia` VALUES ('1', '84', 'testMinus', '-1');
INSERT INTO `bang_danh_gia` VALUES ('87', '84', 'testPlus', '1');
