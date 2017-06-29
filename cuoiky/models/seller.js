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

exports.loadPageBySellerID = function(id, limit, offset) {

    var deferred = Q.defer();

    var promises = [];

    var view = {
        id: id,
        limit: limit,
        offset: offset
    };

    var sqlCount = mustache.render('select count(*) as total from san_pham where IdKHBan = {{id}}', view);
    promises.push(db.load(sqlCount));

    var sql = mustache.render('select * from san_pham where IdKHBan = {{id}} limit {{limit}} offset {{offset}}', view);
    promises.push(db.load(sql));

    Q.all(promises).spread(function(totalRow, rows) {
        var data = {
            total: totalRow[0].total,
            list: rows
        }
        deferred.resolve(data);
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

