/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var mixpanel = __webpack_require__(1);

	mixpanel.init("FAKE_TOKEN", {
	    debug: true,
	    loaded: function() {
	        mixpanel.track('loaded() callback works but is unnecessary');
	        alert("Mixpanel loaded successfully via Webpack/UMD");
	    }
	});

	mixpanel.track('Tracking after mixpanel.init');


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (global.mixpanel = factory());
	}(this, function () { 'use strict';

	    var Config = {
	        DEBUG: false,
	        LIB_VERSION: '2.13.0'
	    };

	    // since es6 imports are static and we run unit tests from the console, window won't be defined when importing this file
	    var win;
	    if (typeof(window) === 'undefined') {
	        win = {
	            navigator: {}
	        };
	    } else {
	        win = window;
	    }

	    /*
	     * Saved references to long variable names, so that closure compiler can
	     * minimize file size.
	     */

	    var ArrayProto = Array.prototype;
	    var ObjProto = Object.prototype;
	    var FuncProto = Function.prototype;
	    var slice = ArrayProto.slice;
	    var toString = ObjProto.toString;
	    var hasOwnProperty = ObjProto.hasOwnProperty;
	    var windowConsole = win.console;
	    var navigator = win.navigator;
	    var document$1 = win.document;
	    var userAgent = navigator.userAgent;
	    var nativeForEach = ArrayProto.forEach;
	    var nativeIndexOf = ArrayProto.indexOf;
	    var nativeIsArray = Array.isArray;
	    var breaker = {};
	    var _ = {};

	    // Console override
	    var console$1 = {
	        /** @type {function(...[*])} */
	        log: function() {
	            if (Config.DEBUG && windowConsole && windowConsole.log) {
	                FuncProto.apply.call(windowConsole.log, windowConsole, arguments);
	            }
	        },
	        /** @type {function(...[*])} */
	        error: function() {
	            if (Config.DEBUG) {
	                console$1.critical.apply(console$1, arguments);
	            }
	        },
	        /** @type {function(...[*])} */
	        critical: function() {
	            if (windowConsole && windowConsole.error) {
	                var args = ['Mixpanel error:'].concat(_.toArray(arguments));
	                FuncProto.apply.call(windowConsole.error, windowConsole, args);
	            }
	        }
	    };

	    _.bind_instance_methods = function(obj) {
	        for (var func in obj) {
	            if (typeof(obj[func]) === 'function') {
	                obj[func] = obj[func].bind(obj);
	            }
	        }
	    };

	    /**
	     * @param {*=} obj
	     * @param {function(...[*])=} iterator
	     * @param {Object=} context
	     */
	    _.each = function(obj, iterator, context) {
	        if (obj === null || obj === undefined) {
	            return;
	        }
	        if (nativeForEach && obj.forEach === nativeForEach) {
	            obj.forEach(iterator, context);
	        } else if (obj.length === +obj.length) {
	            for (var i = 0, l = obj.length; i < l; i++) {
	                if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
	                    return;
	                }
	            }
	        } else {
	            for (var key in obj) {
	                if (hasOwnProperty.call(obj, key)) {
	                    if (iterator.call(context, obj[key], key, obj) === breaker) {
	                        return;
	                    }
	                }
	            }
	        }
	    };

	    _.escapeHTML = function(s) {
	        var escaped = s;
	        if (escaped && _.isString(escaped)) {
	            escaped = escaped
	                .replace(/&/g, '&amp;')
	                .replace(/</g, '&lt;')
	                .replace(/>/g, '&gt;')
	                .replace(/"/g, '&quot;')
	                .replace(/'/g, '&#039;');
	        }
	        return escaped;
	    };

	    _.extend = function(obj) {
	        _.each(slice.call(arguments, 1), function(source) {
	            for (var prop in source) {
	                if (source[prop] !== void 0) {
	                    obj[prop] = source[prop];
	                }
	            }
	        });
	        return obj;
	    };

	    _.isArray = nativeIsArray || function(obj) {
	        return toString.call(obj) === '[object Array]';
	    };

	    // from a comment on http://dbj.org/dbj/?p=286
	    // fails on only one very rare and deliberate custom object:
	    // var bomb = { toString : undefined, valueOf: function(o) { return "function BOMBA!"; }};
	    _.isFunction = function(f) {
	        try {
	            return /^\s*\bfunction\b/.test(f);
	        } catch (x) {
	            return false;
	        }
	    };

	    _.isArguments = function(obj) {
	        return !!(obj && hasOwnProperty.call(obj, 'callee'));
	    };

	    _.toArray = function(iterable) {
	        if (!iterable) {
	            return [];
	        }
	        if (iterable.toArray) {
	            return iterable.toArray();
	        }
	        if (_.isArray(iterable)) {
	            return slice.call(iterable);
	        }
	        if (_.isArguments(iterable)) {
	            return slice.call(iterable);
	        }
	        return _.values(iterable);
	    };

	    _.values = function(obj) {
	        var results = [];
	        if (obj === null) {
	            return results;
	        }
	        _.each(obj, function(value) {
	            results[results.length] = value;
	        });
	        return results;
	    };

	    _.include = function(obj, target) {
	        var found = false;
	        if (obj === null) {
	            return found;
	        }
	        if (nativeIndexOf && obj.indexOf === nativeIndexOf) {
	            return obj.indexOf(target) != -1;
	        }
	        _.each(obj, function(value) {
	            if (found || (found = (value === target))) {
	                return breaker;
	            }
	        });
	        return found;
	    };

	    _.includes = function(str, needle) {
	        return str.indexOf(needle) !== -1;
	    };

	    // Underscore Addons
	    _.inherit = function(subclass, superclass) {
	        subclass.prototype = new superclass();
	        subclass.prototype.constructor = subclass;
	        subclass.superclass = superclass.prototype;
	        return subclass;
	    };

	    _.isObject = function(obj) {
	        return (obj === Object(obj) && !_.isArray(obj));
	    };

	    _.isEmptyObject = function(obj) {
	        if (_.isObject(obj)) {
	            for (var key in obj) {
	                if (hasOwnProperty.call(obj, key)) {
	                    return false;
	                }
	            }
	            return true;
	        }
	        return false;
	    };

	    _.isUndefined = function(obj) {
	        return obj === void 0;
	    };

	    _.isString = function(obj) {
	        return toString.call(obj) == '[object String]';
	    };

	    _.isDate = function(obj) {
	        return toString.call(obj) == '[object Date]';
	    };

	    _.isNumber = function(obj) {
	        return toString.call(obj) == '[object Number]';
	    };

	    _.isElement = function(obj) {
	        return !!(obj && obj.nodeType === 1);
	    };

	    _.encodeDates = function(obj) {
	        _.each(obj, function(v, k) {
	            if (_.isDate(v)) {
	                obj[k] = _.formatDate(v);
	            } else if (_.isObject(v)) {
	                obj[k] = _.encodeDates(v); // recurse
	            }
	        });
	        return obj;
	    };

	    _.formatDate = function(d) {
	        // YYYY-MM-DDTHH:MM:SS in UTC
	        function pad(n) {
	            return n < 10 ? '0' + n : n;
	        }
	        return d.getUTCFullYear() + '-' +
	            pad(d.getUTCMonth() + 1) + '-' +
	            pad(d.getUTCDate()) + 'T' +
	            pad(d.getUTCHours()) + ':' +
	            pad(d.getUTCMinutes()) + ':' +
	            pad(d.getUTCSeconds());
	    };

	    _.safewrap = function(f) {
	        return function() {
	            try {
	                return f.apply(this, arguments);
	            } catch (e) {
	                console$1.critical('Implementation error. Please contact support@mixpanel.com.');
	            }
	        };
	    };

	    _.safewrap_class = function(klass, functions) {
	        for (var i = 0; i < functions.length; i++) {
	            klass.prototype[functions[i]] = _.safewrap(klass.prototype[functions[i]]);
	        }
	    };

	    _.safewrap_instance_methods = function(obj) {
	        for (var func in obj) {
	            if (typeof(obj[func]) === 'function') {
	                obj[func] = _.safewrap(obj[func]);
	            }
	        }
	    };

	    _.strip_empty_properties = function(p) {
	        var ret = {};
	        _.each(p, function(v, k) {
	            if (_.isString(v) && v.length > 0) {
	                ret[k] = v;
	            }
	        });
	        return ret;
	    };

	    /*
	     * this function returns a copy of object after truncating it.  If
	     * passed an Array or Object it will iterate through obj and
	     * truncate all the values recursively.
	     */
	    _.truncate = function(obj, length) {
	        var ret;

	        if (typeof(obj) === 'string') {
	            ret = obj.slice(0, length);
	        } else if (_.isArray(obj)) {
	            ret = [];
	            _.each(obj, function(val) {
	                ret.push(_.truncate(val, length));
	            });
	        } else if (_.isObject(obj)) {
	            ret = {};
	            _.each(obj, function(val, key) {
	                ret[key] = _.truncate(val, length);
	            });
	        } else {
	            ret = obj;
	        }

	        return ret;
	    };

	    _.JSONEncode = JSON.stringify;
	    _.JSONDecode = JSON.parse;

	    _.base64Encode = function(data) {
	        if (!data) {
	            return data;
	        }
	        return btoa(unescape(encodeURIComponent(String(data))));
	    };

	    _.UUID = (function() {

	        // Time/ticks information
	        // 1*new Date() is a cross browser version of Date.now()
	        var T = function() {
	            var d = 1 * new Date(),
	                i = 0;

	            // this while loop figures how many browser ticks go by
	            // before 1*new Date() returns a new number, ie the amount
	            // of ticks that go by per millisecond
	            while (d == 1 * new Date()) {
	                i++;
	            }

	            return d.toString(16) + i.toString(16);
	        };

	        // Math.Random entropy
	        var R = function() {
	            return Math.random().toString(16).replace('.', '');
	        };

	        // User agent entropy
	        // This function takes the user agent string, and then xors
	        // together each sequence of 8 bytes.  This produces a final
	        // sequence of 8 bytes which it returns as hex.
	        var UA = function() {
	            var ua = userAgent,
	                i, ch, buffer = [],
	                ret = 0;

	            function xor(result, byte_array) {
	                var j, tmp = 0;
	                for (j = 0; j < byte_array.length; j++) {
	                    tmp |= (buffer[j] << j * 8);
	                }
	                return result ^ tmp;
	            }

	            for (i = 0; i < ua.length; i++) {
	                ch = ua.charCodeAt(i);
	                buffer.unshift(ch & 0xFF);
	                if (buffer.length >= 4) {
	                    ret = xor(ret, buffer);
	                    buffer = [];
	                }
	            }

	            if (buffer.length > 0) {
	                ret = xor(ret, buffer);
	            }

	            return ret.toString(16);
	        };

	        return function() {
	            var se = (screen.height * screen.width).toString(16);
	            return (T() + '-' + R() + '-' + UA() + '-' + se + '-' + T());
	        };
	    })();

	    // _.isBlockedUA()
	    // This is to block various web spiders from executing our JS and
	    // sending false tracking data
	    _.isBlockedUA = function(ua) {
	        if (/(google web preview|baiduspider|yandexbot|bingbot|googlebot|yahoo! slurp)/i.test(ua)) {
	            return true;
	        }
	        return false;
	    };

	    /**
	     * @param {Object=} formdata
	     * @param {string=} arg_separator
	     */
	    _.HTTPBuildQuery = function(formdata, arg_separator) {
	        var use_val, use_key, tmp_arr = [];

	        if (_.isUndefined(arg_separator)) {
	            arg_separator = '&';
	        }

	        _.each(formdata, function(val, key) {
	            use_val = encodeURIComponent(val.toString());
	            use_key = encodeURIComponent(key);
	            tmp_arr[tmp_arr.length] = use_key + '=' + use_val;
	        });

	        return tmp_arr.join(arg_separator);
	    };

	    _.getQueryParam = function(url, param) {
	        // Expects a raw URL

	        param = param.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
	        var regexS = '[\\?&]' + param + '=([^&#]*)',
	            regex = new RegExp(regexS),
	            results = regex.exec(url);
	        if (results === null || (results && typeof(results[1]) !== 'string' && results[1].length)) {
	            return '';
	        } else {
	            return decodeURIComponent(results[1]).replace(/\+/g, ' ');
	        }
	    };

	    _.getHashParam = function(hash, param) {
	        var matches = hash.match(new RegExp(param + '=([^&]*)'));
	        return matches ? matches[1] : null;
	    };

	    // _.cookie
	    // Methods partially borrowed from quirksmode.org/js/cookies.html
	    _.cookie = {
	        get: function(name) {
	            var nameEQ = name + '=';
	            var ca = document$1.cookie.split(';');
	            for (var i = 0; i < ca.length; i++) {
	                var c = ca[i];
	                while (c.charAt(0) == ' ') {
	                    c = c.substring(1, c.length);
	                }
	                if (c.indexOf(nameEQ) === 0) {
	                    return decodeURIComponent(c.substring(nameEQ.length, c.length));
	                }
	            }
	            return null;
	        },

	        parse: function(name) {
	            var cookie;
	            try {
	                cookie = _.JSONDecode(_.cookie.get(name)) || {};
	            } catch (err) {
	                // noop
	            }
	            return cookie;
	        },

	        set_seconds: function(name, value, seconds, cross_subdomain, is_secure) {
	            var cdomain = '',
	                expires = '',
	                secure = '';

	            if (cross_subdomain) {
	                var matches = document$1.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i),
	                    domain = matches ? matches[0] : '';

	                cdomain = ((domain) ? '; domain=.' + domain : '');
	            }

	            if (seconds) {
	                var date = new Date();
	                date.setTime(date.getTime() + (seconds * 1000));
	                expires = '; expires=' + date.toGMTString();
	            }

	            if (is_secure) {
	                secure = '; secure';
	            }

	            document$1.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/' + cdomain + secure;
	        },

	        set: function(name, value, days, cross_subdomain, is_secure) {
	            var cdomain = '', expires = '', secure = '';

	            if (cross_subdomain) {
	                var matches = document$1.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i),
	                    domain = matches ? matches[0] : '';

	                cdomain   = ((domain) ? '; domain=.' + domain : '');
	            }

	            if (days) {
	                var date = new Date();
	                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	                expires = '; expires=' + date.toGMTString();
	            }

	            if (is_secure) {
	                secure = '; secure';
	            }

	            var new_cookie_val = name + '=' + encodeURIComponent(value) + expires + '; path=/' + cdomain + secure;
	            document$1.cookie = new_cookie_val;
	            return new_cookie_val;
	        },

	        remove: function(name, cross_subdomain) {
	            _.cookie.set(name, '', -1, cross_subdomain);
	        }
	    };

	    // _.localStorage
	    _.localStorage = {
	        error: function(msg) {
	            console$1.error('localStorage error: ' + msg);
	        },

	        get: function(name) {
	            try {
	                return window.localStorage.getItem(name);
	            } catch (err) {
	                _.localStorage.error(err);
	            }
	            return null;
	        },

	        parse: function(name) {
	            try {
	                return _.JSONDecode(_.localStorage.get(name)) || {};
	            } catch (err) {
	                // noop
	            }
	            return null;
	        },

	        set: function(name, value) {
	            try {
	                window.localStorage.setItem(name, value);
	            } catch (err) {
	                _.localStorage.error(err);
	            }
	        },

	        remove: function(name) {
	            try {
	                window.localStorage.removeItem(name);
	            } catch (err) {
	                _.localStorage.error(err);
	            }
	        }
	    };

	    _.register_event = (function() {
	        // written by Dean Edwards, 2005
	        // with input from Tino Zijdel - crisp@xs4all.nl
	        // with input from Carl Sverre - mail@carlsverre.com
	        // with input from Mixpanel
	        // http://dean.edwards.name/weblog/2005/10/add-event/
	        // https://gist.github.com/1930440

	        /**
	         * @param {Object} element
	         * @param {string} type
	         * @param {function(...[*])} handler
	         * @param {boolean=} oldSchool
	         * @param {boolean=} useCapture
	         */
	        var register_event = function(element, type, handler, oldSchool, useCapture) {
	            if (!element) {
	                console$1.error('No valid element provided to register_event');
	                return;
	            }

	            if (element.addEventListener && !oldSchool) {
	                element.addEventListener(type, handler, !!useCapture);
	            } else {
	                var ontype = 'on' + type;
	                var old_handler = element[ontype]; // can be undefined
	                element[ontype] = makeHandler(element, handler, old_handler);
	            }
	        };

	        function makeHandler(element, new_handler, old_handlers) {
	            var handler = function(event) {
	                event = event || fixEvent(window.event);

	                // this basically happens in firefox whenever another script
	                // overwrites the onload callback and doesn't pass the event
	                // object to previously defined callbacks.  All the browsers
	                // that don't define window.event implement addEventListener
	                // so the dom_loaded handler will still be fired as usual.
	                if (!event) {
	                    return undefined;
	                }

	                var ret = true;
	                var old_result, new_result;

	                if (_.isFunction(old_handlers)) {
	                    old_result = old_handlers(event);
	                }
	                new_result = new_handler.call(element, event);

	                if ((false === old_result) || (false === new_result)) {
	                    ret = false;
	                }

	                return ret;
	            };

	            return handler;
	        }

	        function fixEvent(event) {
	            if (event) {
	                event.preventDefault = fixEvent.preventDefault;
	                event.stopPropagation = fixEvent.stopPropagation;
	            }
	            return event;
	        }
	        fixEvent.preventDefault = function() {
	            this.returnValue = false;
	        };
	        fixEvent.stopPropagation = function() {
	            this.cancelBubble = true;
	        };

	        return register_event;
	    })();

	    _.info = {
	        campaignParams: function() {
	            var campaign_keywords = 'utm_source utm_medium utm_campaign utm_content utm_term'.split(' '),
	                kw = '',
	                params = {};
	            _.each(campaign_keywords, function(kwkey) {
	                kw = _.getQueryParam(document$1.URL, kwkey);
	                if (kw.length) {
	                    params[kwkey] = kw;
	                }
	            });

	            return params;
	        },

	        searchEngine: function(referrer) {
	            if (referrer.search('https?://(.*)google.([^/?]*)') === 0) {
	                return 'google';
	            } else if (referrer.search('https?://(.*)bing.com') === 0) {
	                return 'bing';
	            } else if (referrer.search('https?://(.*)yahoo.com') === 0) {
	                return 'yahoo';
	            } else if (referrer.search('https?://(.*)duckduckgo.com') === 0) {
	                return 'duckduckgo';
	            } else {
	                return null;
	            }
	        },

	        searchInfo: function(referrer) {
	            var search = _.info.searchEngine(referrer),
	                param = (search != 'yahoo') ? 'q' : 'p',
	                ret = {};

	            if (search !== null) {
	                ret['$search_engine'] = search;

	                var keyword = _.getQueryParam(referrer, param);
	                if (keyword.length) {
	                    ret['mp_keyword'] = keyword;
	                }
	            }

	            return ret;
	        },

	        /**
	         * This function detects which browser is running this script.
	         * The order of the checks are important since many user agents
	         * include key words used in later checks.
	         */
	        browser: function(user_agent, vendor, opera) {
	            vendor = vendor || ''; // vendor is undefined for at least IE9
	            if (opera || _.includes(user_agent, ' OPR/')) {
	                if (_.includes(user_agent, 'Mini')) {
	                    return 'Opera Mini';
	                }
	                return 'Opera';
	            } else if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
	                return 'BlackBerry';
	            } else if (_.includes(user_agent, 'IEMobile') || _.includes(user_agent, 'WPDesktop')) {
	                return 'Internet Explorer Mobile';
	            } else if (_.includes(user_agent, 'Edge')) {
	                return 'Microsoft Edge';
	            } else if (_.includes(user_agent, 'FBIOS')) {
	                return 'Facebook Mobile';
	            } else if (_.includes(user_agent, 'Chrome')) {
	                return 'Chrome';
	            } else if (_.includes(user_agent, 'CriOS')) {
	                return 'Chrome iOS';
	            } else if (_.includes(user_agent, 'UCWEB') || _.includes(user_agent, 'UCBrowser')) {
	                return 'UC Browser';
	            } else if (_.includes(user_agent, 'FxiOS')) {
	                return 'Firefox iOS';
	            } else if (_.includes(vendor, 'Apple')) {
	                if (_.includes(user_agent, 'Mobile')) {
	                    return 'Mobile Safari';
	                }
	                return 'Safari';
	            } else if (_.includes(user_agent, 'Android')) {
	                return 'Android Mobile';
	            } else if (_.includes(user_agent, 'Konqueror')) {
	                return 'Konqueror';
	            } else if (_.includes(user_agent, 'Firefox')) {
	                return 'Firefox';
	            } else if (_.includes(user_agent, 'MSIE') || _.includes(user_agent, 'Trident/')) {
	                return 'Internet Explorer';
	            } else if (_.includes(user_agent, 'Gecko')) {
	                return 'Mozilla';
	            } else {
	                return '';
	            }
	        },

	        /**
	         * This function detects which browser version is running this script,
	         * parsing major and minor version (e.g., 42.1). User agent strings from:
	         * http://www.useragentstring.com/pages/useragentstring.php
	         */
	        browserVersion: function(userAgent, vendor, opera) {
	            var browser = _.info.browser(userAgent, vendor, opera);
	            var versionRegexs = {
	                'Internet Explorer Mobile': /rv:(\d+(\.\d+)?)/,
	                'Microsoft Edge': /Edge\/(\d+(\.\d+)?)/,
	                'Chrome': /Chrome\/(\d+(\.\d+)?)/,
	                'Chrome iOS': /CriOS\/(\d+(\.\d+)?)/,
	                'UC Browser' : /(UCBrowser|UCWEB)\/(\d+(\.\d+)?)/,
	                'Safari': /Version\/(\d+(\.\d+)?)/,
	                'Mobile Safari': /Version\/(\d+(\.\d+)?)/,
	                'Opera': /(Opera|OPR)\/(\d+(\.\d+)?)/,
	                'Firefox': /Firefox\/(\d+(\.\d+)?)/,
	                'Firefox iOS': /FxiOS\/(\d+(\.\d+)?)/,
	                'Konqueror': /Konqueror:(\d+(\.\d+)?)/,
	                'BlackBerry': /BlackBerry (\d+(\.\d+)?)/,
	                'Android Mobile': /android\s(\d+(\.\d+)?)/,
	                'Internet Explorer': /(rv:|MSIE )(\d+(\.\d+)?)/,
	                'Mozilla': /rv:(\d+(\.\d+)?)/
	            };
	            var regex = versionRegexs[browser];
	            if (regex === undefined) {
	                return null;
	            }
	            var matches = userAgent.match(regex);
	            if (!matches) {
	                return null;
	            }
	            return parseFloat(matches[matches.length - 2]);
	        },

	        os: function() {
	            var a = userAgent;
	            if (/Windows/i.test(a)) {
	                if (/Phone/.test(a) || /WPDesktop/.test(a)) {
	                    return 'Windows Phone';
	                }
	                return 'Windows';
	            } else if (/(iPhone|iPad|iPod)/.test(a)) {
	                return 'iOS';
	            } else if (/Android/.test(a)) {
	                return 'Android';
	            } else if (/(BlackBerry|PlayBook|BB10)/i.test(a)) {
	                return 'BlackBerry';
	            } else if (/Mac/i.test(a)) {
	                return 'Mac OS X';
	            } else if (/Linux/.test(a)) {
	                return 'Linux';
	            } else {
	                return '';
	            }
	        },

	        device: function(user_agent) {
	            if (/Windows Phone/i.test(user_agent) || /WPDesktop/.test(user_agent)) {
	                return 'Windows Phone';
	            } else if (/iPad/.test(user_agent)) {
	                return 'iPad';
	            } else if (/iPod/.test(user_agent)) {
	                return 'iPod Touch';
	            } else if (/iPhone/.test(user_agent)) {
	                return 'iPhone';
	            } else if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
	                return 'BlackBerry';
	            } else if (/Android/.test(user_agent)) {
	                return 'Android';
	            } else {
	                return '';
	            }
	        },

	        referringDomain: function(referrer) {
	            var split = referrer.split('/');
	            if (split.length >= 3) {
	                return split[2];
	            }
	            return '';
	        },

	        properties: function() {
	            return _.extend(_.strip_empty_properties({
	                '$os': _.info.os(),
	                '$browser': _.info.browser(userAgent, navigator.vendor, window.opera),
	                '$referrer': document$1.referrer,
	                '$referring_domain': _.info.referringDomain(document$1.referrer),
	                '$device': _.info.device(userAgent)
	            }), {
	                '$current_url': window.location.href,
	                '$browser_version': _.info.browserVersion(userAgent, navigator.vendor, window.opera),
	                '$screen_height': screen.height,
	                '$screen_width': screen.width,
	                'mp_lib': 'web',
	                '$lib_version': Config.LIB_VERSION
	            });
	        },

	        people_properties: function() {
	            return _.extend(_.strip_empty_properties({
	                '$os': _.info.os(),
	                '$browser': _.info.browser(userAgent, navigator.vendor, window.opera)
	            }), {
	                '$browser_version': _.info.browserVersion(userAgent, navigator.vendor, window.opera)
	            });
	        },

	        pageviewInfo: function(page) {
	            return _.strip_empty_properties({
	                'mp_page': page,
	                'mp_referrer': document$1.referrer,
	                'mp_browser': _.info.browser(userAgent, navigator.vendor, window.opera),
	                'mp_platform': _.info.os()
	            });
	        }
	    };

	    // EXPORTS (for closure compiler)
	    _['toArray']            = _.toArray;
	    _['isObject']           = _.isObject;
	    _['JSONEncode']         = _.JSONEncode;
	    _['JSONDecode']         = _.JSONDecode;
	    _['isBlockedUA']        = _.isBlockedUA;
	    _['isEmptyObject']      = _.isEmptyObject;
	    _['info']               = _.info;
	    _['info']['device']     = _.info.device;
	    _['info']['browser']    = _.info.browser;
	    _['info']['properties'] = _.info.properties;

	    // specifying these locally here since some websites override the global Node var
	    // ex: https://www.codingame.com/
	    var ELEMENT_NODE = 1;
	    var TEXT_NODE = 3;

	    var autotrack = {
	        _initializedTokens: [],

	        _previousElementSibling: function(el) {
	            if (el.previousElementSibling) {
	                return el.previousElementSibling;
	            } else {
	                do {
	                    el = el.previousSibling;
	                } while (el && el.nodeType !== ELEMENT_NODE);
	                return el;
	            }
	        },

	        _loadScript: function(scriptUrlToLoad, callback) {
	            var scriptTag = document.createElement('script');
	            scriptTag.type = 'text/javascript';
	            scriptTag.src = scriptUrlToLoad;
	            scriptTag.onload = callback;

	            var scripts = document.getElementsByTagName('script');
	            if (scripts.length > 0) {
	                scripts[0].parentNode.insertBefore(scriptTag, scripts[0]);
	            } else {
	                document.body.appendChild(scriptTag);
	            }
	        },

	        _getClassName: function(elem) {
	            switch(typeof elem.className) {
	                case 'string':
	                    return elem.className;
	                case 'object': // handle cases where className might be SVGAnimatedString or some other type
	                    return elem.className.baseVal || elem.getAttribute('class') || '';
	                default: // future proof
	                    return '';
	            }
	        },

	        _getPropertiesFromElement: function(elem) {
	            var props = {
	                'classes': this._getClassName(elem).split(' '),
	                'tag_name': elem.tagName.toLowerCase()
	            };

	            if (_.includes(['input', 'select', 'textarea'], elem.tagName.toLowerCase())) {
	                var formFieldValue = this._getFormFieldValue(elem);
	                if (this._includeProperty(elem, formFieldValue)) {
	                    props['value'] = formFieldValue;
	                }
	            }

	            _.each(elem.attributes, function(attr) {
	                props['attr__' + attr.name] = attr.value;
	            });

	            var nthChild = 1;
	            var nthOfType = 1;
	            var currentElem = elem;
	            while (currentElem = this._previousElementSibling(currentElem)) { // eslint-disable-line no-cond-assign
	                nthChild++;
	                if (currentElem.tagName === elem.tagName) {
	                    nthOfType++;
	                }
	            }
	            props['nth_child'] = nthChild;
	            props['nth_of_type'] = nthOfType;

	            return props;
	        },

	        /*
	         * Due to potential reference discrepancies (such as the webcomponents.js polyfill)
	         * We want to match tagNames instead of specific reference because something like element === document.body
	         * won't always work because element might not be a native element.
	         */
	        _isTag: function(el, tag) {
	            return el && el.tagName && el.tagName.toLowerCase() === tag.toLowerCase();
	        },

	        _shouldTrackDomEvent: function(element, event) {
	            if (!element || this._isTag(element, 'html') || element.nodeType !== ELEMENT_NODE) {
	                return false;
	            }
	            var tag = element.tagName.toLowerCase();
	            switch (tag) {
	                case 'html':
	                    return false;
	                case 'form':
	                    return event.type === 'submit';
	                case 'input':
	                    if (['button', 'submit'].indexOf(element.getAttribute('type')) === -1) {
	                        return event.type === 'change';
	                    } else {
	                        return event.type === 'click';
	                    }
	                case 'select':
	                case 'textarea':
	                    return event.type === 'change';
	                default:
	                    return event.type === 'click';
	            }
	        },

	        _getDefaultProperties: function(eventType) {
	            return {
	                '$event_type': eventType,
	                '$ce_version': 1,
	                '$host': window.location.host,
	                '$pathname': window.location.pathname
	            };
	        },

	        _getInputValue: function(input) {
	            var value = null;
	            var type = input.type.toLowerCase();
	            switch(type) {
	                case 'checkbox':
	                    if (input.checked) {
	                        value = [input.value];
	                    }
	                    break;
	                case 'radio':
	                    if (input.checked) {
	                        value = input.value;
	                    }
	                    break;
	                default:
	                    value = input.value;
	                    break;
	            }
	            return value;
	        },

	        _getSelectValue: function(select) {
	            var value;
	            if (select.multiple) {
	                var values = [];
	                _.each(select.querySelectorAll('[selected]'), function(option) {
	                    values.push(option.value);
	                });
	                value = values;
	            } else {
	                value = select.value;
	            }
	            return value;
	        },

	        _includeProperty: function(input, value) {
	            for (var curEl = input; curEl.parentNode && !this._isTag(curEl, 'body'); curEl = curEl.parentNode) {
	                var classes = this._getClassName(curEl).split(' ');
	                if (_.includes(classes, 'mp-sensitive') || _.includes(classes, 'mp-no-track')) {
	                    return false;
	                }
	            }

	            if (_.includes(this._getClassName(input).split(' '), 'mp-include')) {
	                return true;
	            }

	            if (value === null) {
	                return false;
	            }

	            // don't include hidden or password fields
	            var type = input.type || '';
	            switch(type.toLowerCase()) {
	                case 'hidden':
	                    return false;
	                case 'password':
	                    return false;
	            }

	            // filter out data from fields that look like sensitive fields
	            var name = input.name || input.id || '';
	            var sensitiveNameRegex = /^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|seccode|securitycode|securitynum|socialsec|socsec|ssn/i;
	            if (sensitiveNameRegex.test(name.replace(/[^a-zA-Z0-9]/g, ''))) {
	                return false;
	            }

	            if (typeof value === 'string') {
	                // check to see if input value looks like a credit card number
	                // see: https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9781449327453/ch04s20.html
	                var ccRegex = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
	                if (ccRegex.test((value || '').replace(/[\- ]/g, ''))) {
	                    return false;
	                }

	                // check to see if input value looks like a social security number
	                var ssnRegex = /(^\d{3}-?\d{2}-?\d{4}$)/;
	                if (ssnRegex.test(value)) {
	                    return false;
	                }
	            }

	            return true;
	        },

	        _getFormFieldValue: function(field) {
	            var val;
	            switch(field.tagName.toLowerCase()) {
	                case 'input':
	                    val = this._getInputValue(field);
	                    break;
	                case 'select':
	                    val = this._getSelectValue(field);
	                    break;
	                default:
	                    val = field.value || field.textContent;
	                    break;
	            }
	            return this._includeProperty(field, val) ? val : null;
	        },

	        _getFormFieldProperties: function(form) {
	            var formFieldProps = {};
	            _.each(form.elements, function(field) {
	                var name = field.getAttribute('name') || field.getAttribute('id');
	                if (name !== null) {
	                    name = '$form_field__' + name;
	                    var val = this._getFormFieldValue(field);
	                    if (this._includeProperty(field, val)) {
	                        var prevFieldVal = formFieldProps[name];
	                        if (prevFieldVal !== undefined) { // combine values for inputs of same name
	                            formFieldProps[name] = [].concat(prevFieldVal, val);
	                        } else {
	                            formFieldProps[name] = val;
	                        }
	                    }
	                }
	            }, this);
	            return formFieldProps;
	        },

	        _extractCustomPropertyValue: function(customProperty) {
	            var propValues = [];
	            _.each(document.querySelectorAll(customProperty['css_selector']), function(matchedElem) {
	                if (['input', 'select'].indexOf(matchedElem.tagName.toLowerCase()) > -1) {
	                    propValues.push(matchedElem['value']);
	                } else if (matchedElem['textContent']) {
	                    propValues.push(matchedElem['textContent']);
	                }
	            });
	            return propValues.join(', ');
	        },

	        _getCustomProperties: function(targetElementList) {
	            var props = {};
	            _.each(this._customProperties, function(customProperty) {
	                _.each(customProperty['event_selectors'], function(eventSelector) {
	                    var eventElements = document.querySelectorAll(eventSelector);
	                    _.each(eventElements, function(eventElement) {
	                        if (_.includes(targetElementList, eventElement)) {
	                            props[customProperty['name']] = this._extractCustomPropertyValue(customProperty);
	                        }
	                    }, this);
	                }, this);
	            }, this);
	            return props;
	        },

	        _getEventTarget: function(e) {
	            // https://developer.mozilla.org/en-US/docs/Web/API/Event/target#Compatibility_notes
	            if (typeof e.target === 'undefined') {
	                return e.srcElement;
	            } else {
	                return e.target;
	            }
	        },

	        _trackEvent: function(e, instance) {
	            /*** Don't mess with this code without running IE8 tests on it ***/
	            var target = this._getEventTarget(e);
	            if (target.nodeType === TEXT_NODE) { // defeat Safari bug (see: http://www.quirksmode.org/js/events_properties.html)
	                target = target.parentNode;
	            }

	            if (this._shouldTrackDomEvent(target, e)) {
	                var targetElementList = [target];
	                var curEl = target;
	                while (curEl.parentNode && !this._isTag(curEl, 'body')) {
	                    targetElementList.push(curEl.parentNode);
	                    curEl = curEl.parentNode;
	                }

	                var elementsJson = [];
	                var href, elementText, form, explicitNoTrack = false;
	                _.each(targetElementList, function(el, idx) {
	                    // if the element or a parent element is an anchor tag
	                    // include the href as a property
	                    if (el.tagName.toLowerCase() === 'a') {
	                        href = el.getAttribute('href');
	                    } else if (el.tagName.toLowerCase() === 'form') {
	                        form = el;
	                    }
	                    // crawl up to max of 5 nodes to populate text content
	                    if (!elementText && idx < 5 && el.textContent) {
	                        var textContent = el.textContent.trim();
	                        if (textContent) {
	                            elementText = textContent.replace(/[\r\n]/g, ' ').replace(/[ ]+/g, ' ').substring(0, 255);
	                        }
	                    }

	                    // allow users to programatically prevent tracking of elements by adding class 'mp-no-track'
	                    var classes = this._getClassName(el).split(' ');
	                    if (_.includes(classes, 'mp-no-track')) {
	                        explicitNoTrack = true;
	                    }

	                    elementsJson.push(this._getPropertiesFromElement(el));
	                }, this);

	                if (explicitNoTrack) {
	                    return false;
	                }

	                var props = _.extend(
	                    this._getDefaultProperties(e.type),
	                    {
	                        '$elements':  elementsJson,
	                        '$el_attr__href': href,
	                        '$el_text': elementText
	                    },
	                    this._getCustomProperties(targetElementList)
	                );

	                if (form && (e.type === 'submit' || e.type === 'click')) {
	                    _.extend(props, this._getFormFieldProperties(form));
	                }
	                instance.track('$web_event', props);
	                return true;
	            }
	        },

	        // only reason is to stub for unit tests
	        // since you can't override window.location props
	        _navigate: function(href) {
	            window.location.href = href;
	        },

	        _addDomEventHandlers: function(instance) {
	            var handler = function(e) {
	                e = e || window.event;
	                this._trackEvent(e, instance);
	            }.bind(this);
	            _.register_event(document, 'submit', handler, false, true);
	            _.register_event(document, 'change', handler, false, true);
	            _.register_event(document, 'click', handler, false, true);
	        },

	        _customProperties: {},
	        init: function(instance) {
	            if (!(document && document.body)) {
	                console.log('document not ready yet, trying again in 500 milliseconds...');
	                var that = this;
	                setTimeout(function() { that.init(instance); }, 500);
	                return;
	            }

	            var token = instance.get_config('token');
	            if (this._initializedTokens.indexOf(token) > -1) {
	                console.log('autotrack already initialized for token "' + token + '"');
	                return;
	            }
	            this._initializedTokens.push(token);

	            if (!this._maybeLoadEditor(instance)) { // don't autotrack actions when the editor is enabled
	                var parseDecideResponse = function(response) {
	                    if (response && response['config'] && response['config']['enable_collect_everything'] === true) {

	                        if (response['custom_properties']) {
	                            this._customProperties = response['custom_properties'];
	                        }

	                        instance.track('$web_event', _.extend({
	                            '$title': document.title
	                        }, this._getDefaultProperties('pageview')));

	                        this._addDomEventHandlers(instance);

	                    } else {
	                        instance['__autotrack_enabled'] = false;
	                    }
	                }.bind(this);

	                instance._send_request(
	                    instance.get_config('api_host') + '/decide/', {
	                        'verbose': true,
	                        'version': '1',
	                        'lib': 'web',
	                        'token': token
	                    },
	                    instance._prepare_callback(parseDecideResponse)
	                );
	            }
	        },

	        _editorParamsFromHash: function(instance, hash) {
	            var editorParams;
	            try {
	                var state = _.getHashParam(hash, 'state');
	                state = JSON.parse(decodeURIComponent(state));
	                var expiresInSeconds = _.getHashParam(hash, 'expires_in');
	                editorParams = {
	                    'accessToken': _.getHashParam(hash, 'access_token'),
	                    'accessTokenExpiresAt': (new Date()).getTime() + (Number(expiresInSeconds) * 1000),
	                    'bookmarkletMode': !!state['bookmarkletMode'],
	                    'projectId': state['projectId'],
	                    'projectOwnerId': state['projectOwnerId'],
	                    'projectToken': state['token'],
	                    'readOnly': state['readOnly'],
	                    'userFlags': state['userFlags'],
	                    'userId': state['userId']
	                };
	                window.sessionStorage.setItem('editorParams', JSON.stringify(editorParams));

	                if (state['desiredHash']) {
	                    window.location.hash = state['desiredHash'];
	                } else if (window.history) {
	                    history.replaceState('', document.title, window.location.pathname + window.location.search); // completely remove hash
	                } else {
	                    window.location.hash = ''; // clear hash (but leaves # unfortunately)
	                }
	            } catch (e) {
	                console.error('Unable to parse data from hash', e);
	            }
	            return editorParams;
	        },

	        /**
	         * To load the visual editor, we need an access token and other state. That state comes from one of three places:
	         * 1. In the URL hash params if the customer is using an old snippet
	         * 2. From session storage under the key `_mpcehash` if the snippet already parsed the hash
	         * 3. From session storage under the key `editorParams` if the editor was initialized on a previous page
	         */
	        _maybeLoadEditor: function(instance) {
	            try {
	                var parseFromUrl = false;
	                if (_.getHashParam(window.location.hash, 'state')) {
	                    var state = _.getHashParam(window.location.hash, 'state');
	                    state = JSON.parse(decodeURIComponent(state));
	                    parseFromUrl = state['action'] === 'mpeditor';
	                }
	                var parseFromStorage = !!window.sessionStorage.getItem('_mpcehash');
	                var editorParams;

	                if (parseFromUrl) { // happens if they are initializing the editor using an old snippet
	                    editorParams = this._editorParamsFromHash(instance, window.location.hash);
	                } else if (parseFromStorage) { // happens if they are initialized the editor and using the new snippet
	                    editorParams = this._editorParamsFromHash(instance, window.sessionStorage.getItem('_mpcehash'));
	                    window.sessionStorage.removeItem('_mpcehash');
	                } else { // get credentials from sessionStorage from a previous initialzation
	                    editorParams = JSON.parse(window.sessionStorage.getItem('editorParams') || '{}');
	                }

	                if (editorParams['projectToken'] && instance.get_config('token') === editorParams['projectToken']) {
	                    this._loadEditor(instance, editorParams);
	                    return true;
	                } else {
	                    return false;
	                }
	            } catch (e) {
	                return false;
	            }
	        },

	        _loadEditor: function(instance, editorParams) {
	            if (!window['_mpEditorLoaded']) { // only load the codeless event editor once, even if there are multiple instances of MixpanelLib
	                window['_mpEditorLoaded'] = true;
	                var editorUrl = instance.get_config('app_host')
	                  + '/js-bundle/reports/collect-everything/editor.js?_ts='
	                  + (new Date()).getTime();
	                this._loadScript(editorUrl, function() {
	                    window['mp_load_editor'](editorParams);
	                });
	                return true;
	            }
	            return false;
	        },

	        // this is a mechanism to ramp up CE with no server-side interaction.
	        // when CE is active, every page load results in a decide request. we
	        // need to gently ramp this up so we don't overload decide. this decides
	        // deterministically if CE is enabled for this project by modding the char
	        // value of the project token.
	        enabledForProject: function(token, numBuckets, numEnabledBuckets) {
	            numBuckets = !_.isUndefined(numBuckets) ? numBuckets : 10;
	            numEnabledBuckets = !_.isUndefined(numEnabledBuckets) ? numEnabledBuckets : 10;
	            var charCodeSum = 0;
	            for (var i = 0; i < token.length; i++) {
	                charCodeSum += token.charCodeAt(i);
	            }
	            return (charCodeSum % numBuckets) < numEnabledBuckets;
	        },

	        isBrowserSupported: function() {
	            return _.isFunction(document.querySelectorAll);
	        }
	    };

	    _.bind_instance_methods(autotrack);
	    _.safewrap_instance_methods(autotrack);

	    /*
	     * Mixpanel JS Library
	     *
	     * Copyright 2012, Mixpanel, Inc. All Rights Reserved
	     * http://mixpanel.com/
	     *
	     * Includes portions of Underscore.js
	     * http://documentcloud.github.com/underscore/
	     * (c) 2011 Jeremy Ashkenas, DocumentCloud Inc.
	     * Released under the MIT License.
	     */

	    // ==ClosureCompiler==
	    // @compilation_level ADVANCED_OPTIMIZATIONS
	    // @output_file_name mixpanel-2.8.min.js
	    // ==/ClosureCompiler==

	    /*
	    SIMPLE STYLE GUIDE:

	    this.x === public function
	    this._x === internal - only use within this file
	    this.__x === private - only use within the class

	    Globals should be all caps
	    */

	    var init_type;       // MODULE or SNIPPET loader
	    var mixpanel_master; // main mixpanel instance / object
	    var INIT_MODULE  = 0;
	    var INIT_SNIPPET = 1;

	    /*
	     * Constants
	     */
	    /** @const */   var PRIMARY_INSTANCE_NAME     = 'mixpanel';
	    /** @const */   var SET_QUEUE_KEY             = '__mps';
	    /** @const */   var SET_ONCE_QUEUE_KEY        = '__mpso';
	    /** @const */   var ADD_QUEUE_KEY             = '__mpa';
	    /** @const */   var APPEND_QUEUE_KEY          = '__mpap';
	    /** @const */   var UNION_QUEUE_KEY           = '__mpu';
	    /** @const */   var SET_ACTION                = '$set';
	    /** @const */   var SET_ONCE_ACTION           = '$set_once';
	    /** @const */   var ADD_ACTION                = '$add';
	    /** @const */   var APPEND_ACTION             = '$append';
	    /** @const */   var UNION_ACTION              = '$union';
	    // This key is deprecated, but we want to check for it to see whether aliasing is allowed.
	    /** @const */   var PEOPLE_DISTINCT_ID_KEY    = '$people_distinct_id';
	    /** @const */   var ALIAS_ID_KEY              = '__alias';
	    /** @const */   var CAMPAIGN_IDS_KEY          = '__cmpns';
	    /** @const */   var EVENT_TIMERS_KEY          = '__timers';
	    /** @const */   var RESERVED_PROPERTIES       = [
	        SET_QUEUE_KEY,
	        SET_ONCE_QUEUE_KEY,
	        ADD_QUEUE_KEY,
	        APPEND_QUEUE_KEY,
	        UNION_QUEUE_KEY,
	        PEOPLE_DISTINCT_ID_KEY,
	        ALIAS_ID_KEY,
	        CAMPAIGN_IDS_KEY,
	        EVENT_TIMERS_KEY
	    ];

	    /*
	     * Dynamic... constants? Is that an oxymoron?
	     */
	    var HTTP_PROTOCOL = (('https:' === document.location.protocol) ? 'https://' : 'http://');

	        // http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
	        // https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest#withCredentials
	    var USE_XHR = (window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest());

	    /*
	     * Module-level globals
	     */
	    var DEFAULT_CONFIG = {
	        'api_host':               HTTP_PROTOCOL + 'api.mixpanel.com',
	        'app_host':               HTTP_PROTOCOL + 'mixpanel.com',
	        'autotrack':              true,
	        'cdn':                    HTTP_PROTOCOL + 'cdn.mxpnl.com',
	        'cross_subdomain_cookie': true,
	        'persistence':            'cookie',
	        'persistence_name':       '',
	        'cookie_name':            '',
	        'loaded':                 function() {},
	        'store_google':           true,
	        'save_referrer':          true,
	        'test':                   false,
	        'verbose':                false,
	        'img':                    false,
	        'track_pageview':         true,
	        'debug':                  false,
	        'track_links_timeout':    300,
	        'cookie_expiration':      365,
	        'upgrade':                false,
	        'disable_persistence':    false,
	        'disable_cookie':         false,
	        'secure_cookie':          false,
	        'ip':                     true,
	        'property_blacklist':     []
	    };

	    /**
	     * Mixpanel Persistence Object
	     * @constructor
	     */
	    var MixpanelPersistence = function(config) {
	        this['props'] = {};
	        this.campaign_params_saved = false;

	        if (config['persistence_name']) {
	            this.name = 'mp_' + config['persistence_name'];
	        } else {
	            this.name = 'mp_' + config['token'] + '_mixpanel';
	        }

	        var storage_type = config['persistence'];
	        if (storage_type !== 'cookie' && storage_type !== 'localStorage') {
	            console$1.critical('Unknown persistence type ' + storage_type + '; falling back to cookie');
	            storage_type = config['persistence'] = 'cookie';
	        }

	        var localStorage_supported = function() {
	            var supported = true;
	            try {
	                var key = '__mplssupport__',
	                    val = 'xyz';
	                _.localStorage.set(key, val);
	                if (_.localStorage.get(key) !== val) {
	                    supported = false;
	                }
	                _.localStorage.remove(key);
	            } catch (err) {
	                supported = false;
	            }
	            if (!supported) {
	                console$1.error('localStorage unsupported; falling back to cookie store');
	            }
	            return supported;
	        };
	        if (storage_type === 'localStorage' && localStorage_supported()) {
	            this.storage = _.localStorage;
	        } else {
	            this.storage = _.cookie;
	        }

	        this.load();
	        this.update_config(config);
	        this.upgrade(config);
	        this.save();
	    };

	    MixpanelPersistence.prototype.properties = function() {
	        var p = {};
	        // Filter out reserved properties
	        _.each(this['props'], function(v, k) {
	            if (!_.include(RESERVED_PROPERTIES, k)) {
	                p[k] = v;
	            }
	        });
	        return p;
	    };

	    MixpanelPersistence.prototype.load = function() {
	        if (this.disabled) { return; }

	        var entry = this.storage.parse(this.name);

	        if (entry) {
	            this['props'] = _.extend({}, entry);
	        }
	    };

	    MixpanelPersistence.prototype.upgrade = function(config) {
	        var upgrade_from_old_lib = config['upgrade'],
	            old_cookie_name,
	            old_cookie;

	        if (upgrade_from_old_lib) {
	            old_cookie_name = 'mp_super_properties';
	            // Case where they had a custom cookie name before.
	            if (typeof(upgrade_from_old_lib) === 'string') {
	                old_cookie_name = upgrade_from_old_lib;
	            }

	            old_cookie = this.storage.parse(old_cookie_name);

	            // remove the cookie
	            this.storage.remove(old_cookie_name);
	            this.storage.remove(old_cookie_name, true);

	            if (old_cookie) {
	                this['props'] = _.extend(
	                    this['props'],
	                    old_cookie['all'],
	                    old_cookie['events']
	                );
	            }
	        }

	        if (!config['cookie_name'] && config['name'] !== 'mixpanel') {
	            // special case to handle people with cookies of the form
	            // mp_TOKEN_INSTANCENAME from the first release of this library
	            old_cookie_name = 'mp_' + config['token'] + '_' + config['name'];
	            old_cookie = this.storage.parse(old_cookie_name);

	            if (old_cookie) {
	                this.storage.remove(old_cookie_name);
	                this.storage.remove(old_cookie_name, true);

	                // Save the prop values that were in the cookie from before -
	                // this should only happen once as we delete the old one.
	                this.register_once(old_cookie);
	            }
	        }

	        if (this.storage === _.localStorage) {
	            old_cookie = _.cookie.parse(this.name);

	            _.cookie.remove(this.name);
	            _.cookie.remove(this.name, true);

	            if (old_cookie) {
	                this.register_once(old_cookie);
	            }
	        }
	    };

	    MixpanelPersistence.prototype.save = function() {
	        if (this.disabled) { return; }
	        this._expire_notification_campaigns();
	        this.storage.set(
	            this.name,
	            _.JSONEncode(this['props']),
	            this.expire_days,
	            this.cross_subdomain,
	            this.secure
	        );
	    };

	    MixpanelPersistence.prototype.remove = function() {
	        // remove both domain and subdomain cookies
	        this.storage.remove(this.name, false);
	        this.storage.remove(this.name, true);
	    };

	    // removes the storage entry and deletes all loaded data
	    // forced name for tests
	    MixpanelPersistence.prototype.clear = function() {
	        this.remove();
	        this['props'] = {};
	    };

	    /**
	     * @param {Object} props
	     * @param {*=} default_value
	     * @param {number=} days
	     */
	    MixpanelPersistence.prototype.register_once = function(props, default_value, days) {
	        if (_.isObject(props)) {
	            if (typeof(default_value) === 'undefined') { default_value = 'None'; }
	            this.expire_days = (typeof(days) === 'undefined') ? this.default_expiry : days;

	            _.each(props, function(val, prop) {
	                if (!this['props'][prop] || this['props'][prop] === default_value) {
	                    this['props'][prop] = val;
	                }
	            }, this);

	            this.save();

	            return true;
	        }
	        return false;
	    };

	    /**
	     * @param {Object} props
	     * @param {number=} days
	     */
	    MixpanelPersistence.prototype.register = function(props, days) {
	        if (_.isObject(props)) {
	            this.expire_days = (typeof(days) === 'undefined') ? this.default_expiry : days;

	            _.extend(this['props'], props);

	            this.save();

	            return true;
	        }
	        return false;
	    };

	    MixpanelPersistence.prototype.unregister = function(prop) {
	        if (prop in this['props']) {
	            delete this['props'][prop];
	            this.save();
	        }
	    };

	    MixpanelPersistence.prototype._expire_notification_campaigns = _.safewrap(function() {
	        var campaigns_shown = this['props'][CAMPAIGN_IDS_KEY],
	            EXPIRY_TIME = Config.DEBUG ? 60 * 1000 : 60 * 60 * 1000; // 1 minute (Config.DEBUG) / 1 hour (PDXN)
	        if (!campaigns_shown) {
	            return;
	        }
	        for (var campaign_id in campaigns_shown) {
	            if (1 * new Date() - campaigns_shown[campaign_id] > EXPIRY_TIME) {
	                delete campaigns_shown[campaign_id];
	            }
	        }
	        if (_.isEmptyObject(campaigns_shown)) {
	            delete this['props'][CAMPAIGN_IDS_KEY];
	        }
	    });

	    MixpanelPersistence.prototype.update_campaign_params = function() {
	        if (!this.campaign_params_saved) {
	            this.register_once(_.info.campaignParams());
	            this.campaign_params_saved = true;
	        }
	    };

	    MixpanelPersistence.prototype.update_search_keyword = function(referrer) {
	        this.register(_.info.searchInfo(referrer));
	    };

	    // EXPORTED METHOD, we test this directly.
	    MixpanelPersistence.prototype.update_referrer_info = function(referrer) {
	        // If referrer doesn't exist, we want to note the fact that it was type-in traffic.
	        this.register_once({
	            '$initial_referrer': referrer || '$direct',
	            '$initial_referring_domain': _.info.referringDomain(referrer) || '$direct'
	        }, '');
	    };

	    MixpanelPersistence.prototype.get_referrer_info = function() {
	        return _.strip_empty_properties({
	            '$initial_referrer': this['props']['$initial_referrer'],
	            '$initial_referring_domain': this['props']['$initial_referring_domain']
	        });
	    };

	    // safely fills the passed in object with stored properties,
	    // does not override any properties defined in both
	    // returns the passed in object
	    MixpanelPersistence.prototype.safe_merge = function(props) {
	        _.each(this['props'], function(val, prop) {
	            if (!(prop in props)) {
	                props[prop] = val;
	            }
	        });

	        return props;
	    };

	    MixpanelPersistence.prototype.update_config = function(config) {
	        this.default_expiry = this.expire_days = config['cookie_expiration'];
	        this.set_disabled(config['disable_persistence']);
	        this.set_cross_subdomain(config['cross_subdomain_cookie']);
	        this.set_secure(config['secure_cookie']);
	    };

	    MixpanelPersistence.prototype.set_disabled = function(disabled) {
	        this.disabled = disabled;
	        if (this.disabled) {
	            this.remove();
	        }
	    };

	    MixpanelPersistence.prototype.set_cross_subdomain = function(cross_subdomain) {
	        if (cross_subdomain !== this.cross_subdomain) {
	            this.cross_subdomain = cross_subdomain;
	            this.remove();
	            this.save();
	        }
	    };

	    MixpanelPersistence.prototype.get_cross_subdomain = function() {
	        return this.cross_subdomain;
	    };

	    MixpanelPersistence.prototype.set_secure = function(secure) {
	        if (secure !== this.secure) {
	            this.secure = secure ? true : false;
	            this.remove();
	            this.save();
	        }
	    };

	    MixpanelPersistence.prototype._add_to_people_queue = function(queue, data) {
	        var q_key = this._get_queue_key(queue),
	            q_data = data[queue],
	            set_q = this._get_or_create_queue(SET_ACTION),
	            set_once_q = this._get_or_create_queue(SET_ONCE_ACTION),
	            add_q = this._get_or_create_queue(ADD_ACTION),
	            union_q = this._get_or_create_queue(UNION_ACTION),
	            append_q = this._get_or_create_queue(APPEND_ACTION, []);

	        if (q_key === SET_QUEUE_KEY) {
	            // Update the set queue - we can override any existing values
	            _.extend(set_q, q_data);
	            // if there was a pending increment, override it
	            // with the set.
	            this._pop_from_people_queue(ADD_ACTION, q_data);
	            // if there was a pending union, override it
	            // with the set.
	            this._pop_from_people_queue(UNION_ACTION, q_data);
	        } else if (q_key === SET_ONCE_QUEUE_KEY) {
	            // only queue the data if there is not already a set_once call for it.
	            _.each(q_data, function(v, k) {
	                if (!(k in set_once_q)) {
	                    set_once_q[k] = v;
	                }
	            });
	        } else if (q_key === ADD_QUEUE_KEY) {
	            _.each(q_data, function(v, k) {
	                // If it exists in the set queue, increment
	                // the value
	                if (k in set_q) {
	                    set_q[k] += v;
	                } else {
	                    // If it doesn't exist, update the add
	                    // queue
	                    if (!(k in add_q)) {
	                        add_q[k] = 0;
	                    }
	                    add_q[k] += v;
	                }
	            }, this);
	        } else if (q_key === UNION_QUEUE_KEY) {
	            _.each(q_data, function(v, k) {
	                if (_.isArray(v)) {
	                    if (!(k in union_q)) {
	                        union_q[k] = [];
	                    }
	                    // We may send duplicates, the server will dedup them.
	                    union_q[k] = union_q[k].concat(v);
	                }
	            });
	        } else if (q_key === APPEND_QUEUE_KEY) {
	            append_q.push(q_data);
	        }

	        console$1.log('MIXPANEL PEOPLE REQUEST (QUEUED, PENDING IDENTIFY):');
	        console$1.log(data);

	        this.save();
	    };

	    MixpanelPersistence.prototype._pop_from_people_queue = function(queue, data) {
	        var q = this._get_queue(queue);
	        if (!_.isUndefined(q)) {
	            _.each(data, function(v, k) {
	                delete q[k];
	            }, this);

	            this.save();
	        }
	    };

	    MixpanelPersistence.prototype._get_queue_key = function(queue) {
	        if (queue === SET_ACTION) {
	            return SET_QUEUE_KEY;
	        } else if (queue === SET_ONCE_ACTION) {
	            return SET_ONCE_QUEUE_KEY;
	        } else if (queue === ADD_ACTION) {
	            return ADD_QUEUE_KEY;
	        } else if (queue === APPEND_ACTION) {
	            return APPEND_QUEUE_KEY;
	        } else if (queue === UNION_ACTION) {
	            return UNION_QUEUE_KEY;
	        } else {
	            console$1.error('Invalid queue:', queue);
	        }
	    };

	    MixpanelPersistence.prototype._get_queue = function(queue) {
	        return this['props'][this._get_queue_key(queue)];
	    };
	    MixpanelPersistence.prototype._get_or_create_queue = function(queue, default_val) {
	        var key = this._get_queue_key(queue);
	        default_val = _.isUndefined(default_val) ? {} : default_val;

	        return this['props'][key] || (this['props'][key] = default_val);
	    };

	    MixpanelPersistence.prototype.set_event_timer = function(event_name, timestamp) {
	        var timers = this['props'][EVENT_TIMERS_KEY] || {};
	        timers[event_name] = timestamp;
	        this['props'][EVENT_TIMERS_KEY] = timers;
	        this.save();
	    };

	    MixpanelPersistence.prototype.remove_event_timer = function(event_name) {
	        var timers = this['props'][EVENT_TIMERS_KEY] || {};
	        var timestamp = timers[event_name];
	        if (!_.isUndefined(timestamp)) {
	            delete this['props'][EVENT_TIMERS_KEY][event_name];
	            this.save();
	        }
	        return timestamp;
	    };

	    /**
	     * Mixpanel Library Object
	     * @constructor
	     */
	    var MixpanelLib = function() {};

	    /**
	     * Mixpanel People Object
	     * @constructor
	     */
	    var MixpanelPeople = function() {};

	    /**
	     * create_mplib(token:string, config:object, name:string)
	     *
	     * This function is used by the init method of MixpanelLib objects
	     * as well as the main initializer at the end of the JSLib (that
	     * initializes document.mixpanel as well as any additional instances
	     * declared before this file has loaded).
	     */
	    var create_mplib = function(token, config, name) {
	        var instance,
	            target = (name === PRIMARY_INSTANCE_NAME) ? mixpanel_master : mixpanel_master[name];

	        if (target && init_type === INIT_MODULE) {
	            instance = target;
	        } else {
	            if (target && !_.isArray(target)) {
	                console$1.error('You have already initialized ' + name);
	                return;
	            }
	            instance = new MixpanelLib();
	        }

	        instance._init(token, config, name);

	        instance['people'] = new MixpanelPeople();
	        instance['people']._init(instance);

	        // if any instance on the page has debug = true, we set the
	        // global debug to be true
	        Config.DEBUG = Config.DEBUG || instance.get_config('debug');

	        instance['__autotrack_enabled'] = instance.get_config('autotrack');
	        if (instance.get_config('autotrack')) {
	            var num_buckets = 100;
	            var num_enabled_buckets = 100;
	            if (!autotrack.enabledForProject(instance.get_config('token'), num_buckets, num_enabled_buckets)) {
	                instance['__autotrack_enabled'] = false;
	                console$1.log('Not in active bucket: disabling Automatic Event Collection.');
	            } else if (!autotrack.isBrowserSupported()) {
	                instance['__autotrack_enabled'] = false;
	                console$1.log('Disabling Automatic Event Collection because this browser is not supported');
	            } else {
	                autotrack.init(instance);
	            }

	            try {
	                add_dom_event_counting_handlers(instance);
	            } catch (e) {
	                console$1.error(e);
	            }
	        }

	        // if target is not defined, we called init after the lib already
	        // loaded, so there won't be an array of things to execute
	        if (!_.isUndefined(target) && _.isArray(target)) {
	            // Crunch through the people queue first - we queue this data up &
	            // flush on identify, so it's better to do all these operations first
	            instance._execute_array.call(instance['people'], target['people']);
	            instance._execute_array(target);
	        }

	        return instance;
	    };

	    // Initialization methods

	    /**
	     * This function initializes a new instance of the Mixpanel tracking object.
	     * All new instances are added to the main mixpanel object as sub properties (such as
	     * mixpanel.library_name) and also returned by this function. To define a
	     * second instance on the page, you would call:
	     *
	     *     mixpanel.init('new token', { your: 'config' }, 'library_name');
	     *
	     * and use it like so:
	     *
	     *     mixpanel.library_name.track(...);
	     *
	     * @param {String} token   Your Mixpanel API token
	     * @param {Object} [config]  A dictionary of config options to override
	     * @param {String} [name]    The name for the new mixpanel instance that you want created
	     */
	    MixpanelLib.prototype.init = function (token, config, name) {
	        if (_.isUndefined(name)) {
	            console$1.error('You must name your new library: init(token, config, name)');
	            return;
	        }
	        if (name === PRIMARY_INSTANCE_NAME) {
	            console$1.error('You must initialize the main mixpanel object right after you include the Mixpanel js snippet');
	            return;
	        }

	        var instance = create_mplib(token, config, name);
	        mixpanel_master[name] = instance;
	        instance._loaded();

	        return instance;
	    };

	    // mixpanel._init(token:string, config:object, name:string)
	    //
	    // This function sets up the current instance of the mixpanel
	    // library.  The difference between this method and the init(...)
	    // method is this one initializes the actual instance, whereas the
	    // init(...) method sets up a new library and calls _init on it.
	    //
	    MixpanelLib.prototype._init = function(token, config, name) {
	        this['__loaded'] = true;
	        this['config'] = {};

	        this.set_config(_.extend({}, DEFAULT_CONFIG, config, {
	            'name': name,
	            'token': token,
	            'callback_fn': ((name === PRIMARY_INSTANCE_NAME) ? name : PRIMARY_INSTANCE_NAME + '.' + name) + '._jsc'
	        }));

	        this['_jsc'] = function() {};

	        this.__disabled_events = [];
	        this._flags = {
	            'disable_all_events': false,
	            'identify_called': false
	        };

	        this['persistence'] = this['cookie'] = new MixpanelPersistence(this['config']);
	        this.register_once({'distinct_id': _.UUID()}, '');
	    };

	    // Private methods

	    MixpanelLib.prototype._loaded = function() {
	        this.get_config('loaded')(this);

	        // this happens after so a user can call identify/name_tag in
	        // the loaded callback
	        if (this.get_config('track_pageview')) {
	            this.track_pageview();
	        }
	    };

	    /**
	     * _prepare_callback() should be called by callers of _send_request for use
	     * as the callback argument.
	     *
	     * If there is no callback, this returns null.
	     * If we are going to make XHR/XDR requests, this returns a function.
	     * If we are going to use script tags, this returns a string to use as the
	     * callback GET param.
	     */
	    MixpanelLib.prototype._prepare_callback = function(callback, data) {
	        if (_.isUndefined(callback)) {
	            return null;
	        }

	        if (USE_XHR) {
	            var callback_function = function(response) {
	                callback(response, data);
	            };
	            return callback_function;
	        } else {
	            // if the user gives us a callback, we store as a random
	            // property on this instances jsc function and update our
	            // callback string to reflect that.
	            var jsc = this['_jsc'];
	            var randomized_cb = '' + Math.floor(Math.random() * 100000000);
	            var callback_string = this.get_config('callback_fn') + '[' + randomized_cb + ']';
	            jsc[randomized_cb] = function(response) {
	                delete jsc[randomized_cb];
	                callback(response, data);
	            };
	            return callback_string;
	        }
	    };

	    MixpanelLib.prototype._send_request = function(url, data, callback) {

	        // needed to correctly format responses
	        var verbose_mode = this.get_config('verbose');
	        if (data['verbose']) { verbose_mode = true; }

	        if (this.get_config('test')) { data['test'] = 1; }
	        if (verbose_mode) { data['verbose'] = 1; }
	        if (this.get_config('img')) { data['img'] = 1; }
	        if (!USE_XHR) {
	            if (callback) {
	                data['callback'] = callback;
	            } else if (verbose_mode || this.get_config('test')) {
	                // Verbose output (from verbose mode, or an error in test mode) is a json blob,
	                // which by itself is not valid javascript. Without a callback, this verbose output will
	                // cause an error when returned via jsonp, so we force a no-op callback param.
	                // See the ECMA script spec: http://www.ecma-international.org/ecma-262/5.1/#sec-12.4
	                data['callback'] = '(function(){})';
	            }
	        }

	        data['ip'] = this.get_config('ip')?1:0;
	        data['_'] = new Date().getTime().toString();
	        url += '?' + _.HTTPBuildQuery(data);

	        if ('img' in data) {
	            var img = document.createElement('img');
	            img.src = url;
	            document.body.appendChild(img);
	        } else if (USE_XHR) {
	            try {
	                var req = new XMLHttpRequest();
	                req.open('GET', url, true);
	                // send the mp_optout cookie
	                // withCredentials cannot be modified until after calling .open on Android and Mobile Safari
	                req.withCredentials = true;
	                req.onreadystatechange = function () {
	                    if (req.readyState === 4) { // XMLHttpRequest.DONE == 4, except in safari 4
	                        if (req.status === 200) {
	                            if (callback) {
	                                if (verbose_mode) {
	                                    callback(_.JSONDecode(req.responseText));
	                                } else {
	                                    callback(Number(req.responseText));
	                                }
	                            }
	                        } else {
	                            var error = 'Bad HTTP status: ' + req.status + ' ' + req.statusText;
	                            console$1.error(error);
	                            if (callback) {
	                                if (verbose_mode) {
	                                    callback({status: 0, error: error});
	                                } else {
	                                    callback(0);
	                                }
	                            }
	                        }
	                    }
	                };
	                req.send(null);
	            } catch (e) {
	                console$1.error(e);
	            }
	        } else {
	            var script = document.createElement('script');
	            script.type = 'text/javascript';
	            script.async = true;
	            script.defer = true;
	            script.src = url;
	            var s = document.getElementsByTagName('script')[0];
	            s.parentNode.insertBefore(script, s);
	        }
	    };

	    /**
	     * _execute_array() deals with processing any mixpanel function
	     * calls that were called before the Mixpanel library were loaded
	     * (and are thus stored in an array so they can be called later)
	     *
	     * Note: we fire off all the mixpanel function calls && user defined
	     * functions BEFORE we fire off mixpanel tracking calls. This is so
	     * identify/register/set_config calls can properly modify early
	     * tracking calls.
	     *
	     * @param {Array} array
	     */
	    MixpanelLib.prototype._execute_array = function(array) {
	        var fn_name, alias_calls = [], other_calls = [], tracking_calls = [];
	        _.each(array, function(item) {
	            if (item) {
	                fn_name = item[0];
	                if (typeof(item) === 'function') {
	                    item.call(this);
	                } else if (_.isArray(item) && fn_name === 'alias') {
	                    alias_calls.push(item);
	                } else if (_.isArray(item) && fn_name.indexOf('track') !== -1 && typeof(this[fn_name]) === 'function') {
	                    tracking_calls.push(item);
	                } else {
	                    other_calls.push(item);
	                }
	            }
	        }, this);

	        var execute = function(calls, context) {
	            _.each(calls, function(item) {
	                this[item[0]].apply(this, item.slice(1));
	            }, context);
	        };

	        execute(alias_calls, this);
	        execute(other_calls, this);
	        execute(tracking_calls, this);
	    };

	    /**
	     * push() keeps the standard async-array-push
	     * behavior around after the lib is loaded.
	     * This is only useful for external integrations that
	     * do not wish to rely on our convenience methods
	     * (created in the snippet).
	     *
	     * ### Usage:
	     *     mixpanel.push(['register', { a: 'b' }]);
	     *
	     * @param {Array} item A [function_name, args...] array to be executed
	     */
	    MixpanelLib.prototype.push = function(item) {
	        this._execute_array([item]);
	    };

	    /**
	     * Disable events on the Mixpanel object. If passed no arguments,
	     * this function disables tracking of any event. If passed an
	     * array of event names, those events will be disabled, but other
	     * events will continue to be tracked.
	     *
	     * Note: this function does not stop other mixpanel functions from
	     * firing, such as register() or people.set().
	     *
	     * @param {Array} [events] An array of event names to disable
	     */
	    MixpanelLib.prototype.disable = function(events) {
	        if (typeof(events) === 'undefined') {
	            this._flags.disable_all_events = true;
	        } else {
	            this.__disabled_events = this.__disabled_events.concat(events);
	        }
	    };

	    /**
	     * Track an event. This is the most important and
	     * frequently used Mixpanel function.
	     *
	     * ### Usage:
	     *
	     *     // track an event named 'Registered'
	     *     mixpanel.track('Registered', {'Gender': 'Male', 'Age': 21});
	     *
	     * To track link clicks or form submissions, see track_links() or track_forms().
	     *
	     * @param {String} event_name The name of the event. This can be anything the user does - 'Button Click', 'Sign Up', 'Item Purchased', etc.
	     * @param {Object} [properties] A set of properties to include with the event you're sending. These describe the user who did the event or details about the event itself.
	     * @param {Function} [callback] If provided, the callback function will be called after tracking the event.
	     */
	    MixpanelLib.prototype.track = function(event_name, properties, callback) {
	        if (typeof(callback) !== 'function') {
	            callback = function() {};
	        }

	        if (_.isUndefined(event_name)) {
	            console$1.error('No event name provided to mixpanel.track');
	            return;
	        }

	        if (this._event_is_disabled(event_name)) {
	            callback(0);
	            return;
	        }

	        // set defaults
	        properties = properties || {};
	        properties['token'] = this.get_config('token');

	        // set $duration if time_event was previously called for this event
	        var start_timestamp = this['persistence'].remove_event_timer(event_name);
	        if (!_.isUndefined(start_timestamp)) {
	            var duration_in_ms = new Date().getTime() - start_timestamp;
	            properties['$duration'] = parseFloat((duration_in_ms / 1000).toFixed(3));
	        }

	        // update persistence
	        this['persistence'].update_search_keyword(document.referrer);

	        if (this.get_config('store_google')) { this['persistence'].update_campaign_params(); }
	        if (this.get_config('save_referrer')) { this['persistence'].update_referrer_info(document.referrer); }

	        // note: extend writes to the first object, so lets make sure we
	        // don't write to the persistence properties object and info
	        // properties object by passing in a new object

	        // update properties with pageview info and super-properties
	        properties = _.extend(
	            {},
	            _.info.properties(),
	            this['persistence'].properties(),
	            properties
	        );

	        try {
	            if (this.get_config('autotrack') && event_name !== 'mp_page_view' && event_name !== '$create_alias') {
	                // The point of $__c is to count how many clicks occur per tracked event. Since we're
	                // tracking an event in this function, we need to reset the $__c value.
	                properties = _.extend({}, properties, this.mp_counts);
	                this.mp_counts = {'$__c': 0};
	                _.cookie.set('mp_' + this.get_config('name') + '__c', 0, 1, true);
	            }
	        } catch (e) {
	            console$1.error(e);
	        }

	        var property_blacklist = this.get_config('property_blacklist');
	        if (_.isArray(property_blacklist)) {
	            _.each(property_blacklist, function(blacklisted_prop) {
	                delete properties[blacklisted_prop];
	            });
	        } else {
	            console$1.error('Invalid value for property_blacklist config: ' + property_blacklist);
	        }

	        var data = {
	            'event': event_name,
	            'properties': properties
	        };

	        var truncated_data = _.truncate(data, 255);
	        var json_data      = _.JSONEncode(truncated_data);
	        var encoded_data   = _.base64Encode(json_data);

	        console$1.log('MIXPANEL REQUEST:');
	        console$1.log(truncated_data);

	        this._send_request(
	            this.get_config('api_host') + '/track/',
	            { 'data': encoded_data },
	            this._prepare_callback(callback, truncated_data)
	        );

	        return truncated_data;
	    };

	    /**
	     * Track a page view event, which is currently ignored by the server.
	     * This function is called by default on page load unless the
	     * track_pageview configuration variable is false.
	     *
	     * @param {String} [page] The url of the page to record. If you don't include this, it defaults to the current url.
	     * @api private
	     */
	    MixpanelLib.prototype.track_pageview = function(page) {
	        if (_.isUndefined(page)) {
	            page = document.location.href;
	        }
	        this.track('mp_page_view', _.info.pageviewInfo(page));
	    };

	    /**
	     * Time an event by including the time between this call and a
	     * later 'track' call for the same event in the properties sent
	     * with the event.
	     *
	     * ### Usage:
	     *
	     *     // time an event named 'Registered'
	     *     mixpanel.time_event('Registered');
	     *     mixpanel.track('Registered', {'Gender': 'Male', 'Age': 21});
	     *
	     * When called for a particular event name, the next track call for that event
	     * name will include the elapsed time between the 'time_event' and 'track'
	     * calls. This value is stored as seconds in the '$duration' property.
	     *
	     * @param {String} event_name The name of the event.
	     */
	    MixpanelLib.prototype.time_event = function(event_name) {
	        if (_.isUndefined(event_name)) {
	            console$1.error('No event name provided to mixpanel.time_event');
	            return;
	        }

	        if (this._event_is_disabled(event_name)) {
	            return;
	        }

	        this['persistence'].set_event_timer(event_name,  new Date().getTime());
	    };

	    /**
	     * Register a set of super properties, which are included with all
	     * events. This will overwrite previous super property values.
	     *
	     * ### Usage:
	     *
	     *     // register 'Gender' as a super property
	     *     mixpanel.register({'Gender': 'Female'});
	     *
	     *     // register several super properties when a user signs up
	     *     mixpanel.register({
	     *         'Email': 'jdoe@example.com',
	     *         'Account Type': 'Free'
	     *     });
	     *
	     * @param {Object} properties An associative array of properties to store about the user
	     * @param {Number} [days] How many days since the user's last visit to store the super properties
	     */
	    MixpanelLib.prototype.register = function(props, days) {
	        this['persistence'].register(props, days);
	    };

	    /**
	     * Register a set of super properties only once. This will not
	     * overwrite previous super property values, unlike register().
	     *
	     * ### Usage:
	     *
	     *     // register a super property for the first time only
	     *     mixpanel.register_once({
	     *         'First Login Date': new Date().toISOString()
	     *     });
	     *
	     * ### Notes:
	     *
	     * If default_value is specified, current super properties
	     * with that value will be overwritten.
	     *
	     * @param {Object} properties An associative array of properties to store about the user
	     * @param {*} [default_value] Value to override if already set in super properties (ex: 'False') Default: 'None'
	     * @param {Number} [days] How many days since the users last visit to store the super properties
	     */
	    MixpanelLib.prototype.register_once = function(props, default_value, days) {
	        this['persistence'].register_once(props, default_value, days);
	    };

	    /**
	     * Delete a super property stored with the current user.
	     *
	     * @param {String} property The name of the super property to remove
	     */
	    MixpanelLib.prototype.unregister = function(property) {
	        this['persistence'].unregister(property);
	    };

	    MixpanelLib.prototype._register_single = function(prop, value) {
	        var props = {};
	        props[prop] = value;
	        this.register(props);
	    };

	    /**
	     * Identify a user with a unique ID. All subsequent
	     * actions caused by this user will be tied to this unique ID. This
	     * property is used to track unique visitors. If the method is
	     * never called, then unique visitors will be identified by a UUID
	     * generated the first time they visit the site.
	     *
	     * ### Notes:
	     *
	     * You can call this function to overwrite a previously set
	     * unique ID for the current user. Mixpanel cannot translate
	     * between IDs at this time, so when you change a user's ID
	     * they will appear to be a new user.
	     *
	     * identify() should not be called to link anonymous activity to
	     * subsequent activity when a unique ID is first assigned.
	     * Use alias() when a unique ID is first assigned (registration), and
	     * use identify() to identify the user with that unique ID on an ongoing
	     * basis (e.g., each time a user logs in after registering).
	     * Do not call identify() at the same time as alias().
	     *
	     * @param {String} [unique_id] A string that uniquely identifies a user. If not provided, the distinct_id currently in the persistent store (cookie or localStorage) will be used.
	     */
	    MixpanelLib.prototype.identify = function(unique_id, _set_callback, _add_callback, _append_callback, _set_once_callback, _union_callback) {
	        // Optional Parameters
	        //  _set_callback:function  A callback to be run if and when the People set queue is flushed
	        //  _add_callback:function  A callback to be run if and when the People add queue is flushed
	        //  _append_callback:function  A callback to be run if and when the People append queue is flushed
	        //  _set_once_callback:function  A callback to be run if and when the People set_once queue is flushed
	        //  _union_callback:function  A callback to be run if and when the People union queue is flushed

	        // identify only changes the distinct id if it doesn't match either the existing or the alias;
	        // if it's new, blow away the alias as well.
	        if (unique_id !== this.get_distinct_id() && unique_id !== this.get_property(ALIAS_ID_KEY)) {
	            this.unregister(ALIAS_ID_KEY);
	            this._register_single('distinct_id', unique_id);
	        }
	        this._flags.identify_called = true;
	        // Flush any queued up people requests
	        this['people']._flush(_set_callback, _add_callback, _append_callback, _set_once_callback, _union_callback);
	    };

	    /**
	     * Clears super properties and generates a new random distinct_id for this instance.
	     * Useful for clearing data when a user logs out.
	     */
	    MixpanelLib.prototype.reset = function() {
	        this['persistence'].clear();
	        this._flags.identify_called = false;
	        this.register_once({'distinct_id': _.UUID()}, '');
	    };

	    /**
	     * Returns the current distinct id of the user. This is either the id automatically
	     * generated by the library or the id that has been passed by a call to identify().
	     *
	     * ### Notes:
	     *
	     * get_distinct_id() can only be called after the Mixpanel library has finished loading.
	     * init() has a loaded function available to handle this automatically. For example:
	     *
	     *     // set distinct_id after the mixpanel library has loaded
	     *     mixpanel.init('YOUR PROJECT TOKEN', {
	     *         loaded: function(mixpanel) {
	     *             distinct_id = mixpanel.get_distinct_id();
	     *         }
	     *     });
	     */
	    MixpanelLib.prototype.get_distinct_id = function() {
	        return this.get_property('distinct_id');
	    };

	    /**
	     * Create an alias, which Mixpanel will use to link two distinct_ids going forward (not retroactively).
	     * Multiple aliases can map to the same original ID, but not vice-versa. Aliases can also be chained - the
	     * following is a valid scenario:
	     *
	     *     mixpanel.alias('new_id', 'existing_id');
	     *     ...
	     *     mixpanel.alias('newer_id', 'new_id');
	     *
	     * If the original ID is not passed in, we will use the current distinct_id - probably the auto-generated GUID.
	     *
	     * ### Notes:
	     *
	     * The best practice is to call alias() when a unique ID is first created for a user
	     * (e.g., when a user first registers for an account and provides an email address).
	     * alias() should never be called more than once for a given user, except to
	     * chain a newer ID to a previously new ID, as described above.
	     *
	     * @param {String} alias A unique identifier that you want to use for this user in the future.
	     * @param {String} [original] The current identifier being used for this user.
	     */
	    MixpanelLib.prototype.alias = function(alias, original) {
	        // If the $people_distinct_id key exists in persistence, there has been a previous
	        // mixpanel.people.identify() call made for this user. It is VERY BAD to make an alias with
	        // this ID, as it will duplicate users.
	        if (alias === this.get_property(PEOPLE_DISTINCT_ID_KEY)) {
	            console$1.critical('Attempting to create alias for existing People user - aborting.');
	            return -2;
	        }

	        var _this = this;
	        if (_.isUndefined(original)) {
	            original = this.get_distinct_id();
	        }
	        if (alias !== original) {
	            this._register_single(ALIAS_ID_KEY, alias);
	            return this.track('$create_alias', { 'alias': alias, 'distinct_id': original }, function() {
	                // Flush the people queue
	                _this.identify(alias);
	            });
	        } else {
	            console$1.error('alias matches current distinct_id - skipping api call.');
	            this.identify(alias);
	            return -1;
	        }
	    };

	    /**
	     * Provide a string to recognize the user by. The string passed to
	     * this method will appear in the Mixpanel Streams product rather
	     * than an automatically generated name. Name tags do not have to
	     * be unique.
	     *
	     * This value will only be included in Streams data.
	     *
	     * @param {String} name_tag A human readable name for the user
	     * @api private
	     */
	    MixpanelLib.prototype.name_tag = function(name_tag) {
	        this._register_single('mp_name_tag', name_tag);
	    };

	    /**
	     * Update the configuration of a mixpanel library instance.
	     *
	     * The default config is:
	     *
	     *     {
	     *       // super properties cookie expiration (in days)
	     *       cookie_expiration:          365
	     *
	     *       // super properties span subdomains
	     *       cross_subdomain_cookie:     true
	     *
	     *       // if this is true, the mixpanel cookie or localStorage entry
	     *       // will be deleted, and no user persistence will take place
	     *       disable_persistence:        false
	     *
	     *       // type of persistent store for super properties (cookie/
	     *       // localStorage) if set to 'localStorage', any existing
	     *       // mixpanel cookie value with the same persistence_name
	     *       // will be transferred to localStorage and deleted
	     *       persistence:                'cookie'
	     *
	     *       // name for super properties persistent store
	     *       persistence_name:           ''
	     *
	     *       // names of properties/superproperties which should never
	     *       // be sent with track() calls
	     *       property_blacklist:         []
	     *
	     *       // if this is true, mixpanel cookies will be marked as
	     *       // secure, meaning they will only be transmitted over https
	     *       secure_cookie:              false
	     *
	     *       // the amount of time track_links will
	     *       // wait for Mixpanel's servers to respond
	     *       track_links_timeout:        300
	     *
	     *       // should we track a page view on page load
	     *       track_pageview:             true
	     *
	     *       // if you set upgrade to be true, the library will check for
	     *       // a cookie from our old js library and import super
	     *       // properties from it, then the old cookie is deleted
	     *       // The upgrade config option only works in the initialization,
	     *       // so make sure you set it when you create the library.
	     *       upgrade:                    false
	     *     }
	     *
	     *
	     * @param {Object} config A dictionary of new configuration values to update
	     */
	    MixpanelLib.prototype.set_config = function(config) {
	        if (_.isObject(config)) {
	            _.extend(this['config'], config);

	            if (!this.get_config('persistence_name')) {
	                this['config']['persistence_name'] = this['config']['cookie_name'];
	            }
	            if (!this.get_config('disable_persistence')) {
	                this['config']['disable_persistence'] = this['config']['disable_cookie'];
	            }

	            if (this['persistence']) {
	                this['persistence'].update_config(this['config']);
	            }
	            Config.DEBUG = Config.DEBUG || this.get_config('debug');
	        }
	    };

	    /**
	     * returns the current config object for the library.
	     */
	    MixpanelLib.prototype.get_config = function(prop_name) {
	        return this['config'][prop_name];
	    };

	    /**
	     * Returns the value of the super property named property_name. If no such
	     * property is set, get_property() will return the undefined value.
	     *
	     * ### Notes:
	     *
	     * get_property() can only be called after the Mixpanel library has finished loading.
	     * init() has a loaded function available to handle this automatically. For example:
	     *
	     *     // grab value for 'user_id' after the mixpanel library has loaded
	     *     mixpanel.init('YOUR PROJECT TOKEN', {
	     *         loaded: function(mixpanel) {
	     *             user_id = mixpanel.get_property('user_id');
	     *         }
	     *     });
	     *
	     * @param {String} property_name The name of the super property you want to retrieve
	     */
	    MixpanelLib.prototype.get_property = function(property_name) {
	        return this['persistence']['props'][property_name];
	    };

	    MixpanelLib.prototype.toString = function() {
	        var name = this.get_config('name');
	        if (name !== PRIMARY_INSTANCE_NAME) {
	            name = PRIMARY_INSTANCE_NAME + '.' + name;
	        }
	        return name;
	    };

	    MixpanelLib.prototype._event_is_disabled = function(event_name) {
	        return _.isBlockedUA(userAgent) ||
	            this._flags.disable_all_events ||
	            _.include(this.__disabled_events, event_name);
	    };

	    MixpanelPeople.prototype._init = function(mixpanel_instance) {
	        this._mixpanel = mixpanel_instance;
	    };

	    /*
	     * Set properties on a user record.
	     *
	     * ### Usage:
	     *
	     *     mixpanel.people.set('gender', 'm');
	     *
	     *     // or set multiple properties at once
	     *     mixpanel.people.set({
	     *         'Company': 'Acme',
	     *         'Plan': 'Premium',
	     *         'Upgrade date': new Date()
	     *     });
	     *     // properties can be strings, integers, dates, or lists
	     *
	     * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
	     * @param {*} [to] A value to set on the given property name
	     * @param {Function} [callback] If provided, the callback will be called after the tracking event
	     */
	    MixpanelPeople.prototype.set = function(prop, to, callback) {
	        var data = {};
	        var $set = {};
	        if (_.isObject(prop)) {
	            _.each(prop, function(v, k) {
	                if (!this._is_reserved_property(k)) {
	                    $set[k] = v;
	                }
	            }, this);
	            callback = to;
	        } else {
	            $set[prop] = to;
	        }

	        // make sure that the referrer info has been updated and saved
	        if (this._get_config('save_referrer')) {
	            this._mixpanel['persistence'].update_referrer_info(document.referrer);
	        }

	        // update $set object with default people properties
	        $set = _.extend(
	            {},
	            _.info.people_properties(),
	            this._mixpanel['persistence'].get_referrer_info(),
	            $set
	        );

	        data[SET_ACTION] = $set;

	        return this._send_request(data, callback);
	    };

	    /*
	     * Set properties on a user record, only if they do not yet exist.
	     * This will not overwrite previous people property values, unlike
	     * people.set().
	     *
	     * ### Usage:
	     *
	     *     mixpanel.people.set_once('First Login Date', new Date());
	     *
	     *     // or set multiple properties at once
	     *     mixpanel.people.set_once({
	     *         'First Login Date': new Date(),
	     *         'Starting Plan': 'Premium'
	     *     });
	     *
	     *     // properties can be strings, integers or dates
	     *
	     * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
	     * @param {*} [to] A value to set on the given property name
	     * @param {Function} [callback] If provided, the callback will be called after the tracking event
	     */
	    MixpanelPeople.prototype.set_once = function(prop, to, callback) {
	        var data = {};
	        var $set_once = {};
	        if (_.isObject(prop)) {
	            _.each(prop, function(v, k) {
	                if (!this._is_reserved_property(k)) {
	                    $set_once[k] = v;
	                }
	            }, this);
	            callback = to;
	        } else {
	            $set_once[prop] = to;
	        }
	        data[SET_ONCE_ACTION] = $set_once;
	        return this._send_request(data, callback);
	    };

	    /*
	     * Increment/decrement numeric people analytics properties.
	     *
	     * ### Usage:
	     *
	     *     mixpanel.people.increment('page_views', 1);
	     *
	     *     // or, for convenience, if you're just incrementing a counter by
	     *     // 1, you can simply do
	     *     mixpanel.people.increment('page_views');
	     *
	     *     // to decrement a counter, pass a negative number
	     *     mixpanel.people.increment('credits_left', -1);
	     *
	     *     // like mixpanel.people.set(), you can increment multiple
	     *     // properties at once:
	     *     mixpanel.people.increment({
	     *         counter1: 1,
	     *         counter2: 6
	     *     });
	     *
	     * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and numeric values.
	     * @param {Number} [by] An amount to increment the given property
	     * @param {Function} [callback] If provided, the callback will be called after the tracking event
	     */
	    MixpanelPeople.prototype.increment = function(prop, by, callback) {
	        var data = {};
	        var $add = {};
	        if (_.isObject(prop)) {
	            _.each(prop, function(v, k) {
	                if (!this._is_reserved_property(k)) {
	                    if (isNaN(parseFloat(v))) {
	                        console$1.error('Invalid increment value passed to mixpanel.people.increment - must be a number');
	                        return;
	                    } else {
	                        $add[k] = v;
	                    }
	                }
	            }, this);
	            callback = by;
	        } else {
	            // convenience: mixpanel.people.increment('property'); will
	            // increment 'property' by 1
	            if (_.isUndefined(by)) {
	                by = 1;
	            }
	            $add[prop] = by;
	        }
	        data[ADD_ACTION] = $add;

	        return this._send_request(data, callback);
	    };

	    /*
	     * Append a value to a list-valued people analytics property.
	     *
	     * ### Usage:
	     *
	     *     // append a value to a list, creating it if needed
	     *     mixpanel.people.append('pages_visited', 'homepage');
	     *
	     *     // like mixpanel.people.set(), you can append multiple
	     *     // properties at once:
	     *     mixpanel.people.append({
	     *         list1: 'bob',
	     *         list2: 123
	     *     });
	     *
	     * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
	     * @param {*} [value] An item to append to the list
	     * @param {Function} [callback] If provided, the callback will be called after the tracking event
	     */
	    MixpanelPeople.prototype.append = function(list_name, value, callback) {
	        var data = {};
	        var $append = {};
	        if (_.isObject(list_name)) {
	            _.each(list_name, function(v, k) {
	                if (!this._is_reserved_property(k)) {
	                    $append[k] = v;
	                }
	            }, this);
	            callback = value;
	        } else {
	            $append[list_name] = value;
	        }
	        data[APPEND_ACTION] = $append;

	        return this._send_request(data, callback);
	    };

	    /*
	     * Merge a given list with a list-valued people analytics property,
	     * excluding duplicate values.
	     *
	     * ### Usage:
	     *
	     *     // merge a value to a list, creating it if needed
	     *     mixpanel.people.union('pages_visited', 'homepage');
	     *
	     *     // like mixpanel.people.set(), you can append multiple
	     *     // properties at once:
	     *     mixpanel.people.union({
	     *         list1: 'bob',
	     *         list2: 123
	     *     });
	     *
	     *     // like mixpanel.people.append(), you can append multiple
	     *     // values to the same list:
	     *     mixpanel.people.union({
	     *         list1: ['bob', 'billy']
	     *     });
	     *
	     * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
	     * @param {*} [value] Value / values to merge with the given property
	     * @param {Function} [callback] If provided, the callback will be called after the tracking event
	     */
	    MixpanelPeople.prototype.union = function(list_name, values, callback) {
	        var data = {};
	        var $union = {};
	        if (_.isObject(list_name)) {
	            _.each(list_name, function(v, k) {
	                if (!this._is_reserved_property(k)) {
	                    $union[k] = _.isArray(v) ? v : [v];
	                }
	            }, this);
	            callback = values;
	        } else {
	            $union[list_name] = _.isArray(values) ? values : [values];
	        }
	        data[UNION_ACTION] = $union;

	        return this._send_request(data, callback);
	    };

	    /*
	     * Record that you have charged the current user a certain amount
	     * of money. Charges recorded with track_charge() will appear in the
	     * Mixpanel revenue report.
	     *
	     * ### Usage:
	     *
	     *     // charge a user $50
	     *     mixpanel.people.track_charge(50);
	     *
	     *     // charge a user $30.50 on the 2nd of january
	     *     mixpanel.people.track_charge(30.50, {
	     *         '$time': new Date('jan 1 2012')
	     *     });
	     *
	     * @param {Number} amount The amount of money charged to the current user
	     * @param {Object} [properties] An associative array of properties associated with the charge
	     * @param {Function} [callback] If provided, the callback will be called when the server responds
	     */
	    MixpanelPeople.prototype.track_charge = function(amount, properties, callback) {
	        if (!_.isNumber(amount)) {
	            amount = parseFloat(amount);
	            if (isNaN(amount)) {
	                console$1.error('Invalid value passed to mixpanel.people.track_charge - must be a number');
	                return;
	            }
	        }

	        return this.append('$transactions', _.extend({
	            '$amount': amount
	        }, properties), callback);
	    };

	    /*
	     * Permanently clear all revenue report transactions from the
	     * current user's people analytics profile.
	     *
	     * ### Usage:
	     *
	     *     mixpanel.people.clear_charges();
	     *
	     * @param {Function} [callback] If provided, the callback will be called after the tracking event
	     */
	    MixpanelPeople.prototype.clear_charges = function(callback) {
	        return this.set('$transactions', [], callback);
	    };

	    /*
	     * Permanently deletes the current people analytics profile from
	     * Mixpanel (using the current distinct_id).
	     *
	     * ### Usage:
	     *
	     *     // remove the all data you have stored about the current user
	     *     mixpanel.people.delete_user();
	     *
	     */
	    MixpanelPeople.prototype.delete_user = function() {
	        if (!this._identify_called()) {
	            console$1.error('mixpanel.people.delete_user() requires you to call identify() first');
	            return;
	        }
	        var data = {'$delete': this._mixpanel.get_distinct_id()};
	        return this._send_request(data);
	    };

	    MixpanelPeople.prototype.toString = function() {
	        return this._mixpanel.toString() + '.people';
	    };

	    MixpanelPeople.prototype._send_request = function(data, callback) {
	        data['$token'] = this._get_config('token');
	        data['$distinct_id'] = this._mixpanel.get_distinct_id();

	        var date_encoded_data = _.encodeDates(data);
	        var truncated_data    = _.truncate(date_encoded_data, 255);
	        var json_data         = _.JSONEncode(date_encoded_data);
	        var encoded_data      = _.base64Encode(json_data);

	        if (!this._identify_called()) {
	            this._enqueue(data);
	            if (!_.isUndefined(callback)) {
	                if (this._get_config('verbose')) {
	                    callback({status: -1, error: null});
	                } else {
	                    callback(-1);
	                }
	            }
	            return truncated_data;
	        }

	        console$1.log('MIXPANEL PEOPLE REQUEST:');
	        console$1.log(truncated_data);

	        this._mixpanel._send_request(
	            this._get_config('api_host') + '/engage/',
	            {'data': encoded_data},
	            this._mixpanel._prepare_callback(callback, truncated_data)
	        );

	        return truncated_data;
	    };

	    MixpanelPeople.prototype._get_config = function(conf_var) {
	        return this._mixpanel.get_config(conf_var);
	    };

	    MixpanelPeople.prototype._identify_called = function() {
	        return this._mixpanel._flags.identify_called === true;
	    };

	    // Queue up engage operations if identify hasn't been called yet.
	    MixpanelPeople.prototype._enqueue = function(data) {
	        if (SET_ACTION in data) {
	            this._mixpanel['persistence']._add_to_people_queue(SET_ACTION, data);
	        } else if (SET_ONCE_ACTION in data) {
	            this._mixpanel['persistence']._add_to_people_queue(SET_ONCE_ACTION, data);
	        } else if (ADD_ACTION in data) {
	            this._mixpanel['persistence']._add_to_people_queue(ADD_ACTION, data);
	        } else if (APPEND_ACTION in data) {
	            this._mixpanel['persistence']._add_to_people_queue(APPEND_ACTION, data);
	        } else if (UNION_ACTION in data) {
	            this._mixpanel['persistence']._add_to_people_queue(UNION_ACTION, data);
	        } else {
	            console$1.error('Invalid call to _enqueue():', data);
	        }
	    };

	    // Flush queued engage operations - order does not matter,
	    // and there are network level race conditions anyway
	    MixpanelPeople.prototype._flush = function(_set_callback, _add_callback, _append_callback, _set_once_callback, _union_callback) {
	        var _this = this;
	        var $set_queue = _.extend({}, this._mixpanel['persistence']._get_queue(SET_ACTION));
	        var $set_once_queue = _.extend({}, this._mixpanel['persistence']._get_queue(SET_ONCE_ACTION));
	        var $add_queue = _.extend({}, this._mixpanel['persistence']._get_queue(ADD_ACTION));
	        var $append_queue = this._mixpanel['persistence']._get_queue(APPEND_ACTION);
	        var $union_queue = _.extend({}, this._mixpanel['persistence']._get_queue(UNION_ACTION));

	        if (!_.isUndefined($set_queue) && _.isObject($set_queue) && !_.isEmptyObject($set_queue)) {
	            _this._mixpanel['persistence']._pop_from_people_queue(SET_ACTION, $set_queue);
	            this.set($set_queue, function(response, data) {
	                // on bad response, we want to add it back to the queue
	                if (response === 0) {
	                    _this._mixpanel['persistence']._add_to_people_queue(SET_ACTION, $set_queue);
	                }
	                if (!_.isUndefined(_set_callback)) {
	                    _set_callback(response, data);
	                }
	            });
	        }

	        if (!_.isUndefined($set_once_queue) && _.isObject($set_once_queue) && !_.isEmptyObject($set_once_queue)) {
	            _this._mixpanel['persistence']._pop_from_people_queue(SET_ONCE_ACTION, $set_once_queue);
	            this.set_once($set_once_queue, function(response, data) {
	                // on bad response, we want to add it back to the queue
	                if (response === 0) {
	                    _this._mixpanel['persistence']._add_to_people_queue(SET_ONCE_ACTION, $set_once_queue);
	                }
	                if (!_.isUndefined(_set_once_callback)) {
	                    _set_once_callback(response, data);
	                }
	            });
	        }

	        if (!_.isUndefined($add_queue) && _.isObject($add_queue) && !_.isEmptyObject($add_queue)) {
	            _this._mixpanel['persistence']._pop_from_people_queue(ADD_ACTION, $add_queue);
	            this.increment($add_queue, function(response, data) {
	                // on bad response, we want to add it back to the queue
	                if (response === 0) {
	                    _this._mixpanel['persistence']._add_to_people_queue(ADD_ACTION, $add_queue);
	                }
	                if (!_.isUndefined(_add_callback)) {
	                    _add_callback(response, data);
	                }
	            });
	        }

	        if (!_.isUndefined($union_queue) && _.isObject($union_queue) && !_.isEmptyObject($union_queue)) {
	            _this._mixpanel['persistence']._pop_from_people_queue(UNION_ACTION, $union_queue);
	            this.union($union_queue, function(response, data) {
	                // on bad response, we want to add it back to the queue
	                if (response === 0) {
	                    _this._mixpanel['persistence']._add_to_people_queue(UNION_ACTION, $union_queue);
	                }
	                if (!_.isUndefined(_union_callback)) {
	                    _union_callback(response, data);
	                }
	            });
	        }

	        // we have to fire off each $append individually since there is
	        // no concat method server side
	        if (!_.isUndefined($append_queue) && _.isArray($append_queue) && $append_queue.length) {
	            var $append_item;
	            var callback = function(response, data) {
	                if (response === 0) {
	                    _this._mixpanel['persistence']._add_to_people_queue(APPEND_ACTION, $append_item);
	                }
	                if (!_.isUndefined(_append_callback)) {
	                    _append_callback(response, data);
	                }
	            };
	            for (var i = $append_queue.length - 1; i >= 0; i--) {
	                $append_item = $append_queue.pop();
	                _this.append($append_item, callback);
	            }
	            // Save the shortened append queue
	            _this._mixpanel['persistence'].save();
	        }
	    };

	    MixpanelPeople.prototype._is_reserved_property = function(prop) {
	        return prop === '$distinct_id' || prop === '$token';
	    };

	    // EXPORTS (for closure compiler)

	    // MixpanelLib Exports
	    MixpanelLib.prototype['init']                            = MixpanelLib.prototype.init;
	    MixpanelLib.prototype['reset']                           = MixpanelLib.prototype.reset;
	    MixpanelLib.prototype['disable']                         = MixpanelLib.prototype.disable;
	    MixpanelLib.prototype['time_event']                      = MixpanelLib.prototype.time_event;
	    MixpanelLib.prototype['track']                           = MixpanelLib.prototype.track;
	    MixpanelLib.prototype['track_pageview']                  = MixpanelLib.prototype.track_pageview;
	    MixpanelLib.prototype['register']                        = MixpanelLib.prototype.register;
	    MixpanelLib.prototype['register_once']                   = MixpanelLib.prototype.register_once;
	    MixpanelLib.prototype['unregister']                      = MixpanelLib.prototype.unregister;
	    MixpanelLib.prototype['identify']                        = MixpanelLib.prototype.identify;
	    MixpanelLib.prototype['alias']                           = MixpanelLib.prototype.alias;
	    MixpanelLib.prototype['name_tag']                        = MixpanelLib.prototype.name_tag;
	    MixpanelLib.prototype['set_config']                      = MixpanelLib.prototype.set_config;
	    MixpanelLib.prototype['get_config']                      = MixpanelLib.prototype.get_config;
	    MixpanelLib.prototype['get_property']                    = MixpanelLib.prototype.get_property;
	    MixpanelLib.prototype['get_distinct_id']                 = MixpanelLib.prototype.get_distinct_id;
	    MixpanelLib.prototype['toString']                        = MixpanelLib.prototype.toString;

	    // MixpanelPersistence Exports
	    MixpanelPersistence.prototype['properties']            = MixpanelPersistence.prototype.properties;
	    MixpanelPersistence.prototype['update_search_keyword'] = MixpanelPersistence.prototype.update_search_keyword;
	    MixpanelPersistence.prototype['update_referrer_info']  = MixpanelPersistence.prototype.update_referrer_info;
	    MixpanelPersistence.prototype['get_cross_subdomain']   = MixpanelPersistence.prototype.get_cross_subdomain;
	    MixpanelPersistence.prototype['clear']                 = MixpanelPersistence.prototype.clear;

	    // MixpanelPeople Exports
	    MixpanelPeople.prototype['set']           = MixpanelPeople.prototype.set;
	    MixpanelPeople.prototype['set_once']      = MixpanelPeople.prototype.set_once;
	    MixpanelPeople.prototype['increment']     = MixpanelPeople.prototype.increment;
	    MixpanelPeople.prototype['append']        = MixpanelPeople.prototype.append;
	    MixpanelPeople.prototype['union']         = MixpanelPeople.prototype.union;
	    MixpanelPeople.prototype['track_charge']  = MixpanelPeople.prototype.track_charge;
	    MixpanelPeople.prototype['clear_charges'] = MixpanelPeople.prototype.clear_charges;
	    MixpanelPeople.prototype['delete_user']   = MixpanelPeople.prototype.delete_user;
	    MixpanelPeople.prototype['toString']      = MixpanelPeople.prototype.toString;

	    _.safewrap_class(MixpanelLib, ['identify']);

	    var instances = {};
	    var extend_mp = function() {
	        // add all the sub mixpanel instances
	        _.each(instances, function(instance, name) {
	            if (name !== PRIMARY_INSTANCE_NAME) { mixpanel_master[name] = instance; }
	        });

	        // add private functions as _
	        mixpanel_master['_'] = _;
	    };

	    var override_mp_init_func = function() {
	        // we override the snippets init function to handle the case where a
	        // user initializes the mixpanel library after the script loads & runs
	        mixpanel_master['init'] = function(token, config, name) {
	            if (name) {
	                // initialize a sub library
	                if (!mixpanel_master[name]) {
	                    mixpanel_master[name] = instances[name] = create_mplib(token, config, name);
	                    mixpanel_master[name]._loaded();
	                }
	                return mixpanel_master[name];
	            } else {
	                var instance = mixpanel_master;

	                if (instances[PRIMARY_INSTANCE_NAME]) {
	                    // main mixpanel lib already initialized
	                    instance = instances[PRIMARY_INSTANCE_NAME];
	                } else if (token) {
	                    // intialize the main mixpanel lib
	                    instance = create_mplib(token, config, PRIMARY_INSTANCE_NAME);
	                    instance._loaded();
	                    instances[PRIMARY_INSTANCE_NAME] = instance;
	                }

	                mixpanel_master = instance;
	                if (init_type === INIT_SNIPPET) {
	                    window[PRIMARY_INSTANCE_NAME] = mixpanel_master;
	                }
	                extend_mp();
	            }
	        };
	    };

	    var add_dom_event_counting_handlers = function(instance) {
	        var name = instance.get_config('name');

	        instance.mp_counts = instance.mp_counts || {};
	        instance.mp_counts['$__c'] = parseInt(_.cookie.get('mp_' + name + '__c')) || 0;

	        var increment_count = function() {
	            instance.mp_counts['$__c'] = (instance.mp_counts['$__c'] || 0) + 1;
	            _.cookie.set('mp_' + name + '__c', instance.mp_counts['$__c'], 1, true);
	        };

	        var evtCallback = function() {
	            try {
	                instance.mp_counts = instance.mp_counts || {};
	                increment_count();
	            } catch (e) {
	                console$1.error(e);
	            }
	        };
	        _.register_event(document, 'submit', evtCallback);
	        _.register_event(document, 'change', evtCallback);
	        var mousedownTarget = null;
	        _.register_event(document, 'mousedown', function(e) {
	            mousedownTarget = e.target;
	        });
	        _.register_event(document, 'mouseup', function(e) {
	            if (e.target === mousedownTarget) {
	                evtCallback(e);
	            }
	        });
	    };

	    function init_as_module() {
	        init_type = INIT_MODULE;
	        mixpanel_master = new MixpanelLib();

	        override_mp_init_func();
	        mixpanel_master['init']();

	        return mixpanel_master;
	    }

	    var mixpanel = init_as_module();

	    return mixpanel;

	}));

/***/ })
/******/ ]);