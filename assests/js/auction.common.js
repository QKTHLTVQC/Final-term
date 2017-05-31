jQuery.fn.position = function(target, options) {
    var anchorOffsets = { t: 0, l: 0, c: 0.5, b: 1, r: 1 };
    var defaults = {
        anchor: ['tl', 'tl'],
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
        timeout: 5000,
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
            anchor: ['bl', 'tr'],
            offset: [0, 0]
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

var Hashtable = (function() { var p = "function"; var n = (typeof Array.prototype.splice == p) ? function(s, r) { s.splice(r, 1) } : function(u, t) { var s, v, r; if (t === u.length - 1) { u.length = t } else { s = u.slice(t + 1); u.length = t; for (v = 0, r = s.length; v < r; ++v) { u[t + v] = s[v] } } }; function a(t) { var r; if (typeof t == "string") { return t } else { if (typeof t.hashCode == p) { r = t.hashCode(); return (typeof r == "string") ? r : a(r) } else { if (typeof t.toString == p) { return t.toString() } else { try { return String(t) } catch (s) { return Object.prototype.toString.call(t) } } } } } function g(r, s) { return r.equals(s) } function e(r, s) { return (typeof s.equals == p) ? s.equals(r) : (r === s) } function c(r) { return function(s) { if (s === null) { throw new Error("null is not a valid " + r) } else { if (typeof s == "undefined") { throw new Error(r + " must not be undefined") } } } } var q = c("key"), l = c("value"); function d(u, s, t, r) { this[0] = u; this.entries = []; this.addEntry(s, t); if (r !== null) { this.getEqualityFunction = function() { return r } } } var h = 0, j = 1, f = 2; function o(r) { return function(t) { var s = this.entries.length, v, u = this.getEqualityFunction(t); while (s--) { v = this.entries[s]; if (u(t, v[0])) { switch (r) { case h: return true; case j: return v; case f: return [s, v[1]] } } } return false } } function k(r) { return function(u) { var v = u.length; for (var t = 0, s = this.entries.length; t < s; ++t) { u[v + t] = this.entries[t][r] } } } d.prototype = { getEqualityFunction: function(r) { return (typeof r.equals == p) ? g : e }, getEntryForKey: o(j), getEntryAndIndexForKey: o(f), removeEntryForKey: function(s) { var r = this.getEntryAndIndexForKey(s); if (r) { n(this.entries, r[0]); return r[1] } return null }, addEntry: function(r, s) { this.entries[this.entries.length] = [r, s] }, keys: k(0), values: k(1), getEntries: function(s) { var u = s.length; for (var t = 0, r = this.entries.length; t < r; ++t) { s[u + t] = this.entries[t].slice(0) } }, containsKey: o(h), containsValue: function(s) { var r = this.entries.length; while (r--) { if (s === this.entries[r][1]) { return true } } return false } }; function m(s, t) { var r = s.length, u; while (r--) { u = s[r]; if (t === u[0]) { return r } } return null } function i(r, s) { var t = r[s]; return (t && (t instanceof d)) ? t : null } function b(t, r) { var w = this; var v = []; var u = {}; var x = (typeof t == p) ? t : a; var s = (typeof r == p) ? r : null; this.put = function(B, C) { q(B); l(C); var D = x(B), E, A, z = null; E = i(u, D); if (E) { A = E.getEntryForKey(B); if (A) { z = A[1]; A[1] = C } else { E.addEntry(B, C) } } else { E = new d(D, B, C, s); v[v.length] = E; u[D] = E } return z }; this.get = function(A) { q(A); var B = x(A); var C = i(u, B); if (C) { var z = C.getEntryForKey(A); if (z) { return z[1] } } return null }; this.containsKey = function(A) { q(A); var z = x(A); var B = i(u, z); return B ? B.containsKey(A) : false }; this.containsValue = function(A) { l(A); var z = v.length; while (z--) { if (v[z].containsValue(A)) { return true } } return false }; this.clear = function() { v.length = 0; u = {} }; this.isEmpty = function() { return !v.length }; var y = function(z) { return function() { var A = [], B = v.length; while (B--) { v[B][z](A) } return A } }; this.keys = y("keys"); this.values = y("values"); this.entries = y("getEntries"); this.remove = function(B) { q(B); var C = x(B), z, A = null; var D = i(u, C); if (D) { A = D.removeEntryForKey(B); if (A !== null) { if (!D.entries.length) { z = m(v, C); n(v, z); delete u[C] } } } return A }; this.size = function() { var A = 0, z = v.length; while (z--) { A += v[z].entries.length } return A }; this.each = function(C) { var z = w.entries(), A = z.length, B; while (A--) { B = z[A]; C(B[0], B[1]) } }; this.putAll = function(H, C) { var B = H.entries(); var E, F, D, z, A = B.length; var G = (typeof C == p); while (A--) { E = B[A]; F = E[0]; D = E[1]; if (G && (z = w.get(F))) { D = C(F, z, D) } w.put(F, D) } }; this.clone = function() { var z = new b(t, r); z.putAll(w); return z } } return b })();
(function(jQuery) {

    var nfLocales = new Hashtable();

    var nfLocalesLikeUS = ['ae', 'au', 'ca', 'cn', 'eg', 'gb', 'hk', 'il', 'in', 'jp', 'sk', 'th', 'tw', 'us'];
    var nfLocalesLikeDE = ['at', 'br', 'de', 'dk', 'es', 'gr', 'it', 'nl', 'pt', 'tr', 'vn'];
    var nfLocalesLikeFR = ['cz', 'fi', 'fr', 'ru', 'se', 'pl'];
    var nfLocalesLikeCH = ['ch'];

    var nfLocaleFormatting = [[".", ","], [",", "."], [",", " "], [".", "'"]];
    var nfAllLocales = [nfLocalesLikeUS, nfLocalesLikeDE, nfLocalesLikeFR, nfLocalesLikeCH]

    function FormatData(dec, group, neg) {
        this.dec = dec;
        this.group = group;
        this.neg = neg;
    };

    function init() {
        // write the arrays into the hashtable
        for (var localeGroupIdx = 0; localeGroupIdx < nfAllLocales.length; localeGroupIdx++) {
            localeGroup = nfAllLocales[localeGroupIdx];
            for (var i = 0; i < localeGroup.length; i++) {
                nfLocales.put(localeGroup[i], localeGroupIdx);
            }
        }
    };

    function formatCodes(locale) {
        if (nfLocales.size() == 0)
            init();

        // default values
        var dec = ".";
        var group = ",";
        var neg = "-";

        // hashtable lookup to match locale with codes
        var codesIndex = nfLocales.get(locale);
        if (codesIndex) {
            var codes = nfLocaleFormatting[codesIndex];
            if (codes) {
                dec = codes[0];
                group = codes[1];
            }
        }
        return new FormatData(dec, group, neg);
    };


    /*	Formatting Methods	*/


    /**
    * Formats anything containing a number in standard js number notation.
    * 
    * @param {Object}	options			The formatting options to use
    * @param {Boolean}	writeBack		(true) If the output value should be written back to the subject
    * @param {Boolean} giveReturnValue	(true) If the function should return the output string
    */
    jQuery.fn.formatNumber = function(options, writeBack, giveReturnValue) {

        return this.each(function() {
            // enforce defaults
            if (writeBack == null)
                writeBack = true;
            if (giveReturnValue == null)
                giveReturnValue = true;

            // get text
            var text;
            if (jQuery(this).is(":input"))
                text = new String(jQuery(this).val());
            else
                text = new String(jQuery(this).text());

            // format
            var returnString = jQuery.formatNumber(text, options);

            // set formatted string back, only if a success
            //			if (returnString) {
            if (writeBack) {
                if (jQuery(this).is(":input"))
                    jQuery(this).val(returnString);
                else
                    jQuery(this).text(returnString);
            }
            if (giveReturnValue)
                return returnString;
            //			}
            //			return '';
        });
    };

    /**
    * First parses a string and reformats it with the given options.
    * 
    * @param {Object} numberString
    * @param {Object} options
    */
    jQuery.formatNumber = function(numberString, options) {
        var options = jQuery.extend({}, jQuery.fn.formatNumber.defaults, options);
        var formatData = formatCodes(options.locale.toLowerCase());

        var dec = formatData.dec;
        var group = formatData.group;
        var neg = formatData.neg;

        var validFormat = "0#-,.";

        // strip all the invalid characters at the beginning and the end
        // of the format, and we'll stick them back on at the end
        // make a special case for the negative sign "-" though, so 
        // we can have formats like -$23.32
        var prefix = "";
        var negativeInFront = false;
        for (var i = 0; i < options.format.length; i++) {
            if (validFormat.indexOf(options.format.charAt(i)) == -1)
                prefix = prefix + options.format.charAt(i);
            else
                if (i == 0 && options.format.charAt(i) == '-') {
                negativeInFront = true;
                continue;
            }
            else
                break;
        }
        var suffix = "";
        for (var i = options.format.length - 1; i >= 0; i--) {
            if (validFormat.indexOf(options.format.charAt(i)) == -1)
                suffix = options.format.charAt(i) + suffix;
            else
                break;
        }

        options.format = options.format.substring(prefix.length);
        options.format = options.format.substring(0, options.format.length - suffix.length);

        // now we need to convert it into a number
        //while (numberString.indexOf(group) > -1) 
        //	numberString = numberString.replace(group, '');
        //var number = new Number(numberString.replace(dec, ".").replace(neg, "-"));
        var number = new Number(numberString);

        return jQuery._formatNumber(number, options, suffix, prefix, negativeInFront);
    };

    /**
    * Formats a Number object into a string, using the given formatting options
    * 
    * @param {Object} numberString
    * @param {Object} options
    */
    jQuery._formatNumber = function(number, options, suffix, prefix, negativeInFront) {
        var options = jQuery.extend({}, jQuery.fn.formatNumber.defaults, options);
        var formatData = formatCodes(options.locale.toLowerCase());

        var dec = formatData.dec;
        var group = formatData.group;
        var neg = formatData.neg;

        var forcedToZero = false;
        if (isNaN(number)) {
            if (options.nanForceZero == true) {
                number = 0;
                forcedToZero = true;
            } else
                return null;
        }

        // special case for percentages
        if (suffix == "%")
            number = number * 100;

        var returnString = "";
        if (options.format.indexOf(".") > -1) {
            var decimalPortion = dec;
            var decimalFormat = options.format.substring(options.format.lastIndexOf(".") + 1);

            // round or truncate number as needed
            if (options.round == true)
                number = new Number(number.toFixed(decimalFormat.length));
            else {
                var numStr = number.toString();
                numStr = numStr.substring(0, numStr.lastIndexOf('.') + decimalFormat.length + 1);
                number = new Number(numStr);
            }

            var decimalValue = number % 1;
            var decimalString = new String(decimalValue.toFixed(decimalFormat.length));
            decimalString = decimalString.substring(decimalString.lastIndexOf(".") + 1);

            for (var i = 0; i < decimalFormat.length; i++) {
                if (decimalFormat.charAt(i) == '#' && decimalString.charAt(i) != '0') {
                    decimalPortion += decimalString.charAt(i);
                    continue;
                } else if (decimalFormat.charAt(i) == '#' && decimalString.charAt(i) == '0') {
                    var notParsed = decimalString.substring(i);
                    if (notParsed.match('[1-9]')) {
                        decimalPortion += decimalString.charAt(i);
                        continue;
                    } else
                        break;
                } else if (decimalFormat.charAt(i) == "0")
                    decimalPortion += decimalString.charAt(i);
            }
            returnString += decimalPortion
        } else
            number = Math.round(number);

        var ones = Math.floor(number);
        if (number < 0)
            ones = Math.ceil(number);

        var onesFormat = "";
        if (options.format.indexOf(".") == -1)
            onesFormat = options.format;
        else
            onesFormat = options.format.substring(0, options.format.indexOf("."));

        var onePortion = "";
        if (!(ones == 0 && onesFormat.substr(onesFormat.length - 1) == '#') || forcedToZero) {
            // find how many digits are in the group
            var oneText = new String(Math.abs(ones));
            var groupLength = 9999;
            if (onesFormat.lastIndexOf(",") != -1)
                groupLength = onesFormat.length - onesFormat.lastIndexOf(",") - 1;
            var groupCount = 0;
            for (var i = oneText.length - 1; i > -1; i--) {
                onePortion = oneText.charAt(i) + onePortion;
                groupCount++;
                if (groupCount == groupLength && i != 0) {
                    onePortion = group + onePortion;
                    groupCount = 0;
                }
            }

            // account for any pre-data 0's
            if (onesFormat.length > onePortion.length) {
                var padStart = onesFormat.indexOf('0');
                if (padStart != -1) {
                    var padLen = onesFormat.length - padStart;

                    // pad to left with 0's
                    while (onePortion.length < padLen) {
                        onePortion = '0' + onePortion;
                    }
                }
            }
        }

        if (!onePortion && onesFormat.indexOf('0', onesFormat.length - 1) !== -1)
            onePortion = '0';

        returnString = onePortion + returnString;

        // handle special case where negative is in front of the invalid characters
        if (number < 0 && negativeInFront && prefix.length > 0)
            prefix = neg + prefix;
        else if (number < 0)
            returnString = neg + returnString;

        if (!options.decimalSeparatorAlwaysShown) {
            if (returnString.lastIndexOf(dec) == returnString.length - 1) {
                returnString = returnString.substring(0, returnString.length - 1);
            }
        }
        returnString = prefix + returnString + suffix;
        return returnString;
    };


    /*	Parsing Methods	*/


    /**
    * Parses a number of given format from the element and returns a Number object.
    * @param {Object} options
    */
    jQuery.fn.parseNumber = function(options, writeBack, giveReturnValue) {
        // enforce defaults
        if (writeBack == null)
            writeBack = true;
        if (giveReturnValue == null)
            giveReturnValue = true;

        // get text
        var text;
        if (jQuery(this).is(":input"))
            text = new String(jQuery(this).val());
        else
            text = new String(jQuery(this).text());

        // parse text
        var number = jQuery.parseNumber(text, options);

        if (number) {
            if (writeBack) {
                if (jQuery(this).is(":input"))
                    jQuery(this).val(number.toString());
                else
                    jQuery(this).text(number.toString());
            }
            if (giveReturnValue)
                return number;
        }
    };

    /**
    * Parses a string of given format into a Number object.
    * 
    * @param {Object} string
    * @param {Object} options
    */
    jQuery.parseNumber = function(numberString, options) {
        var options = jQuery.extend({}, jQuery.fn.parseNumber.defaults, options);
        var formatData = formatCodes(options.locale.toLowerCase());

        var dec = formatData.dec;
        var group = formatData.group;
        var neg = formatData.neg;

        var valid = "1234567890.-";

        // now we need to convert it into a number
        while (numberString.indexOf(group) > -1)
            numberString = numberString.replace(group, '');
        numberString = numberString.replace(dec, ".").replace(neg, "-");
        var validText = "";
        var hasPercent = false;
        if (numberString.charAt(numberString.length - 1) == "%")
            hasPercent = true;
        for (var i = 0; i < numberString.length; i++) {
            if (valid.indexOf(numberString.charAt(i)) > -1)
                validText = validText + numberString.charAt(i);
        }
        var number = new Number(validText);
        if (hasPercent) {
            number = number / 100;
            number = number.toFixed(validText.length - 1);
        }

        return number;
    };

    jQuery.fn.parseNumber.defaults = {
        locale: "us",
        decimalSeparatorAlwaysShown: false
    };

    jQuery.fn.formatNumber.defaults = {
        format: "#,###.00",
        locale: "us",
        decimalSeparatorAlwaysShown: false,
        nanForceZero: true,
        round: true
    };

    Number.prototype.toFixed = function(precision) {
        return $._roundNumber(this, precision);
    };

    jQuery._roundNumber = function(number, decimalPlaces) {
        var power = Math.pow(10, decimalPlaces || 0);
        var value = String(Math.round(number * power) / power);

        // ensure the decimal places are there
        if (decimalPlaces > 0) {
            var dp = value.indexOf(".");
            if (dp == -1) {
                value += '.';
                dp = 0;
            } else {
                dp = value.length - (dp + 1);
            }

            while (dp < decimalPlaces) {
                value += '0';
                dp++;
            }
        }
        return value;
    };

})(jQuery);


(function($) {

    $.fn.maxlength = function(settings) {

        if (typeof settings == 'string') {
            settings = { feedback: settings };
        }

        settings = $.extend({}, $.fn.maxlength.defaults, settings);

        function length(el) {
            var parts = el.value;
            if (settings.words)
                parts = el.value.length ? parts.split(/\s+/) : { length: 0 };
            return parts.length;
        }

        return this.each(function() {
            var field = this,
				$field = $(field),
				$form = $(field).parent(),
				limit = settings.useInput ? $form.find('input[name=maxlength]').val() : $field.attr('maxlength'),
				$charsLeft = $form.find(settings.feedback);


            function limitCheck(event) {
                var len = length(this),
					exceeded = len >= limit,
					code = event.keyCode;

                if (!exceeded)
                    return;

                switch (code) {
                    case 8:  // allow delete
                    case 9:
                    case 17:
                    case 36: // and cursor keys
                    case 35:
                    case 37:
                    case 38:
                    case 39:
                    case 40:
                    case 46:
                        //case 65:
                        return;
                    default:
                        return settings.words && code != 32 && code != 13 && len == limit;
                }
            }

            var updateCount = function() {
                var len = length(field),
					diff = limit - len;

                $charsLeft.html(diff || "0");

                //truncation code
                if (settings.hardLimit && diff < 0) {
                    field.value = settings.words ?
                    //split by white space, capturing it in the result, then glue them back
						field.value.split(/(\s+)/, (limit * 2) - 1).join('') :
						field.value.substr(0, limit);

                    updateCount();
                }
            };

            $field.keyup(updateCount).change(updateCount);
            if (settings.hardLimit) {
                $field.keydown(limitCheck);
            }

            updateCount();
        });
    };

    $.fn.maxlength.defaults = {
        useInput: false,
        hardLimit: true,
        feedback: '.charsLeft',
        words: false
    };

})(jQuery);


(function($) {

    $.fn.autoResize = function(options) {

        // Just some abstracted details,
        // to make plugin users happy:
        var settings = $.extend({
            onResize: function() { },
            animate: false,
            animateDuration: 150,
            animateCallback: function() { },
            extraSpace: 20,
            limit: 500
        }, options);

        // Only textarea's auto-resize:
        this.filter('textarea').each(function() {

            // Get rid of scrollbars and disable WebKit resizing:
            var textarea = $(this).css({ resize: 'none', 'overflow-y': 'hidden' }),

            // Cache original height, for use later:
                origHeight = textarea.css('height').replace('px', ''),

            // Need clone of textarea, hidden off screen:
                clone = (function() {
                    // Properties which may effect space taken up by chracters:
                    var props = ['height', 'width', 'lineHeight', 'textDecoration', 'letterSpacing'],
                        propOb = {};

                    // Create object of styles to apply:
                    $.each(props, function(i, prop) {
                        propOb[prop] = textarea.css(prop);
                    });

                    // Clone the actual textarea removing unique properties
                    // and insert before original textarea:
                    return textarea.clone().removeAttr('id').removeAttr('name').css({
                        position: 'absolute',
                        top: 0,
                        left: -9999
                    }).css(propOb).attr('tabIndex', '-1').insertBefore(textarea);

                })(),
                lastScrollTop = null,
                updateSize = function() {

                    // Prepare the clone:
                    clone.height(0).val($(this).val()).scrollTop(10000);

                    // Find the height of text:
                    var scrollTop = Math.max(clone.scrollTop(), origHeight) + settings.extraSpace,
                        toChange = $(this).add(clone);

                    // Don't do anything if scrollTip hasen't changed:
                    if (lastScrollTop === scrollTop) { return; }
                    lastScrollTop = scrollTop;

                    // Check for limit:
                    if (scrollTop >= settings.limit) {
                        $(this).css('overflow-y', '');
                        return;
                    }

                    // Fire off callback:
                    settings.onResize.call(this);

                    // Either animate or directly apply height:
                    settings.animate && textarea.css('display') === 'block' ?
                        toChange.stop().animate({ height: scrollTop }, settings.animateDuration, settings.animateCallback)
                        : toChange.height(scrollTop);
                };

            // Bind namespaced handlers to appropriate events:
            textarea
                .unbind('.dynSiz')
                .bind('keyup.dynSiz', updateSize)
                .bind('keydown.dynSiz', updateSize)
                .bind('change.dynSiz', updateSize);
        });

        // Chain:
        return this;

    };

})(jQuery);

