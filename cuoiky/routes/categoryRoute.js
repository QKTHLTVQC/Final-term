var express = require('express');
var category = require('../models/category');
var categoryRoute = express.Router();

categoryRoute.get('/', function(req, res) {
    
    res.render('category/manageCategory', {
        layoutModels: res.locals.layoutModels,
        showError: false,
        errorMsg: ''
    });
});

module.exports = categoryRoute;

