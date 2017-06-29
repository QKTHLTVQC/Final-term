var express = require('express');
var product = require('../models/product');
var homeRoute = express.Router();

// homeRoute.get('/', function(req, res) {
//  	product.loadTopBid()
//         .then(function(data) {
//             res.render('home/index', {
//                 layoutModels: res.locals.layoutModels,
//                 products: data.list,
//                 isEmpty: data.total,
//             });
//         });
// });

// homeRoute.get('/', function(req, res) {
//     product.loadTopBid()
//         .then(function(rows) {
// 	        product.loadTopCost()
// 		        .then(function(rows2) {	
// 		        	product.loadTopEndTime()
// 		        		.then(function(rows3) {	
// 		        			product.loadNameCustomer(req.query.selectDanhMuc)
// 		        				.then(function(rows4) {	
// 						            var ret = {
// 						                layoutModels: res.locals.layoutModels,
// 						                products: rows,
// 						                products2: rows2,
// 						                products3: rows3,
// 						                isEmpty: rows.total===0,
// 						            }
// 	            					res.render('home/index', ret);  
// 	            }); 
// 	        }); 
//         });
//     });
    

// });

homeRoute.get('/', function(req, res) {
    product.loadHomePage()
        .then(function(rows) {
        var ret = null;
        var aProductsBid = rows.topBid;
        var aProductsCost= rows.topCost;
        var aProductsEndTime= rows.topEndTime;
        for (var i = 0; i < rows.topBid.length; i++)
        {
	        product.loadNameCustomer(rows.topBid[i]['IdLoaiDanhMuc'])
	        	.then(function(rowsName1) {
		        for (var i = 0; i< rowsName1.length; i++) {
		            aProductsBid[i]['nameCustomer'] = rowsName1[i]['HoTen'].slice(0,5) +"*****";
		        }
	        }); 
    	}
    	for (var i = 0; i < rows.topCost.length; i++)
        {
	        product.loadNameCustomer(rows.topCost[i]['IdLoaiDanhMuc'])
	        	.then(function(rowsName1) {
		        for (var i = 0; i< rowsName1.length; i++) {
		            aProductsCost[i]['nameCustomer'] = rowsName1[i]['HoTen'].slice(0,5) +"*****";
		        }
	        }); 
    	}
    	for (var i = 0; i < rows.topCost.length; i++)
        {
	        product.loadNameCustomer(rows.topCost[i]['IdLoaiDanhMuc'])
	        	.then(function(rowsName1) {
		        for (var i = 0; i< rowsName1.length; i++) {
		            aProductsEndTime[i]['nameCustomer'] = rowsName1[i]['HoTen'].slice(0,5) +"*****";
		        }
	        }); 
    	}
    	ret = {
            layoutModels: res.locals.layoutModels,
            products: aProductsBid,
            products2: aProductsCost,
            products3: aProductsEndTime,
        }
    	res.render('home/index', ret);
    });
});
module.exports = homeRoute;