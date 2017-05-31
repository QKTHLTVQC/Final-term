if (typeof (Sohot) == 'undefined')
    var Sohot = {};

Sohot.SimpleDialog = function(opttions) {
    var defaults = {
        dialog_id: 'simple_dialog',
        width: 500,
        height: '',
        position: 'fixed',
        waiting_message: '<p class="dialog_loading">Đang tải dữ liệu...</p>'
    };
    var opts = jQuery.extend({}, defaults, opttions);
    var ie6 = ($.browser.msie && $.browser.version < 7);
    var dialog;
    var dialog_content;

    var init = function() {
        dialog = $('#' + opts.dialog_id);
        if (dialog.length == 0) {
            var dialog_html = '<div id="' + opts.dialog_id + '" style="display:none;"> \
				                          <div class="popup"> \
				                            <table> \
				                              <tbody> \
				                                <tr> \
				                                  <td class="tl"/><td class="b"/><td class="tr"/> \
				                                </tr> \
				                                <tr> \
				                                  <td class="b"/> \
				                                  <td class="body"> \
				                                    <div class="simple-dialog-content"> \
				                                    </div> \
				                                  </td> \
				                                  <td class="b"/> \
				                                </tr> \
				                                <tr> \
				                                  <td class="bl"/><td class="b"/><td class="br"/> \
				                                </tr> \
				                              </tbody> \
				                            </table> \
				                          </div> \
				                        </div>';

            dialog = $(dialog_html);
            dialog_content = dialog.find('div.simple-dialog-content');

            $(document.body).append(dialog);
        }
        else {
            dialog_content = dialog.find('div.simple-dialog-content');
        }

        dialog_content.empty().html(opts.waiting_message);
        dialog.css({
            'width': opts.width + 'px',
            'marginLeft': '-' + opts.width / 2 + 'px'
            /*'position': opts.position*/
        });
    };

    init();

    return {
        show: function() {
            if (dialog == null)
                init();

            if (opts.position == 'fixed') {
                dialog.attr('class', 'fixed');
            } else {
                dialog.attr('class', '');
            }

            dialog.fadeIn(300);
        },

        hide: function() {
            dialog.fadeOut(300, function() {
                dialog_content.empty().html(opts.waiting_message);
            });
        },

        setContent: function(html) {
            dialog_content.empty().html(html);
        },

        resetContent: function() {
            dialog_content.empty().html(opts.waiting_message);
        },

        width: function(width) {
            dialog.css({ 'width': width + 'px', 'marginLeft': '-' + width / 2 + 'px' });
        },

        resetSize: function() {
            dialog.css({ 'width': opts.width + 'px', 'height': opts.height + 'px', 'marginLeft': '-' + opts.width / 2 + 'px' });
        }
    };
};

Sohot.LoginDialog = function() {
    var dialog = new Sohot.SimpleDialog({ width: 410, height: 230, position: 'fixed' });
    
    var login_content = '<div style="background-color:#fff;"> \
                            <iframe width="390px" height="210px" src="/dialog_login.aspx" frameBorder="0" scrolling="no"></iframe> \
                            <div class="action-bar"><a href="javascript:void(0);" class="close"><img src="../assests/images/close-icon.gif" alt="Đóng popup" style="border: 0px;"/></a></div> \
                        </div>';

    var _show = function() {
        dialog.resetSize();
        dialog.setContent(login_content);
        dialog.show();
    };

    var _hide = function() {
        dialog.hide();
    };

    return {
        show: function() {
            _show();
        },

        close: function() {
            _hide();
        }
    }
};

Sohot.UserBidsDialog = function(id) {
    var dialog = new Sohot.SimpleDialog({ width: 410, height: 430, position: 'fixed' });

    var login_content = '<div style="background-color:#fff;"> \
                            <iframe width="390px" height="410px" src="/modules/auction/bid_users.aspx?id=' + id + '" frameBorder="0" scrolling="no"></iframe> \
                            <div class="action-bar"><a href="javascript:void(0);" class="close"><img src="../assests/images/close-icon.gif" alt="Đóng popup" style="border: 0px;"/></a></div> \
                        </div>';

    var _show = function() {
        dialog.resetSize();
        dialog.setContent(login_content);
        dialog.show();
    };

    var _hide = function() {
        dialog.hide();
    };

    return {
        show: function() {
            _show();
        },

        close: function() {
            _hide();
        }
    }
};

Sohot.UserProductBidsDialog = function(id) {
    var dialog = new Sohot.SimpleDialog({ width: 410, height: 430, position: 'fixed' });

    var login_content = '<div style="background-color:#fff;"> \
                            <iframe width="390px" height="410px" src="/modules/products/bid_users.aspx?id=' + id + '" frameBorder="0" scrolling="no"></iframe> \
                            <div class="action-bar"><a href="javascript:void(0);" class="close"><img src="../assests/images/close-icon.gif" alt="Đóng popup" style="border: 0px;"/></a></div> \
                        </div>';

    var _show = function() {
        dialog.resetSize();
        dialog.setContent(login_content);
        dialog.show();
    };

    var _hide = function() {
        dialog.hide();
    };

    return {
        show: function() {
            _show();
        },

        close: function() {
            _hide();
        }
    }
};

Sohot.OrderInfoDialog = function(id) {
    var dialog = new Sohot.SimpleDialog({ width: 450, height: 300, position: 'fixed' });

    var login_content = '<div style="background-color:#fff;"> \
                            <iframe width="430px" height="280px" src="/modules/products/order_info.aspx?id=' + id + '" frameBorder="0" scrolling="no"></iframe> \
                            <div class="action-bar"><a href="javascript:void(0);" class="close"><img src="../assests/images/close-icon.gif" alt="Đóng popup" style="border: 0px;"/></a></div> \
                        </div>';

    var _show = function() {
        dialog.resetSize();
        dialog.setContent(login_content);
        dialog.show();
    };

    var _hide = function() {
        dialog.hide();
    };

    return {
        show: function() {
            _show();
        },

        close: function() {
            _hide();
        }
    }
};

Sohot.ProfileInfoDialog = function () {
    var dialog = new Sohot.SimpleDialog({ width: 470, height: 280, position: 'fixed' });

    var login_content = '<div style="background-color:#fff;"> \
                            <iframe width="450px" height="260px" src="/modules/user/profile_info_dialog.aspx" frameBorder="0" scrolling="no"></iframe> \
                            <div class="action-bar"><a href="javascript:void(0);" class="close"><img src="../assests/images/close-icon.gif" alt="Đóng popup" style="border: 0px;"/></a></div> \
                        </div>';

    var _show = function () {
        dialog.resetSize();
        dialog.setContent(login_content);
        dialog.show();
    };

    var _hide = function () {
        dialog.hide();
    };

    return {
        show: function () {
            _show();
        },

        close: function () {
            _hide();
        }
    }
};


Sohot.ReportDialog = function (id) {
    var dialog = new Sohot.SimpleDialog({ width: 510, height: 280, position: 'fixed' });

    var login_content = '<div style="background-color:#fff;"> \
                            <iframe width="490px" height="260px" src="/modules/auction/report.aspx?id=' + id + '" frameBorder="0" scrolling="no"></iframe> \
                            <div class="action-bar"><a href="javascript:void(0);" class="close"><img src="../assests/images/close-icon.gif" alt="Đóng popup" style="border: 0px;"/></a></div> \
                        </div>';

    var _show = function () {
        dialog.resetSize();
        dialog.setContent(login_content);
        dialog.show();
    };

    var _hide = function () {
        dialog.hide();
    };

    return {
        show: function () {
            _show();
        },

        close: function () {
            _hide();
        }
    }
};



