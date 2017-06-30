var Q = require('q');
var mustache = require('mustache');

var db = require('../app-helpers/dbHelper');



exports.insert = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'insert into khach_hang (HoTen, DiaChi, Email, MatKhau, LoaiKhachHang) values ("{{hoten}}", "{{diachi}}", "{{email}}", "{{matkhau}}", "{{loaikhachhang}}")',
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
            var DiemDanhGia = (rows[0].DiemDGDuong - rows[0].DiemDGAm)/(rows[0].DiemDGDuong + rows[0].DiemDGAm) * 100;
			DiemDanhGia = DiemDanhGia.toFixed(1);
            var user = {
                khachhangid: rows[0].KhachHangId,
                matkhau: rows[0].MatKhau,
                hoten: rows[0].HoTen,
                diachi: rows[0].DiaChi,
                email: rows[0].Email,
                diemdanhgia: DiemDanhGia,
                loaikhachhang: rows[0].LoaiKhachHang
            }
            deferred.resolve(user);
        } else {
            deferred.resolve(null);
        }
    });

    return deferred.promise;
}

exports.loadSameEmail = function(entity) {

    var deferred = Q.defer();

    var sql = mustache.render('select * from KHACH_HANG where Email = "{{email}}"',entity);
    db.load(sql).then(function(rows) {
        if (rows.length > 0) {
            var email = rows[0].Email;
            deferred.resolve(email);
        } else {
            deferred.resolve(null);
        }
    });

    return deferred.promise;
}

exports.loadCustomerInfo = function(entity) {

    var deferred = Q.defer();

    var sql = mustache.render('select * from KHACH_HANG where KhachHangId = {{khachhangid}}',entity);
    db.load(sql).then(function(rows) {
        if (rows.length > 0) {
            var DiemDanhGia = (rows[0].DiemDGDuong - rows[0].DiemDGAm)/(rows[0].DiemDGDuong + rows[0].DiemDGAm) * 100;
            DiemDanhGia = DiemDanhGia.toFixed(1);
            var user = {
                khachhangid: rows[0].KhachHangId,
                matkhau: rows[0].MatKhau,
                hoten: rows[0].HoTen,
                diachi: rows[0].DiaChi,
                email: rows[0].Email,
                diemdanhgia: DiemDanhGia,
                loaikhachhang: rows[0].LoaiKhachHang
            };
            deferred.resolve(user);
        } else {
            deferred.resolve(null);
        }
    });

    return deferred.promise;
}

exports.ratingPlus = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'update khach_hang set DiemDGDuong=DiemDGDuong+1 where KhachHangId = {{nguoinhanid}}',
            entity
        );

    var sqlInsert =
        mustache.render(
            'insert into BANG_DANH_GIA (NguoiDangId, NguoiNhanId, NoiDung, DiemDanhGia) values ({{nguoidangid}}, {{nguoinhanid}}, "{{noidung}}", {{diemdanhgia}})',
            entity
        );

    db.update(sql).then(function(user) {
		console.log("update");
        deferred.resolve(user);
    });
    db.insert(sqlInsert).then(function(insertId) {
		console.log("insert");
        deferred.resolve(insertId);

    });


    return deferred.promise;
}

exports.ratingMinus = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'update khach_hang set DiemDGAm=DiemDGAm+1 where KhachHangId = {{nguoinhanid}}',
            entity
        );

    var sqlInsert =
        mustache.render(
            'insert into bang_danh_gia (NguoiDangId, NguoiNhanId, NoiDung, DiemDanhGia) values ({{nguoidangid}}, {{nguoinhanid}}, "{{noidung}}", {{diemdanhgia}})',
            entity
        );
    db.update(sql).then(function(user) {
         console.log("update");
        db.insert(sqlInsert).then(function(insertId) {
        console.log("insertId");
            deferred.resolve(insertId);

        });
    });

    return deferred.promise;
}

exports.loadRatedInfo = function(entity) {

    var deferred = Q.defer();

    var sql = mustache.render('select KH.HoTen, KH.Email, BDG.NoiDung,BDG.DiemDanhGia from BANG_DANH_GIA as BDG, KHACH_HANG as KH where BDG.NguoiNhanId = {{khachhangid}} and BDG.NguoiDangId = KH.KhachHangId',entity);
    db.load(sql).then(function(rows) {
        console.log("--------------"+rows+"-------------");
        if (rows.length > 0) {
            var arrRatings = [];
            rows.forEach(function(item) {
                var rating = {
                    hoten:item.HoTen,
                    email:item.Email,
                    noidung:item.NoiDung,
                    diemdanhgia:item.DiemDanhGia
                };
                arrRatings.push(rating);
            });
            deferred.resolve(arrRatings);
        } else {
            deferred.resolve(null);
        }
    });

    return deferred.promise;
}

exports.checkRatedOrNot = function(entity) {

    var deferred = Q.defer();

    var sql = mustache.render('select * from BANG_DANH_GIA where NguoiNhanId = {{nguoinhanid}} and NguoiDangId = {{nguoidangid}}',entity);
    db.load(sql).then(function(rows) {
        if (rows.length > 0) {
            deferred.resolve(rows);
        } else {
            deferred.resolve(null);
        }
    });

    return deferred.promise;
}


exports.sellRequest  = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'insert into DS_XIN_QUYEN_BAN (IdNguoiMua, ThoiGianXin) values ({{idnguoimua}}, {{thoigianxin}})',
            entity
        );

    db.insert(sql).then(function(insertId) {
        deferred.resolve(insertId);
    });

    return deferred.promise;
}

exports.checkSellRequested  = function(entity) {

    var deferred = Q.defer();

    var sql = mustache.render('select * from DS_XIN_QUYEN_BAN where IdNguoiMua = {{idnguoimua}}',entity);
    db.load(sql).then(function(rows) {
        if (rows.length > 0) {
            var idnguoimua = rows[0].IdNguoiMua;
            deferred.resolve(idnguoimua);
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