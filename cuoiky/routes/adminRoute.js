var express = require('express');
var product = require('../models/product');
var restrict = require('../middle-wares/restrict');


var searchRoute = express.Router();

// searchRoute.post('/', function(req, res) {
//     var rec_per_page = 4;
//     var curPage = req.query.page ? req.query.page : 1;
//     var offset = (curPage - 1) * rec_per_page;
//     product.searchProduct(req.body.txtKeyword, req.body.selectDanhMuc, rec_per_page, offset).then(function(rows) {
//         var number_of_pages = rows.total / rec_per_page;
//         if (rows.total % rec_per_page > 0) {
//             number_of_pages++;
//         }

//         var pages = [];
//         for (var i = 1; i <= number_of_pages; i++) {
//             pages.push({
//                 pageValue: i,
//                 isActive: i === +curPage
//             });
//         }
//         var ret = {
//             layoutModels: res.locals.layoutModels,
//             products: rows,
//             isEmpty: rows.total===0,
//             catId: req.body.selectDanhMuc,
//             pages: pages,
//             curPage: curPage,
//             prevPage: curPage - 1,
//             nextPage: curPage + 1,
//             showPrevPage: curPage > 1,
//             showNextPage: curPage < number_of_pages - 1,
//         }
//         res.render('search/index', ret);
//     });
// });

// searchRoute.post('/', function(req, res) {
//     var rec_per_page = 4;
//     var curPage = req.query.page ? req.query.page : 1;
//     var offset = (curPage - 1) * rec_per_page;
//     product.searchProduct(req.body.txtKeyword, req.body.selectDanhMuc, rec_per_page, offset)
//         .then(function(rows) {
//         var number_of_pages = rows.total / rec_per_page;
//         if (rows.total % rec_per_page > 0) {
//             number_of_pages++;
//         }

//         var pages = [];
//         for (var i = 1; i <= number_of_pages; i++) {
//             pages.push({
//                 pageValue: i,
//                 catId: rows.catId,
//                 proName: rows.proName,
//                 isActive: i === +curPage
//             });
//         }
//         var ret = {
//             layoutModels: res.locals.layoutModels,
//             products: rows.list,
//             isEmpty: rows.total===0,
            
//             pages: pages,
//             curPage: curPage,
//             prevPage: curPage - 1,
//             nextPage: curPage + 1,
//             showPrevPage: curPage > 1,
//             showNextPage: curPage < number_of_pages - 1,
//         }
//         res.render('search/index', ret);
//     });
// });

searchRoute.get('/', function(req, res) {
    var rec_per_page = 4;
    var curPage = req.query.page ? req.query.page : 1;
    var offset = (curPage - 1) * rec_per_page;
    var numSort = req.query.sort ? req.query.sort : 0;
    var sort = "";
    if (numSort == 1) {
        sort = " ORDER BY ThoiGianKetThuc ASC ";
    } else if (numSort == 2) {
        sort = " ORDER BY GiaHienTai DESC ";
    }
    product.searchProduct(req.query.txtKeyword, req.query.selectDanhMuc, rec_per_page, offset, sort)
        .then(function(rows) {
        var number_of_pages = rows.total / rec_per_page;
        if (rows.total % rec_per_page > 0) {
            number_of_pages++;
        }
        var index = 1;
        var pages = [];
        for (var i = 1; i <= number_of_pages; i++) {
            index = i;
            pages.push({
                pageValue: i,
                catId: rows.catId,
                proName: rows.proName,
                isActive: i === +curPage,
                sort: numSort            
            });
        }
        var aProducts = [];
        aProducts = rows.list;
        var aCusName = rows.customerName;
        if (aCusName.length != 0) {
            for (var i = 0; i< aProducts.length; i++) {
                if(aCusName[i]['HoTen'] != null) {
                    aProducts[i]['nameCustomer'] = aCusName[i]['HoTen'].slice(0,5) +"*****";
                } else {
                    aProducts[i]['nameCustomer'] = "Không có";
                }
            } 
        }
        var ret = {
            layoutModels: res.locals.layoutModels,
            products: aProducts,
            isEmpty: rows.total===0,
            pageValue: curPage,
            catId: rows.catId,
            proName: rows.proName,
            pages: pages,
            sort: numSort,
            curPage: curPage,
            prevPage: curPage - 1,
            nextPage: curPage + 1,
            showPrevPage: curPage > 1,
            showNextPage: curPage < number_of_pages - 1,
        }
        res.render('search/index', ret);
    });
});

searchRoute.post('/ajax', function(req, res) {
        product.getProductLike(req.session.user.khachhangid, req.body.id)
            .then(function(rows) {
            if (rows.total <= 0) {
                product.insertLike(req.session.user.khachhangid, req.body.id)
                    .then(function(insertId) {
                    res.send("success");
                });
            } else {
                res.send("error");
            }
        });
});

searchRoute.get('/RemoveLike/:id', function(req, res) {
        product.deleteLike(req.session.user.khachhangid, req.params.id)
            .then(function(rows) {
                var rec_per_page = 4;
    var curPage = req.query.page ? req.query.page : 1;
    var offset = (curPage - 1) * rec_per_page;
    console.log(req.session.user.khachhangid);
    product.loadProductLike(req.session.user.khachhangid, rec_per_page, offset)
        .then(function(data) {
            var number_of_pages = data.total / rec_per_page;
            if (data.total % rec_per_page > 0) {
                number_of_pages++;
            }

            var pages = [];
            for (var i = 1; i <= number_of_pages; i++) {
                pages.push({
                    pageValue: i,
                    isActive: i === +curPage
                });
            }
            var aProducts= data.list;
            for (var i = 0; i < data.list.length; i++)
            {
                product.loadNameCustomer(data.list[i]['IdLoaiDanhMuc'])
                    .then(function(rowsName1) {
                    for (var i = 0; i< rowsName1.length; i++) {
                        aProducts[i]['nameCustomer'] = rowsName1[i]['HoTen'].slice(0,5) +"*****";
                    }
                }); 
            }
            if(data.list.length == 1) {
                product.loadNameCustomer(data.list[0]['IdLoaiDanhMuc'])
                    .then(function(rowsName1) {
                    for (var i = 0; i< rowsName1.length; i++) {
                        aProducts[0]['nameCustomer'] = rowsName1[0]['HoTen'].slice(0,5) +"*****";
                    }
                }); 
            }
            res.render('product/listLike', {
                layoutModels: res.locals.layoutModels,
                products: aProducts,
                isEmpty: data.total === 0,
                catId: req.params.id,

                pages: pages,
                curPage: curPage,
                prevPage: curPage - 1,
                nextPage: curPage + 1,
                showPrevPage: curPage > 1,
                showNextPage: curPage < number_of_pages - 1,
            });
        });
                
    });
});



module.exports = searchRoute;