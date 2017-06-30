var express = require('express');
var category = require('../models/category');
var categoryRoute = express.Router();

categoryRoute.get('/', function(req, res) {
    category.loadAll()
        .then(function(rows) {
            res.render('category/manageCategory', {
		        layoutModels: res.locals.layoutModels,
		        listCategories:rows,
		        showError: false,
		        errorMsg: ''
		    });
        });
});
categoryRoute.post('/insert', function(req, res) {

    console.log(req.body.txtTenDanhMuc);
    var entity = {
        tendanhmuc:req.body.txtTenDanhMuc
    };
    if(req.body.txtTenDanhMuc == null) {
    	res.redirect('/category');
    }
    category.insertCategory(entity)
        .then(function(rows) {
            res.redirect('/category');
        });
});

categoryRoute.get('/delete/:id', function(req, res) {
    var idDanhMuc = req.params.id;
    var entity = {
        danhmucid:idDanhMuc
    };
    category.deleteCategory(entity)
        .then(function(rows) {
            res.redirect('/category');
        });
});

categoryRoute.post('/edit', function(req, res) {
    var idDanhMuc = req.body.txtIdDanhMuc;
    var entity = {
        danhmucid:idDanhMuc,
        tendanhmuc:req.body.txtTenDanhMuc
    };
    if(req.body.txtTenDanhMuc == null|| req.body.txtIdDanhMuc== null) {
    	res.redirect('/category');
    }
    category.updateCategory(entity)
        .then(function(rows) {
            res.redirect('/category');
        });
});

module.exports = categoryRoute;

