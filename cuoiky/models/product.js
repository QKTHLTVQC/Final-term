var Q = require('q');
var mustache = require('mustache');
var db = require('../app-helpers/dbHelper');

exports.loadPageByCat = function(id, limit, offset) {

    var deferred = Q.defer();

    var promises = [];

    var view = {
        id: id,
        limit: limit,
        offset: offset
    };

    var sqlCount = mustache.render('select count(*) as total from san_pham where IdLoaiDanhMuc = {{id}}', view);
    promises.push(db.load(sqlCount));

    var sql = mustache.render('select * from san_pham where IdLoaiDanhMuc = {{id}} limit {{limit}} offset {{offset}}', view);
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

exports.loadAllByCat = function(id) {

    var deferred = Q.defer();

    var sql = 'select * from san_pham where IdLoaiDanhMuc = ' + id;
    db.load(sql).then(function(rows) {
        deferred.resolve(rows);
    });

    return deferred.promise;
}

exports.loadDetail = function(id) {

    var deferred = Q.defer();

    var sql = 'select * from san_pham where SanPhamId = ' + id;
    db.load(sql).then(function(rows) {
        if (rows) {
            deferred.resolve(rows[0]);
        } else {
            deferred.resolve(null);
        }
    });

    return deferred.promise;
}

exports.loadTopBid = function() {

    var deferred = Q.defer();

    var sql = mustache.render('select * from san_pham ORDER BY LuotRaGia DESC LIMIT 5');
    db.load(sql).then(function(rows) {
        deferred.resolve(rows);
    });

    return deferred.promise;
}

exports.loadTopCost = function() {

    var deferred = Q.defer();

    var sql = mustache.render('select * from san_pham ORDER BY GiaHienTai DESC LIMIT 5');
    db.load(sql).then(function(rows) {
        deferred.resolve(rows);
    });

    return deferred.promise;
}

exports.loadTopEndTime = function() {

    var deferred = Q.defer();

    var sql = mustache.render('select * from san_pham ORDER BY ThoiGianKetThuc ASC LIMIT 5');
    db.load(sql).then(function(rows) {
        deferred.resolve(rows);
    });

    return deferred.promise;
}

exports.searchProduct = function(nameProduct, idLoaiDanhMuc, limit, offset) {

    var deferred = Q.defer();
    var promises = [];
    var sql = '';
    if (nameProduct == "") {
        var sqlCount = mustache.render('select count(*) as total from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc);
        promises.push(db.load(sqlCount));

        var sqlCatId = mustache.render('select IdLoaiDanhMuc as catID from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc);
        promises.push(db.load(sqlCatId));

        var sqlProName = mustache.render('select TenSanPham as proName from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc);
        promises.push(db.load(sqlProName));

        var sql = mustache.render('select * from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc + ' limit ' + limit + ' offset ' + offset);
        promises.push(db.load(sql));

        Q.all(promises).spread(function(totalRow, catIdRow, proNameRow, rows) {
            var data = {
                total: totalRow[0].total,
                catId: catIdRow[0].catID,
                proName: "",
                list: rows
            }
            deferred.resolve(data);
        });



        // sql = 'select * from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc + ' limit ' + limit + ' offset ' + offset;
        // db.load(sql).then(function(rows) {
        //     deferred.resolve(rows);
        // });
    } else {
        var sqlCount = mustache.render('select count(*) as total from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc +' and TenSanPham = "' + nameProduct +'"');
        promises.push(db.load(sqlCount));

        var sql = mustache.render('select * from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc +' and TenSanPham = "' + nameProduct +'"' + ' limit ' + limit + ' offset ' + offset);
        promises.push(db.load(sql));

        Q.all(promises).spread(function(totalRow, rows) {
            var data = {
                total: totalRow[0].total,
                list: rows
            }
            deferred.resolve(data);
        });


        // sql = mustache.render('SELECT * FROM san_pham WHERE IdLoaiDanhMuc = '+ idLoaiDanhMuc +' and TenSanPham = "' + nameProduct +'"' + ' limit ' + limit + ' offset ' + offset);
        // db.load(sql).then(function(rows) {
        //     deferred.resolve(rows);
        // });
    }
    

    return deferred.promise;
}
// exports.makeCartItem = function(id, q) {

//     var deferred = Q.defer();

//     var sql = 'select * from products where ProID = ' + id;
//     db.load(sql).then(function(rows) {
//         if (rows) {
//             var ret = {
//                 Product: rows[0],
//                 Quantity: q,
//                 Amount: rows[0].Price * q
//             }
//             deferred.resolve(ret);
//         } else {
//             deferred.resolve(null);
//         }
//     });

//     return deferred.promise;
// }