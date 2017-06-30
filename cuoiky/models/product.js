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

exports.loadNameCustomer = function(idLoaiDanhMuc) {

    var deferred = Q.defer();

    var sql = mustache.render('select * from san_pham sp, khach_hang kh where kh.KhachHangId = sp.IdKHGiuGia and sp.IdLoaiDanhMuc = ' + idLoaiDanhMuc);
    db.load(sql).then(function(rows) {
        if (rows) {
            deferred.resolve(rows);
        } else {
            deferred.resolve(null);
        }
    });

    return deferred.promise;
}


exports.loadNameSeller = function(idSanPham) {

    var deferred = Q.defer();

    var sql = mustache.render('select * from san_pham, khach_hang where KhachHangId = IdKHBan and SanPhamId = ' + idSanPham);
    db.load(sql).then(function(rows) {
        deferred.resolve(rows[0]);
    });

    return deferred.promise;
}

exports.loadNameSellerbyId = function(idSanPham) {

    var deferred = Q.defer();

    var sql = mustache.render('select * from san_pham, khach_hang where KhachHangId = IdKHGiuGia and SanPhamId = ' + idSanPham);
    db.load(sql).then(function(rows) {
        deferred.resolve(rows[0]);
    });

    return deferred.promise;
}

exports.loadNameCustomerbyId = function(idSP) {

    var deferred = Q.defer();

    var sql = mustache.render('select * from san_pham sp, khach_hang kh where sp.IdKHGiuGia = kh.KhachHangId  and sp.SanPhamId = ' + idSP);
    db.load(sql).then(function(rows) {
        if (rows) {
            deferred.resolve(rows);
        } else {
            deferred.resolve(null);
        }
    });

    return deferred.promise;
}

exports.loadHomePage = function() {

    var deferred = Q.defer();
    var promises = [];
    //Load top 5 sp có lượt ra giá nhiều nhất
    var sqlLoadTopBid = mustache.render('select * from san_pham ORDER BY LuotRaGia DESC LIMIT 5');
    promises.push(db.load(sqlLoadTopBid));
    //Load top 5 sp có giá cao nhất
    var sqlLoadTopCost = mustache.render('select * from san_pham ORDER BY GiaHienTai DESC LIMIT 5');
    promises.push(db.load(sqlLoadTopCost));
    //Load top 5 sp gần kết thúc đấu giá
    var sqlLoadTopEndTime = mustache.render('select * from san_pham ORDER BY ThoiGianKetThuc ASC LIMIT 5');
    promises.push(db.load(sqlLoadTopEndTime));
    Q.all(promises).spread(function(topBidRow, topCostRow, topEndTimeRow) {
        var data = {
            topBid: topBidRow,
            topCost: topCostRow,
            topEndTime: topEndTimeRow
        }
        deferred.resolve(data);
    });
    return deferred.promise;
}

exports.loadName = function(idSanPham) {

    var deferred = Q.defer();
    var promises = [];
    //Load tên người bán
    var sqlNameSeller = mustache.render('select * from san_pham, khach_hang where KhachHangId = IdKHBan and SanPhamId = ' + idSanPham);
    promises.push(db.load(sqlNameSeller));
    //Load tên người mua
    var sqlNameCustomer = mustache.render('select * from san_pham, khach_hang where KhachHangId = IdKHGiuGia and SanPhamId = ' + idSanPham);
    promises.push(db.load(sqlNameCustomer));
    //Load top 5 sp gần kết thúc đấu giá
    
    Q.all(promises).spread(function(NameSellerRow, NameCustomerRow) {
        if(!NameSellerRow == null) {
            var data = {
                Seller: null,
                Customer: NameCustomerRow[0]
            }
            deferred.resolve(data);        
        } else if(NameCustomerRow == null)
        {
            var data = {
                Seller: NameSellerRow[0],
                Customer: null
            }
            deferred.resolve(data);        
        } else if (NameCustomerRow == null && NameSellerRow == null) {
            var data = {
                Seller: null,
                Customer: null
            }
            deferred.resolve(data);  
        } else {
            var data = {
                Seller: NameSellerRow[0],
                Customer: NameCustomerRow[0]
            }
            deferred.resolve(data);  
        }
        
    });
    return deferred.promise;
}

exports.searchProduct = function(nameProduct, idLoaiDanhMuc, limit, offset, sort) {

    var deferred = Q.defer();
    var promises = [];
    var sql = '';
    if (nameProduct == "") {
        var sqlCount = mustache.render('select count(*) as total from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc );
        promises.push(db.load(sqlCount));

        var sqlCatId = mustache.render('select IdLoaiDanhMuc as catID from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc );
        promises.push(db.load(sqlCatId));

        var sqlProName = mustache.render('select TenSanPham as proName from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc );
        promises.push(db.load(sqlProName));

        var sqlCusName = mustache.render('select * from san_pham sp, khach_hang kh where kh.KhachHangId = sp.IdKHGiuGia and sp.IdLoaiDanhMuc = ' + idLoaiDanhMuc );
        promises.push(db.load(sqlCusName));

        var sql = mustache.render('select * from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc + ' ' + sort + ' limit ' + limit + ' offset ' + offset);
        promises.push(db.load(sql));

        Q.all(promises).spread(function(totalRow, catIdRow, proNameRow, cusNameRow, rows) {
            var data = {
                total: totalRow[0].total,
                catId: catIdRow[0].catID,
                proName: "",
                customerName: cusNameRow,
                list: rows
            }
            deferred.resolve(data);
        });



        // sql = 'select * from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc + ' limit ' + limit + ' offset ' + offset;
        // db.load(sql).then(function(rows) {
        //     deferred.resolve(rows);
        // });
    } else {
        // var sqlCount = mustache.render('select count(*) as total from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc +' and TenSanPham = "' + nameProduct +'"' );
        // promises.push(db.load(sqlCount));

        // var sqlCatId = mustache.render('select IdLoaiDanhMuc as catID from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc +' and TenSanPham = "' + nameProduct +'"' );
        // promises.push(db.load(sqlCatId));

        // var sqlProName = mustache.render('select TenSanPham as proName from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc +' and TenSanPham = "' + nameProduct +'"' );
        // promises.push(db.load(sqlProName));

        // var sql = mustache.render('select * from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc +' and TenSanPham = "' + nameProduct +'"'+ ' ' + sort  + ' limit ' + limit + ' offset ' + offset );
        // promises.push(db.load(sql));

        // Q.all(promises).spread(function(totalRow, catIdRow, proNameRow, rows) {
        //     var data = {
        //         total: totalRow[0].total,
        //         catId: catIdRow[0].catID,
        //         proName: proNameRow[0].proName,
        //         list: rows
        //     }
        //     deferred.resolve(data);
        // });

        var sqlCount = mustache.render('select count(*) as total from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc +' and TenSanPham = "' + nameProduct +'"' );
        promises.push(db.load(sqlCount));

        var sqlCatId = mustache.render('select IdLoaiDanhMuc as catID from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc +' and TenSanPham = "' + nameProduct +'"' );
        promises.push(db.load(sqlCatId));

        var sqlProName = mustache.render('select TenSanPham as proName from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc +' and TenSanPham = "' + nameProduct +'"' );
        promises.push(db.load(sqlProName));

        var sqlCusName = mustache.render('select * from san_pham sp, khach_hang kh where kh.KhachHangId = sp.IdKHGiuGia and sp.IdLoaiDanhMuc = ' + idLoaiDanhMuc +' and TenSanPham = "' + nameProduct +'"' );
        promises.push(db.load(sqlCusName));

        var sql = mustache.render('select * from san_pham where IdLoaiDanhMuc = ' + idLoaiDanhMuc+' and TenSanPham = "' + nameProduct +'"'  + ' ' + sort + ' limit ' + limit + ' offset ' + offset);
        promises.push(db.load(sql));

        Q.all(promises).spread(function(totalRow, catIdRow, proNameRow, cusNameRow, rows) {
            var data = {
                total: totalRow[0].total,
                catId: catIdRow[0].catID,
                proName: proNameRow[0].proName,
                customerName: cusNameRow,
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
exports.loadProductLike = function(id, limit, offset) {

    var deferred = Q.defer();

    var promises = [];

    var view = {
        id: id,
        limit: limit,
        offset: offset
    };

    var sqlCount = mustache.render('select count(*) as total from ds_san_pham ds, san_pham sp where ds.LoaiDSSP = "1" and ds.KhachHangId = {{id}} and sp.SanPhamId = ds.SanPhamId', view);
    promises.push(db.load(sqlCount));

    var sql = mustache.render('select * from ds_san_pham ds, san_pham sp where ds.LoaiDSSP = "1" and ds.KhachHangId = {{id}} and sp.SanPhamId = ds.SanPhamId limit {{limit}} offset {{offset}}', view);
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

exports.searchProductLike = function(id, nameProduct, limit, offset) {

    var deferred = Q.defer();

    var promises = [];

    var view = {
        id: id,
        nameProduct: nameProduct,
        limit: limit,
        offset: offset
    };
    if (nameProduct == "") {
        var sqlCount = mustache.render('select count(*) as total from ds_san_pham ds, san_pham sp where ds.LoaiDSSP = "1" and ds.KhachHangId = {{id}} and sp.SanPhamId = ds.SanPhamId', view);
        promises.push(db.load(sqlCount));

        var sql = mustache.render('select * from ds_san_pham ds, san_pham sp where ds.LoaiDSSP = "1" and ds.KhachHangId = {{id}} and sp.SanPhamId = ds.SanPhamId limit {{limit}} offset {{offset}}', view);
        promises.push(db.load(sql));

        Q.all(promises).spread(function(totalRow, rows) {
            var data = {
                total: totalRow[0].total,
                list: rows
            }
            deferred.resolve(data);
        });
    } else {
        var sqlCount = mustache.render('select count(*) as total from ds_san_pham ds, san_pham sp where ds.LoaiDSSP = "1" and sp.TenSanPham = "{{nameProduct}}" and ds.KhachHangId = {{id}} and sp.SanPhamId = ds.SanPhamId', view);
        promises.push(db.load(sqlCount));

        var sql = mustache.render('select * from ds_san_pham ds, san_pham sp where ds.LoaiDSSP = "1" and sp.TenSanPham = "{{nameProduct}}" and ds.KhachHangId = {{id}}  and sp.SanPhamId = ds.SanPhamId limit {{limit}} offset {{offset}}', view);
        promises.push(db.load(sql));

        Q.all(promises).spread(function(totalRow, rows) {
            var data = {
                total: totalRow[0].total,
                list: rows
            }
            deferred.resolve(data);
        });
   }
    return deferred.promise;
}

exports.getProductLike = function(idKH, idSP) {

    var deferred = Q.defer();

    var promises = [];

    var view = {
        idKH: idKH,
        idSP: idSP
    };
    var sqlCount = mustache.render('select count(*) as total from ds_san_pham where LoaiDSSP = "1" and KhachHangId = {{idKH}} and SanPhamId = {{idSP}}', view);
    promises.push(db.load(sqlCount));

    Q.all(promises).spread(function(totalRow) {
        var data = {
            total: totalRow[0].total,
        }
        deferred.resolve(data);
    });
    return deferred.promise;
}

exports.insertLike = function(idKH, idSP) {
    var deferred = Q.defer();
    var view = {
        idKH: idKH,
        idSP: idSP
    };
    var sql =
        mustache.render(
            'insert into ds_san_pham (KhachHangId, SanPhamId, LoaiDSSP) values ("{{idKH}}", {{idSP}}, "1")',
            view
        );
    db.insert(sql).then(function(insertId) {
        deferred.resolve(insertId);
    });

    return deferred.promise;
}

exports.deleteLike = function(idKH, idSP) {
    var deferred = Q.defer();
    var view = {
        idKH: idKH,
        idSP: idSP
    };
    var sql =
        mustache.render(
            'DELETE FROM ds_san_pham WHERE LoaiDSSP = "1" and KhachHangId = {{idKH}} and SanPhamId = {{idSP}}',
            view
        );
    db.insert(sql).then(function(insertId) {
        deferred.resolve(insertId);
    });

    return deferred.promise;
}

exports.loadProductBid = function(id, limit, offset) {

    var deferred = Q.defer();

    var promises = [];

    var view = {
        id: id,
        limit: limit,
        offset: offset
    };

    var sqlCount = mustache.render('select count(*) as total from ds_san_pham ds, san_pham sp where ds.LoaiDSSP = "2" and ds.KhachHangId = {{id}} and sp.SanPhamId = ds.SanPhamId', view);
    promises.push(db.load(sqlCount));

    var sql = mustache.render('select * from ds_san_pham ds, san_pham sp where ds.LoaiDSSP = "2" and ds.KhachHangId = {{id}} and sp.SanPhamId = ds.SanPhamId limit {{limit}} offset {{offset}}', view);
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

exports.loadProductWon = function(id, limit, offset) {

    var deferred = Q.defer();

    var promises = [];

    var view = {
        id: id,
        limit: limit,
        offset: offset
    };

    var sqlCount = mustache.render('select count(*) as total from ds_san_pham ds, san_pham sp where ds.LoaiDSSP = "3" and ds.KhachHangId = {{id}} and sp.SanPhamId = ds.SanPhamId', view);
    promises.push(db.load(sqlCount));

    var sql = mustache.render('select * from ds_san_pham ds, san_pham sp where ds.LoaiDSSP = "3" and ds.KhachHangId = {{id}} and sp.SanPhamId = ds.SanPhamId limit {{limit}} offset {{offset}}', view);
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

exports.setMoney = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'update SAN_PHAM set GiaHienTai=GiaHienTai+BuocGia, LuotRaGia=LuotRaGia+1, IdKHGiuGia={{khachhangid}} where SanPhamId = {{sanphamid}}',
            entity
        );

    db.update(sql).then(function(product) {
        deferred.resolve(product);
    });

    return deferred.promise;
}
exports.update = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'update san_pham set ChiTietSanPham="{{ChiTietSanPham}}" where SanPhamId = {{sanphamid}}',
            entity
        );

    db.update(sql).then(function(rows) {
        deferred.resolve(rows);
    });

    return deferred.promise;
}
exports.loadProductsOfSeller = function(KhachHangId) {

    var deferred = Q.defer();

    var sql = mustache.render('select * from san_pham sp where sp.IdKHBan =' +  KhachHangId);
    db.load(sql).then(function(rows) {
        deferred.resolve(rows);
    });

    return deferred.promise;
}

exports.loadProfilePage = function(KhachHangId){
    var today = new Date();
    today = today.getTime();
    var deferred = Q.defer();
    var promises = [];
    var sqlNonExpiredProduct = mustache.render('select * from san_pham sp where sp.ThoiGianKetThuc >  ' + today + '  and sp.IdKHBan =' +  KhachHangId);
    promises.push(db.load(sqlNonExpiredProduct));
    var sqlSoldProduct = mustache.render('select * from san_pham sp where sp.ThoiGianKetThuc <  ' + today + ' and IdKHGiuGia IS NOT NULL and sp.IdKHBan =' +  KhachHangId);
    promises.push(db.load(sqlSoldProduct));
    Q.all(promises).spread(function(NonExpiredRow, SoldRow) {
        var data = {
            NonExpired: NonExpiredRow,
            SoldProduct:  SoldRow
        }
        deferred.resolve(data);
    });
    return deferred.promise;
}

exports.addHistory = function(entity) {

    var deferred = Q.defer();
    var sql =
        mustache.render(
            'insert into lich_su_dau_gia (NguoiDauGiaId, SoTien, ThoiGianDauGia, SanPhamId) values ({{khachhangid}}, {{sotien}}, {{thoigiandaugia}}, {{sanphamid}})',
            entity
        );

    db.insert(sql).then(function(historyId) {
        deferred.resolve(historyId);
    });

    return deferred.promise;
}
exports.loadProductAuctioning = function(idNguoiBan, limit, offset) {
    var deferred = Q.defer();
    var promises = [];
    var today = new Date();
    today = today.getTime();
    console.log(today);
    var view = {
        idNguoiBan: idNguoiBan,
        limit: limit,
        offset: offset
    };

    var sqlCount = mustache.render('select count(*) as total from san_pham sp where sp.ThoiGianKetThuc >  ' + today + ' and sp.IdKHBan = {{idNguoiBan}}', view);
    promises.push(db.load(sqlCount));

    var sql = mustache.render('select * from san_pham sp where sp.ThoiGianKetThuc >  ' + today + ' and sp.IdKHBan = {{idNguoiBan}} ' + ' limit {{limit}} offset {{offset}}', view);
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

exports.loadProductSelled = function(idNguoiBan, limit, offset) {
    var deferred = Q.defer();
    var promises = [];
    var today = new Date();
    today = today.getTime();
    var view = {
        idNguoiBan: idNguoiBan,
        limit: limit,
        offset: offset
    };

    var sqlCount = mustache.render('select count(*) as total from san_pham sp where sp.ThoiGianKetThuc <  ' + today + ' and sp.IdKHGiuGia IS NOT NULL   and sp.IdKHBan = {{idNguoiBan}}', view);
    promises.push(db.load(sqlCount));

    var sql = mustache.render('select * from san_pham sp where sp.ThoiGianKetThuc <  ' + today + ' and sp.IdKHGiuGia IS NOT NULL   and sp.IdKHBan = {{idNguoiBan}} ' + ' limit {{limit}} offset {{offset}}', view);
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

exports.loadNameUserById = function(id) {

    var deferred = Q.defer();
    var view = {
        id: id
    };

    var sql = mustache.render('select * from khach_hang where KhachHangId = {{id}}', view);
    db.load(sql).then(function(rows) {
        deferred.resolve(rows);
    });

    return deferred.promise;
}

exports.insertAutoBid = function(idSP, idKH, giaDat) {
    var deferred = Q.defer();
    var view = {
        idKH: idKH,
        idSP: idSP,
        giaDat: giaDat
    };
    var sql =
        mustache.render(
            'insert into tu_dong_bid (idSanPham, gia_dat, idKHDat) values ({{idSP}}, {{giaDat}}, {{idKH}})',
            view
        );
    db.insert(sql).then(function(insertId) {
        deferred.resolve(insertId);
    });

    return deferred.promise;
}

exports.loadListAutoBid = function(idSanPham) {

    var deferred = Q.defer();
    var view = {
        idSanPham: idSanPham
    };

    var sql = mustache.render('select * from tu_dong_bid where idSanPham = {{idSanPham}}', view);
    db.load(sql).then(function(rows) {
        deferred.resolve(rows);
    });

    return deferred.promise;
}

exports.getMaxAuToBid = function(idSanPham) {

    var deferred = Q.defer();
    var view = {
        idSanPham: idSanPham
    };

    var sql = mustache.render('select Max(gia_dat) AS LargestPrice from tu_dong_bid where idSanPham = {{idSanPham}}', view);
    db.load(sql).then(function(rows) {
        deferred.resolve(rows);
    });

    return deferred.promise;
}

exports.setMoneyAutoBid = function(entity) {

    var deferred = Q.defer();

    var sql =
        mustache.render(
            'update SAN_PHAM set GiaHienTai=GiaHienTai+BuocGia, LuotRaGia=LuotRaGia+1 where SanPhamId = {{sanphamid}}',
            entity
        );

    db.update(sql).then(function(product) {
        deferred.resolve(product);
    });

    return deferred.promise;
}