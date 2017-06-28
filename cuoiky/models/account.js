var Q = require('q');
var mustache = require('mustache');

var db = require('../app-helpers/dbHelper');

exports.insert = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'insert into khach_hang (HoTen, DiaChi, Email, MatKhau, DiemDanhGia, LoaiKhachHang) values ("{{hoten}}", "{{diachi}}", "{{email}}", "{{matkhau}}", {{diemdanhgia}}, "{{loaikhachhang}}")',
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

exports.login = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'select * from khach_hang where Email = "{{email}}" and MatKhau = "{{matkhau}}"',
            entity
        );

    db.load(sql).then(function(rows) {
        if (rows.length > 0) {
            var user = {
                khachhangid: rows[0].KhachHangId,
                matkhau: rows[0].MatKhau,
                hoten: rows[0].HoTen,
                diachi: rows[0].DiaChi,
                email: rows[0].Email,
                diemdanhgia: rows[0].DiemDanhGia,
                loaikhachhang: rows[0].LoaiKhachHang
            }
            deferred.resolve(user);
        } else {
            deferred.resolve(null);
        }
    });

    return deferred.promise;
}

// exports.loadProfile = function(email) {

//     var deferred = Q.defer();

//     var sql = mustache.render('select * from khach_hang where Email = "{{email}}"',email);
//     db.load(sql).then(function(rows) {
//         deferred.resolve(rows);
//     });

//     return deferred.promise;
// }