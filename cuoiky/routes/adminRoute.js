var express = require('express');
var crypto = require('crypto');
var moment = require('moment');

var admin = require('../models/admin');
var account = require('../models/account');
var adminRoute = express.Router();

adminRoute.get('/manageCustomer', function(req, res) {

    admin.loadAllCustomer()
        .then(function(rows) {
            res.render('admin/manageCustomer', {
                layoutModels: res.locals.layoutModels,
                listUsers:rows,
                showError: false,
                errorMsg: ''
            });
        });
    
    
});

adminRoute.get('/deleteCustomer/:id', function(req, res) {
    var id = req.params.id;
    var entity = {
        khachhangid: id
    };
    admin.deleteCustomer(entity)
        .then(function(rows) {
            res.redirect('/admin/manageCustomer');
        });
    
});


adminRoute.get('/resetPass/:id', function(req, res) {
    var id = req.params.id;
    var ePWD = crypto.createHash('md5').update("123456").digest('hex');
    var entity = {
        khachhangid: id,
        matkhau:ePWD
    };
    admin.resetPass(entity)
        .then(function(rows) {
            res.redirect('/admin/manageCustomer');
        });
});

adminRoute.get('/requestSeller', function(req, res) {
    admin.loadAllRequest()
        .then(function(rows) {
            res.render('admin/manageSeller', {
                layoutModels: res.locals.layoutModels,
                listRequests: rows,
                showError: false,
                errorMsg: ''
            });
        });
    
    
});

adminRoute.get('/acceptSeller/:id', function(req, res) {
    var id = req.params.id;
    var entity = {
        khachhangid: id,
        loaikhachhang: "sell",
    };
    admin.acceptSeller(entity)
        .then(function(rows) {
            res.redirect('/admin/requestSeller');
        });
    
    
});

module.exports = adminRoute;