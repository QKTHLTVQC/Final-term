var express = require('express');
var product = require('../models/product'); 

var productRoute = express.Router();

productRoute.get('/byCat/:id', function(req, res) {

    // product.loadAllByCat(req.params.id)
    //     .then(function(list) {
    //         res.render('product/byCat', {
    //             layoutModels: res.locals.layoutModels,
    //             products: list,
    //             isEmpty: list.length === 0,
    //             catId: req.params.id
    //         });
    //     });

    var rec_per_page = 4;
    var curPage = req.query.page ? req.query.page : 1;
    var offset = (curPage - 1) * rec_per_page;

    product.loadPageByCat(req.params.id, rec_per_page, offset)
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
            res.render('product/byCat', {
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

productRoute.get('/detail/:id', function(req, res) {
    product.loadDetail(req.params.id)
        .then(function(pro) {
            var aProducts= pro;
            if (pro) {
                // product.loadNameSeller(req.params.id)
                //     .then(function(rowsName) {
                //         aProducts['nameSeller'] = rowsName['HoTen'];
                //         var DiemDanhGia = (rowsName['DiemDGDuong'] - rowsName['DiemDGAm'])/(rowsName['DiemDGDuong'] + rowsName['DiemDGAm']) * 100;
                //         DiemDanhGia = DiemDanhGia.toFixed(1);
                //         aProducts['pointSeller'] = DiemDanhGia;
                //     product.loadNameSellerbyId(req.params.id)
                //         .then(function(rowsName2) {
                //             aProducts['nameCustomer'] = rowsName2['HoTen'];
                //             var DiemDanhGia2 = (rowsName2['DiemDGDuong'] - rowsName2['DiemDGAm'])/(rowsName2['DiemDGDuong'] + rowsName2['DiemDGAm']) * 100;
                //             DiemDanhGia2 = DiemDanhGia2.toFixed(1);
                //             aProducts['pointCustomer'] = DiemDanhGia2;
                //     });
                // });
                product.loadName(req.params.id)
                    .then(function(rowsName) {
                        aProducts['nameSeller'] = rowsName.Seller['HoTen'];
                        var DiemDanhGia = (rowsName.Seller['DiemDGDuong'] - rowsName.Seller['DiemDGAm'])/(rowsName.Seller['DiemDGDuong'] + rowsName.Seller['DiemDGAm']) * 100;
                        DiemDanhGia = DiemDanhGia.toFixed(1);
                        aProducts['pointSeller'] = DiemDanhGia;

                        aProducts['nameCustomer'] = rowsName.Customer['HoTen'];
                        var DiemDanhGia2 = (rowsName.Customer['DiemDGDuong'] - rowsName.Customer['DiemDGAm'])/(rowsName.Customer['DiemDGDuong'] + rowsName.Customer['DiemDGAm']) * 100;
                        DiemDanhGia2 = DiemDanhGia2.toFixed(1);
                        aProducts['pointCustomer'] = DiemDanhGia2;
                });    
                
                res.render('product/detail', {
                    layoutModels: res.locals.layoutModels,
                    product: aProducts,
                });
            } else {
                res.redirect('/home');
            }
        });
});

module.exports = productRoute;