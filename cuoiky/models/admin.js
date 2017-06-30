var Q = require('q');
var mustache = require('mustache');
var db = require('../app-helpers/dbHelper');

exports.loadAllRequest = function() {

    var deferred = Q.defer();

    var sql = 'select * from DS_XIN_QUYEN_BAN, KHACH_HANG where IdNguoiMua = KhachHangId';
    db.load(sql).then(function(rows) {
        deferred.resolve(rows);
    });

    return deferred.promise;
}

exports.acceptSeller = function(entity) {

    var deferred = Q.defer();

    var sqlUpdateCustomer =
        mustache.render(
            'update khach_hang set LoaiKhachHang="{{loaikhachhang}}" where KhachHangId = {{khachhangid}}',
            entity
        );

    var sqlDelete = 
        mustache.render(
            'DELETE FROM DS_XIN_QUYEN_BAN WHERE IdNguoiMua = {{khachhangid}}',
            entity
        );
    db.update(sqlUpdateCustomer).then(function(user) {
        deferred.resolve(user);
    });
    db.delete(sqlDelete).then(function(user) {
        deferred.resolve(user);
    });

    return deferred.promise;
}


exports.deleteCustomer = function(entity) {

    var deferred = Q.defer();

    var sqlDelete = 
        mustache.render(
            'DELETE FROM khach_hang WHERE KhachHangId = {{khachhangid}}',
            entity
        );
    db.delete(sqlDelete).then(function(user) {
        deferred.resolve(user);
    });

    return deferred.promise;
}

exports.resetPass = function(entity) {

    var deferred = Q.defer();

    var sqlUpdateCustomer =
        mustache.render(
            'update khach_hang set MatKhau="{{matkhau}}" where KhachHangId = {{khachhangid}}',
            entity
        );
    db.update(sqlUpdateCustomer).then(function(user) {
        deferred.resolve(user);
    });

    return deferred.promise;
}
