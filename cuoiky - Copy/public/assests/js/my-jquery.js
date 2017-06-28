function do_search() {
    var keyword = $('#txtKeyword');
    if (keyword.length > 0) {
        if (keyword.val().length >= 2) {
            window.location = '/auctions/search?keyword=' + encodeURIComponent(keyword.val());
        } else {
            alert('Từ khóa tìm kiếm quá ngắn');
            keyword.focus();
        }
    }
}

function do_search2() {
    var keyword = $('#txtKeyword2');
    if (keyword.length > 0) {
        if (keyword.val().length >= 2) {
            window.location = '/auctions/search?keyword=' + encodeURIComponent(keyword.val());
        } else {
            alert('Từ khóa tìm kiếm quá ngắn');
            keyword.focus();
        }
    }
}
$(document).ready(function() {
    $('#txtKeyword').keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            do_search();
            e.preventDefault();
        }
    });
    $('#btnSearch').click(function() {
        var keyword = $('#txtKeyword');
        if (keyword.val() != 'Tìm đấu giá...')
            do_search();
        else {
            $('#txtKeyword').val('').focus();
        }
    });
    $('#txtKeyword2').keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            do_search2();
            e.preventDefault();
        }
    });
    $('#btnSearch2').click(function() {
        var keyword = $('#txtKeyword2');
        if (keyword.val() != 'Tìm đấu giá...')
            do_search2();
        else {
            $('#txtKeyword2').val('').focus();
        }
    });
    $('#txtKeyword2').val($('#txtKeyword').val());
});
$(document).ready(function() {
    $('#link_noresponsive').click(function(e) {
        jQuery.cookie('noresponsive', '1', {
            path: '/'
        });
        window.location.href = window.location.href;
        e.preventDefault();
    });
    $('#link_responsive').click(function(e) {
        jQuery.cookie('noresponsive', null, {
            path: '/'
        });
        window.location.href = window.location.href;
        e.preventDefault();
    });
    $('#footer-expand-zone').click(function() {
        $('#footer').slideToggle();
        $('html, body').animate({
            scrollTop: $("#footer-expand-zone").offset().top + $('window').height()
        }, 500);
    });
});

var h1 = null; // Giờ
var m1 = null; // Phút
var s1 = null; // Giây
var h2 = null; // Giờ
var m2 = null; // Phút
var s2 = null; // Giây
var h3 = null; // Giờ
var m3 = null; // Phút
var s3 = null; // Giây
var h4 = null; // Giờ
var m4 = null; // Phút
var s4 = null; // Giây
var stop1 = 1;
var stop2 = 1;
var stop3 = 1;
var stop4 = 1;
var timeout = null; // Timeout
function start() {
    /*BƯỚC 1: LẤY GIÁ TRỊ BAN ĐẦU*/
    if (h1 === null && h2 === null && h3 === null && h4 === null) {
        h1 = 0;
        m1 = 0;
        s1 = 10;
        h2 = 23;
        m2 = 45;
        s2 = 29;
        h3 = 9;
        m3 = 47;
        s3 = 19;
        h4 = 19;
        m4 = 55;
        s4 = 6;
    }
    /*BƯỚC 1: CHUYỂN ĐỔI DỮ LIỆU*/
    // Nếu số giây = -1 tức là đã chạy ngược hết số giây, lúc này:
    //  - giảm số phút xuống 1 đơn vị
    //  - thiết lập số giây lại 59
    if (s1 === -1) {
        m1 -= 1;
        s1 = 59;
    }
    if (s2 === -1) {
        m2 -= 1;
        s2 = 59;
    }
    if (s3 === -1) {
        m3 -= 1;
        s3 = 59;
    }
    if (s4 === -1) {
        m4 -= 1;
        s4 = 59;
    }
    // Nếu số phút = -1 tức là đã chạy ngược hết số phút, lúc này:
    //  - giảm số giờ xuống 1 đơn vị
    //  - thiết lập số phút lại 59
    if (m1 === -1) {
        h1 -= 1;
        m1 = 59;
    }
    if (m2 === -1) {
        h2 -= 1;
        m2 = 59;
    }
    if (m3 === -1) {
        h3 -= 1;
        m3 = 59;
    }
    if (m4 === -1) {
        h4 -= 1;
        m4 = 59;
    }
    // Nếu số giờ = -1 tức là đã hết giờ, lúc này:
    //  - Dừng chương trình
    if (h1 == -1) {
        stop1 = 0;
    }
    if (h2 == -1) {
        stop2 = 0;
    }
    if (h3 == -1) {
        stop3 = 0;
    }
    if (h4 == -1) {
        stop4 = 0;
    }
    /*BƯỚC 1: HIỂN THỊ ĐỒNG HỒ*/
    for (var i = 1; i < 5; i++) {
        if (stop1 == 0) {
            document.getElementById('time1').innerText = 'Time out';
        } else {
            document.getElementById('time1').innerText = h1.toString() + ' : ' + m1.toString() + ' : ' + s1.toString();
        }
        if (stop2 == 0) {
            document.getElementById('time2').innerText = 'Time out';
        } else {
            document.getElementById('time2').innerText = h2.toString() + ' : ' + m2.toString() + ' : ' + s2.toString();
        }
        if (stop3 == 0) {
            document.getElementById('time3').innerText = 'Time out';
        } else {
            document.getElementById('time3').innerText = h3.toString() + ' : ' + m3.toString() + ' : ' + s3.toString();
        }
        if (stop4 == 0) {
            document.getElementById('time4').innerText = 'Time out';
        } else {
            document.getElementById('time4').innerText = h4.toString() + ' : ' + m4.toString() + ' : ' + s4.toString();
        }
    }
    /*BƯỚC 1: GIẢM PHÚT XUỐNG 1 GIÂY VÀ GỌI LẠI SAU 1 GIÂY */
    timeout = setTimeout(function() {
        if (stop1 == 1) s1--;
        s2--;
        s3--;
        s4--;
        start();
    }, 1000);
}
start();

var _curUser = '';
jQuery.fn.getBox = function() {
    return {
        left: $(this).offset().left,
        top: $(this).offset().top,
        width: $(this).outerWidth(),
        height: $(this).outerHeight()
    };
};
jQuery.fn.position = function(target, options) {
    var anchorOffsets = {
        t: 0,
        l: 0,
        c: 0.5,
        b: 1,
        r: 1
    };
    var defaults = {
        anchor: ['bl', 'tr'],
        animate: false,
        offset: [0, 0]
    };
    options = $.extend(defaults, options);
    var targetBox = $(target).getBox();
    var sourceBox = $(this).getBox();
    //origin is at the top-left of the target element
    var left = targetBox.left;
    var top = targetBox.top;
    //alignment with respect to source
    top -= anchorOffsets[options.anchor[0].charAt(0)] * sourceBox.height;
    left -= anchorOffsets[options.anchor[0].charAt(1)] * sourceBox.width;
    //alignment with respect to target
    top += anchorOffsets[options.anchor[1].charAt(0)] * targetBox.height;
    left += anchorOffsets[options.anchor[1].charAt(1)] * targetBox.width;
    //add offset to final coordinates
    left += options.offset[0];
    top += options.offset[1];
    $(this).css({
        left: left + 'px',
        top: top + 'px'
    }).fadeIn();
};

function toggleTab(tabName) {
    var tabContainer = $('#recent-bid-items');
    tabContainer.find('.tab-header').removeClass('tab-header-active');
    tabContainer.find('.tab-content').removeClass('tab-content-active');
    tabContainer.find('.tab-header-' + tabName).addClass('tab-header-active');
    tabContainer.find('.tab-content-' + tabName).addClass('tab-content-active');
}

function getCenteredCoords(width, height) {
    var xPos = null;
    var yPos = null;
    if (window.ActiveXObject) {
        xPos = window.event.screenX - (width / 2) + 100;
        yPos = window.event.screenY - (height / 2) - 100;
    } else {
        var parentSize = [window.outerWidth, window.outerHeight];
        var parentPos = [window.screenX, window.screenY];
        xPos = parentPos[0] + Math.max(0, Math.floor((parentSize[0] - width) / 2));
        yPos = parentPos[1] + Math.max(0, Math.floor((parentSize[1] - (height * 1.25)) / 2));
    }
    return [xPos, yPos];
};
if (typeof Auction === 'undefined')
    var Auction = {};
Auction.MessageBox = function(options) {
    var defaults = {
        boxID: '#msgBox',
        contentID: '#msgBox-content',
        timeout: 1000,
        anchor: ['bl', 'tr'],
        offset: [0, 0]
    };
    var timerID,
        opts = $.extend({}, defaults, options);
    window.vgBoxID = opts.boxID;
    if ($(opts.boxID).length == 0) {
        $(document.body).append('<div id="' + opts.boxID.replace('#', '') + '" ><div id="msgBox-content" /></div>');
    }
    $(opts.boxID).bind('click', function() {
        if (timerID)
            clearTimeout(timerID);
        $(this).fadeOut();
    });
    var showMsgBox = function(obj, message) {
        $(opts.contentID).empty().html(message);
        $(opts.boxID).position(obj, {
            anchor: ['cc', 'cc'],
            offset: [0, 25]
        });
        if (timerID)
            clearTimeout(timerID);
        timerID = setTimeout('$(window.vgBoxID).fadeOut()', opts.timeout);
    };
    return {
        show: function(obj, message) {
            showMsgBox(obj, message);
        }
    };
};
var msgBox = new Auction.MessageBox({
    anchor: ['cc', 'cc'],
    offset: [-100, -100]
});

function getBids() {
    $.ajax({
        url: '/api/bid_listen.ashx',
        data: {},
        dataType: 'json',
        type: 'post',
        async: true,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("auction-ajax-request", 'auction-ajax-request');
        },
        success: function(results) {
            if (results != null) {
                if (results.auctions != null) {
                    for (var itemIndex in results.auctions) {
                        var auction = results.auctions[itemIndex];
                        var container = $('#auction-item-' + auction.id);
                        if (container.length > 0) {
                            container.find('.discount-price').html(auction.discount_price);
                            container.find('.discount-percent').html(auction.discount_percent);
                            container.find('.server-time-rows').html(auction.server_time);
                            container.find('.last-bid-price').html(auction.last_bid_price);
                            container.find('.last-bid-user').html(auction.last_bid_user);
                            container.find('.price').val(auction.current_bid_price);
                            container.find('.bids').html(auction.bids);
                        }
                    }
                }
            }
            setTimeout("getBids()", 1000);
        },
        error: function(xhr) {
            if (xhr.status == 403) {
                alert('Vui lòng đăng nhập để sử dụng chức năng này!');
            } else if (xhr.status == 400) {
                alert('Yêu cầu không hợp lệ!');
            } else {
                alert('Xảy ra lỗi khi thực thi!');
            }
        }
    });
}

function updateStatus(s) {
    $('#auction-items').html(s);
}

function bid(sender, auction_id, bid_price) {
    var btn = $(sender);
    var container = btn.closest('.auction-item');
    var cur_user = container.find('.last-bid-user');
    if (cur_user != null && cur_user.length > 0) {
        if (cur_user.text().trim() == _curUser.trim()) {
            msgBox.show(btn, 'Bạn đang đặt giá cao nhất');
            return;
        }
    }
    bid_price = btn.closest('.auction-item').find('.price').val();
    if (confirm('Bạn muốn bid giá: ' + bid_price + '?')) {
        btn.attr('disabled', 'disabled');
        _requestData({
            action: 'bid',
            id: auction_id,
            price: bid_price
        }, btn);
    }
}

function bid_gallery(sender, auction_id, bid_price) {
    var btn = $(sender);
    var container = btn.closest('.auction-item-gallery');
    var cur_user = container.find('.last-bid-user');
    if (cur_user != null && cur_user.length > 0) {
        if (cur_user.text().trim() == _curUser.trim()) {
            msgBox.show(btn, 'Bạn đang đặt giá cao nhất');
            return;
        }
    }
    bid_price = btn.closest('.auction-item-gallery').find('.price').val();
    if (confirm('Bạn muốn bid giá: ' + bid_price + '?')) {
        btn.attr('disabled', 'disabled');
        _requestData({
            action: 'bid',
            id: auction_id,
            price: bid_price
        }, btn);
    }
}
$(document).ready(function() {
    setTimeout("getBids()", 1000);
});