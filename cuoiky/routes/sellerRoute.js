var express = require('express');
var crypto = require('crypto');
var moment = require('moment');

var multer  =   require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/Imgs/sp');
  },
  // filename: function (req, file, callback) {
  //   callback(null, Date.now() +"-" + file.originalname);
  // }
});
var upload = multer({ dest: 'public/Imgs/sp' })

var restrict = require('../middle-wares/restrict');
var seller = require('../models/seller');


var sellerRoute = express.Router();


function getPostDate()
{
    var date = new Date();
    date = date.getTime();
    return date;
}
function getState(State){
    if(State == null) return 0;
    else if(State == "1") return 1;
}

sellerRoute.get('/', function(req, res) {
    if (req.session.isLogged === true) {
        res.render('home');
    } else {
        res.render('account/login', {
            layoutModels: res.locals.layoutModels,
            showError: false,
            errorMsg: ''
        });
    }
   // res.render('seller/index');
});

sellerRoute.get('/postProduct', function(req, res) {
    res.render('seller/postProduct');
});

sellerRoute.get('/detailProduct:id', function(req, res) {
    res.render('seller/detailProduct');
});

sellerRoute.get('/profile', function(req, res) {
    res.render('seller/profile');
});

sellerRoute.get('/detailProduct', function(req, res) {
    res.render('seller/detailProduct');
});

sellerRoute.post('/postProduct',upload.single('img2'), function(req, res) {
    
   // console.log(entity);
   
    var entity = {
    TenSanPham: req.body.productname,
    GiaHienTai: req.body.startprice,
    GiaMuaNgay: req.body.buyprice,
    ThoiGianBatDau: getPostDate(),
    IdLoaiDanhMuc: req.body.productcart,
    IdKHBan: req.session.user.khachhangid,
    ChiTietSanPham: req.body.detal,
    BuocGia: req.body.pricestep,
    TuDongGiaHan: getState(req.body.isAutoUpdate),
    HinhAnh: req.file,
    HinhAnh2: req.file,
    HinhAnh3: req.file
    };
   // console.log(entity);
    seller.insert(entity)
        .then(function(insertId) {
            res.render('seller/postProduct', {
                layoutModels: res.locals.layoutModels,
                showError: true,
                errorMsg: 'Đăng sản phẩm thành công.'
            });
        });
});


module.exports = sellerRoute;