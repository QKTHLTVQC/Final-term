create database DAUGIA;

create table KHACH_HANG 
(
	KhachHangId int primary key auto_increment,
	DiemDanhGia int,
    HoTen nvarchar(128),
    DiaChi nvarchar(256),
    Email varchar(128),
    MatKhau varchar(128),
    LoaiKhachHang nvarchar(128) /*Nguoiban or Nguoimua*/
);

create table SAN_PHAM
(
	SanPhamId int primary key auto_increment,
	TenSanPham nvarchar(128),
    GiaHienTai int,
    GiaMuaNgay int,
    LuotRaGia int,
    ThoiGianKetThuc long,
    ThoiGianBatDau long,
    IdKHGiuGia int,
    IdLoaiDanhMuc int,
    IdKHBan int,
    ChiTietSanPham nvarchar(1024),
    BuocGia int,
    TuDongGiaHan boolean,
    HinhAnh varchar(128)
);

create table BANG_DANH_GIA
(
	DanhGiaId int,
    NguoiDangId int,
    NguoiNhanId int,
    NoiDung nvarchar(256),
    primary key(DanhGiaId,NguoiDangId,NguoiNhanId)
);

create table DANH_MUC
(
	DanhMucId int,
    TenDanhMuc nvarchar(128)
);

create table DS_NGUOI_DANG_RA_GIA
(
	SanPhamId int primary key auto_increment,
    IdDSKhachHang int
);

create table DS_KHACH_HANG
(
	DSKhachHangId int primary key auto_increment,
    IdKhachHang int
);

create table DS_SAN_PHAM
(
    KhachHangId int,
    SanPhamId int,
    LoaiDSSP nvarchar(128), /*Người mua: Yêu thích,Đang tham gia đấu giá, Đã thắng; Người bán: Đang đăng, Đã có người mua*/
    primary key(KhachHangId,SanPhamId,LoaiDSSP)
    
);

create table DS_XIN_QUYEN_BAN
(
	DSXinQuyenBanId int primary key auto_increment,
	IdNguoiMua int,
    ThoiGianXin long
);