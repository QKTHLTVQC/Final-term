var express = require('express');
var crypto = require('crypto');
var moment = require('moment');

var restrict = require('../middle-wares/restrict');
var account = require('../models/account');

var accountRoute = express.Router();

accountRoute.get('/login', function(req, res) {
    if (req.session.isLogged === true) {
        res.redirect('/home');
    } else {
        res.render('account/login', {
            layoutModels: res.locals.layoutModels,
            showError: false,
            errorMsg: ''
        });
    }
});

accountRoute.post('/login', function(req, res) {

    var ePWD = crypto.createHash('md5').update(req.body.matkhau).digest('hex');
    //var ePWD = req.body.matkhau;
    var entity = {
        email: req.body.email,
        matkhau: ePWD,
    };

    var remember = req.body.remember ? true : false;

    account.login(entity)
        .then(function(user) {
            if (user === null) {
                res.render('account/login', {
                    layoutModels: res.locals.layoutModels,
                    showError: true,
                    errorMsg: 'Thông tin đăng nhập không đúng.'
                });
            } else {
                req.session.isLogged = true;
                req.session.user = user;
                req.session.cart = [];

                if (remember === true) {
                    var hour = 1000 * 60 * 60 * 24;
                    req.session.cookie.expires = new Date(Date.now() + hour);
                    req.session.cookie.maxAge = hour;
                }

                var url = '/home';
                if (req.query.retUrl) {
                    url = req.query.retUrl;
                }
                res.redirect(url);
            }
        });
});

accountRoute.get('/logout', restrict, function(req, res) {
    req.session.isLogged = false;
    req.session.user = null;
    req.session.cart = null;
    req.session.cookie.expires = new Date(Date.now() - 1000);
    res.redirect('/home');
});

accountRoute.get('/register', function(req, res) {
    res.render('account/register', {
        layoutModels: res.locals.layoutModels,
        showError: false,
        errorMsg: ''
    });
});

accountRoute.post('/register', function(req, res) {

    var ePWD = crypto.createHash('md5').update(req.body.matkhau).digest('hex');
    //var ePWD = req.body.matkhau;
    //var nDOB = moment(req.body.dob, 'D/M/YYYY').format('YYYY-MM-DDTHH:mm');

    var entity = {
        hoten: req.body.hoten,
        diachi: req.body.diachi,
        email: req.body.email,
        matkhau: ePWD,
        diemdanhgia: 100,
        loaikhachhang: "Người mua"
    };

    account.insert(entity)
        .then(function(insertId) {
            res.render('account/register', {
                layoutModels: res.locals.layoutModels,
                showError: true,
                errorMsg: 'Đăng ký thành công.'
            });
        });
});

accountRoute.get('/profile', restrict, function(req, res) {

    if (req.session.isLogged === true) {
        res.render('account/profile', {
            user: req.session.user,
            layoutModels: res.locals.layoutModels,
            showError: true
            //errorMsg: 'Đăng ký thành công.'
        });
    } else {
        res.render('account/login', {
            layoutModels: res.locals.layoutModels,
            showError: false,
            errorMsg: ''
        });
    }
});

accountRoute.get('/editProfile', function(req, res) {

    res.render('account/editProfile', {
        user:req.session.user,
        layoutModels: res.locals.layoutModels,
        showError: false,
        errorMsg: ''
    });
});

accountRoute.post('/profile', function(req, res) {
    res.render('account/editProfile', {
            user:req.session.user,
            layoutModels: res.locals.layoutModels,
            showError: false,
            errorMsg: ''
        });
});

accountRoute.post('/editProfile',function(req,res) {
    var ePWD = crypto.createHash('md5').update(req.body.matkhaucu).digest('hex');
    if(req.body.matkhau != req.body.xacnhanmatkhau) {
        res.render('account/editProfile', {
            thongbaoloi :"Mật khẩu xác nhận không trùng khớp",
            user:req.session.user,
            layoutModels: res.locals.layoutModels,
            showError: false,
            errorMsg: ''
        });
    }
    else if(ePWD != req.session.user.matkhau) {
        res.render('account/editProfile', {
            thongbaoloi:"Mật khẩu cũ không chính xác",
            user:req.session.user,
            layoutModels: res.locals.layoutModels,
            showError: false,
            errorMsg: ''
        });
    }
    else
    {
        var ePWD = crypto.createHash('md5').update(req.body.matkhau).digest('hex');
        var entity = {
            khachhangid:req.session.user.khachhangid,
            hoten: req.body.hoten,
            email: req.body.email,
            matkhau: ePWD
        };

        account.update(entity)
            .then(function(user) {
                //edit session
                req.session.user.hoten = req.body.hoten;
                req.session.user.email = req.body.email;
                req.session.user.matkhau = req.body.ePWD;
                res.render('account/profile', {
                    user: req.session.user,
                    layoutModels: res.locals.layoutModels,
                    showError: true
                    //errorMsg: 'Đăng ký thành công.'
                });

            });
    }
});

module.exports = accountRoute;