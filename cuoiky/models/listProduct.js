var Q = require('q');
var mustache = require('mustache');

var db = require('../app-helpers/dbHelper');
/* 
*danh sách sản phẩm yêu thích:1
*danh sách sản phẩm đang tham gia đấu giá :2
*danh sách sản phẩm bản thân đã thắng :3
*
*/
exports.checkExistOrNot = function(entity) {

    var deferred = Q.defer();

    var sql = mustache.render('select * from DS_SAN_PHAM where KhachHangId = {{khachhangid}} and SanPhamId = {{sanphamid}} and LoaiDSSP like "{{loaidssp}}"',entity);
    db.load(sql).then(function(rows) {
        if (rows.length > 0) {
            deferred.resolve(rows);
        } else {
            deferred.resolve(null);
        }
    });

    return deferred.promise;
}

exports.insert = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'insert into DS_SAN_PHAM (KhachHangId, SanPhamId, LoaiDSSP) values ({{khachhangid}},{{sanphamid}}, "{{loaidssp}}")',
            entity
        );

    db.insert(sql).then(function(insertId) {
        deferred.resolve(insertId);
    });

    return deferred.promise;
}

exports.loadByType = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'select * from DS_SAN_PHAM where LoaiDSSP like "{{loaidssp}}")',
            entity
        );

    db.insert(sql).then(function(insertId) {
        deferred.resolve(insertId);
    });

    return deferred.promise;
}

exports.update = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'update khach_hang set HoTen="{{hoten}}",Email="{{email}}", MatKhau="{{matkhau}}" where KhachHangId = {{khachhangid}}',
            entity
        );

    db.update(sql).then(function(user) {
        deferred.resolve(user);
    });

    return deferred.promise;
}