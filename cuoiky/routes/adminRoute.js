var express = require('express');
var crypto = require('crypto');
var moment = require('moment');

var admin = require('../models/admin');
var account = require('../models/account');
var adminRoute = express.Router();

adminRoute.get('/manageCustomer', function(req, res) {
    
    res.render('admin/manageCustomer', {
        layoutModels: res.locals.layoutModels,
        showError: false,
        errorMsg: ''
    });
});

adminRoute.get('/requestSeller', function(req, res) {
    admin.loadAllRequest(entity)
        .then(function(rows) {
            res.render('admin/manageSeller', {
                layoutModels: res.locals.layoutModels,
                listRequests: rows,
                showError: false,
                errorMsg: ''
            });
        });
    
    
});

adminRoute.post('/acceptSeller/:id', function(req, res) {
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