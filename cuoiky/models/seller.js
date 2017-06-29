var Q = require('q');
var mustache = require('mustache');
var db = require('../app-helpers/dbHelper');

exports.insert = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'insert into san_pham (TenSanPham, GiaHienTai, GiaMuaNgay, IdLoaiDanhMuc, IdKHBan, ThoiGianBatDau, ChiTietSanPham, BuocGia, TuDongGiaHan, HinhAnh, HinhAnh2, HinhAnh3) values ("{{TenSanPham}}", {{GiaHienTai}}, {{GiaMuaNgay}},{{IdLoaiDanhMuc}},{{IdKHBan}},{{ThoiGianBatDau}},"{{{ChiTietSanPham}}}",{{BuocGia}},{{TuDongGiaHan}},"{{HinhAnh}}","{{HinhAnh2}}","{{HinhAnh3}}")',
            entity
        );
    db.insert(sql).then(function(insertId) {
        deferred.resolve(insertId);
    });

    return deferred.promise;
}

exports.loadSellerInfo = function(id) {

    var deferred = Q.defer();

    var sql = 'select * from khach_hang where KhachHangId = ' + id;
    db.load(sql).then(function(rows) {
        deferred.resolve(rows);
    });

    return deferred.promise;
}
