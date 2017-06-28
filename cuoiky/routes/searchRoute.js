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
    product.searchProduct(req.query.txtKeyword, req.query.selectDanhMuc, rec_per_page, offset)
        .then(function(rows) {
        var number_of_pages = rows.total / rec_per_page;
        if (rows.total % rec_per_page > 0) {
            number_of_pages++;
        }

        var pages = [];
        for (var i = 1; i <= number_of_pages; i++) {
            pages.push({
                pageValue: i,
                catId: rows.catId,
                proName: rows.proName,
                isActive: i === +curPage
            });
        }
        var ret = {
            layoutModels: res.locals.layoutModels,
            products: rows.list,
            isEmpty: rows.total===0,
            
            pages: pages,
            curPage: curPage,
            prevPage: curPage - 1,
            nextPage: curPage + 1,
            showPrevPage: curPage > 1,
            showNextPage: curPage < number_of_pages - 1,
        }
        res.render('search/index', ret);
    });
});

module.exports = searchRoute;