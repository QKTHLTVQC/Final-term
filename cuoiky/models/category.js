var Q = require('q');
var mustache = require('mustache');
var db = require('../app-helpers/dbHelper');

exports.loadAll = function() {

    var deferred = Q.defer();

    var sql = 'select * from danh_muc';
    db.load(sql).then(function(rows) {
        deferred.resolve(rows);
    });

    return deferred.promise;
}

exports.insertCategory = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'insert into danh_muc (TenDanhMuc) values ("{{tendanhmuc}}")',
            entity
        );

    db.insert(sql).then(function(insertId) {
        deferred.resolve(insertId);
    });

    return deferred.promise;
}

exports.updateCategory = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'update danh_muc set TenDanhMuc="{{tendanhmuc}}" where DanhMucId = {{danhmucid}}',
            entity
        );

    db.update(sql).then(function(category) {
        deferred.resolve(category);
    });

    return deferred.promise;
}

exports.deleteCategory = function(entity) {

    var deferred = Q.defer();

    var sqlDelete = 
        mustache.render(
            'DELETE FROM danh_muc WHERE DanhMucId = {{danhmucid}}',
            entity
        );
    db.delete(sqlDelete).then(function(category) {
        deferred.resolve(category);
    });

    return deferred.promise;
}