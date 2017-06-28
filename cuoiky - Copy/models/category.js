var Q = require('q');
var db = require('../app-helpers/dbHelper');

exports.loadAll = function() {

    var deferred = Q.defer();

    var sql = 'select * from danh_muc';
    db.load(sql).then(function(rows) {
        deferred.resolve(rows);
    });

    return deferred.promise;
}