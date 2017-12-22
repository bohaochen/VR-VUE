webpackJsonp([0,8],{

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.parseBoundCurves = exports.calculatePaddingBoxPath = exports.calculateBorderBoxPath = exports.parsePathForBorder = exports.parseDocumentSize = exports.calculateContentBox = exports.calculatePaddingBox = exports.parseBounds = exports.Bounds = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Vector = __webpack_require__(43);
	
	var _Vector2 = _interopRequireDefault(_Vector);
	
	var _BezierCurve = __webpack_require__(150);
	
	var _BezierCurve2 = _interopRequireDefault(_BezierCurve);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TOP = 0;
	var RIGHT = 1;
	var BOTTOM = 2;
	var LEFT = 3;
	
	var H = 0;
	var V = 1;
	
	var Bounds = exports.Bounds = function () {
	    function Bounds(x, y, w, h) {
	        _classCallCheck(this, Bounds);
	
	        this.left = x;
	        this.top = y;
	        this.width = w;
	        this.height = h;
	    }
	
	    _createClass(Bounds, null, [{
	        key: 'fromClientRect',
	        value: function fromClientRect(clientRect, scrollX, scrollY) {
	            return new Bounds(clientRect.left + scrollX, clientRect.top + scrollY, clientRect.width, clientRect.height);
	        }
	    }]);
	
	    return Bounds;
	}();
	
	var parseBounds = exports.parseBounds = function parseBounds(node, scrollX, scrollY) {
	    return Bounds.fromClientRect(node.getBoundingClientRect(), scrollX, scrollY);
	};
	
	var calculatePaddingBox = exports.calculatePaddingBox = function calculatePaddingBox(bounds, borders) {
	    return new Bounds(bounds.left + borders[LEFT].borderWidth, bounds.top + borders[TOP].borderWidth, bounds.width - (borders[RIGHT].borderWidth + borders[LEFT].borderWidth), bounds.height - (borders[TOP].borderWidth + borders[BOTTOM].borderWidth));
	};
	
	var calculateContentBox = exports.calculateContentBox = function calculateContentBox(bounds, padding, borders) {
	    // TODO support percentage paddings
	    var paddingTop = padding[TOP].value;
	    var paddingRight = padding[RIGHT].value;
	    var paddingBottom = padding[BOTTOM].value;
	    var paddingLeft = padding[LEFT].value;
	
	    return new Bounds(bounds.left + paddingLeft + borders[LEFT].borderWidth, bounds.top + paddingTop + borders[TOP].borderWidth, bounds.width - (borders[RIGHT].borderWidth + borders[LEFT].borderWidth + paddingLeft + paddingRight), bounds.height - (borders[TOP].borderWidth + borders[BOTTOM].borderWidth + paddingTop + paddingBottom));
	};
	
	var parseDocumentSize = exports.parseDocumentSize = function parseDocumentSize(document) {
	    var body = document.body;
	    var documentElement = document.documentElement;
	
	    if (!body || !documentElement) {
	        throw new Error( false ? 'Unable to get document size' : '');
	    }
	    var width = Math.max(Math.max(body.scrollWidth, documentElement.scrollWidth), Math.max(body.offsetWidth, documentElement.offsetWidth), Math.max(body.clientWidth, documentElement.clientWidth));
	
	    var height = Math.max(Math.max(body.scrollHeight, documentElement.scrollHeight), Math.max(body.offsetHeight, documentElement.offsetHeight), Math.max(body.clientHeight, documentElement.clientHeight));
	
	    return new Bounds(0, 0, width, height);
	};
	
	var parsePathForBorder = exports.parsePathForBorder = function parsePathForBorder(curves, borderSide) {
	    switch (borderSide) {
	        case TOP:
	            return createPathFromCurves(curves.topLeftOuter, curves.topLeftInner, curves.topRightOuter, curves.topRightInner);
	        case RIGHT:
	            return createPathFromCurves(curves.topRightOuter, curves.topRightInner, curves.bottomRightOuter, curves.bottomRightInner);
	        case BOTTOM:
	            return createPathFromCurves(curves.bottomRightOuter, curves.bottomRightInner, curves.bottomLeftOuter, curves.bottomLeftInner);
	        case LEFT:
	        default:
	            return createPathFromCurves(curves.bottomLeftOuter, curves.bottomLeftInner, curves.topLeftOuter, curves.topLeftInner);
	    }
	};
	
	var createPathFromCurves = function createPathFromCurves(outer1, inner1, outer2, inner2) {
	    var path = [];
	    if (outer1 instanceof _BezierCurve2.default) {
	        path.push(outer1.subdivide(0.5, false));
	    } else {
	        path.push(outer1);
	    }
	
	    if (outer2 instanceof _BezierCurve2.default) {
	        path.push(outer2.subdivide(0.5, true));
	    } else {
	        path.push(outer2);
	    }
	
	    if (inner2 instanceof _BezierCurve2.default) {
	        path.push(inner2.subdivide(0.5, true).reverse());
	    } else {
	        path.push(inner2);
	    }
	
	    if (inner1 instanceof _BezierCurve2.default) {
	        path.push(inner1.subdivide(0.5, false).reverse());
	    } else {
	        path.push(inner1);
	    }
	
	    return path;
	};
	
	var calculateBorderBoxPath = exports.calculateBorderBoxPath = function calculateBorderBoxPath(curves) {
	    return [curves.topLeftOuter, curves.topRightOuter, curves.bottomRightOuter, curves.bottomLeftOuter];
	};
	
	var calculatePaddingBoxPath = exports.calculatePaddingBoxPath = function calculatePaddingBoxPath(curves) {
	    return [curves.topLeftInner, curves.topRightInner, curves.bottomRightInner, curves.bottomLeftInner];
	};
	
	var parseBoundCurves = exports.parseBoundCurves = function parseBoundCurves(bounds, borders, borderRadius) {
	    var HALF_WIDTH = bounds.width / 2;
	    var HALF_HEIGHT = bounds.height / 2;
	    var tlh = borderRadius[CORNER.TOP_LEFT][H].getAbsoluteValue(bounds.width) < HALF_WIDTH ? borderRadius[CORNER.TOP_LEFT][H].getAbsoluteValue(bounds.width) : HALF_WIDTH;
	    var tlv = borderRadius[CORNER.TOP_LEFT][V].getAbsoluteValue(bounds.height) < HALF_HEIGHT ? borderRadius[CORNER.TOP_LEFT][V].getAbsoluteValue(bounds.height) : HALF_HEIGHT;
	    var trh = borderRadius[CORNER.TOP_RIGHT][H].getAbsoluteValue(bounds.width) < HALF_WIDTH ? borderRadius[CORNER.TOP_RIGHT][H].getAbsoluteValue(bounds.width) : HALF_WIDTH;
	    var trv = borderRadius[CORNER.TOP_RIGHT][V].getAbsoluteValue(bounds.height) < HALF_HEIGHT ? borderRadius[CORNER.TOP_RIGHT][V].getAbsoluteValue(bounds.height) : HALF_HEIGHT;
	    var brh = borderRadius[CORNER.BOTTOM_RIGHT][H].getAbsoluteValue(bounds.width) < HALF_WIDTH ? borderRadius[CORNER.BOTTOM_RIGHT][H].getAbsoluteValue(bounds.width) : HALF_WIDTH;
	    var brv = borderRadius[CORNER.BOTTOM_RIGHT][V].getAbsoluteValue(bounds.height) < HALF_HEIGHT ? borderRadius[CORNER.BOTTOM_RIGHT][V].getAbsoluteValue(bounds.height) : HALF_HEIGHT;
	    var blh = borderRadius[CORNER.BOTTOM_LEFT][H].getAbsoluteValue(bounds.width) < HALF_WIDTH ? borderRadius[CORNER.BOTTOM_LEFT][H].getAbsoluteValue(bounds.width) : HALF_WIDTH;
	    var blv = borderRadius[CORNER.BOTTOM_LEFT][V].getAbsoluteValue(bounds.height) < HALF_HEIGHT ? borderRadius[CORNER.BOTTOM_LEFT][V].getAbsoluteValue(bounds.height) : HALF_HEIGHT;
	
	    var topWidth = bounds.width - trh;
	    var rightHeight = bounds.height - brv;
	    var bottomWidth = bounds.width - brh;
	    var leftHeight = bounds.height - blv;
	
	    return {
	        topLeftOuter: tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left, bounds.top, tlh, tlv, CORNER.TOP_LEFT) : new _Vector2.default(bounds.left, bounds.top),
	        topLeftInner: tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borders[LEFT].borderWidth, bounds.top + borders[TOP].borderWidth, Math.max(0, tlh - borders[LEFT].borderWidth), Math.max(0, tlv - borders[TOP].borderWidth), CORNER.TOP_LEFT) : new _Vector2.default(bounds.left + borders[LEFT].borderWidth, bounds.top + borders[TOP].borderWidth),
	        topRightOuter: trh > 0 || trv > 0 ? getCurvePoints(bounds.left + topWidth, bounds.top, trh, trv, CORNER.TOP_RIGHT) : new _Vector2.default(bounds.left + bounds.width, bounds.top),
	        topRightInner: trh > 0 || trv > 0 ? getCurvePoints(bounds.left + Math.min(topWidth, bounds.width + borders[LEFT].borderWidth), bounds.top + borders[TOP].borderWidth, topWidth > bounds.width + borders[LEFT].borderWidth ? 0 : trh - borders[LEFT].borderWidth, trv - borders[TOP].borderWidth, CORNER.TOP_RIGHT) : new _Vector2.default(bounds.left + bounds.width - borders[RIGHT].borderWidth, bounds.top + borders[TOP].borderWidth),
	        bottomRightOuter: brh > 0 || brv > 0 ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh, brv, CORNER.BOTTOM_RIGHT) : new _Vector2.default(bounds.left + bounds.width, bounds.top + bounds.height),
	        bottomRightInner: brh > 0 || brv > 0 ? getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - borders[LEFT].borderWidth), bounds.top + Math.min(rightHeight, bounds.height + borders[TOP].borderWidth), Math.max(0, brh - borders[RIGHT].borderWidth), brv - borders[BOTTOM].borderWidth, CORNER.BOTTOM_RIGHT) : new _Vector2.default(bounds.left + bounds.width - borders[RIGHT].borderWidth, bounds.top + bounds.height - borders[BOTTOM].borderWidth),
	        bottomLeftOuter: blh > 0 || blv > 0 ? getCurvePoints(bounds.left, bounds.top + leftHeight, blh, blv, CORNER.BOTTOM_LEFT) : new _Vector2.default(bounds.left, bounds.top + bounds.height),
	        bottomLeftInner: blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borders[LEFT].borderWidth, bounds.top + leftHeight, Math.max(0, blh - borders[LEFT].borderWidth), blv - borders[BOTTOM].borderWidth, CORNER.BOTTOM_LEFT) : new _Vector2.default(bounds.left + borders[LEFT].borderWidth, bounds.top + bounds.height - borders[BOTTOM].borderWidth)
	    };
	};
	
	var CORNER = {
	    TOP_LEFT: 0,
	    TOP_RIGHT: 1,
	    BOTTOM_RIGHT: 2,
	    BOTTOM_LEFT: 3
	};
	
	var getCurvePoints = function getCurvePoints(x, y, r1, r2, position) {
	    var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
	    var ox = r1 * kappa; // control point offset horizontal
	    var oy = r2 * kappa; // control point offset vertical
	    var xm = x + r1; // x-middle
	    var ym = y + r2; // y-middle
	
	    switch (position) {
	        case CORNER.TOP_LEFT:
	            return new _BezierCurve2.default(new _Vector2.default(x, ym), new _Vector2.default(x, ym - oy), new _Vector2.default(xm - ox, y), new _Vector2.default(xm, y));
	        case CORNER.TOP_RIGHT:
	            return new _BezierCurve2.default(new _Vector2.default(x, y), new _Vector2.default(x + ox, y), new _Vector2.default(xm, ym - oy), new _Vector2.default(xm, ym));
	        case CORNER.BOTTOM_RIGHT:
	            return new _BezierCurve2.default(new _Vector2.default(xm, y), new _Vector2.default(xm, y + oy), new _Vector2.default(x + ox, ym), new _Vector2.default(x, ym));
	        case CORNER.BOTTOM_LEFT:
	        default:
	            return new _BezierCurve2.default(new _Vector2.default(xm, ym), new _Vector2.default(xm - ox, ym), new _Vector2.default(x, y + oy), new _Vector2.default(x, y));
	    }
	};

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

	'use strict';
	
	// http://dev.w3.org/csswg/css-color/
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HEX3 = /^#([a-f0-9]{3})$/i;
	var hex3 = function hex3(value) {
	    var match = value.match(HEX3);
	    if (match) {
	        return [parseInt(match[1][0] + match[1][0], 16), parseInt(match[1][1] + match[1][1], 16), parseInt(match[1][2] + match[1][2], 16), null];
	    }
	    return false;
	};
	
	var HEX6 = /^#([a-f0-9]{6})$/i;
	var hex6 = function hex6(value) {
	    var match = value.match(HEX6);
	    if (match) {
	        return [parseInt(match[1].substring(0, 2), 16), parseInt(match[1].substring(2, 4), 16), parseInt(match[1].substring(4, 6), 16), null];
	    }
	    return false;
	};
	
	var RGB = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
	var rgb = function rgb(value) {
	    var match = value.match(RGB);
	    if (match) {
	        return [Number(match[1]), Number(match[2]), Number(match[3]), null];
	    }
	    return false;
	};
	
	var RGBA = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;
	var rgba = function rgba(value) {
	    var match = value.match(RGBA);
	    if (match && match.length > 4) {
	        return [Number(match[1]), Number(match[2]), Number(match[3]), Number(match[4])];
	    }
	    return false;
	};
	
	var fromArray = function fromArray(array) {
	    return [Math.min(array[0], 255), Math.min(array[1], 255), Math.min(array[2], 255), array.length > 3 ? array[3] : null];
	};
	
	var namedColor = function namedColor(name) {
	    var color = NAMED_COLORS[name.toLowerCase()];
	    return color ? color : false;
	};
	
	var Color = function () {
	    function Color(value) {
	        _classCallCheck(this, Color);
	
	        var _ref = Array.isArray(value) ? fromArray(value) : hex3(value) || rgb(value) || rgba(value) || namedColor(value) || hex6(value) || [0, 0, 0, null],
	            _ref2 = _slicedToArray(_ref, 4),
	            r = _ref2[0],
	            g = _ref2[1],
	            b = _ref2[2],
	            a = _ref2[3];
	
	        this.r = r;
	        this.g = g;
	        this.b = b;
	        this.a = a;
	    }
	
	    _createClass(Color, [{
	        key: 'isTransparent',
	        value: function isTransparent() {
	            return this.a === 0;
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return this.a !== null && this.a !== 1 ? 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')' : 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
	        }
	    }]);
	
	    return Color;
	}();
	
	exports.default = Color;
	
	
	var NAMED_COLORS = {
	    transparent: [0, 0, 0, 0],
	    aliceblue: [240, 248, 255, null],
	    antiquewhite: [250, 235, 215, null],
	    aqua: [0, 255, 255, null],
	    aquamarine: [127, 255, 212, null],
	    azure: [240, 255, 255, null],
	    beige: [245, 245, 220, null],
	    bisque: [255, 228, 196, null],
	    black: [0, 0, 0, null],
	    blanchedalmond: [255, 235, 205, null],
	    blue: [0, 0, 255, null],
	    blueviolet: [138, 43, 226, null],
	    brown: [165, 42, 42, null],
	    burlywood: [222, 184, 135, null],
	    cadetblue: [95, 158, 160, null],
	    chartreuse: [127, 255, 0, null],
	    chocolate: [210, 105, 30, null],
	    coral: [255, 127, 80, null],
	    cornflowerblue: [100, 149, 237, null],
	    cornsilk: [255, 248, 220, null],
	    crimson: [220, 20, 60, null],
	    cyan: [0, 255, 255, null],
	    darkblue: [0, 0, 139, null],
	    darkcyan: [0, 139, 139, null],
	    darkgoldenrod: [184, 134, 11, null],
	    darkgray: [169, 169, 169, null],
	    darkgreen: [0, 100, 0, null],
	    darkgrey: [169, 169, 169, null],
	    darkkhaki: [189, 183, 107, null],
	    darkmagenta: [139, 0, 139, null],
	    darkolivegreen: [85, 107, 47, null],
	    darkorange: [255, 140, 0, null],
	    darkorchid: [153, 50, 204, null],
	    darkred: [139, 0, 0, null],
	    darksalmon: [233, 150, 122, null],
	    darkseagreen: [143, 188, 143, null],
	    darkslateblue: [72, 61, 139, null],
	    darkslategray: [47, 79, 79, null],
	    darkslategrey: [47, 79, 79, null],
	    darkturquoise: [0, 206, 209, null],
	    darkviolet: [148, 0, 211, null],
	    deeppink: [255, 20, 147, null],
	    deepskyblue: [0, 191, 255, null],
	    dimgray: [105, 105, 105, null],
	    dimgrey: [105, 105, 105, null],
	    dodgerblue: [30, 144, 255, null],
	    firebrick: [178, 34, 34, null],
	    floralwhite: [255, 250, 240, null],
	    forestgreen: [34, 139, 34, null],
	    fuchsia: [255, 0, 255, null],
	    gainsboro: [220, 220, 220, null],
	    ghostwhite: [248, 248, 255, null],
	    gold: [255, 215, 0, null],
	    goldenrod: [218, 165, 32, null],
	    gray: [128, 128, 128, null],
	    green: [0, 128, 0, null],
	    greenyellow: [173, 255, 47, null],
	    grey: [128, 128, 128, null],
	    honeydew: [240, 255, 240, null],
	    hotpink: [255, 105, 180, null],
	    indianred: [205, 92, 92, null],
	    indigo: [75, 0, 130, null],
	    ivory: [255, 255, 240, null],
	    khaki: [240, 230, 140, null],
	    lavender: [230, 230, 250, null],
	    lavenderblush: [255, 240, 245, null],
	    lawngreen: [124, 252, 0, null],
	    lemonchiffon: [255, 250, 205, null],
	    lightblue: [173, 216, 230, null],
	    lightcoral: [240, 128, 128, null],
	    lightcyan: [224, 255, 255, null],
	    lightgoldenrodyellow: [250, 250, 210, null],
	    lightgray: [211, 211, 211, null],
	    lightgreen: [144, 238, 144, null],
	    lightgrey: [211, 211, 211, null],
	    lightpink: [255, 182, 193, null],
	    lightsalmon: [255, 160, 122, null],
	    lightseagreen: [32, 178, 170, null],
	    lightskyblue: [135, 206, 250, null],
	    lightslategray: [119, 136, 153, null],
	    lightslategrey: [119, 136, 153, null],
	    lightsteelblue: [176, 196, 222, null],
	    lightyellow: [255, 255, 224, null],
	    lime: [0, 255, 0, null],
	    limegreen: [50, 205, 50, null],
	    linen: [250, 240, 230, null],
	    magenta: [255, 0, 255, null],
	    maroon: [128, 0, 0, null],
	    mediumaquamarine: [102, 205, 170, null],
	    mediumblue: [0, 0, 205, null],
	    mediumorchid: [186, 85, 211, null],
	    mediumpurple: [147, 112, 219, null],
	    mediumseagreen: [60, 179, 113, null],
	    mediumslateblue: [123, 104, 238, null],
	    mediumspringgreen: [0, 250, 154, null],
	    mediumturquoise: [72, 209, 204, null],
	    mediumvioletred: [199, 21, 133, null],
	    midnightblue: [25, 25, 112, null],
	    mintcream: [245, 255, 250, null],
	    mistyrose: [255, 228, 225, null],
	    moccasin: [255, 228, 181, null],
	    navajowhite: [255, 222, 173, null],
	    navy: [0, 0, 128, null],
	    oldlace: [253, 245, 230, null],
	    olive: [128, 128, 0, null],
	    olivedrab: [107, 142, 35, null],
	    orange: [255, 165, 0, null],
	    orangered: [255, 69, 0, null],
	    orchid: [218, 112, 214, null],
	    palegoldenrod: [238, 232, 170, null],
	    palegreen: [152, 251, 152, null],
	    paleturquoise: [175, 238, 238, null],
	    palevioletred: [219, 112, 147, null],
	    papayawhip: [255, 239, 213, null],
	    peachpuff: [255, 218, 185, null],
	    peru: [205, 133, 63, null],
	    pink: [255, 192, 203, null],
	    plum: [221, 160, 221, null],
	    powderblue: [176, 224, 230, null],
	    purple: [128, 0, 128, null],
	    rebeccapurple: [102, 51, 153, null],
	    red: [255, 0, 0, null],
	    rosybrown: [188, 143, 143, null],
	    royalblue: [65, 105, 225, null],
	    saddlebrown: [139, 69, 19, null],
	    salmon: [250, 128, 114, null],
	    sandybrown: [244, 164, 96, null],
	    seagreen: [46, 139, 87, null],
	    seashell: [255, 245, 238, null],
	    sienna: [160, 82, 45, null],
	    silver: [192, 192, 192, null],
	    skyblue: [135, 206, 235, null],
	    slateblue: [106, 90, 205, null],
	    slategray: [112, 128, 144, null],
	    slategrey: [112, 128, 144, null],
	    snow: [255, 250, 250, null],
	    springgreen: [0, 255, 127, null],
	    steelblue: [70, 130, 180, null],
	    tan: [210, 180, 140, null],
	    teal: [0, 128, 128, null],
	    thistle: [216, 191, 216, null],
	    tomato: [255, 99, 71, null],
	    turquoise: [64, 224, 208, null],
	    violet: [238, 130, 238, null],
	    wheat: [245, 222, 179, null],
	    white: [255, 255, 255, null],
	    whitesmoke: [245, 245, 245, null],
	    yellow: [255, 255, 0, null],
	    yellowgreen: [154, 205, 50, null]
	};
	
	var TRANSPARENT = exports.TRANSPARENT = new Color([0, 0, 0, 0]);

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.calculateLengthFromValueWithUnit = exports.LENGTH_TYPE = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _NodeContainer = __webpack_require__(41);
	
	var _NodeContainer2 = _interopRequireDefault(_NodeContainer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LENGTH_WITH_UNIT = /([\d.]+)(px|r?em|%)/i;
	
	var LENGTH_TYPE = exports.LENGTH_TYPE = {
	    PX: 0,
	    PERCENTAGE: 1
	};
	
	var Length = function () {
	    function Length(value) {
	        _classCallCheck(this, Length);
	
	        this.type = value.substr(value.length - 1) === '%' ? LENGTH_TYPE.PERCENTAGE : LENGTH_TYPE.PX;
	        var parsedValue = parseFloat(value);
	        if (false) {
	            console.error('Invalid value given for Length: "' + value + '"');
	        }
	        this.value = isNaN(parsedValue) ? 0 : parsedValue;
	    }
	
	    _createClass(Length, [{
	        key: 'isPercentage',
	        value: function isPercentage() {
	            return this.type === LENGTH_TYPE.PERCENTAGE;
	        }
	    }, {
	        key: 'getAbsoluteValue',
	        value: function getAbsoluteValue(parentLength) {
	            return this.isPercentage() ? parentLength * (this.value / 100) : this.value;
	        }
	    }], [{
	        key: 'create',
	        value: function create(v) {
	            return new Length(v);
	        }
	    }]);
	
	    return Length;
	}();
	
	exports.default = Length;
	
	
	var getRootFontSize = function getRootFontSize(container) {
	    var parent = container.parent;
	    return parent ? getRootFontSize(parent) : parseFloat(container.style.font.fontSize);
	};
	
	var calculateLengthFromValueWithUnit = exports.calculateLengthFromValueWithUnit = function calculateLengthFromValueWithUnit(container, value, unit) {
	    switch (unit) {
	        case 'px':
	        case '%':
	            return new Length(value + unit);
	        case 'em':
	        case 'rem':
	            var length = new Length(value);
	            length.value *= unit === 'em' ? parseFloat(container.style.font.fontSize) : getRootFontSize(container);
	            return length;
	        default:
	            // TODO: handle correctly if unknown unit is used
	            return new Length('0');
	    }
	};

/***/ }),

/***/ 24:
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var contains = exports.contains = function contains(bit, value) {
	    return (bit & value) !== 0;
	};
	
	var distance = exports.distance = function distance(a, b) {
	    return Math.sqrt(a * a + b * b);
	};
	
	var copyCSSStyles = exports.copyCSSStyles = function copyCSSStyles(style, target) {
	    // Edge does not provide value for cssText
	    for (var i = style.length - 1; i >= 0; i--) {
	        var property = style.item(i);
	        // Safari shows pseudoelements if content is set
	        if (property !== 'content') {
	            target.style.setProperty(property, style.getPropertyValue(property));
	        }
	    }
	    return target;
	};
	
	var SMALL_IMAGE = exports.SMALL_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/img/bg.07c858b.jpg";

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _ForeignObjectRenderer = __webpack_require__(86);
	
	var testRangeBounds = function testRangeBounds(document) {
	    var TEST_HEIGHT = 123;
	
	    if (document.createRange) {
	        var range = document.createRange();
	        if (range.getBoundingClientRect) {
	            var testElement = document.createElement('boundtest');
	            testElement.style.height = TEST_HEIGHT + 'px';
	            testElement.style.display = 'block';
	            document.body.appendChild(testElement);
	
	            range.selectNode(testElement);
	            var rangeBounds = range.getBoundingClientRect();
	            var rangeHeight = Math.round(rangeBounds.height);
	            document.body.removeChild(testElement);
	            if (rangeHeight === TEST_HEIGHT) {
	                return true;
	            }
	        }
	    }
	
	    return false;
	};
	
	// iOS 10.3 taints canvas with base64 images unless crossOrigin = 'anonymous'
	var testBase64 = function testBase64(document, src) {
	    var img = new Image();
	    var canvas = document.createElement('canvas');
	    var ctx = canvas.getContext('2d');
	
	    return new Promise(function (resolve) {
	        // Single pixel base64 image renders fine on iOS 10.3???
	        img.src = src;
	
	        var onload = function onload() {
	            try {
	                ctx.drawImage(img, 0, 0);
	                canvas.toDataURL();
	            } catch (e) {
	                return resolve(false);
	            }
	
	            return resolve(true);
	        };
	
	        img.onload = onload;
	        img.onerror = function () {
	            return resolve(false);
	        };
	
	        if (img.complete === true) {
	            setTimeout(function () {
	                onload();
	            }, 500);
	        }
	    });
	};
	
	var testCORS = function testCORS() {
	    return typeof new Image().crossOrigin !== 'undefined';
	};
	
	var testResponseType = function testResponseType() {
	    return typeof new XMLHttpRequest().responseType === 'string';
	};
	
	var testSVG = function testSVG(document) {
	    var img = new Image();
	    var canvas = document.createElement('canvas');
	    var ctx = canvas.getContext('2d');
	    img.src = 'data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\'></svg>';
	
	    try {
	        ctx.drawImage(img, 0, 0);
	        canvas.toDataURL();
	    } catch (e) {
	        return false;
	    }
	    return true;
	};
	
	var isGreenPixel = function isGreenPixel(data) {
	    return data[0] === 0 && data[1] === 255 && data[2] === 0 && data[3] === 255;
	};
	
	var testForeignObject = function testForeignObject(document) {
	    var canvas = document.createElement('canvas');
	    var size = 100;
	    canvas.width = size;
	    canvas.height = size;
	    var ctx = canvas.getContext('2d');
	    ctx.fillStyle = 'rgb(0, 255, 0)';
	    ctx.fillRect(0, 0, size, size);
	
	    var img = new Image();
	    var greenImageSrc = canvas.toDataURL();
	    img.src = greenImageSrc;
	    var svg = (0, _ForeignObjectRenderer.createForeignObjectSVG)(size, size, 0, 0, img);
	    ctx.fillStyle = 'red';
	    ctx.fillRect(0, 0, size, size);
	
	    return (0, _ForeignObjectRenderer.loadSerializedSVG)(svg).then(function (img) {
	        ctx.drawImage(img, 0, 0);
	        var data = ctx.getImageData(0, 0, size, size).data;
	        ctx.fillStyle = 'red';
	        ctx.fillRect(0, 0, size, size);
	
	        var node = document.createElement('div');
	        node.style.backgroundImage = 'url(' + greenImageSrc + ')';
	        node.style.height = size + 'px';
	        // Firefox 55 does not render inline <img /> tags
	        return isGreenPixel(data) ? (0, _ForeignObjectRenderer.loadSerializedSVG)((0, _ForeignObjectRenderer.createForeignObjectSVG)(size, size, 0, 0, node)) : Promise.reject(false);
	    }).then(function (img) {
	        ctx.drawImage(img, 0, 0);
	        // Edge does not render background-images
	        return isGreenPixel(ctx.getImageData(0, 0, size, size).data);
	    }).catch(function (e) {
	        return false;
	    });
	};
	
	var FEATURES = {
	    // $FlowFixMe - get/set properties not yet supported
	    get SUPPORT_RANGE_BOUNDS() {
	        'use strict';
	
	        var value = testRangeBounds(document);
	        Object.defineProperty(FEATURES, 'SUPPORT_RANGE_BOUNDS', { value: value });
	        return value;
	    },
	    // $FlowFixMe - get/set properties not yet supported
	    get SUPPORT_SVG_DRAWING() {
	        'use strict';
	
	        var value = testSVG(document);
	        Object.defineProperty(FEATURES, 'SUPPORT_SVG_DRAWING', { value: value });
	        return value;
	    },
	    // $FlowFixMe - get/set properties not yet supported
	    get SUPPORT_BASE64_DRAWING() {
	        'use strict';
	
	        return function (src) {
	            var _value = testBase64(document, src);
	            Object.defineProperty(FEATURES, 'SUPPORT_BASE64_DRAWING', { value: function value() {
	                    return _value;
	                } });
	            return _value;
	        };
	    },
	    // $FlowFixMe - get/set properties not yet supported
	    get SUPPORT_FOREIGNOBJECT_DRAWING() {
	        'use strict';
	
	        var value = typeof Array.from === 'function' && typeof window.fetch === 'function' ? testForeignObject(document) : Promise.resolve(false);
	        Object.defineProperty(FEATURES, 'SUPPORT_FOREIGNOBJECT_DRAWING', { value: value });
	        return value;
	    },
	    // $FlowFixMe - get/set properties not yet supported
	    get SUPPORT_CORS_IMAGES() {
	        'use strict';
	
	        var value = testCORS();
	        Object.defineProperty(FEATURES, 'SUPPORT_CORS_IMAGES', { value: value });
	        return value;
	    },
	    // $FlowFixMe - get/set properties not yet supported
	    get SUPPORT_RESPONSE_TYPE() {
	        'use strict';
	
	        var value = testResponseType();
	        Object.defineProperty(FEATURES, 'SUPPORT_RESPONSE_TYPE', { value: value });
	        return value;
	    },
	    // $FlowFixMe - get/set properties not yet supported
	    get SUPPORT_CORS_XHR() {
	        'use strict';
	
	        var value = 'withCredentials' in new XMLHttpRequest();
	        Object.defineProperty(FEATURES, 'SUPPORT_CORS_XHR', { value: value });
	        return value;
	    }
	};
	
	exports.default = FEATURES;

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Color = __webpack_require__(12);
	
	var _Color2 = _interopRequireDefault(_Color);
	
	var _Util = __webpack_require__(29);
	
	var _background = __webpack_require__(44);
	
	var _border = __webpack_require__(63);
	
	var _borderRadius = __webpack_require__(154);
	
	var _display = __webpack_require__(155);
	
	var _float = __webpack_require__(156);
	
	var _font = __webpack_require__(157);
	
	var _letterSpacing = __webpack_require__(158);
	
	var _overflow = __webpack_require__(159);
	
	var _padding = __webpack_require__(82);
	
	var _position = __webpack_require__(83);
	
	var _textDecoration = __webpack_require__(64);
	
	var _textShadow = __webpack_require__(160);
	
	var _textTransform = __webpack_require__(84);
	
	var _transform = __webpack_require__(161);
	
	var _visibility = __webpack_require__(162);
	
	var _zIndex = __webpack_require__(163);
	
	var _Bounds = __webpack_require__(11);
	
	var _Input = __webpack_require__(78);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var INPUT_TAGS = ['INPUT', 'TEXTAREA', 'SELECT'];
	
	var NodeContainer = function () {
	    function NodeContainer(node, parent, resourceLoader, index) {
	        var _this = this;
	
	        _classCallCheck(this, NodeContainer);
	
	        this.parent = parent;
	        this.index = index;
	        this.childNodes = [];
	        var defaultView = node.ownerDocument.defaultView;
	        var scrollX = defaultView.pageXOffset;
	        var scrollY = defaultView.pageYOffset;
	        var style = defaultView.getComputedStyle(node, null);
	        var display = (0, _display.parseDisplay)(style.display);
	
	        var IS_INPUT = node.type === 'radio' || node.type === 'checkbox';
	
	        var position = (0, _position.parsePosition)(style.position);
	
	        this.style = {
	            background: IS_INPUT ? _Input.INPUT_BACKGROUND : (0, _background.parseBackground)(style, resourceLoader),
	            border: IS_INPUT ? _Input.INPUT_BORDERS : (0, _border.parseBorder)(style),
	            borderRadius: (node instanceof defaultView.HTMLInputElement || node instanceof HTMLInputElement) && IS_INPUT ? (0, _Input.getInputBorderRadius)(node) : (0, _borderRadius.parseBorderRadius)(style),
	            color: IS_INPUT ? _Input.INPUT_COLOR : new _Color2.default(style.color),
	            display: display,
	            float: (0, _float.parseCSSFloat)(style.float),
	            font: (0, _font.parseFont)(style),
	            letterSpacing: (0, _letterSpacing.parseLetterSpacing)(style.letterSpacing),
	            opacity: parseFloat(style.opacity),
	            overflow: INPUT_TAGS.indexOf(node.tagName) === -1 ? (0, _overflow.parseOverflow)(style.overflow) : _overflow.OVERFLOW.HIDDEN,
	            padding: (0, _padding.parsePadding)(style),
	            position: position,
	            textDecoration: (0, _textDecoration.parseTextDecoration)(style),
	            textShadow: (0, _textShadow.parseTextShadow)(style.textShadow),
	            textTransform: (0, _textTransform.parseTextTransform)(style.textTransform),
	            transform: (0, _transform.parseTransform)(style),
	            visibility: (0, _visibility.parseVisibility)(style.visibility),
	            zIndex: (0, _zIndex.parseZIndex)(position !== _position.POSITION.STATIC ? style.zIndex : 'auto')
	        };
	
	        if (this.isTransformed()) {
	            // getBoundingClientRect provides values post-transform, we want them without the transformation
	            node.style.transform = 'matrix(1,0,0,1,0,0)';
	        }
	
	        // TODO move bound retrieval for all nodes to a later stage?
	        if (node.tagName === 'IMG') {
	            node.addEventListener('load', function () {
	                _this.bounds = (0, _Bounds.parseBounds)(node, scrollX, scrollY);
	                _this.curvedBounds = (0, _Bounds.parseBoundCurves)(_this.bounds, _this.style.border, _this.style.borderRadius);
	            });
	        }
	        this.image = getImage(node, resourceLoader);
	        this.bounds = IS_INPUT ? (0, _Input.reformatInputBounds)((0, _Bounds.parseBounds)(node, scrollX, scrollY)) : (0, _Bounds.parseBounds)(node, scrollX, scrollY);
	        this.curvedBounds = (0, _Bounds.parseBoundCurves)(this.bounds, this.style.border, this.style.borderRadius);
	
	        if (false) {
	            this.name = '' + node.tagName.toLowerCase() + (node.id ? '#' + node.id : '') + node.className.toString().split(' ').map(function (s) {
	                return s.length ? '.' + s : '';
	            }).join('');
	        }
	    }
	
	    _createClass(NodeContainer, [{
	        key: 'getClipPaths',
	        value: function getClipPaths() {
	            var parentClips = this.parent ? this.parent.getClipPaths() : [];
	            var isClipped = this.style.overflow === _overflow.OVERFLOW.HIDDEN || this.style.overflow === _overflow.OVERFLOW.SCROLL;
	
	            return isClipped ? parentClips.concat([(0, _Bounds.calculatePaddingBoxPath)(this.curvedBounds)]) : parentClips;
	        }
	    }, {
	        key: 'isInFlow',
	        value: function isInFlow() {
	            return this.isRootElement() && !this.isFloating() && !this.isAbsolutelyPositioned();
	        }
	    }, {
	        key: 'isVisible',
	        value: function isVisible() {
	            return !(0, _Util.contains)(this.style.display, _display.DISPLAY.NONE) && this.style.opacity > 0 && this.style.visibility === _visibility.VISIBILITY.VISIBLE;
	        }
	    }, {
	        key: 'isAbsolutelyPositioned',
	        value: function isAbsolutelyPositioned() {
	            return this.style.position !== _position.POSITION.STATIC && this.style.position !== _position.POSITION.RELATIVE;
	        }
	    }, {
	        key: 'isPositioned',
	        value: function isPositioned() {
	            return this.style.position !== _position.POSITION.STATIC;
	        }
	    }, {
	        key: 'isFloating',
	        value: function isFloating() {
	            return this.style.float !== _float.FLOAT.NONE;
	        }
	    }, {
	        key: 'isRootElement',
	        value: function isRootElement() {
	            return this.parent === null;
	        }
	    }, {
	        key: 'isTransformed',
	        value: function isTransformed() {
	            return this.style.transform !== null;
	        }
	    }, {
	        key: 'isPositionedWithZIndex',
	        value: function isPositionedWithZIndex() {
	            return this.isPositioned() && !this.style.zIndex.auto;
	        }
	    }, {
	        key: 'isInlineLevel',
	        value: function isInlineLevel() {
	            return (0, _Util.contains)(this.style.display, _display.DISPLAY.INLINE) || (0, _Util.contains)(this.style.display, _display.DISPLAY.INLINE_BLOCK) || (0, _Util.contains)(this.style.display, _display.DISPLAY.INLINE_FLEX) || (0, _Util.contains)(this.style.display, _display.DISPLAY.INLINE_GRID) || (0, _Util.contains)(this.style.display, _display.DISPLAY.INLINE_LIST_ITEM) || (0, _Util.contains)(this.style.display, _display.DISPLAY.INLINE_TABLE);
	        }
	    }, {
	        key: 'isInlineBlockOrInlineTable',
	        value: function isInlineBlockOrInlineTable() {
	            return (0, _Util.contains)(this.style.display, _display.DISPLAY.INLINE_BLOCK) || (0, _Util.contains)(this.style.display, _display.DISPLAY.INLINE_TABLE);
	        }
	    }]);
	
	    return NodeContainer;
	}();
	
	exports.default = NodeContainer;
	
	
	var getImage = function getImage(node, resourceLoader) {
	    if (node instanceof node.ownerDocument.defaultView.SVGSVGElement || node instanceof SVGSVGElement) {
	        var s = new XMLSerializer();
	        return resourceLoader.loadImage('data:image/svg+xml,' + encodeURIComponent(s.serializeToString(node)));
	    }
	    switch (node.tagName) {
	        case 'IMG':
	            // $FlowFixMe
	            var img = node;
	            return resourceLoader.loadImage(img.currentSrc || img.src);
	        case 'CANVAS':
	            // $FlowFixMe
	            var canvas = node;
	            return resourceLoader.loadCanvas(canvas);
	        case 'IFRAME':
	            var iframeKey = node.getAttribute('data-html2canvas-internal-iframe-key');
	            if (iframeKey) {
	                return iframeKey;
	            }
	            break;
	    }
	
	    return null;
	};

/***/ }),

/***/ 42:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var PATH = exports.PATH = {
	    VECTOR: 0,
	    BEZIER_CURVE: 1,
	    CIRCLE: 2
	};

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Path = __webpack_require__(42);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Vector = function Vector(x, y) {
	    _classCallCheck(this, Vector);
	
	    this.type = _Path.PATH.VECTOR;
	    this.x = x;
	    this.y = y;
	    if (false) {
	        if (isNaN(x)) {
	            console.error('Invalid x value given for Vector');
	        }
	        if (isNaN(y)) {
	            console.error('Invalid y value given for Vector');
	        }
	    }
	};
	
	exports.default = Vector;

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.parseBackgroundImage = exports.parseBackground = exports.calculateBackgroundRepeatPath = exports.calculateBackgroundPosition = exports.calculateBackgroungPositioningArea = exports.calculateBackgroungPaintingArea = exports.calculateGradientBackgroundSize = exports.calculateBackgroundSize = exports.BACKGROUND_ORIGIN = exports.BACKGROUND_CLIP = exports.BACKGROUND_SIZE = exports.BACKGROUND_REPEAT = undefined;
	
	var _Color = __webpack_require__(12);
	
	var _Color2 = _interopRequireDefault(_Color);
	
	var _Length = __webpack_require__(18);
	
	var _Length2 = _interopRequireDefault(_Length);
	
	var _Size = __webpack_require__(152);
	
	var _Size2 = _interopRequireDefault(_Size);
	
	var _Vector = __webpack_require__(43);
	
	var _Vector2 = _interopRequireDefault(_Vector);
	
	var _Bounds = __webpack_require__(11);
	
	var _padding = __webpack_require__(82);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BACKGROUND_REPEAT = exports.BACKGROUND_REPEAT = {
	    REPEAT: 0,
	    NO_REPEAT: 1,
	    REPEAT_X: 2,
	    REPEAT_Y: 3
	};
	
	var BACKGROUND_SIZE = exports.BACKGROUND_SIZE = {
	    AUTO: 0,
	    CONTAIN: 1,
	    COVER: 2,
	    LENGTH: 3
	};
	
	var BACKGROUND_CLIP = exports.BACKGROUND_CLIP = {
	    BORDER_BOX: 0,
	    PADDING_BOX: 1,
	    CONTENT_BOX: 2
	};
	
	var BACKGROUND_ORIGIN = exports.BACKGROUND_ORIGIN = BACKGROUND_CLIP;
	
	var AUTO = 'auto';
	
	var BackgroundSize = function BackgroundSize(size) {
	    _classCallCheck(this, BackgroundSize);
	
	    switch (size) {
	        case 'contain':
	            this.size = BACKGROUND_SIZE.CONTAIN;
	            break;
	        case 'cover':
	            this.size = BACKGROUND_SIZE.COVER;
	            break;
	        case 'auto':
	            this.size = BACKGROUND_SIZE.AUTO;
	            break;
	        default:
	            this.value = new _Length2.default(size);
	    }
	};
	
	var calculateBackgroundSize = exports.calculateBackgroundSize = function calculateBackgroundSize(backgroundImage, image, bounds) {
	    var width = 0;
	    var height = 0;
	    var size = backgroundImage.size;
	    if (size[0].size === BACKGROUND_SIZE.CONTAIN || size[0].size === BACKGROUND_SIZE.COVER) {
	        var targetRatio = bounds.width / bounds.height;
	        var currentRatio = image.width / image.height;
	        return targetRatio < currentRatio !== (size[0].size === BACKGROUND_SIZE.COVER) ? new _Size2.default(bounds.width, bounds.width / currentRatio) : new _Size2.default(bounds.height * currentRatio, bounds.height);
	    }
	
	    if (size[0].value) {
	        width = size[0].value.getAbsoluteValue(bounds.width);
	    }
	
	    if (size[0].size === BACKGROUND_SIZE.AUTO && size[1].size === BACKGROUND_SIZE.AUTO) {
	        height = image.height;
	    } else if (size[1].size === BACKGROUND_SIZE.AUTO) {
	        height = width / image.width * image.height;
	    } else if (size[1].value) {
	        height = size[1].value.getAbsoluteValue(bounds.height);
	    }
	
	    if (size[0].size === BACKGROUND_SIZE.AUTO) {
	        width = height / image.height * image.width;
	    }
	
	    return new _Size2.default(width, height);
	};
	
	var calculateGradientBackgroundSize = exports.calculateGradientBackgroundSize = function calculateGradientBackgroundSize(backgroundImage, bounds) {
	    var size = backgroundImage.size;
	    var width = size[0].value ? size[0].value.getAbsoluteValue(bounds.width) : bounds.width;
	    var height = size[1].value ? size[1].value.getAbsoluteValue(bounds.height) : size[0].value ? width : bounds.height;
	
	    return new _Size2.default(width, height);
	};
	
	var AUTO_SIZE = new BackgroundSize(AUTO);
	
	var calculateBackgroungPaintingArea = exports.calculateBackgroungPaintingArea = function calculateBackgroungPaintingArea(curves, clip) {
	    switch (clip) {
	        case BACKGROUND_CLIP.BORDER_BOX:
	            return (0, _Bounds.calculateBorderBoxPath)(curves);
	        case BACKGROUND_CLIP.PADDING_BOX:
	        default:
	            return (0, _Bounds.calculatePaddingBoxPath)(curves);
	    }
	};
	
	var calculateBackgroungPositioningArea = exports.calculateBackgroungPositioningArea = function calculateBackgroungPositioningArea(backgroundOrigin, bounds, padding, border) {
	    var paddingBox = (0, _Bounds.calculatePaddingBox)(bounds, border);
	
	    switch (backgroundOrigin) {
	        case BACKGROUND_ORIGIN.BORDER_BOX:
	            return bounds;
	        case BACKGROUND_ORIGIN.CONTENT_BOX:
	            var paddingLeft = padding[_padding.PADDING_SIDES.LEFT].getAbsoluteValue(bounds.width);
	            var paddingRight = padding[_padding.PADDING_SIDES.RIGHT].getAbsoluteValue(bounds.width);
	            var paddingTop = padding[_padding.PADDING_SIDES.TOP].getAbsoluteValue(bounds.width);
	            var paddingBottom = padding[_padding.PADDING_SIDES.BOTTOM].getAbsoluteValue(bounds.width);
	            return new _Bounds.Bounds(paddingBox.left + paddingLeft, paddingBox.top + paddingTop, paddingBox.width - paddingLeft - paddingRight, paddingBox.height - paddingTop - paddingBottom);
	        case BACKGROUND_ORIGIN.PADDING_BOX:
	        default:
	            return paddingBox;
	    }
	};
	
	var calculateBackgroundPosition = exports.calculateBackgroundPosition = function calculateBackgroundPosition(position, size, bounds) {
	    return new _Vector2.default(position[0].getAbsoluteValue(bounds.width - size.width), position[1].getAbsoluteValue(bounds.height - size.height));
	};
	
	var calculateBackgroundRepeatPath = exports.calculateBackgroundRepeatPath = function calculateBackgroundRepeatPath(background, position, size, backgroundPositioningArea, bounds) {
	    var repeat = background.repeat;
	    switch (repeat) {
	        case BACKGROUND_REPEAT.REPEAT_X:
	            return [new _Vector2.default(Math.round(bounds.left), Math.round(backgroundPositioningArea.top + position.y)), new _Vector2.default(Math.round(bounds.left + bounds.width), Math.round(backgroundPositioningArea.top + position.y)), new _Vector2.default(Math.round(bounds.left + bounds.width), Math.round(size.height + backgroundPositioningArea.top + position.y)), new _Vector2.default(Math.round(bounds.left), Math.round(size.height + backgroundPositioningArea.top + position.y))];
	        case BACKGROUND_REPEAT.REPEAT_Y:
	            return [new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x), Math.round(bounds.top)), new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x + size.width), Math.round(bounds.top)), new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x + size.width), Math.round(bounds.height + bounds.top)), new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x), Math.round(bounds.height + bounds.top))];
	        case BACKGROUND_REPEAT.NO_REPEAT:
	            return [new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x), Math.round(backgroundPositioningArea.top + position.y)), new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x + size.width), Math.round(backgroundPositioningArea.top + position.y)), new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x + size.width), Math.round(backgroundPositioningArea.top + position.y + size.height)), new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x), Math.round(backgroundPositioningArea.top + position.y + size.height))];
	        default:
	            return [new _Vector2.default(Math.round(bounds.left), Math.round(bounds.top)), new _Vector2.default(Math.round(bounds.left + bounds.width), Math.round(bounds.top)), new _Vector2.default(Math.round(bounds.left + bounds.width), Math.round(bounds.height + bounds.top)), new _Vector2.default(Math.round(bounds.left), Math.round(bounds.height + bounds.top))];
	    }
	};
	
	var parseBackground = exports.parseBackground = function parseBackground(style, resourceLoader) {
	    return {
	        backgroundColor: new _Color2.default(style.backgroundColor),
	        backgroundImage: parseBackgroundImages(style, resourceLoader),
	        backgroundClip: parseBackgroundClip(style.backgroundClip),
	        backgroundOrigin: parseBackgroundOrigin(style.backgroundOrigin)
	    };
	};
	
	var parseBackgroundClip = function parseBackgroundClip(backgroundClip) {
	    switch (backgroundClip) {
	        case 'padding-box':
	            return BACKGROUND_CLIP.PADDING_BOX;
	        case 'content-box':
	            return BACKGROUND_CLIP.CONTENT_BOX;
	    }
	    return BACKGROUND_CLIP.BORDER_BOX;
	};
	
	var parseBackgroundOrigin = function parseBackgroundOrigin(backgroundOrigin) {
	    switch (backgroundOrigin) {
	        case 'padding-box':
	            return BACKGROUND_ORIGIN.PADDING_BOX;
	        case 'content-box':
	            return BACKGROUND_ORIGIN.CONTENT_BOX;
	    }
	    return BACKGROUND_ORIGIN.BORDER_BOX;
	};
	
	var parseBackgroundRepeat = function parseBackgroundRepeat(backgroundRepeat) {
	    switch (backgroundRepeat.trim()) {
	        case 'no-repeat':
	            return BACKGROUND_REPEAT.NO_REPEAT;
	        case 'repeat-x':
	        case 'repeat no-repeat':
	            return BACKGROUND_REPEAT.REPEAT_X;
	        case 'repeat-y':
	        case 'no-repeat repeat':
	            return BACKGROUND_REPEAT.REPEAT_Y;
	        case 'repeat':
	            return BACKGROUND_REPEAT.REPEAT;
	    }
	
	    if (false) {
	        console.error('Invalid background-repeat value "' + backgroundRepeat + '"');
	    }
	
	    return BACKGROUND_REPEAT.REPEAT;
	};
	
	var parseBackgroundImages = function parseBackgroundImages(style, resourceLoader) {
	    var sources = parseBackgroundImage(style.backgroundImage).map(function (backgroundImage) {
	        if (backgroundImage.method === 'url') {
	            var key = resourceLoader.loadImage(backgroundImage.args[0]);
	            backgroundImage.args = key ? [key] : [];
	        }
	        return backgroundImage;
	    });
	    var positions = style.backgroundPosition.split(',');
	    var repeats = style.backgroundRepeat.split(',');
	    var sizes = style.backgroundSize.split(',');
	
	    return sources.map(function (source, index) {
	        var size = (sizes[index] || AUTO).trim().split(' ').map(parseBackgroundSize);
	        var position = (positions[index] || AUTO).trim().split(' ').map(parseBackgoundPosition);
	
	        return {
	            source: source,
	            repeat: parseBackgroundRepeat(typeof repeats[index] === 'string' ? repeats[index] : repeats[0]),
	            size: size.length < 2 ? [size[0], AUTO_SIZE] : [size[0], size[1]],
	            position: position.length < 2 ? [position[0], position[0]] : [position[0], position[1]]
	        };
	    });
	};
	
	var parseBackgroundSize = function parseBackgroundSize(size) {
	    return size === 'auto' ? AUTO_SIZE : new BackgroundSize(size);
	};
	
	var parseBackgoundPosition = function parseBackgoundPosition(position) {
	    switch (position) {
	        case 'bottom':
	        case 'right':
	            return new _Length2.default('100%');
	        case 'left':
	        case 'top':
	            return new _Length2.default('0%');
	        case 'auto':
	            return new _Length2.default('0');
	    }
	    return new _Length2.default(position);
	};
	
	var parseBackgroundImage = exports.parseBackgroundImage = function parseBackgroundImage(image) {
	    var whitespace = /^\s$/;
	    var results = [];
	
	    var args = [];
	    var method = '';
	    var quote = null;
	    var definition = '';
	    var mode = 0;
	    var numParen = 0;
	
	    var appendResult = function appendResult() {
	        var prefix = '';
	        if (method) {
	            if (definition.substr(0, 1) === '"') {
	                definition = definition.substr(1, definition.length - 2);
	            }
	
	            if (definition) {
	                args.push(definition.trim());
	            }
	
	            var prefix_i = method.indexOf('-', 1) + 1;
	            if (method.substr(0, 1) === '-' && prefix_i > 0) {
	                prefix = method.substr(0, prefix_i).toLowerCase();
	                method = method.substr(prefix_i);
	            }
	            method = method.toLowerCase();
	            if (method !== 'none') {
	                results.push({
	                    prefix: prefix,
	                    method: method,
	                    args: args
	                });
	            }
	        }
	        args = [];
	        method = definition = '';
	    };
	
	    image.split('').forEach(function (c) {
	        if (mode === 0 && whitespace.test(c)) {
	            return;
	        }
	        switch (c) {
	            case '"':
	                if (!quote) {
	                    quote = c;
	                } else if (quote === c) {
	                    quote = null;
	                }
	                break;
	            case '(':
	                if (quote) {
	                    break;
	                } else if (mode === 0) {
	                    mode = 1;
	                    return;
	                } else {
	                    numParen++;
	                }
	                break;
	            case ')':
	                if (quote) {
	                    break;
	                } else if (mode === 1) {
	                    if (numParen === 0) {
	                        mode = 0;
	                        appendResult();
	                        return;
	                    } else {
	                        numParen--;
	                    }
	                }
	                break;
	
	            case ',':
	                if (quote) {
	                    break;
	                } else if (mode === 0) {
	                    appendResult();
	                    return;
	                } else if (mode === 1) {
	                    if (numParen === 0 && !method.match(/^url$/i)) {
	                        args.push(definition.trim());
	                        definition = '';
	                        return;
	                    }
	                }
	                break;
	        }
	
	        if (mode === 0) {
	            method += c;
	        } else {
	            definition += c;
	        }
	    });
	
	    appendResult();
	    return results;
	};

/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _textTransform = __webpack_require__(84);
	
	var _TextBounds = __webpack_require__(81);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TextContainer = function () {
	    function TextContainer(text, parent, bounds) {
	        _classCallCheck(this, TextContainer);
	
	        this.text = text;
	        this.parent = parent;
	        this.bounds = bounds;
	    }
	
	    _createClass(TextContainer, null, [{
	        key: 'fromTextNode',
	        value: function fromTextNode(node, parent) {
	            var text = transform(node.data, parent.style.textTransform);
	            return new TextContainer(text, parent, (0, _TextBounds.parseTextBounds)(text, parent, node));
	        }
	    }]);
	
	    return TextContainer;
	}();
	
	exports.default = TextContainer;
	
	
	var CAPITALIZE = /(^|\s|:|-|\(|\))([a-z])/g;
	
	var transform = function transform(text, _transform) {
	    switch (_transform) {
	        case _textTransform.TEXT_TRANSFORM.LOWERCASE:
	            return text.toLowerCase();
	        case _textTransform.TEXT_TRANSFORM.CAPITALIZE:
	            return text.replace(CAPITALIZE, capitalize);
	        case _textTransform.TEXT_TRANSFORM.UPPERCASE:
	            return text.toUpperCase();
	        default:
	            return text;
	    }
	};
	
	function capitalize(m, p1, p2) {
	    if (m.length > 0) {
	        return p1 + p2.toUpperCase();
	    }
	
	    return m;
	}

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.parseBorder = exports.BORDER_SIDES = exports.BORDER_STYLE = undefined;
	
	var _Color = __webpack_require__(12);
	
	var _Color2 = _interopRequireDefault(_Color);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BORDER_STYLE = exports.BORDER_STYLE = {
	    NONE: 0,
	    SOLID: 1
	};
	
	var BORDER_SIDES = exports.BORDER_SIDES = {
	    TOP: 0,
	    RIGHT: 1,
	    BOTTOM: 2,
	    LEFT: 3
	};
	
	var SIDES = Object.keys(BORDER_SIDES).map(function (s) {
	    return s.toLowerCase();
	});
	
	var parseBorderStyle = function parseBorderStyle(style) {
	    switch (style) {
	        case 'none':
	            return BORDER_STYLE.NONE;
	    }
	    return BORDER_STYLE.SOLID;
	};
	
	var parseBorder = exports.parseBorder = function parseBorder(style) {
	    return SIDES.map(function (side) {
	        var borderColor = new _Color2.default(style.getPropertyValue('border-' + side + '-color'));
	        var borderStyle = parseBorderStyle(style.getPropertyValue('border-' + side + '-style'));
	        var borderWidth = parseFloat(style.getPropertyValue('border-' + side + '-width'));
	        return {
	            borderColor: borderColor,
	            borderStyle: borderStyle,
	            borderWidth: isNaN(borderWidth) ? 0 : borderWidth
	        };
	    });
	};

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.parseTextDecoration = exports.TEXT_DECORATION_LINE = exports.TEXT_DECORATION = exports.TEXT_DECORATION_STYLE = undefined;
	
	var _Color = __webpack_require__(12);
	
	var _Color2 = _interopRequireDefault(_Color);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TEXT_DECORATION_STYLE = exports.TEXT_DECORATION_STYLE = {
	    SOLID: 0,
	    DOUBLE: 1,
	    DOTTED: 2,
	    DASHED: 3,
	    WAVY: 4
	};
	
	var TEXT_DECORATION = exports.TEXT_DECORATION = {
	    NONE: null
	};
	
	var TEXT_DECORATION_LINE = exports.TEXT_DECORATION_LINE = {
	    UNDERLINE: 1,
	    OVERLINE: 2,
	    LINE_THROUGH: 3,
	    BLINK: 4
	};
	
	var parseLine = function parseLine(line) {
	    switch (line) {
	        case 'underline':
	            return TEXT_DECORATION_LINE.UNDERLINE;
	        case 'overline':
	            return TEXT_DECORATION_LINE.OVERLINE;
	        case 'line-through':
	            return TEXT_DECORATION_LINE.LINE_THROUGH;
	    }
	    return TEXT_DECORATION_LINE.BLINK;
	};
	
	var parseTextDecorationLine = function parseTextDecorationLine(line) {
	    if (line === 'none') {
	        return null;
	    }
	
	    return line.split(' ').map(parseLine);
	};
	
	var parseTextDecorationStyle = function parseTextDecorationStyle(style) {
	    switch (style) {
	        case 'double':
	            return TEXT_DECORATION_STYLE.DOUBLE;
	        case 'dotted':
	            return TEXT_DECORATION_STYLE.DOTTED;
	        case 'dashed':
	            return TEXT_DECORATION_STYLE.DASHED;
	        case 'wavy':
	            return TEXT_DECORATION_STYLE.WAVY;
	    }
	    return TEXT_DECORATION_STYLE.SOLID;
	};
	
	var parseTextDecoration = exports.parseTextDecoration = function parseTextDecoration(style) {
	    var textDecorationLine = parseTextDecorationLine(style.textDecorationLine ? style.textDecorationLine : style.textDecoration);
	    if (textDecorationLine === null) {
	        return TEXT_DECORATION.NONE;
	    }
	
	    var textDecorationColor = style.textDecorationColor ? new _Color2.default(style.textDecorationColor) : null;
	    var textDecorationStyle = parseTextDecorationStyle(style.textDecorationStyle);
	
	    return {
	        textDecorationLine: textDecorationLine,
	        textDecorationColor: textDecorationColor,
	        textDecorationStyle: textDecorationStyle
	    };
	};

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FontMetrics = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Util = __webpack_require__(29);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SAMPLE_TEXT = 'Hidden Text';
	
	var FontMetrics = exports.FontMetrics = function () {
	    function FontMetrics(document) {
	        _classCallCheck(this, FontMetrics);
	
	        this._data = {};
	        this._document = document;
	    }
	
	    _createClass(FontMetrics, [{
	        key: '_parseMetrics',
	        value: function _parseMetrics(font) {
	            var container = this._document.createElement('div');
	            var img = this._document.createElement('img');
	            var span = this._document.createElement('span');
	
	            var body = this._document.body;
	            if (!body) {
	                throw new Error( false ? 'No document found for font metrics' : '');
	            }
	
	            container.style.visibility = 'hidden';
	            container.style.fontFamily = font.fontFamily;
	            container.style.fontSize = font.fontSize;
	            container.style.margin = '0';
	            container.style.padding = '0';
	
	            body.appendChild(container);
	
	            img.src = _Util.SMALL_IMAGE;
	            img.width = 1;
	            img.height = 1;
	
	            img.style.margin = '0';
	            img.style.padding = '0';
	            img.style.verticalAlign = 'baseline';
	
	            span.style.fontFamily = font.fontFamily;
	            span.style.fontSize = font.fontSize;
	            span.style.margin = '0';
	            span.style.padding = '0';
	
	            span.appendChild(this._document.createTextNode(SAMPLE_TEXT));
	            container.appendChild(span);
	            container.appendChild(img);
	            var baseline = img.offsetTop - span.offsetTop + 2;
	
	            container.removeChild(span);
	            container.appendChild(this._document.createTextNode(SAMPLE_TEXT));
	
	            container.style.lineHeight = 'normal';
	            img.style.verticalAlign = 'super';
	
	            var middle = img.offsetTop - container.offsetTop + 2;
	
	            body.removeChild(container);
	
	            return { baseline: baseline, middle: middle };
	        }
	    }, {
	        key: 'getMetrics',
	        value: function getMetrics(font) {
	            var key = font.fontFamily + ' ' + font.fontSize;
	            if (this._data[key] === undefined) {
	                this._data[key] = this._parseMetrics(font);
	            }
	
	            return this._data[key];
	        }
	    }]);
	
	    return FontMetrics;
	}();

/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.reformatInputBounds = exports.inlineSelectElement = exports.inlineTextAreaElement = exports.inlineInputElement = exports.getInputBorderRadius = exports.INPUT_BACKGROUND = exports.INPUT_BORDERS = exports.INPUT_COLOR = undefined;
	
	var _TextContainer = __webpack_require__(62);
	
	var _TextContainer2 = _interopRequireDefault(_TextContainer);
	
	var _background = __webpack_require__(44);
	
	var _border = __webpack_require__(63);
	
	var _Circle = __webpack_require__(151);
	
	var _Circle2 = _interopRequireDefault(_Circle);
	
	var _Vector = __webpack_require__(43);
	
	var _Vector2 = _interopRequireDefault(_Vector);
	
	var _Color = __webpack_require__(12);
	
	var _Color2 = _interopRequireDefault(_Color);
	
	var _Length = __webpack_require__(18);
	
	var _Length2 = _interopRequireDefault(_Length);
	
	var _Bounds = __webpack_require__(11);
	
	var _TextBounds = __webpack_require__(81);
	
	var _Util = __webpack_require__(29);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var INPUT_COLOR = exports.INPUT_COLOR = new _Color2.default([42, 42, 42]);
	var INPUT_BORDER_COLOR = new _Color2.default([165, 165, 165]);
	var INPUT_BACKGROUND_COLOR = new _Color2.default([222, 222, 222]);
	var INPUT_BORDER = {
	    borderWidth: 1,
	    borderColor: INPUT_BORDER_COLOR,
	    borderStyle: _border.BORDER_STYLE.SOLID
	};
	var INPUT_BORDERS = exports.INPUT_BORDERS = [INPUT_BORDER, INPUT_BORDER, INPUT_BORDER, INPUT_BORDER];
	var INPUT_BACKGROUND = exports.INPUT_BACKGROUND = {
	    backgroundColor: INPUT_BACKGROUND_COLOR,
	    backgroundImage: [],
	    backgroundClip: _background.BACKGROUND_CLIP.PADDING_BOX,
	    backgroundOrigin: _background.BACKGROUND_ORIGIN.PADDING_BOX
	};
	
	var RADIO_BORDER_RADIUS = new _Length2.default('50%');
	var RADIO_BORDER_RADIUS_TUPLE = [RADIO_BORDER_RADIUS, RADIO_BORDER_RADIUS];
	var INPUT_RADIO_BORDER_RADIUS = [RADIO_BORDER_RADIUS_TUPLE, RADIO_BORDER_RADIUS_TUPLE, RADIO_BORDER_RADIUS_TUPLE, RADIO_BORDER_RADIUS_TUPLE];
	
	var CHECKBOX_BORDER_RADIUS = new _Length2.default('3px');
	var CHECKBOX_BORDER_RADIUS_TUPLE = [CHECKBOX_BORDER_RADIUS, CHECKBOX_BORDER_RADIUS];
	var INPUT_CHECKBOX_BORDER_RADIUS = [CHECKBOX_BORDER_RADIUS_TUPLE, CHECKBOX_BORDER_RADIUS_TUPLE, CHECKBOX_BORDER_RADIUS_TUPLE, CHECKBOX_BORDER_RADIUS_TUPLE];
	
	var getInputBorderRadius = exports.getInputBorderRadius = function getInputBorderRadius(node) {
	    return node.type === 'radio' ? INPUT_RADIO_BORDER_RADIUS : INPUT_CHECKBOX_BORDER_RADIUS;
	};
	
	var inlineInputElement = exports.inlineInputElement = function inlineInputElement(node, container) {
	    if (node.type === 'radio' || node.type === 'checkbox') {
	        if (node.checked) {
	            var size = Math.min(container.bounds.width, container.bounds.height);
	            container.childNodes.push(node.type === 'checkbox' ? [new _Vector2.default(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79), new _Vector2.default(container.bounds.left + size * 0.16, container.bounds.top + size * 0.5549), new _Vector2.default(container.bounds.left + size * 0.27347, container.bounds.top + size * 0.44071), new _Vector2.default(container.bounds.left + size * 0.39694, container.bounds.top + size * 0.5649), new _Vector2.default(container.bounds.left + size * 0.72983, container.bounds.top + size * 0.23), new _Vector2.default(container.bounds.left + size * 0.84, container.bounds.top + size * 0.34085), new _Vector2.default(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79)] : new _Circle2.default(container.bounds.left + size / 4, container.bounds.top + size / 4, size / 4));
	        }
	    } else {
	        inlineFormElement(getInputValue(node), node, container, false);
	    }
	};
	
	var inlineTextAreaElement = exports.inlineTextAreaElement = function inlineTextAreaElement(node, container) {
	    inlineFormElement(node.value, node, container, true);
	};
	
	var inlineSelectElement = exports.inlineSelectElement = function inlineSelectElement(node, container) {
	    var option = node.options[node.selectedIndex || 0];
	    inlineFormElement(option ? option.text || '' : '', node, container, false);
	};
	
	var reformatInputBounds = exports.reformatInputBounds = function reformatInputBounds(bounds) {
	    if (bounds.width > bounds.height) {
	        bounds.left += (bounds.width - bounds.height) / 2;
	        bounds.width = bounds.height;
	    } else if (bounds.width < bounds.height) {
	        bounds.top += (bounds.height - bounds.width) / 2;
	        bounds.height = bounds.width;
	    }
	    return bounds;
	};
	
	var inlineFormElement = function inlineFormElement(value, node, container, allowLinebreak) {
	    var body = node.ownerDocument.body;
	    if (value.length > 0 && body) {
	        var wrapper = node.ownerDocument.createElement('html2canvaswrapper');
	        (0, _Util.copyCSSStyles)(node.ownerDocument.defaultView.getComputedStyle(node, null), wrapper);
	        wrapper.style.position = 'fixed';
	        wrapper.style.left = container.bounds.left + 'px';
	        wrapper.style.top = container.bounds.top + 'px';
	        if (!allowLinebreak) {
	            wrapper.style.whiteSpace = 'nowrap';
	        }
	        var text = node.ownerDocument.createTextNode(value);
	        wrapper.appendChild(text);
	        body.appendChild(wrapper);
	        container.childNodes.push(_TextContainer2.default.fromTextNode(text, container));
	        body.removeChild(wrapper);
	    }
	};
	
	var getInputValue = function getInputValue(node) {
	    var value = node.type === 'password' ? new Array(node.value.length + 1).join('\u2022') : node.value;
	
	    return value.length === 0 ? node.placeholder || '' : value;
	};

/***/ }),

/***/ 79:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Logger = function () {
	    function Logger(enabled, id, start) {
	        _classCallCheck(this, Logger);
	
	        this.enabled = enabled;
	        this.start = start ? start : Date.now();
	        this.id = id;
	    }
	
	    _createClass(Logger, [{
	        key: 'child',
	        value: function child(id) {
	            return new Logger(this.enabled, id, this.start);
	        }
	
	        // eslint-disable-next-line flowtype/no-weak-types
	
	    }, {
	        key: 'log',
	        value: function log() {
	            if (this.enabled && window.console && window.console.log) {
	                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                    args[_key] = arguments[_key];
	                }
	
	                Function.prototype.bind.call(window.console.log, window.console).apply(window.console, [Date.now() - this.start + 'ms', this.id ? 'html2canvas (' + this.id + '):' : 'html2canvas:'].concat([].slice.call(args, 0)));
	            }
	        }
	
	        // eslint-disable-next-line flowtype/no-weak-types
	
	    }, {
	        key: 'error',
	        value: function error() {
	            if (this.enabled && window.console && window.console.error) {
	                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                    args[_key2] = arguments[_key2];
	                }
	
	                Function.prototype.bind.call(window.console.error, window.console).apply(window.console, [Date.now() - this.start + 'ms', this.id ? 'html2canvas (' + this.id + '):' : 'html2canvas:'].concat([].slice.call(args, 0)));
	            }
	        }
	    }]);
	
	    return Logger;
	}();
	
	exports.default = Logger;

/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Proxy = undefined;
	
	var _Feature = __webpack_require__(40);
	
	var _Feature2 = _interopRequireDefault(_Feature);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Proxy = exports.Proxy = function Proxy(src, options) {
	    if (!options.proxy) {
	        return Promise.reject( false ? 'No proxy defined' : null);
	    }
	    var proxy = options.proxy;
	
	    return new Promise(function (resolve, reject) {
	        var responseType = _Feature2.default.SUPPORT_CORS_XHR && _Feature2.default.SUPPORT_RESPONSE_TYPE ? 'blob' : 'text';
	        var xhr = _Feature2.default.SUPPORT_CORS_XHR ? new XMLHttpRequest() : new XDomainRequest();
	        xhr.onload = function () {
	            if (xhr instanceof XMLHttpRequest) {
	                if (xhr.status === 200) {
	                    if (responseType === 'text') {
	                        resolve(xhr.response);
	                    } else {
	                        var reader = new FileReader();
	                        // $FlowFixMe
	                        reader.addEventListener('load', function () {
	                            return resolve(reader.result);
	                        }, false);
	                        // $FlowFixMe
	                        reader.addEventListener('error', function (e) {
	                            return reject(e);
	                        }, false);
	                        reader.readAsDataURL(xhr.response);
	                    }
	                } else {
	                    reject( false ? 'Failed to proxy resource ' + src.substring(0, 256) + ' with status code ' + xhr.status : '');
	                }
	            } else {
	                resolve(xhr.responseText);
	            }
	        };
	
	        xhr.onerror = reject;
	        xhr.open('GET', proxy + '?url=' + encodeURIComponent(src) + '&responseType=' + responseType);
	
	        if (responseType !== 'text' && xhr instanceof XMLHttpRequest) {
	            xhr.responseType = responseType;
	        }
	
	        if (options.imageTimeout) {
	            var timeout = options.imageTimeout;
	            xhr.timeout = timeout;
	            xhr.ontimeout = function () {
	                return reject( false ? 'Timed out (' + timeout + 'ms) proxying ' + src.substring(0, 256) : '');
	            };
	        }
	
	        xhr.send();
	    });
	};

/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.parseTextBounds = exports.TextBounds = undefined;
	
	var _punycode = __webpack_require__(164);
	
	var _Bounds = __webpack_require__(11);
	
	var _textDecoration = __webpack_require__(64);
	
	var _Feature = __webpack_require__(40);
	
	var _Feature2 = _interopRequireDefault(_Feature);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var UNICODE = /[^\u0000-\u00ff]/;
	
	var hasUnicodeCharacters = function hasUnicodeCharacters(text) {
	    return UNICODE.test(text);
	};
	
	var encodeCodePoint = function encodeCodePoint(codePoint) {
	    return _punycode.ucs2.encode([codePoint]);
	};
	
	var TextBounds = exports.TextBounds = function TextBounds(text, bounds) {
	    _classCallCheck(this, TextBounds);
	
	    this.text = text;
	    this.bounds = bounds;
	};
	
	var parseTextBounds = exports.parseTextBounds = function parseTextBounds(value, parent, node) {
	    var codePoints = _punycode.ucs2.decode(value);
	    var letterRendering = parent.style.letterSpacing !== 0 || hasUnicodeCharacters(value);
	    var textList = letterRendering ? codePoints.map(encodeCodePoint) : splitWords(codePoints);
	    var length = textList.length;
	    var defaultView = node.parentNode ? node.parentNode.ownerDocument.defaultView : null;
	    var scrollX = defaultView ? defaultView.pageXOffset : 0;
	    var scrollY = defaultView ? defaultView.pageYOffset : 0;
	    var textBounds = [];
	    var offset = 0;
	    for (var i = 0; i < length; i++) {
	        var text = textList[i];
	        if (parent.style.textDecoration !== _textDecoration.TEXT_DECORATION.NONE || text.trim().length > 0) {
	            if (_Feature2.default.SUPPORT_RANGE_BOUNDS) {
	                textBounds.push(new TextBounds(text, getRangeBounds(node, offset, text.length, scrollX, scrollY)));
	            } else {
	                var replacementNode = node.splitText(text.length);
	                textBounds.push(new TextBounds(text, getWrapperBounds(node, scrollX, scrollY)));
	                node = replacementNode;
	            }
	        } else if (!_Feature2.default.SUPPORT_RANGE_BOUNDS) {
	            node = node.splitText(text.length);
	        }
	        offset += text.length;
	    }
	    return textBounds;
	};
	
	var getWrapperBounds = function getWrapperBounds(node, scrollX, scrollY) {
	    var wrapper = node.ownerDocument.createElement('html2canvaswrapper');
	    wrapper.appendChild(node.cloneNode(true));
	    var parentNode = node.parentNode;
	    if (parentNode) {
	        parentNode.replaceChild(wrapper, node);
	        var bounds = (0, _Bounds.parseBounds)(wrapper, scrollX, scrollY);
	        if (wrapper.firstChild) {
	            parentNode.replaceChild(wrapper.firstChild, wrapper);
	        }
	        return bounds;
	    }
	    return new _Bounds.Bounds(0, 0, 0, 0);
	};
	
	var getRangeBounds = function getRangeBounds(node, offset, length, scrollX, scrollY) {
	    var range = node.ownerDocument.createRange();
	    range.setStart(node, offset);
	    range.setEnd(node, offset + length);
	    return _Bounds.Bounds.fromClientRect(range.getBoundingClientRect(), scrollX, scrollY);
	};
	
	var splitWords = function splitWords(codePoints) {
	    var words = [];
	    var i = 0;
	    var onWordBoundary = false;
	    var word = void 0;
	    while (codePoints.length) {
	        if (isWordBoundary(codePoints[i]) === onWordBoundary) {
	            word = codePoints.splice(0, i);
	            if (word.length) {
	                words.push(_punycode.ucs2.encode(word));
	            }
	            onWordBoundary = !onWordBoundary;
	            i = 0;
	        } else {
	            i++;
	        }
	
	        if (i >= codePoints.length) {
	            word = codePoints.splice(0, i);
	            if (word.length) {
	                words.push(_punycode.ucs2.encode(word));
	            }
	        }
	    }
	    return words;
	};
	
	var isWordBoundary = function isWordBoundary(characterCode) {
	    return [32, // <space>
	    13, // \r
	    10, // \n
	    9, // \t
	    45 // -
	    ].indexOf(characterCode) !== -1;
	};

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.parsePadding = exports.PADDING_SIDES = undefined;
	
	var _Length = __webpack_require__(18);
	
	var _Length2 = _interopRequireDefault(_Length);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PADDING_SIDES = exports.PADDING_SIDES = {
	    TOP: 0,
	    RIGHT: 1,
	    BOTTOM: 2,
	    LEFT: 3
	};
	
	var SIDES = ['top', 'right', 'bottom', 'left'];
	
	var parsePadding = exports.parsePadding = function parsePadding(style) {
	    return SIDES.map(function (side) {
	        return new _Length2.default(style.getPropertyValue('padding-' + side));
	    });
	};

/***/ }),

/***/ 83:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var POSITION = exports.POSITION = {
	    STATIC: 0,
	    RELATIVE: 1,
	    ABSOLUTE: 2,
	    FIXED: 3,
	    STICKY: 4
	};
	
	var parsePosition = exports.parsePosition = function parsePosition(position) {
	    switch (position) {
	        case 'relative':
	            return POSITION.RELATIVE;
	        case 'absolute':
	            return POSITION.ABSOLUTE;
	        case 'fixed':
	            return POSITION.FIXED;
	        case 'sticky':
	            return POSITION.STICKY;
	    }
	
	    return POSITION.STATIC;
	};

/***/ }),

/***/ 84:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var TEXT_TRANSFORM = exports.TEXT_TRANSFORM = {
	    NONE: 0,
	    LOWERCASE: 1,
	    UPPERCASE: 2,
	    CAPITALIZE: 3
	};
	
	var parseTextTransform = exports.parseTextTransform = function parseTextTransform(textTransform) {
	    switch (textTransform) {
	        case 'uppercase':
	            return TEXT_TRANSFORM.UPPERCASE;
	        case 'lowercase':
	            return TEXT_TRANSFORM.LOWERCASE;
	        case 'capitalize':
	            return TEXT_TRANSFORM.CAPITALIZE;
	    }
	
	    return TEXT_TRANSFORM.NONE;
	};

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Path = __webpack_require__(42);
	
	var _textDecoration = __webpack_require__(64);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var addColorStops = function addColorStops(gradient, canvasGradient) {
	    var maxStop = Math.max.apply(null, gradient.colorStops.map(function (colorStop) {
	        return colorStop.stop;
	    }));
	    var f = 1 / Math.max(1, maxStop);
	    gradient.colorStops.forEach(function (colorStop) {
	        canvasGradient.addColorStop(f * colorStop.stop, colorStop.color.toString());
	    });
	};
	
	var CanvasRenderer = function () {
	    function CanvasRenderer(canvas) {
	        _classCallCheck(this, CanvasRenderer);
	
	        this.canvas = canvas ? canvas : document.createElement('canvas');
	    }
	
	    _createClass(CanvasRenderer, [{
	        key: 'render',
	        value: function render(options) {
	            this.ctx = this.canvas.getContext('2d');
	            this.options = options;
	            this.canvas.width = Math.floor(options.width * options.scale);
	            this.canvas.height = Math.floor(options.height * options.scale);
	            this.canvas.style.width = options.width + 'px';
	            this.canvas.style.height = options.height + 'px';
	
	            this.ctx.scale(this.options.scale, this.options.scale);
	            this.ctx.translate(-options.x, -options.y);
	            this.ctx.textBaseline = 'bottom';
	            options.logger.log('Canvas renderer initialized (' + options.width + 'x' + options.height + ' at ' + options.x + ',' + options.y + ') with scale ' + this.options.scale);
	        }
	    }, {
	        key: 'clip',
	        value: function clip(clipPaths, callback) {
	            var _this = this;
	
	            if (clipPaths.length) {
	                this.ctx.save();
	                clipPaths.forEach(function (path) {
	                    _this.path(path);
	                    _this.ctx.clip();
	                });
	            }
	
	            callback();
	
	            if (clipPaths.length) {
	                this.ctx.restore();
	            }
	        }
	    }, {
	        key: 'drawImage',
	        value: function drawImage(image, source, destination) {
	            this.ctx.drawImage(image, source.left, source.top, source.width, source.height, destination.left, destination.top, destination.width, destination.height);
	        }
	    }, {
	        key: 'drawShape',
	        value: function drawShape(path, color) {
	            this.path(path);
	            this.ctx.fillStyle = color.toString();
	            this.ctx.fill();
	        }
	    }, {
	        key: 'fill',
	        value: function fill(color) {
	            this.ctx.fillStyle = color.toString();
	            this.ctx.fill();
	        }
	    }, {
	        key: 'getTarget',
	        value: function getTarget() {
	            return Promise.resolve(this.canvas);
	        }
	    }, {
	        key: 'path',
	        value: function path(_path) {
	            var _this2 = this;
	
	            this.ctx.beginPath();
	            if (Array.isArray(_path)) {
	                _path.forEach(function (point, index) {
	                    var start = point.type === _Path.PATH.VECTOR ? point : point.start;
	                    if (index === 0) {
	                        _this2.ctx.moveTo(start.x, start.y);
	                    } else {
	                        _this2.ctx.lineTo(start.x, start.y);
	                    }
	
	                    if (point.type === _Path.PATH.BEZIER_CURVE) {
	                        _this2.ctx.bezierCurveTo(point.startControl.x, point.startControl.y, point.endControl.x, point.endControl.y, point.end.x, point.end.y);
	                    }
	                });
	            } else {
	                this.ctx.arc(_path.x + _path.radius, _path.y + _path.radius, _path.radius, 0, Math.PI * 2, true);
	            }
	
	            this.ctx.closePath();
	        }
	    }, {
	        key: 'rectangle',
	        value: function rectangle(x, y, width, height, color) {
	            this.ctx.fillStyle = color.toString();
	            this.ctx.fillRect(x, y, width, height);
	        }
	    }, {
	        key: 'renderLinearGradient',
	        value: function renderLinearGradient(bounds, gradient) {
	            var linearGradient = this.ctx.createLinearGradient(bounds.left + gradient.direction.x1, bounds.top + gradient.direction.y1, bounds.left + gradient.direction.x0, bounds.top + gradient.direction.y0);
	
	            addColorStops(gradient, linearGradient);
	            this.ctx.fillStyle = linearGradient;
	            this.ctx.fillRect(bounds.left, bounds.top, bounds.width, bounds.height);
	        }
	    }, {
	        key: 'renderRadialGradient',
	        value: function renderRadialGradient(bounds, gradient) {
	            var _this3 = this;
	
	            var x = bounds.left + gradient.center.x;
	            var y = bounds.top + gradient.center.y;
	
	            var radialGradient = this.ctx.createRadialGradient(x, y, 0, x, y, gradient.radius.x);
	            if (!radialGradient) {
	                return;
	            }
	
	            addColorStops(gradient, radialGradient);
	            this.ctx.fillStyle = radialGradient;
	
	            if (gradient.radius.x !== gradient.radius.y) {
	                // transforms for elliptical radial gradient
	                var midX = bounds.left + 0.5 * bounds.width;
	                var midY = bounds.top + 0.5 * bounds.height;
	                var f = gradient.radius.y / gradient.radius.x;
	                var invF = 1 / f;
	
	                this.transform(midX, midY, [1, 0, 0, f, 0, 0], function () {
	                    return _this3.ctx.fillRect(bounds.left, invF * (bounds.top - midY) + midY, bounds.width, bounds.height * invF);
	                });
	            } else {
	                this.ctx.fillRect(bounds.left, bounds.top, bounds.width, bounds.height);
	            }
	        }
	    }, {
	        key: 'renderRepeat',
	        value: function renderRepeat(path, image, imageSize, offsetX, offsetY) {
	            this.path(path);
	            this.ctx.fillStyle = this.ctx.createPattern(this.resizeImage(image, imageSize), 'repeat');
	            this.ctx.translate(offsetX, offsetY);
	            this.ctx.fill();
	            this.ctx.translate(-offsetX, -offsetY);
	        }
	    }, {
	        key: 'renderTextNode',
	        value: function renderTextNode(textBounds, color, font, textDecoration, textShadows) {
	            var _this4 = this;
	
	            this.ctx.font = [font.fontStyle, font.fontVariant, font.fontWeight, font.fontSize, font.fontFamily].join(' ');
	
	            textBounds.forEach(function (text) {
	                _this4.ctx.fillStyle = color.toString();
	                if (textShadows && text.text.trim().length) {
	                    textShadows.slice(0).reverse().forEach(function (textShadow) {
	                        _this4.ctx.shadowColor = textShadow.color.toString();
	                        _this4.ctx.shadowOffsetX = textShadow.offsetX * _this4.options.scale;
	                        _this4.ctx.shadowOffsetY = textShadow.offsetY * _this4.options.scale;
	                        _this4.ctx.shadowBlur = textShadow.blur;
	
	                        _this4.ctx.fillText(text.text, text.bounds.left, text.bounds.top + text.bounds.height);
	                    });
	                } else {
	                    _this4.ctx.fillText(text.text, text.bounds.left, text.bounds.top + text.bounds.height);
	                }
	
	                if (textDecoration !== null) {
	                    var textDecorationColor = textDecoration.textDecorationColor || color;
	                    textDecoration.textDecorationLine.forEach(function (textDecorationLine) {
	                        switch (textDecorationLine) {
	                            case _textDecoration.TEXT_DECORATION_LINE.UNDERLINE:
	                                // Draws a line at the baseline of the font
	                                // TODO As some browsers display the line as more than 1px if the font-size is big,
	                                // need to take that into account both in position and size
	                                var _options$fontMetrics$ = _this4.options.fontMetrics.getMetrics(font),
	                                    baseline = _options$fontMetrics$.baseline;
	
	                                _this4.rectangle(text.bounds.left, Math.round(text.bounds.top + baseline), text.bounds.width, 1, textDecorationColor);
	                                break;
	                            case _textDecoration.TEXT_DECORATION_LINE.OVERLINE:
	                                _this4.rectangle(text.bounds.left, Math.round(text.bounds.top), text.bounds.width, 1, textDecorationColor);
	                                break;
	                            case _textDecoration.TEXT_DECORATION_LINE.LINE_THROUGH:
	                                // TODO try and find exact position for line-through
	                                var _options$fontMetrics$2 = _this4.options.fontMetrics.getMetrics(font),
	                                    middle = _options$fontMetrics$2.middle;
	
	                                _this4.rectangle(text.bounds.left, Math.ceil(text.bounds.top + middle), text.bounds.width, 1, textDecorationColor);
	                                break;
	                        }
	                    });
	                }
	            });
	        }
	    }, {
	        key: 'resizeImage',
	        value: function resizeImage(image, size) {
	            if (image.width === size.width && image.height === size.height) {
	                return image;
	            }
	
	            var canvas = this.canvas.ownerDocument.createElement('canvas');
	            canvas.width = size.width;
	            canvas.height = size.height;
	            var ctx = canvas.getContext('2d');
	            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, size.width, size.height);
	            return canvas;
	        }
	    }, {
	        key: 'setOpacity',
	        value: function setOpacity(opacity) {
	            this.ctx.globalAlpha = opacity;
	        }
	    }, {
	        key: 'transform',
	        value: function transform(offsetX, offsetY, matrix, callback) {
	            this.ctx.save();
	            this.ctx.translate(offsetX, offsetY);
	            this.ctx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
	            this.ctx.translate(-offsetX, -offsetY);
	
	            callback();
	
	            this.ctx.restore();
	        }
	    }]);
	
	    return CanvasRenderer;
	}();
	
	exports.default = CanvasRenderer;

/***/ }),

/***/ 86:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ForeignObjectRenderer = function () {
	    function ForeignObjectRenderer(element) {
	        _classCallCheck(this, ForeignObjectRenderer);
	
	        this.element = element;
	    }
	
	    _createClass(ForeignObjectRenderer, [{
	        key: 'render',
	        value: function render(options) {
	            var _this = this;
	
	            this.options = options;
	            this.canvas = document.createElement('canvas');
	            this.ctx = this.canvas.getContext('2d');
	            this.canvas.width = Math.floor(options.width) * options.scale;
	            this.canvas.height = Math.floor(options.height) * options.scale;
	            this.canvas.style.width = options.width + 'px';
	            this.canvas.style.height = options.height + 'px';
	
	            options.logger.log('ForeignObject renderer initialized (' + options.width + 'x' + options.height + ' at ' + options.x + ',' + options.y + ') with scale ' + options.scale);
	            var svg = createForeignObjectSVG(Math.max(options.windowWidth, options.width) * options.scale, Math.max(options.windowHeight, options.height) * options.scale, options.scrollX * options.scale, options.scrollY * options.scale, this.element);
	
	            return loadSerializedSVG(svg).then(function (img) {
	                if (options.backgroundColor) {
	                    _this.ctx.fillStyle = options.backgroundColor.toString();
	                    _this.ctx.fillRect(0, 0, options.width * options.scale, options.height * options.scale);
	                }
	
	                _this.ctx.drawImage(img, -options.x * options.scale, -options.y * options.scale);
	                return _this.canvas;
	            });
	        }
	    }]);
	
	    return ForeignObjectRenderer;
	}();
	
	exports.default = ForeignObjectRenderer;
	var createForeignObjectSVG = exports.createForeignObjectSVG = function createForeignObjectSVG(width, height, x, y, node) {
	    var xmlns = 'http://www.w3.org/2000/svg';
	    var svg = document.createElementNS(xmlns, 'svg');
	    var foreignObject = document.createElementNS(xmlns, 'foreignObject');
	    svg.setAttributeNS(null, 'width', width);
	    svg.setAttributeNS(null, 'height', height);
	
	    foreignObject.setAttributeNS(null, 'width', '100%');
	    foreignObject.setAttributeNS(null, 'height', '100%');
	    foreignObject.setAttributeNS(null, 'x', x);
	    foreignObject.setAttributeNS(null, 'y', y);
	    foreignObject.setAttributeNS(null, 'externalResourcesRequired', 'true');
	    svg.appendChild(foreignObject);
	
	    foreignObject.appendChild(node);
	
	    return svg;
	};
	
	var loadSerializedSVG = exports.loadSerializedSVG = function loadSerializedSVG(svg) {
	    return new Promise(function (resolve, reject) {
	        var img = new Image();
	        img.onload = function () {
	            return resolve(img);
	        };
	        img.onerror = reject;
	
	        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(svg));
	    });
	};

/***/ }),

/***/ 142:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ANGLE = /([+-]?\d*\.?\d+)(deg|grad|rad|turn)/i;
	
	var parseAngle = exports.parseAngle = function parseAngle(angle) {
	    var match = angle.match(ANGLE);
	
	    if (match) {
	        var value = parseFloat(match[1]);
	        switch (match[2].toLowerCase()) {
	            case 'deg':
	                return Math.PI * value / 180;
	            case 'grad':
	                return Math.PI / 200 * value;
	            case 'rad':
	                return value;
	            case 'turn':
	                return Math.PI * 2 * value;
	        }
	    }
	
	    return null;
	};

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.cloneWindow = exports.DocumentCloner = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Bounds = __webpack_require__(11);
	
	var _Proxy = __webpack_require__(80);
	
	var _ResourceLoader = __webpack_require__(147);
	
	var _ResourceLoader2 = _interopRequireDefault(_ResourceLoader);
	
	var _Util = __webpack_require__(29);
	
	var _background = __webpack_require__(44);
	
	var _CanvasRenderer = __webpack_require__(85);
	
	var _CanvasRenderer2 = _interopRequireDefault(_CanvasRenderer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var IGNORE_ATTRIBUTE = 'data-html2canvas-ignore';
	
	var DocumentCloner = exports.DocumentCloner = function () {
	    function DocumentCloner(element, options, logger, copyInline, renderer) {
	        _classCallCheck(this, DocumentCloner);
	
	        this.referenceElement = element;
	        this.scrolledElements = [];
	        this.copyStyles = copyInline;
	        this.inlineImages = copyInline;
	        this.logger = logger;
	        this.options = options;
	        this.renderer = renderer;
	        this.resourceLoader = new _ResourceLoader2.default(options, logger, window);
	        // $FlowFixMe
	        this.documentElement = this.cloneNode(element.ownerDocument.documentElement);
	    }
	
	    _createClass(DocumentCloner, [{
	        key: 'inlineAllImages',
	        value: function inlineAllImages(node) {
	            var _this = this;
	
	            if (this.inlineImages && node) {
	                var style = node.style;
	                Promise.all((0, _background.parseBackgroundImage)(style.backgroundImage).map(function (backgroundImage) {
	                    if (backgroundImage.method === 'url') {
	                        return _this.resourceLoader.inlineImage(backgroundImage.args[0]).then(function (img) {
	                            return img && typeof img.src === 'string' ? 'url("' + img.src + '")' : 'none';
	                        }).catch(function (e) {
	                            if (false) {
	                                _this.logger.log('Unable to load image', e);
	                            }
	                        });
	                    }
	                    return Promise.resolve('' + backgroundImage.prefix + backgroundImage.method + '(' + backgroundImage.args.join(',') + ')');
	                })).then(function (backgroundImages) {
	                    if (backgroundImages.length > 1) {
	                        // TODO Multiple backgrounds somehow broken in Chrome
	                        style.backgroundColor = '';
	                    }
	                    style.backgroundImage = backgroundImages.join(',');
	                });
	
	                if (node instanceof HTMLImageElement) {
	                    this.resourceLoader.inlineImage(node.src).then(function (img) {
	                        if (img && node instanceof HTMLImageElement && node.parentNode) {
	                            var parentNode = node.parentNode;
	                            var clonedChild = (0, _Util.copyCSSStyles)(node.style, img.cloneNode(false));
	                            parentNode.replaceChild(clonedChild, node);
	                        }
	                    }).catch(function (e) {
	                        if (false) {
	                            _this.logger.log('Unable to load image', e);
	                        }
	                    });
	                }
	            }
	        }
	    }, {
	        key: 'inlineFonts',
	        value: function inlineFonts(document) {
	            var _this2 = this;
	
	            return Promise.all(Array.from(document.styleSheets).map(function (sheet) {
	                if (sheet.href) {
	                    return fetch(sheet.href).then(function (res) {
	                        return res.text();
	                    }).then(function (text) {
	                        return createStyleSheetFontsFromText(text, sheet.href);
	                    }).catch(function (e) {
	                        if (false) {
	                            _this2.logger.log('Unable to load stylesheet', e);
	                        }
	                        return [];
	                    });
	                }
	                return getSheetFonts(sheet, document);
	            })).then(function (fonts) {
	                return fonts.reduce(function (acc, font) {
	                    return acc.concat(font);
	                }, []);
	            }).then(function (fonts) {
	                return Promise.all(fonts.map(function (font) {
	                    return fetch(font.formats[0].src).then(function (response) {
	                        return response.blob();
	                    }).then(function (blob) {
	                        return new Promise(function (resolve, reject) {
	                            var reader = new FileReader();
	                            reader.onerror = reject;
	                            reader.onload = function () {
	                                // $FlowFixMe
	                                var result = reader.result;
	                                resolve(result);
	                            };
	                            reader.readAsDataURL(blob);
	                        });
	                    }).then(function (dataUri) {
	                        font.fontFace.setProperty('src', 'url("' + dataUri + '")');
	                        return '@font-face {' + font.fontFace.cssText + ' ';
	                    });
	                }));
	            }).then(function (fontCss) {
	                var style = document.createElement('style');
	                style.textContent = fontCss.join('\n');
	                _this2.documentElement.appendChild(style);
	            });
	        }
	    }, {
	        key: 'createElementClone',
	        value: function createElementClone(node) {
	            var _this3 = this;
	
	            if (this.copyStyles && node instanceof HTMLCanvasElement) {
	                var img = node.ownerDocument.createElement('img');
	                try {
	                    img.src = node.toDataURL();
	                    return img;
	                } catch (e) {
	                    if (false) {
	                        this.logger.log('Unable to clone canvas contents, canvas is tainted');
	                    }
	                }
	            }
	
	            if (node instanceof HTMLIFrameElement) {
	                var tempIframe = node.cloneNode(false);
	                var iframeKey = generateIframeKey();
	                tempIframe.setAttribute('data-html2canvas-internal-iframe-key', iframeKey);
	
	                var _parseBounds = (0, _Bounds.parseBounds)(node, 0, 0),
	                    width = _parseBounds.width,
	                    height = _parseBounds.height;
	
	                this.resourceLoader.cache[iframeKey] = getIframeDocumentElement(node, this.options).then(function (documentElement) {
	                    return _this3.renderer(documentElement, {
	                        async: _this3.options.async,
	                        allowTaint: _this3.options.allowTaint,
	                        backgroundColor: '#ffffff',
	                        canvas: null,
	                        imageTimeout: _this3.options.imageTimeout,
	                        logging: _this3.options.logging,
	                        proxy: _this3.options.proxy,
	                        removeContainer: _this3.options.removeContainer,
	                        scale: _this3.options.scale,
	                        foreignObjectRendering: _this3.options.foreignObjectRendering,
	                        target: new _CanvasRenderer2.default(),
	                        width: width,
	                        height: height,
	                        x: 0,
	                        y: 0,
	                        windowWidth: documentElement.ownerDocument.defaultView.innerWidth,
	                        windowHeight: documentElement.ownerDocument.defaultView.innerHeight,
	                        scrollX: documentElement.ownerDocument.defaultView.pageXOffset,
	                        scrollY: documentElement.ownerDocument.defaultView.pageYOffset
	                    }, _this3.logger.child(iframeKey));
	                }).then(function (canvas) {
	                    return new Promise(function (resolve, reject) {
	                        var iframeCanvas = document.createElement('img');
	                        iframeCanvas.onload = function () {
	                            return resolve(canvas);
	                        };
	                        iframeCanvas.onerror = reject;
	                        iframeCanvas.src = canvas.toDataURL();
	                        if (tempIframe.parentNode) {
	                            tempIframe.parentNode.replaceChild((0, _Util.copyCSSStyles)(node.ownerDocument.defaultView.getComputedStyle(node), iframeCanvas), tempIframe);
	                        }
	                    });
	                });
	                return tempIframe;
	            }
	
	            return node.cloneNode(false);
	        }
	    }, {
	        key: 'cloneNode',
	        value: function cloneNode(node) {
	            var clone = node.nodeType === Node.TEXT_NODE ? document.createTextNode(node.nodeValue) : this.createElementClone(node);
	
	            var window = node.ownerDocument.defaultView;
	
	            if (this.referenceElement === node && clone instanceof window.HTMLElement) {
	                this.clonedReferenceElement = clone;
	            }
	
	            if (clone instanceof window.HTMLBodyElement) {
	                createPseudoHideStyles(clone);
	            }
	
	            for (var child = node.firstChild; child; child = child.nextSibling) {
	                if (child.nodeType !== Node.ELEMENT_NODE ||
	                // $FlowFixMe
	                child.nodeName !== 'SCRIPT' && !child.hasAttribute(IGNORE_ATTRIBUTE)) {
	                    if (!this.copyStyles || child.nodeName !== 'STYLE') {
	                        clone.appendChild(this.cloneNode(child));
	                    }
	                }
	            }
	            if (node instanceof window.HTMLElement && clone instanceof window.HTMLElement) {
	                this.inlineAllImages(inlinePseudoElement(node, clone, PSEUDO_BEFORE));
	                this.inlineAllImages(inlinePseudoElement(node, clone, PSEUDO_AFTER));
	                if (this.copyStyles && !(node instanceof HTMLIFrameElement)) {
	                    (0, _Util.copyCSSStyles)(node.ownerDocument.defaultView.getComputedStyle(node), clone);
	                }
	                this.inlineAllImages(clone);
	                if (node.scrollTop !== 0 || node.scrollLeft !== 0) {
	                    this.scrolledElements.push([clone, node.scrollLeft, node.scrollTop]);
	                }
	                switch (node.nodeName) {
	                    case 'CANVAS':
	                        if (!this.copyStyles) {
	                            cloneCanvasContents(node, clone);
	                        }
	                        break;
	                    case 'TEXTAREA':
	                    case 'SELECT':
	                        clone.value = node.value;
	                        break;
	                }
	            }
	            return clone;
	        }
	    }]);
	
	    return DocumentCloner;
	}();
	
	var getSheetFonts = function getSheetFonts(sheet, document) {
	    // $FlowFixMe
	    return (sheet.cssRules ? Array.from(sheet.cssRules) : []).filter(function (rule) {
	        return rule.type === CSSRule.FONT_FACE_RULE;
	    }).map(function (rule) {
	        var src = (0, _background.parseBackgroundImage)(rule.style.getPropertyValue('src'));
	        var formats = [];
	        for (var i = 0; i < src.length; i++) {
	            if (src[i].method === 'url' && src[i + 1] && src[i + 1].method === 'format') {
	                var a = document.createElement('a');
	                a.href = src[i].args[0];
	                if (document.body) {
	                    document.body.appendChild(a);
	                }
	
	                var font = {
	                    src: a.href,
	                    format: src[i + 1].args[0]
	                };
	                formats.push(font);
	            }
	        }
	
	        return {
	            // TODO select correct format for browser),
	
	            formats: formats.filter(function (font) {
	                return (/^woff/i.test(font.format)
	                );
	            }),
	            fontFace: rule.style
	        };
	    }).filter(function (font) {
	        return font.formats.length;
	    });
	};
	
	var createStyleSheetFontsFromText = function createStyleSheetFontsFromText(text, baseHref) {
	    var doc = document.implementation.createHTMLDocument('');
	    var base = document.createElement('base');
	    // $FlowFixMe
	    base.href = baseHref;
	    var style = document.createElement('style');
	
	    style.textContent = text;
	    if (doc.head) {
	        doc.head.appendChild(base);
	    }
	    if (doc.body) {
	        doc.body.appendChild(style);
	    }
	
	    return style.sheet ? getSheetFonts(style.sheet, doc) : [];
	};
	
	var restoreOwnerScroll = function restoreOwnerScroll(ownerDocument, x, y) {
	    if (ownerDocument.defaultView && (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
	        ownerDocument.defaultView.scrollTo(x, y);
	    }
	};
	
	var cloneCanvasContents = function cloneCanvasContents(canvas, clonedCanvas) {
	    try {
	        if (clonedCanvas) {
	            clonedCanvas.width = canvas.width;
	            clonedCanvas.height = canvas.height;
	            var ctx = canvas.getContext('2d');
	            var clonedCtx = clonedCanvas.getContext('2d');
	            if (ctx) {
	                clonedCtx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
	            } else {
	                clonedCtx.drawImage(canvas, 0, 0);
	            }
	        }
	    } catch (e) {}
	};
	
	var inlinePseudoElement = function inlinePseudoElement(node, clone, pseudoElt) {
	    var style = node.ownerDocument.defaultView.getComputedStyle(node, pseudoElt);
	    if (!style || !style.content || style.content === 'none' || style.content === '-moz-alt-content' || style.display === 'none') {
	        return;
	    }
	
	    var content = stripQuotes(style.content);
	    var image = content.match(URL_REGEXP);
	    var anonymousReplacedElement = clone.ownerDocument.createElement(image ? 'img' : 'html2canvaspseudoelement');
	    if (image) {
	        // $FlowFixMe
	        anonymousReplacedElement.src = stripQuotes(image[1]);
	    } else {
	        anonymousReplacedElement.textContent = content;
	    }
	
	    (0, _Util.copyCSSStyles)(style, anonymousReplacedElement);
	
	    anonymousReplacedElement.className = PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ' ' + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
	    clone.className += pseudoElt === PSEUDO_BEFORE ? ' ' + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE : ' ' + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
	    if (pseudoElt === PSEUDO_BEFORE) {
	        clone.insertBefore(anonymousReplacedElement, clone.firstChild);
	    } else {
	        clone.appendChild(anonymousReplacedElement);
	    }
	
	    return anonymousReplacedElement;
	};
	
	var stripQuotes = function stripQuotes(content) {
	    var first = content.substr(0, 1);
	    return first === content.substr(content.length - 1) && first.match(/['"]/) ? content.substr(1, content.length - 2) : content;
	};
	
	var URL_REGEXP = /^url\((.+)\)$/i;
	var PSEUDO_BEFORE = ':before';
	var PSEUDO_AFTER = ':after';
	var PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = '___html2canvas___pseudoelement_before';
	var PSEUDO_HIDE_ELEMENT_CLASS_AFTER = '___html2canvas___pseudoelement_after';
	
	var PSEUDO_HIDE_ELEMENT_STYLE = '{\n    content: "" !important;\n    display: none !important;\n}';
	
	var createPseudoHideStyles = function createPseudoHideStyles(body) {
	    createStyles(body, '.' + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + PSEUDO_BEFORE + PSEUDO_HIDE_ELEMENT_STYLE + '\n         .' + PSEUDO_HIDE_ELEMENT_CLASS_AFTER + PSEUDO_AFTER + PSEUDO_HIDE_ELEMENT_STYLE);
	};
	
	var createStyles = function createStyles(body, styles) {
	    var style = body.ownerDocument.createElement('style');
	    style.innerHTML = styles;
	    body.appendChild(style);
	};
	
	var initNode = function initNode(_ref) {
	    var _ref2 = _slicedToArray(_ref, 3),
	        element = _ref2[0],
	        x = _ref2[1],
	        y = _ref2[2];
	
	    element.scrollLeft = x;
	    element.scrollTop = y;
	};
	
	var generateIframeKey = function generateIframeKey() {
	    return Math.ceil(Date.now() + Math.random() * 10000000).toString(16);
	};
	
	var DATA_URI_REGEXP = /^data:text\/(.+);(base64)?,(.*)$/i;
	
	var getIframeDocumentElement = function getIframeDocumentElement(node, options) {
	    try {
	        return Promise.resolve(node.contentWindow.document.documentElement);
	    } catch (e) {
	        return options.proxy ? (0, _Proxy.Proxy)(node.src, options).then(function (html) {
	            var match = html.match(DATA_URI_REGEXP);
	            if (!match) {
	                return Promise.reject();
	            }
	
	            return match[2] === 'base64' ? window.atob(decodeURIComponent(match[3])) : decodeURIComponent(match[3]);
	        }).then(function (html) {
	            return createIframeContainer(node.ownerDocument, (0, _Bounds.parseBounds)(node, 0, 0)).then(function (cloneIframeContainer) {
	                var cloneWindow = cloneIframeContainer.contentWindow;
	                var documentClone = cloneWindow.document;
	
	                documentClone.open();
	                documentClone.write(html);
	                var iframeLoad = iframeLoader(cloneIframeContainer).then(function () {
	                    return documentClone.documentElement;
	                });
	
	                documentClone.close();
	                return iframeLoad;
	            });
	        }) : Promise.reject();
	    }
	};
	
	var createIframeContainer = function createIframeContainer(ownerDocument, bounds) {
	    var cloneIframeContainer = ownerDocument.createElement('iframe');
	
	    cloneIframeContainer.className = 'html2canvas-container';
	    cloneIframeContainer.style.visibility = 'hidden';
	    cloneIframeContainer.style.position = 'fixed';
	    cloneIframeContainer.style.left = '-10000px';
	    cloneIframeContainer.style.top = '0px';
	    cloneIframeContainer.style.border = '0';
	    cloneIframeContainer.width = bounds.width.toString();
	    cloneIframeContainer.height = bounds.height.toString();
	    cloneIframeContainer.scrolling = 'no'; // ios won't scroll without it
	    cloneIframeContainer.setAttribute(IGNORE_ATTRIBUTE, 'true');
	    if (!ownerDocument.body) {
	        return Promise.reject( false ? 'Body element not found in Document that is getting rendered' : '');
	    }
	
	    ownerDocument.body.appendChild(cloneIframeContainer);
	
	    return Promise.resolve(cloneIframeContainer);
	};
	
	var iframeLoader = function iframeLoader(cloneIframeContainer) {
	    var cloneWindow = cloneIframeContainer.contentWindow;
	    var documentClone = cloneWindow.document;
	
	    return new Promise(function (resolve, reject) {
	        cloneWindow.onload = cloneIframeContainer.onload = documentClone.onreadystatechange = function () {
	            var interval = setInterval(function () {
	                if (documentClone.body.childNodes.length > 0 && documentClone.readyState === 'complete') {
	                    clearInterval(interval);
	                    resolve(cloneIframeContainer);
	                }
	            }, 50);
	        };
	    });
	};
	
	var cloneWindow = exports.cloneWindow = function cloneWindow(ownerDocument, bounds, referenceElement, options, logger, renderer) {
	    var cloner = new DocumentCloner(referenceElement, options, logger, false, renderer);
	    var scrollX = ownerDocument.defaultView.pageXOffset;
	    var scrollY = ownerDocument.defaultView.pageYOffset;
	
	    return createIframeContainer(ownerDocument, bounds).then(function (cloneIframeContainer) {
	        var cloneWindow = cloneIframeContainer.contentWindow;
	        var documentClone = cloneWindow.document;
	
	        /* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
	             if window url is about:blank, we can assign the url to current by writing onto the document
	             */
	
	        var iframeLoad = iframeLoader(cloneIframeContainer).then(function () {
	            cloner.scrolledElements.forEach(initNode);
	            cloneWindow.scrollTo(bounds.left, bounds.top);
	            if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent) && (cloneWindow.scrollY !== bounds.top || cloneWindow.scrollX !== bounds.left)) {
	                documentClone.documentElement.style.top = -bounds.top + 'px';
	                documentClone.documentElement.style.left = -bounds.left + 'px';
	                documentClone.documentElement.style.position = 'absolute';
	            }
	            return cloner.clonedReferenceElement instanceof cloneWindow.HTMLElement || cloner.clonedReferenceElement instanceof ownerDocument.defaultView.HTMLElement || cloner.clonedReferenceElement instanceof HTMLElement ? Promise.resolve([cloneIframeContainer, cloner.clonedReferenceElement, cloner.resourceLoader]) : Promise.reject( false ? 'Error finding the ' + referenceElement.nodeName + ' in the cloned document' : '');
	        });
	
	        documentClone.open();
	        documentClone.write('<!DOCTYPE html><html></html>');
	        // Chrome scrolls the parent document for some reason after the write to the cloned window???
	        restoreOwnerScroll(referenceElement.ownerDocument, scrollX, scrollY);
	        documentClone.replaceChild(documentClone.adoptNode(cloner.documentElement), documentClone.documentElement);
	        documentClone.close();
	
	        return iframeLoad;
	    });
	};

/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.transformWebkitRadialGradientArgs = exports.parseGradient = exports.RadialGradient = exports.LinearGradient = exports.RADIAL_GRADIENT_SHAPE = exports.GRADIENT_TYPE = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _NodeContainer = __webpack_require__(41);
	
	var _NodeContainer2 = _interopRequireDefault(_NodeContainer);
	
	var _Angle = __webpack_require__(142);
	
	var _Color = __webpack_require__(12);
	
	var _Color2 = _interopRequireDefault(_Color);
	
	var _Length = __webpack_require__(18);
	
	var _Length2 = _interopRequireDefault(_Length);
	
	var _Util = __webpack_require__(29);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SIDE_OR_CORNER = /^(to )?(left|top|right|bottom)( (left|top|right|bottom))?$/i;
	var PERCENTAGE_ANGLES = /^([+-]?\d*\.?\d+)% ([+-]?\d*\.?\d+)%$/i;
	var ENDS_WITH_LENGTH = /(px)|%|( 0)$/i;
	var FROM_TO_COLORSTOP = /^(from|to|color-stop)\((?:([\d.]+)(%)?,\s*)?(.+?)\)$/i;
	var RADIAL_SHAPE_DEFINITION = /^\s*(circle|ellipse)?\s*((?:([\d.]+)(px|r?em|%)\s*(?:([\d.]+)(px|r?em|%))?)|closest-side|closest-corner|farthest-side|farthest-corner)?\s*(?:at\s*(?:(left|center|right)|([\d.]+)(px|r?em|%))\s+(?:(top|center|bottom)|([\d.]+)(px|r?em|%)))?(?:\s|$)/i;
	
	var GRADIENT_TYPE = exports.GRADIENT_TYPE = {
	    LINEAR_GRADIENT: 0,
	    RADIAL_GRADIENT: 1
	};
	
	var RADIAL_GRADIENT_SHAPE = exports.RADIAL_GRADIENT_SHAPE = {
	    CIRCLE: 0,
	    ELLIPSE: 1
	};
	
	var LENGTH_FOR_POSITION = {
	    left: new _Length2.default('0%'),
	    top: new _Length2.default('0%'),
	    center: new _Length2.default('50%'),
	    right: new _Length2.default('100%'),
	    bottom: new _Length2.default('100%')
	};
	
	var LinearGradient = exports.LinearGradient = function LinearGradient(colorStops, direction) {
	    _classCallCheck(this, LinearGradient);
	
	    this.type = GRADIENT_TYPE.LINEAR_GRADIENT;
	    this.colorStops = colorStops;
	    this.direction = direction;
	};
	
	var RadialGradient = exports.RadialGradient = function RadialGradient(colorStops, shape, center, radius) {
	    _classCallCheck(this, RadialGradient);
	
	    this.type = GRADIENT_TYPE.RADIAL_GRADIENT;
	    this.colorStops = colorStops;
	    this.shape = shape;
	    this.center = center;
	    this.radius = radius;
	};
	
	var parseGradient = exports.parseGradient = function parseGradient(container, _ref, bounds) {
	    var args = _ref.args,
	        method = _ref.method,
	        prefix = _ref.prefix;
	
	    if (method === 'linear-gradient') {
	        return parseLinearGradient(args, bounds, !!prefix);
	    } else if (method === 'gradient' && args[0] === 'linear') {
	        // TODO handle correct angle
	        return parseLinearGradient(['to bottom'].concat(transformObsoleteColorStops(args.slice(3))), bounds, !!prefix);
	    } else if (method === 'radial-gradient') {
	        return parseRadialGradient(container, prefix === '-webkit-' ? transformWebkitRadialGradientArgs(args) : args, bounds);
	    } else if (method === 'gradient' && args[0] === 'radial') {
	        return parseRadialGradient(container, transformObsoleteColorStops(transformWebkitRadialGradientArgs(args.slice(1))), bounds);
	    }
	};
	
	var parseColorStops = function parseColorStops(args, firstColorStopIndex, lineLength) {
	    var colorStops = [];
	
	    for (var i = firstColorStopIndex; i < args.length; i++) {
	        var value = args[i];
	        var HAS_LENGTH = ENDS_WITH_LENGTH.test(value);
	        var lastSpaceIndex = value.lastIndexOf(' ');
	        var _color = new _Color2.default(HAS_LENGTH ? value.substring(0, lastSpaceIndex) : value);
	        var _stop = HAS_LENGTH ? new _Length2.default(value.substring(lastSpaceIndex + 1)) : i === firstColorStopIndex ? new _Length2.default('0%') : i === args.length - 1 ? new _Length2.default('100%') : null;
	        colorStops.push({ color: _color, stop: _stop });
	    }
	
	    var absoluteValuedColorStops = colorStops.map(function (_ref2) {
	        var color = _ref2.color,
	            stop = _ref2.stop;
	
	        var absoluteStop = lineLength === 0 ? 0 : stop ? stop.getAbsoluteValue(lineLength) / lineLength : null;
	
	        return {
	            color: color,
	            // $FlowFixMe
	            stop: absoluteStop
	        };
	    });
	
	    var previousColorStop = absoluteValuedColorStops[0].stop;
	    for (var _i = 0; _i < absoluteValuedColorStops.length; _i++) {
	        if (previousColorStop !== null) {
	            var _stop2 = absoluteValuedColorStops[_i].stop;
	            if (_stop2 === null) {
	                var n = _i;
	                while (absoluteValuedColorStops[n].stop === null) {
	                    n++;
	                }
	                var steps = n - _i + 1;
	                var nextColorStep = absoluteValuedColorStops[n].stop;
	                var stepSize = (nextColorStep - previousColorStop) / steps;
	                for (; _i < n; _i++) {
	                    previousColorStop = absoluteValuedColorStops[_i].stop = previousColorStop + stepSize;
	                }
	            } else {
	                previousColorStop = _stop2;
	            }
	        }
	    }
	
	    return absoluteValuedColorStops;
	};
	
	var parseLinearGradient = function parseLinearGradient(args, bounds, hasPrefix) {
	    var angle = (0, _Angle.parseAngle)(args[0]);
	    var HAS_SIDE_OR_CORNER = SIDE_OR_CORNER.test(args[0]);
	    var HAS_DIRECTION = HAS_SIDE_OR_CORNER || angle !== null || PERCENTAGE_ANGLES.test(args[0]);
	    var direction = HAS_DIRECTION ? angle !== null ? calculateGradientDirection(
	    // if there is a prefix, the 0° angle points due East (instead of North per W3C)
	    hasPrefix ? angle - Math.PI * 0.5 : angle, bounds) : HAS_SIDE_OR_CORNER ? parseSideOrCorner(args[0], bounds) : parsePercentageAngle(args[0], bounds) : calculateGradientDirection(Math.PI, bounds);
	    var firstColorStopIndex = HAS_DIRECTION ? 1 : 0;
	
	    // TODO: Fix some inaccuracy with color stops with px values
	    var lineLength = Math.min((0, _Util.distance)(Math.abs(direction.x0) + Math.abs(direction.x1), Math.abs(direction.y0) + Math.abs(direction.y1)), bounds.width * 2, bounds.height * 2);
	
	    return new LinearGradient(parseColorStops(args, firstColorStopIndex, lineLength), direction);
	};
	
	var parseRadialGradient = function parseRadialGradient(container, args, bounds) {
	    var m = args[0].match(RADIAL_SHAPE_DEFINITION);
	    var shape = m && (m[1] === 'circle' || // explicit shape specification
	    m[3] !== undefined && m[5] === undefined) // only one radius coordinate
	    ? RADIAL_GRADIENT_SHAPE.CIRCLE : RADIAL_GRADIENT_SHAPE.ELLIPSE;
	    var radius = {};
	    var center = {};
	
	    if (m) {
	        // Radius
	        if (m[3] !== undefined) {
	            radius.x = (0, _Length.calculateLengthFromValueWithUnit)(container, m[3], m[4]).getAbsoluteValue(bounds.width);
	        }
	
	        if (m[5] !== undefined) {
	            radius.y = (0, _Length.calculateLengthFromValueWithUnit)(container, m[5], m[6]).getAbsoluteValue(bounds.height);
	        }
	
	        // Position
	        if (m[7]) {
	            center.x = LENGTH_FOR_POSITION[m[7].toLowerCase()];
	        } else if (m[8] !== undefined) {
	            center.x = (0, _Length.calculateLengthFromValueWithUnit)(container, m[8], m[9]);
	        }
	
	        if (m[10]) {
	            center.y = LENGTH_FOR_POSITION[m[10].toLowerCase()];
	        } else if (m[11] !== undefined) {
	            center.y = (0, _Length.calculateLengthFromValueWithUnit)(container, m[11], m[12]);
	        }
	    }
	
	    var gradientCenter = {
	        x: center.x === undefined ? bounds.width / 2 : center.x.getAbsoluteValue(bounds.width),
	        y: center.y === undefined ? bounds.height / 2 : center.y.getAbsoluteValue(bounds.height)
	    };
	    var gradientRadius = calculateRadius(m && m[2] || 'farthest-corner', shape, gradientCenter, radius, bounds);
	
	    return new RadialGradient(parseColorStops(args, m ? 1 : 0, Math.min(gradientRadius.x, gradientRadius.y)), shape, gradientCenter, gradientRadius);
	};
	
	var calculateGradientDirection = function calculateGradientDirection(radian, bounds) {
	    var width = bounds.width;
	    var height = bounds.height;
	    var HALF_WIDTH = width * 0.5;
	    var HALF_HEIGHT = height * 0.5;
	    var lineLength = Math.abs(width * Math.sin(radian)) + Math.abs(height * Math.cos(radian));
	    var HALF_LINE_LENGTH = lineLength / 2;
	
	    var x0 = HALF_WIDTH + Math.sin(radian) * HALF_LINE_LENGTH;
	    var y0 = HALF_HEIGHT - Math.cos(radian) * HALF_LINE_LENGTH;
	    var x1 = width - x0;
	    var y1 = height - y0;
	
	    return { x0: x0, x1: x1, y0: y0, y1: y1 };
	};
	
	var parseTopRight = function parseTopRight(bounds) {
	    return Math.acos(bounds.width / 2 / ((0, _Util.distance)(bounds.width, bounds.height) / 2));
	};
	
	var parseSideOrCorner = function parseSideOrCorner(side, bounds) {
	    switch (side) {
	        case 'bottom':
	        case 'to top':
	            return calculateGradientDirection(0, bounds);
	        case 'left':
	        case 'to right':
	            return calculateGradientDirection(Math.PI / 2, bounds);
	        case 'right':
	        case 'to left':
	            return calculateGradientDirection(3 * Math.PI / 2, bounds);
	        case 'top right':
	        case 'right top':
	        case 'to bottom left':
	        case 'to left bottom':
	            return calculateGradientDirection(Math.PI + parseTopRight(bounds), bounds);
	        case 'top left':
	        case 'left top':
	        case 'to bottom right':
	        case 'to right bottom':
	            return calculateGradientDirection(Math.PI - parseTopRight(bounds), bounds);
	        case 'bottom left':
	        case 'left bottom':
	        case 'to top right':
	        case 'to right top':
	            return calculateGradientDirection(parseTopRight(bounds), bounds);
	        case 'bottom right':
	        case 'right bottom':
	        case 'to top left':
	        case 'to left top':
	            return calculateGradientDirection(2 * Math.PI - parseTopRight(bounds), bounds);
	        case 'top':
	        case 'to bottom':
	        default:
	            return calculateGradientDirection(Math.PI, bounds);
	    }
	};
	
	var parsePercentageAngle = function parsePercentageAngle(angle, bounds) {
	    var _angle$split$map = angle.split(' ').map(parseFloat),
	        _angle$split$map2 = _slicedToArray(_angle$split$map, 2),
	        left = _angle$split$map2[0],
	        top = _angle$split$map2[1];
	
	    var ratio = left / 100 * bounds.width / (top / 100 * bounds.height);
	
	    return calculateGradientDirection(Math.atan(isNaN(ratio) ? 1 : ratio) + Math.PI / 2, bounds);
	};
	
	var findCorner = function findCorner(bounds, x, y, closest) {
	    var corners = [{ x: 0, y: 0 }, { x: 0, y: bounds.height }, { x: bounds.width, y: 0 }, { x: bounds.width, y: bounds.height }];
	
	    // $FlowFixMe
	    return corners.reduce(function (stat, corner) {
	        var d = (0, _Util.distance)(x - corner.x, y - corner.y);
	        if (closest ? d < stat.optimumDistance : d > stat.optimumDistance) {
	            return {
	                optimumCorner: corner,
	                optimumDistance: d
	            };
	        }
	
	        return stat;
	    }, {
	        optimumDistance: closest ? Infinity : -Infinity,
	        optimumCorner: null
	    }).optimumCorner;
	};
	
	var calculateRadius = function calculateRadius(extent, shape, center, radius, bounds) {
	    var x = center.x;
	    var y = center.y;
	    var rx = 0;
	    var ry = 0;
	
	    switch (extent) {
	        case 'closest-side':
	            // The ending shape is sized so that that it exactly meets the side of the gradient box closest to the gradient’s center.
	            // If the shape is an ellipse, it exactly meets the closest side in each dimension.
	            if (shape === RADIAL_GRADIENT_SHAPE.CIRCLE) {
	                rx = ry = Math.min(Math.abs(x), Math.abs(x - bounds.width), Math.abs(y), Math.abs(y - bounds.height));
	            } else if (shape === RADIAL_GRADIENT_SHAPE.ELLIPSE) {
	                rx = Math.min(Math.abs(x), Math.abs(x - bounds.width));
	                ry = Math.min(Math.abs(y), Math.abs(y - bounds.height));
	            }
	            break;
	
	        case 'closest-corner':
	            // The ending shape is sized so that that it passes through the corner of the gradient box closest to the gradient’s center.
	            // If the shape is an ellipse, the ending shape is given the same aspect-ratio it would have if closest-side were specified.
	            if (shape === RADIAL_GRADIENT_SHAPE.CIRCLE) {
	                rx = ry = Math.min((0, _Util.distance)(x, y), (0, _Util.distance)(x, y - bounds.height), (0, _Util.distance)(x - bounds.width, y), (0, _Util.distance)(x - bounds.width, y - bounds.height));
	            } else if (shape === RADIAL_GRADIENT_SHAPE.ELLIPSE) {
	                // Compute the ratio ry/rx (which is to be the same as for "closest-side")
	                var c = Math.min(Math.abs(y), Math.abs(y - bounds.height)) / Math.min(Math.abs(x), Math.abs(x - bounds.width));
	                var corner = findCorner(bounds, x, y, true);
	                rx = (0, _Util.distance)(corner.x - x, (corner.y - y) / c);
	                ry = c * rx;
	            }
	            break;
	
	        case 'farthest-side':
	            // Same as closest-side, except the ending shape is sized based on the farthest side(s)
	            if (shape === RADIAL_GRADIENT_SHAPE.CIRCLE) {
	                rx = ry = Math.max(Math.abs(x), Math.abs(x - bounds.width), Math.abs(y), Math.abs(y - bounds.height));
	            } else if (shape === RADIAL_GRADIENT_SHAPE.ELLIPSE) {
	                rx = Math.max(Math.abs(x), Math.abs(x - bounds.width));
	                ry = Math.max(Math.abs(y), Math.abs(y - bounds.height));
	            }
	            break;
	
	        case 'farthest-corner':
	            // Same as closest-corner, except the ending shape is sized based on the farthest corner.
	            // If the shape is an ellipse, the ending shape is given the same aspect ratio it would have if farthest-side were specified.
	            if (shape === RADIAL_GRADIENT_SHAPE.CIRCLE) {
	                rx = ry = Math.max((0, _Util.distance)(x, y), (0, _Util.distance)(x, y - bounds.height), (0, _Util.distance)(x - bounds.width, y), (0, _Util.distance)(x - bounds.width, y - bounds.height));
	            } else if (shape === RADIAL_GRADIENT_SHAPE.ELLIPSE) {
	                // Compute the ratio ry/rx (which is to be the same as for "farthest-side")
	                var _c = Math.max(Math.abs(y), Math.abs(y - bounds.height)) / Math.max(Math.abs(x), Math.abs(x - bounds.width));
	                var _corner = findCorner(bounds, x, y, false);
	                rx = (0, _Util.distance)(_corner.x - x, (_corner.y - y) / _c);
	                ry = _c * rx;
	            }
	            break;
	
	        default:
	            // pixel or percentage values
	            rx = radius.x || 0;
	            ry = radius.y !== undefined ? radius.y : rx;
	            break;
	    }
	
	    return {
	        x: rx,
	        y: ry
	    };
	};
	
	var transformWebkitRadialGradientArgs = exports.transformWebkitRadialGradientArgs = function transformWebkitRadialGradientArgs(args) {
	    var shape = '';
	    var radius = '';
	    var extent = '';
	    var position = '';
	    var idx = 0;
	
	    var POSITION = /^(left|center|right|\d+(?:px|r?em|%)?)(?:\s+(top|center|bottom|\d+(?:px|r?em|%)?))?$/i;
	    var SHAPE_AND_EXTENT = /^(circle|ellipse)?\s*(closest-side|closest-corner|farthest-side|farthest-corner|contain|cover)?$/i;
	    var RADIUS = /^\d+(px|r?em|%)?(?:\s+\d+(px|r?em|%)?)?$/i;
	
	    var matchStartPosition = args[idx].match(POSITION);
	    if (matchStartPosition) {
	        idx++;
	    }
	
	    var matchShapeExtent = args[idx].match(SHAPE_AND_EXTENT);
	    if (matchShapeExtent) {
	        shape = matchShapeExtent[1] || '';
	        extent = matchShapeExtent[2] || '';
	        if (extent === 'contain') {
	            extent = 'closest-side';
	        } else if (extent === 'cover') {
	            extent = 'farthest-corner';
	        }
	        idx++;
	    }
	
	    var matchStartRadius = args[idx].match(RADIUS);
	    if (matchStartRadius) {
	        idx++;
	    }
	
	    var matchEndPosition = args[idx].match(POSITION);
	    if (matchEndPosition) {
	        idx++;
	    }
	
	    var matchEndRadius = args[idx].match(RADIUS);
	    if (matchEndRadius) {
	        idx++;
	    }
	
	    var matchPosition = matchEndPosition || matchStartPosition;
	    if (matchPosition && matchPosition[1]) {
	        position = matchPosition[1] + (/^\d+$/.test(matchPosition[1]) ? 'px' : '');
	        if (matchPosition[2]) {
	            position += ' ' + matchPosition[2] + (/^\d+$/.test(matchPosition[2]) ? 'px' : '');
	        }
	    }
	
	    var matchRadius = matchEndRadius || matchStartRadius;
	    if (matchRadius) {
	        radius = matchRadius[0];
	        if (!matchRadius[1]) {
	            radius += 'px';
	        }
	    }
	
	    if (position && !shape && !radius && !extent) {
	        radius = position;
	        position = '';
	    }
	
	    if (position) {
	        position = 'at ' + position;
	    }
	
	    return [[shape, extent, radius, position].filter(function (s) {
	        return !!s;
	    }).join(' ')].concat(args.slice(idx));
	};
	
	var transformObsoleteColorStops = function transformObsoleteColorStops(args) {
	    return args.map(function (color) {
	        return color.match(FROM_TO_COLORSTOP);
	    })
	    // $FlowFixMe
	    .map(function (v, index) {
	        if (!v) {
	            return args[index];
	        }
	
	        switch (v[1]) {
	            case 'from':
	                return v[4] + ' 0%';
	            case 'to':
	                return v[4] + ' 100%';
	            case 'color-stop':
	                if (v[3] === '%') {
	                    return v[4] + ' ' + v[2];
	                }
	                return v[4] + ' ' + parseFloat(v[2]) * 100 + '%';
	        }
	    });
	};

/***/ }),

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.NodeParser = undefined;
	
	var _StackingContext = __webpack_require__(148);
	
	var _StackingContext2 = _interopRequireDefault(_StackingContext);
	
	var _NodeContainer = __webpack_require__(41);
	
	var _NodeContainer2 = _interopRequireDefault(_NodeContainer);
	
	var _TextContainer = __webpack_require__(62);
	
	var _TextContainer2 = _interopRequireDefault(_TextContainer);
	
	var _Input = __webpack_require__(78);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NodeParser = exports.NodeParser = function NodeParser(node, resourceLoader, logger) {
	    if (false) {
	        logger.log('Starting node parsing');
	    }
	
	    var index = 0;
	
	    var container = new _NodeContainer2.default(node, null, resourceLoader, index++);
	    var stack = new _StackingContext2.default(container, null, true);
	
	    parseNodeTree(node, container, stack, resourceLoader, index);
	
	    if (false) {
	        logger.log('Finished parsing node tree');
	    }
	
	    return stack;
	};
	
	var IGNORED_NODE_NAMES = ['SCRIPT', 'HEAD', 'TITLE', 'OBJECT', 'BR', 'OPTION'];
	
	var parseNodeTree = function parseNodeTree(node, parent, stack, resourceLoader, index) {
	    if (false) {
	        throw new Error('Recursion error while parsing node tree');
	    }
	
	    for (var childNode = node.firstChild, nextNode; childNode; childNode = nextNode) {
	        nextNode = childNode.nextSibling;
	        var defaultView = childNode.ownerDocument.defaultView;
	        if (childNode instanceof defaultView.Text || childNode instanceof Text || defaultView.parent && childNode instanceof defaultView.parent.Text) {
	            if (childNode.data.trim().length > 0) {
	                parent.childNodes.push(_TextContainer2.default.fromTextNode(childNode, parent));
	            }
	        } else if (childNode instanceof defaultView.HTMLElement || childNode instanceof HTMLElement || defaultView.parent && childNode instanceof defaultView.parent.HTMLElement) {
	            if (IGNORED_NODE_NAMES.indexOf(childNode.nodeName) === -1) {
	                var container = new _NodeContainer2.default(childNode, parent, resourceLoader, index++);
	                if (container.isVisible()) {
	                    if (childNode.tagName === 'INPUT') {
	                        // $FlowFixMe
	                        (0, _Input.inlineInputElement)(childNode, container);
	                    } else if (childNode.tagName === 'TEXTAREA') {
	                        // $FlowFixMe
	                        (0, _Input.inlineTextAreaElement)(childNode, container);
	                    } else if (childNode.tagName === 'SELECT') {
	                        // $FlowFixMe
	                        (0, _Input.inlineSelectElement)(childNode, container);
	                    }
	
	                    var SHOULD_TRAVERSE_CHILDREN = childNode.tagName !== 'TEXTAREA';
	                    var treatAsRealStackingContext = createsRealStackingContext(container, childNode);
	                    if (treatAsRealStackingContext || createsStackingContext(container)) {
	                        // for treatAsRealStackingContext:false, any positioned descendants and descendants
	                        // which actually create a new stacking context should be considered part of the parent stacking context
	                        var parentStack = treatAsRealStackingContext || container.isPositioned() ? stack.getRealParentStackingContext() : stack;
	                        var childStack = new _StackingContext2.default(container, parentStack, treatAsRealStackingContext);
	                        parentStack.contexts.push(childStack);
	                        if (SHOULD_TRAVERSE_CHILDREN) {
	                            parseNodeTree(childNode, container, childStack, resourceLoader, index);
	                        }
	                    } else {
	                        stack.children.push(container);
	                        if (SHOULD_TRAVERSE_CHILDREN) {
	                            parseNodeTree(childNode, container, stack, resourceLoader, index);
	                        }
	                    }
	                }
	            }
	        } else if (childNode instanceof defaultView.SVGSVGElement || childNode instanceof SVGSVGElement || defaultView.parent && childNode instanceof defaultView.parent.SVGSVGElement) {
	            var _container = new _NodeContainer2.default(childNode, parent, resourceLoader, index++);
	            var _treatAsRealStackingContext = createsRealStackingContext(_container, childNode);
	            if (_treatAsRealStackingContext || createsStackingContext(_container)) {
	                // for treatAsRealStackingContext:false, any positioned descendants and descendants
	                // which actually create a new stacking context should be considered part of the parent stacking context
	                var _parentStack = _treatAsRealStackingContext || _container.isPositioned() ? stack.getRealParentStackingContext() : stack;
	                var _childStack = new _StackingContext2.default(_container, _parentStack, _treatAsRealStackingContext);
	                _parentStack.contexts.push(_childStack);
	            } else {
	                stack.children.push(_container);
	            }
	        }
	    }
	};
	
	var createsRealStackingContext = function createsRealStackingContext(container, node) {
	    return container.isRootElement() || container.isPositionedWithZIndex() || container.style.opacity < 1 || container.isTransformed() || isBodyWithTransparentRoot(container, node);
	};
	
	var createsStackingContext = function createsStackingContext(container) {
	    return container.isPositioned() || container.isFloating();
	};
	
	var isBodyWithTransparentRoot = function isBodyWithTransparentRoot(container, node) {
	    return node.nodeName === 'BODY' && container.parent instanceof _NodeContainer2.default && container.parent.style.background.backgroundColor.isTransparent();
	};

/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Bounds = __webpack_require__(11);
	
	var _Font = __webpack_require__(77);
	
	var _Gradient = __webpack_require__(144);
	
	var _TextContainer = __webpack_require__(62);
	
	var _TextContainer2 = _interopRequireDefault(_TextContainer);
	
	var _background = __webpack_require__(44);
	
	var _border = __webpack_require__(63);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Renderer = function () {
	    function Renderer(target, options) {
	        _classCallCheck(this, Renderer);
	
	        this.target = target;
	        this.options = options;
	        target.render(options);
	    }
	
	    _createClass(Renderer, [{
	        key: 'renderNode',
	        value: function renderNode(container) {
	            if (container.isVisible()) {
	                this.renderNodeBackgroundAndBorders(container);
	                this.renderNodeContent(container);
	            }
	        }
	    }, {
	        key: 'renderNodeContent',
	        value: function renderNodeContent(container) {
	            var _this = this;
	
	            var callback = function callback() {
	                if (container.childNodes.length) {
	                    container.childNodes.forEach(function (child) {
	                        if (child instanceof _TextContainer2.default) {
	                            var style = child.parent.style;
	                            _this.target.renderTextNode(child.bounds, style.color, style.font, style.textDecoration, style.textShadow);
	                        } else {
	                            _this.target.drawShape(child, container.style.color);
	                        }
	                    });
	                }
	
	                if (container.image) {
	                    var _image = _this.options.imageStore.get(container.image);
	                    if (_image) {
	                        var contentBox = (0, _Bounds.calculateContentBox)(container.bounds, container.style.padding, container.style.border);
	                        var _width = typeof _image.width === 'number' && _image.width > 0 ? _image.width : contentBox.width;
	                        var _height = typeof _image.height === 'number' && _image.height > 0 ? _image.height : contentBox.height;
	                        if (_width > 0 && _height > 0) {
	                            _this.target.clip([(0, _Bounds.calculatePaddingBoxPath)(container.curvedBounds)], function () {
	                                _this.target.drawImage(_image, new _Bounds.Bounds(0, 0, _width, _height), contentBox);
	                            });
	                        }
	                    }
	                }
	            };
	            var paths = container.getClipPaths();
	            if (paths.length) {
	                this.target.clip(paths, callback);
	            } else {
	                callback();
	            }
	        }
	    }, {
	        key: 'renderNodeBackgroundAndBorders',
	        value: function renderNodeBackgroundAndBorders(container) {
	            var _this2 = this;
	
	            var HAS_BACKGROUND = !container.style.background.backgroundColor.isTransparent() || container.style.background.backgroundImage.length;
	
	            var renderableBorders = container.style.border.filter(function (border) {
	                return border.borderStyle !== _border.BORDER_STYLE.NONE && !border.borderColor.isTransparent();
	            });
	
	            var callback = function callback() {
	                var backgroundPaintingArea = (0, _background.calculateBackgroungPaintingArea)(container.curvedBounds, container.style.background.backgroundClip);
	
	                if (HAS_BACKGROUND) {
	                    _this2.target.clip([backgroundPaintingArea], function () {
	                        if (!container.style.background.backgroundColor.isTransparent()) {
	                            _this2.target.fill(container.style.background.backgroundColor);
	                        }
	
	                        _this2.renderBackgroundImage(container);
	                    });
	                }
	
	                renderableBorders.forEach(function (border, side) {
	                    _this2.renderBorder(border, side, container.curvedBounds);
	                });
	            };
	
	            if (HAS_BACKGROUND || renderableBorders.length) {
	                var paths = container.parent ? container.parent.getClipPaths() : [];
	                if (paths.length) {
	                    this.target.clip(paths, callback);
	                } else {
	                    callback();
	                }
	            }
	        }
	    }, {
	        key: 'renderBackgroundImage',
	        value: function renderBackgroundImage(container) {
	            var _this3 = this;
	
	            container.style.background.backgroundImage.slice(0).reverse().forEach(function (backgroundImage) {
	                if (backgroundImage.source.method === 'url' && backgroundImage.source.args.length) {
	                    _this3.renderBackgroundRepeat(container, backgroundImage);
	                } else if (/gradient/i.test(backgroundImage.source.method)) {
	                    _this3.renderBackgroundGradient(container, backgroundImage);
	                }
	            });
	        }
	    }, {
	        key: 'renderBackgroundRepeat',
	        value: function renderBackgroundRepeat(container, background) {
	            var image = this.options.imageStore.get(background.source.args[0]);
	            if (image) {
	                var backgroundPositioningArea = (0, _background.calculateBackgroungPositioningArea)(container.style.background.backgroundOrigin, container.bounds, container.style.padding, container.style.border);
	                var backgroundImageSize = (0, _background.calculateBackgroundSize)(background, image, backgroundPositioningArea);
	                var position = (0, _background.calculateBackgroundPosition)(background.position, backgroundImageSize, backgroundPositioningArea);
	                var _path = (0, _background.calculateBackgroundRepeatPath)(background, position, backgroundImageSize, backgroundPositioningArea, container.bounds);
	
	                var _offsetX = Math.round(backgroundPositioningArea.left + position.x);
	                var _offsetY = Math.round(backgroundPositioningArea.top + position.y);
	                this.target.renderRepeat(_path, image, backgroundImageSize, _offsetX, _offsetY);
	            }
	        }
	    }, {
	        key: 'renderBackgroundGradient',
	        value: function renderBackgroundGradient(container, background) {
	            var backgroundPositioningArea = (0, _background.calculateBackgroungPositioningArea)(container.style.background.backgroundOrigin, container.bounds, container.style.padding, container.style.border);
	            var backgroundImageSize = (0, _background.calculateGradientBackgroundSize)(background, backgroundPositioningArea);
	            var position = (0, _background.calculateBackgroundPosition)(background.position, backgroundImageSize, backgroundPositioningArea);
	            var gradientBounds = new _Bounds.Bounds(Math.round(backgroundPositioningArea.left + position.x), Math.round(backgroundPositioningArea.top + position.y), backgroundImageSize.width, backgroundImageSize.height);
	
	            var gradient = (0, _Gradient.parseGradient)(container, background.source, gradientBounds);
	            if (gradient) {
	                switch (gradient.type) {
	                    case _Gradient.GRADIENT_TYPE.LINEAR_GRADIENT:
	                        // $FlowFixMe
	                        this.target.renderLinearGradient(gradientBounds, gradient);
	                        break;
	                    case _Gradient.GRADIENT_TYPE.RADIAL_GRADIENT:
	                        // $FlowFixMe
	                        this.target.renderRadialGradient(gradientBounds, gradient);
	                        break;
	                }
	            }
	        }
	    }, {
	        key: 'renderBorder',
	        value: function renderBorder(border, side, curvePoints) {
	            this.target.drawShape((0, _Bounds.parsePathForBorder)(curvePoints, side), border.borderColor);
	        }
	    }, {
	        key: 'renderStack',
	        value: function renderStack(stack) {
	            var _this4 = this;
	
	            if (stack.container.isVisible()) {
	                var _opacity = stack.getOpacity();
	                if (_opacity !== this._opacity) {
	                    this.target.setOpacity(stack.getOpacity());
	                    this._opacity = _opacity;
	                }
	
	                var _transform = stack.container.style.transform;
	                if (_transform !== null) {
	                    this.target.transform(stack.container.bounds.left + _transform.transformOrigin[0].value, stack.container.bounds.top + _transform.transformOrigin[1].value, _transform.transform, function () {
	                        return _this4.renderStackContent(stack);
	                    });
	                } else {
	                    this.renderStackContent(stack);
	                }
	            }
	        }
	    }, {
	        key: 'renderStackContent',
	        value: function renderStackContent(stack) {
	            var _splitStackingContext = splitStackingContexts(stack),
	                _splitStackingContext2 = _slicedToArray(_splitStackingContext, 5),
	                negativeZIndex = _splitStackingContext2[0],
	                zeroOrAutoZIndexOrTransformedOrOpacity = _splitStackingContext2[1],
	                positiveZIndex = _splitStackingContext2[2],
	                nonPositionedFloats = _splitStackingContext2[3],
	                nonPositionedInlineLevel = _splitStackingContext2[4];
	
	            var _splitDescendants = splitDescendants(stack),
	                _splitDescendants2 = _slicedToArray(_splitDescendants, 2),
	                inlineLevel = _splitDescendants2[0],
	                nonInlineLevel = _splitDescendants2[1];
	
	            // https://www.w3.org/TR/css-position-3/#painting-order
	            // 1. the background and borders of the element forming the stacking context.
	
	
	            this.renderNodeBackgroundAndBorders(stack.container);
	            // 2. the child stacking contexts with negative stack levels (most negative first).
	            negativeZIndex.sort(sortByZIndex).forEach(this.renderStack, this);
	            // 3. For all its in-flow, non-positioned, block-level descendants in tree order:
	            this.renderNodeContent(stack.container);
	            nonInlineLevel.forEach(this.renderNode, this);
	            // 4. All non-positioned floating descendants, in tree order. For each one of these,
	            // treat the element as if it created a new stacking context, but any positioned descendants and descendants
	            // which actually create a new stacking context should be considered part of the parent stacking context,
	            // not this new one.
	            nonPositionedFloats.forEach(this.renderStack, this);
	            // 5. the in-flow, inline-level, non-positioned descendants, including inline tables and inline blocks.
	            nonPositionedInlineLevel.forEach(this.renderStack, this);
	            inlineLevel.forEach(this.renderNode, this);
	            // 6. All positioned, opacity or transform descendants, in tree order that fall into the following categories:
	            //  All positioned descendants with 'z-index: auto' or 'z-index: 0', in tree order.
	            //  For those with 'z-index: auto', treat the element as if it created a new stacking context,
	            //  but any positioned descendants and descendants which actually create a new stacking context should be
	            //  considered part of the parent stacking context, not this new one. For those with 'z-index: 0',
	            //  treat the stacking context generated atomically.
	            //
	            //  All opacity descendants with opacity less than 1
	            //
	            //  All transform descendants with transform other than none
	            zeroOrAutoZIndexOrTransformedOrOpacity.forEach(this.renderStack, this);
	            // 7. Stacking contexts formed by positioned descendants with z-indices greater than or equal to 1 in z-index
	            // order (smallest first) then tree order.
	            positiveZIndex.sort(sortByZIndex).forEach(this.renderStack, this);
	        }
	    }, {
	        key: 'render',
	        value: function render(stack) {
	            var _this5 = this;
	
	            if (this.options.backgroundColor) {
	                this.target.rectangle(this.options.x, this.options.y, this.options.width, this.options.height, this.options.backgroundColor);
	            }
	            this.renderStack(stack);
	            var target = this.target.getTarget();
	            if (false) {
	                return target.then(function (output) {
	                    _this5.options.logger.log('Render completed');
	                    return output;
	                });
	            }
	            return target;
	        }
	    }]);
	
	    return Renderer;
	}();
	
	exports.default = Renderer;
	
	
	var splitDescendants = function splitDescendants(stack) {
	    var inlineLevel = [];
	    var nonInlineLevel = [];
	
	    var length = stack.children.length;
	    for (var i = 0; i < length; i++) {
	        var child = stack.children[i];
	        if (child.isInlineLevel()) {
	            inlineLevel.push(child);
	        } else {
	            nonInlineLevel.push(child);
	        }
	    }
	    return [inlineLevel, nonInlineLevel];
	};
	
	var splitStackingContexts = function splitStackingContexts(stack) {
	    var negativeZIndex = [];
	    var zeroOrAutoZIndexOrTransformedOrOpacity = [];
	    var positiveZIndex = [];
	    var nonPositionedFloats = [];
	    var nonPositionedInlineLevel = [];
	    var length = stack.contexts.length;
	    for (var i = 0; i < length; i++) {
	        var child = stack.contexts[i];
	        if (child.container.isPositioned() || child.container.style.opacity < 1 || child.container.isTransformed()) {
	            if (child.container.style.zIndex.order < 0) {
	                negativeZIndex.push(child);
	            } else if (child.container.style.zIndex.order > 0) {
	                positiveZIndex.push(child);
	            } else {
	                zeroOrAutoZIndexOrTransformedOrOpacity.push(child);
	            }
	        } else {
	            if (child.container.isFloating()) {
	                nonPositionedFloats.push(child);
	            } else {
	                nonPositionedInlineLevel.push(child);
	            }
	        }
	    }
	    return [negativeZIndex, zeroOrAutoZIndexOrTransformedOrOpacity, positiveZIndex, nonPositionedFloats, nonPositionedInlineLevel];
	};
	
	var sortByZIndex = function sortByZIndex(a, b) {
	    if (a.container.style.zIndex.order > b.container.style.zIndex.order) {
	        return 1;
	    } else if (a.container.style.zIndex.order < b.container.style.zIndex.order) {
	        return -1;
	    }
	
	    return a.container.index > b.container.index ? 1 : -1;
	};

/***/ }),

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ResourceStore = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Feature = __webpack_require__(40);
	
	var _Feature2 = _interopRequireDefault(_Feature);
	
	var _Proxy = __webpack_require__(80);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ResourceLoader = function () {
	    function ResourceLoader(options, logger, window) {
	        _classCallCheck(this, ResourceLoader);
	
	        this.options = options;
	        this._window = window;
	        this.origin = this.getOrigin(window.location.href);
	        this.cache = {};
	        this.logger = logger;
	        this._index = 0;
	    }
	
	    _createClass(ResourceLoader, [{
	        key: 'loadImage',
	        value: function loadImage(src) {
	            var _this = this;
	
	            if (this.hasResourceInCache(src)) {
	                return src;
	            }
	
	            if (!isSVG(src) || _Feature2.default.SUPPORT_SVG_DRAWING) {
	                if (this.options.allowTaint === true || isInlineImage(src) || this.isSameOrigin(src)) {
	                    return this.addImage(src, src, false);
	                } else if (!this.isSameOrigin(src)) {
	                    if (typeof this.options.proxy === 'string') {
	                        this.cache[src] = (0, _Proxy.Proxy)(src, this.options).then(function (src) {
	                            return _loadImage(src, _this.options.imageTimeout || 0);
	                        });
	                        return src;
	                    } else if (this.options.useCORS === true && _Feature2.default.SUPPORT_CORS_IMAGES) {
	                        return this.addImage(src, src, true);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'inlineImage',
	        value: function inlineImage(src) {
	            var _this2 = this;
	
	            if (isInlineImage(src)) {
	                return _loadImage(src, this.options.imageTimeout || 0);
	            }
	            if (this.hasResourceInCache(src)) {
	                return this.cache[src];
	            }
	            if (!this.isSameOrigin(src) && typeof this.options.proxy === 'string') {
	                return this.cache[src] = (0, _Proxy.Proxy)(src, this.options).then(function (src) {
	                    return _loadImage(src, _this2.options.imageTimeout || 0);
	                });
	            }
	
	            return this.xhrImage(src);
	        }
	    }, {
	        key: 'xhrImage',
	        value: function xhrImage(src) {
	            var _this3 = this;
	
	            this.cache[src] = new Promise(function (resolve, reject) {
	                var xhr = new XMLHttpRequest();
	                xhr.onreadystatechange = function () {
	                    if (xhr.readyState === 4) {
	                        if (xhr.status !== 200) {
	                            reject('Failed to fetch image ' + src.substring(0, 256) + ' with status code ' + xhr.status);
	                        } else {
	                            var reader = new FileReader();
	                            reader.addEventListener('load', function () {
	                                // $FlowFixMe
	                                var result = reader.result;
	                                resolve(result);
	                            }, false);
	                            reader.addEventListener('error', function (e) {
	                                return reject(e);
	                            }, false);
	                            reader.readAsDataURL(xhr.response);
	                        }
	                    }
	                };
	                xhr.responseType = 'blob';
	                if (_this3.options.imageTimeout) {
	                    var timeout = _this3.options.imageTimeout;
	                    xhr.timeout = timeout;
	                    xhr.ontimeout = function () {
	                        return reject( false ? 'Timed out (' + timeout + 'ms) fetching ' + src.substring(0, 256) : '');
	                    };
	                }
	                xhr.open('GET', src, true);
	                xhr.send();
	            }).then(function (src) {
	                return _loadImage(src, _this3.options.imageTimeout || 0);
	            });
	
	            return this.cache[src];
	        }
	    }, {
	        key: 'loadCanvas',
	        value: function loadCanvas(node) {
	            var key = String(this._index++);
	            this.cache[key] = Promise.resolve(node);
	            return key;
	        }
	    }, {
	        key: 'hasResourceInCache',
	        value: function hasResourceInCache(key) {
	            return typeof this.cache[key] !== 'undefined';
	        }
	    }, {
	        key: 'addImage',
	        value: function addImage(key, src, useCORS) {
	            var _this4 = this;
	
	            if (false) {
	                this.logger.log('Added image ' + key.substring(0, 256));
	            }
	
	            var imageLoadHandler = function imageLoadHandler(supportsDataImages) {
	                return new Promise(function (resolve, reject) {
	                    var img = new Image();
	                    img.onload = function () {
	                        return resolve(img);
	                    };
	                    //ios safari 10.3 taints canvas with data urls unless crossOrigin is set to anonymous
	                    if (!supportsDataImages || useCORS) {
	                        img.crossOrigin = 'anonymous';
	                    }
	
	                    img.onerror = reject;
	                    img.src = src;
	                    if (img.complete === true) {
	                        // Inline XML images may fail to parse, throwing an Error later on
	                        setTimeout(function () {
	                            resolve(img);
	                        }, 500);
	                    }
	                    if (_this4.options.imageTimeout) {
	                        var timeout = _this4.options.imageTimeout;
	                        setTimeout(function () {
	                            return reject( false ? 'Timed out (' + timeout + 'ms) fetching ' + src.substring(0, 256) : '');
	                        }, timeout);
	                    }
	                });
	            };
	
	            this.cache[key] = isInlineBase64Image(src) && !isSVG(src) ? // $FlowFixMe
	            _Feature2.default.SUPPORT_BASE64_DRAWING(src).then(imageLoadHandler) : imageLoadHandler(true);
	            return key;
	        }
	    }, {
	        key: 'isSameOrigin',
	        value: function isSameOrigin(url) {
	            return this.getOrigin(url) === this.origin;
	        }
	    }, {
	        key: 'getOrigin',
	        value: function getOrigin(url) {
	            var link = this._link || (this._link = this._window.document.createElement('a'));
	            link.href = url;
	            link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
	            return link.protocol + link.hostname + link.port;
	        }
	    }, {
	        key: 'ready',
	        value: function ready() {
	            var _this5 = this;
	
	            var keys = Object.keys(this.cache);
	            var values = keys.map(function (str) {
	                return _this5.cache[str].catch(function (e) {
	                    if (false) {
	                        _this5.logger.log('Unable to load image', e);
	                    }
	                    return null;
	                });
	            });
	            return Promise.all(values).then(function (images) {
	                if (false) {
	                    _this5.logger.log('Finished loading ' + images.length + ' images', images);
	                }
	                return new ResourceStore(keys, images);
	            });
	        }
	    }]);
	
	    return ResourceLoader;
	}();
	
	exports.default = ResourceLoader;
	
	var ResourceStore = exports.ResourceStore = function () {
	    function ResourceStore(keys, resources) {
	        _classCallCheck(this, ResourceStore);
	
	        this._keys = keys;
	        this._resources = resources;
	    }
	
	    _createClass(ResourceStore, [{
	        key: 'get',
	        value: function get(key) {
	            var index = this._keys.indexOf(key);
	            return index === -1 ? null : this._resources[index];
	        }
	    }]);
	
	    return ResourceStore;
	}();
	
	var INLINE_SVG = /^data:image\/svg\+xml/i;
	var INLINE_BASE64 = /^data:image\/.*;base64,/i;
	var INLINE_IMG = /^data:image\/.*/i;
	
	var isInlineImage = function isInlineImage(src) {
	    return INLINE_IMG.test(src);
	};
	var isInlineBase64Image = function isInlineBase64Image(src) {
	    return INLINE_BASE64.test(src);
	};
	
	var isSVG = function isSVG(src) {
	    return src.substr(-3).toLowerCase() === 'svg' || INLINE_SVG.test(src);
	};
	
	var _loadImage = function _loadImage(src, timeout) {
	    return new Promise(function (resolve, reject) {
	        var img = new Image();
	        img.onload = function () {
	            return resolve(img);
	        };
	        img.onerror = reject;
	        img.src = src;
	        if (img.complete === true) {
	            // Inline XML images may fail to parse, throwing an Error later on
	            setTimeout(function () {
	                resolve(img);
	            }, 500);
	        }
	        if (timeout) {
	            setTimeout(function () {
	                return reject( false ? 'Timed out (' + timeout + 'ms) loading image' : '');
	            }, timeout);
	        }
	    });
	};

/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _NodeContainer = __webpack_require__(41);
	
	var _NodeContainer2 = _interopRequireDefault(_NodeContainer);
	
	var _position = __webpack_require__(83);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var StackingContext = function () {
	    function StackingContext(container, parent, treatAsRealStackingContext) {
	        _classCallCheck(this, StackingContext);
	
	        this.container = container;
	        this.parent = parent;
	        this.contexts = [];
	        this.children = [];
	        this.treatAsRealStackingContext = treatAsRealStackingContext;
	    }
	
	    _createClass(StackingContext, [{
	        key: 'getOpacity',
	        value: function getOpacity() {
	            return this.parent ? this.container.style.opacity * this.parent.getOpacity() : this.container.style.opacity;
	        }
	    }, {
	        key: 'getRealParentStackingContext',
	        value: function getRealParentStackingContext() {
	            return !this.parent || this.treatAsRealStackingContext ? this : this.parent.getRealParentStackingContext();
	        }
	    }]);
	
	    return StackingContext;
	}();
	
	exports.default = StackingContext;

/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.renderElement = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _Logger = __webpack_require__(79);
	
	var _Logger2 = _interopRequireDefault(_Logger);
	
	var _NodeParser = __webpack_require__(145);
	
	var _Renderer = __webpack_require__(146);
	
	var _Renderer2 = _interopRequireDefault(_Renderer);
	
	var _ForeignObjectRenderer = __webpack_require__(86);
	
	var _ForeignObjectRenderer2 = _interopRequireDefault(_ForeignObjectRenderer);
	
	var _Feature = __webpack_require__(40);
	
	var _Feature2 = _interopRequireDefault(_Feature);
	
	var _Bounds = __webpack_require__(11);
	
	var _Clone = __webpack_require__(143);
	
	var _Font = __webpack_require__(77);
	
	var _Color = __webpack_require__(12);
	
	var _Color2 = _interopRequireDefault(_Color);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var renderElement = exports.renderElement = function renderElement(element, options, logger) {
	    var ownerDocument = element.ownerDocument;
	
	    var windowBounds = new _Bounds.Bounds(options.scrollX, options.scrollY, options.windowWidth, options.windowHeight);
	
	    // http://www.w3.org/TR/css3-background/#special-backgrounds
	    var documentBackgroundColor = ownerDocument.documentElement ? new _Color2.default(getComputedStyle(ownerDocument.documentElement).backgroundColor) : _Color.TRANSPARENT;
	    var bodyBackgroundColor = ownerDocument.body ? new _Color2.default(getComputedStyle(ownerDocument.body).backgroundColor) : _Color.TRANSPARENT;
	
	    var backgroundColor = element === ownerDocument.documentElement ? documentBackgroundColor.isTransparent() ? bodyBackgroundColor.isTransparent() ? options.backgroundColor ? new _Color2.default(options.backgroundColor) : null : bodyBackgroundColor : documentBackgroundColor : options.backgroundColor ? new _Color2.default(options.backgroundColor) : null;
	
	    return (options.foreignObjectRendering ? // $FlowFixMe
	    _Feature2.default.SUPPORT_FOREIGNOBJECT_DRAWING : Promise.resolve(false)).then(function (supportForeignObject) {
	        return supportForeignObject ? function (cloner) {
	            if (false) {
	                logger.log('Document cloned, using foreignObject rendering');
	            }
	
	            return cloner.inlineFonts(ownerDocument).then(function () {
	                return cloner.resourceLoader.ready();
	            }).then(function () {
	                var renderer = new _ForeignObjectRenderer2.default(cloner.documentElement);
	                return renderer.render({
	                    backgroundColor: backgroundColor,
	                    logger: logger,
	                    scale: options.scale,
	                    x: options.x,
	                    y: options.y,
	                    width: options.width,
	                    height: options.height,
	                    windowWidth: options.windowWidth,
	                    windowHeight: options.windowHeight,
	                    scrollX: options.scrollX,
	                    scrollY: options.scrollY
	                });
	            });
	        }(new _Clone.DocumentCloner(element, options, logger, true, renderElement)) : (0, _Clone.cloneWindow)(ownerDocument, windowBounds, element, options, logger, renderElement).then(function (_ref) {
	            var _ref2 = _slicedToArray(_ref, 3),
	                container = _ref2[0],
	                clonedElement = _ref2[1],
	                resourceLoader = _ref2[2];
	
	            if (false) {
	                logger.log('Document cloned, using computed rendering');
	            }
	
	            var stack = (0, _NodeParser.NodeParser)(clonedElement, resourceLoader, logger);
	            var clonedDocument = clonedElement.ownerDocument;
	
	            if (backgroundColor === stack.container.style.background.backgroundColor) {
	                stack.container.style.background.backgroundColor = _Color.TRANSPARENT;
	            }
	
	            return resourceLoader.ready().then(function (imageStore) {
	                if (options.removeContainer === true) {
	                    if (container.parentNode) {
	                        container.parentNode.removeChild(container);
	                    } else if (false) {
	                        logger.log('Cannot detach cloned iframe as it is not in the DOM anymore');
	                    }
	                }
	
	                var fontMetrics = new _Font.FontMetrics(clonedDocument);
	                if (false) {
	                    logger.log('Starting renderer');
	                }
	
	                var renderOptions = {
	                    backgroundColor: backgroundColor,
	                    fontMetrics: fontMetrics,
	                    imageStore: imageStore,
	                    logger: logger,
	                    scale: options.scale,
	                    x: options.x,
	                    y: options.y,
	                    width: options.width,
	                    height: options.height
	                };
	
	                if (Array.isArray(options.target)) {
	                    return Promise.all(options.target.map(function (target) {
	                        var renderer = new _Renderer2.default(target, renderOptions);
	                        return renderer.render(stack);
	                    }));
	                } else {
	                    var renderer = new _Renderer2.default(options.target, renderOptions);
	                    return renderer.render(stack);
	                }
	            });
	        });
	    });
	};

/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Path = __webpack_require__(42);
	
	var _Vector = __webpack_require__(43);
	
	var _Vector2 = _interopRequireDefault(_Vector);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var lerp = function lerp(a, b, t) {
	    return new _Vector2.default(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
	};
	
	var BezierCurve = function () {
	    function BezierCurve(start, startControl, endControl, end) {
	        _classCallCheck(this, BezierCurve);
	
	        this.type = _Path.PATH.BEZIER_CURVE;
	        this.start = start;
	        this.startControl = startControl;
	        this.endControl = endControl;
	        this.end = end;
	    }
	
	    _createClass(BezierCurve, [{
	        key: 'subdivide',
	        value: function subdivide(t, firstHalf) {
	            var ab = lerp(this.start, this.startControl, t);
	            var bc = lerp(this.startControl, this.endControl, t);
	            var cd = lerp(this.endControl, this.end, t);
	            var abbc = lerp(ab, bc, t);
	            var bccd = lerp(bc, cd, t);
	            var dest = lerp(abbc, bccd, t);
	            return firstHalf ? new BezierCurve(this.start, ab, abbc, dest) : new BezierCurve(dest, bccd, cd, this.end);
	        }
	    }, {
	        key: 'reverse',
	        value: function reverse() {
	            return new BezierCurve(this.end, this.endControl, this.startControl, this.start);
	        }
	    }]);
	
	    return BezierCurve;
	}();
	
	exports.default = BezierCurve;

/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Path = __webpack_require__(42);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Circle = function Circle(x, y, radius) {
	    _classCallCheck(this, Circle);
	
	    this.type = _Path.PATH.CIRCLE;
	    this.x = x;
	    this.y = y;
	    this.radius = radius;
	    if (false) {
	        if (isNaN(x)) {
	            console.error('Invalid x value given for Circle');
	        }
	        if (isNaN(y)) {
	            console.error('Invalid y value given for Circle');
	        }
	        if (isNaN(radius)) {
	            console.error('Invalid radius value given for Circle');
	        }
	    }
	};
	
	exports.default = Circle;

/***/ }),

/***/ 152:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Size = function Size(width, height) {
	    _classCallCheck(this, Size);
	
	    this.width = width;
	    this.height = height;
	};
	
	exports.default = Size;

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _CanvasRenderer = __webpack_require__(85);
	
	var _CanvasRenderer2 = _interopRequireDefault(_CanvasRenderer);
	
	var _Logger = __webpack_require__(79);
	
	var _Logger2 = _interopRequireDefault(_Logger);
	
	var _Window = __webpack_require__(149);
	
	var _Bounds = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var html2canvas = function html2canvas(element, conf) {
	    // eslint-disable-next-line no-console
	    if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) === 'object' && typeof console.log === 'function') {
	        // eslint-disable-next-line no-console
	        console.log('html2canvas ' + "$npm_package_version");
	    }
	
	    var config = conf || {};
	    var logger = new _Logger2.default(typeof config.logging === 'boolean' ? config.logging : true);
	
	    if (false) {
	        logger.error('onrendered option is deprecated, html2canvas returns a Promise with the canvas as the value');
	    }
	
	    var ownerDocument = element.ownerDocument;
	    if (!ownerDocument) {
	        return Promise.reject('Provided element is not within a Document');
	    }
	    var defaultView = ownerDocument.defaultView;
	
	    var scrollX = defaultView.pageXOffset;
	    var scrollY = defaultView.pageYOffset;
	
	    var isDocument = element.tagName === 'HTML' || element.tagName === 'BODY';
	
	    var _ref = isDocument ? (0, _Bounds.parseDocumentSize)(ownerDocument) : (0, _Bounds.parseBounds)(element, scrollX, scrollY),
	        width = _ref.width,
	        height = _ref.height,
	        left = _ref.left,
	        top = _ref.top;
	
	    var defaultOptions = {
	        async: true,
	        allowTaint: false,
	        backgroundColor: '#ffffff',
	        imageTimeout: 15000,
	        logging: true,
	        proxy: null,
	        removeContainer: true,
	        foreignObjectRendering: false,
	        scale: defaultView.devicePixelRatio || 1,
	        target: new _CanvasRenderer2.default(config.canvas),
	        x: left,
	        y: top,
	        width: Math.ceil(width),
	        height: Math.ceil(height),
	        windowWidth: defaultView.innerWidth,
	        windowHeight: defaultView.innerHeight,
	        scrollX: defaultView.pageXOffset,
	        scrollY: defaultView.pageYOffset
	    };
	
	    var result = (0, _Window.renderElement)(element, _extends({}, defaultOptions, config), logger);
	
	    if (false) {
	        return result.catch(function (e) {
	            logger.error(e);
	            throw e;
	        });
	    }
	    return result;
	};
	
	html2canvas.CanvasRenderer = _CanvasRenderer2.default;
	
	module.exports = html2canvas;

/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.parseBorderRadius = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _Length = __webpack_require__(18);
	
	var _Length2 = _interopRequireDefault(_Length);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SIDES = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];
	
	var parseBorderRadius = exports.parseBorderRadius = function parseBorderRadius(style) {
	    return SIDES.map(function (side) {
	        var value = style.getPropertyValue('border-' + side + '-radius');
	
	        var _value$split$map = value.split(' ').map(_Length2.default.create),
	            _value$split$map2 = _slicedToArray(_value$split$map, 2),
	            horizontal = _value$split$map2[0],
	            vertical = _value$split$map2[1];
	
	        return typeof vertical === 'undefined' ? [horizontal, horizontal] : [horizontal, vertical];
	    });
	};

/***/ }),

/***/ 155:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var DISPLAY = exports.DISPLAY = {
	    NONE: 1 << 0,
	    BLOCK: 1 << 1,
	    INLINE: 1 << 2,
	    RUN_IN: 1 << 3,
	    FLOW: 1 << 4,
	    FLOW_ROOT: 1 << 5,
	    TABLE: 1 << 6,
	    FLEX: 1 << 7,
	    GRID: 1 << 8,
	    RUBY: 1 << 9,
	    SUBGRID: 1 << 10,
	    LIST_ITEM: 1 << 11,
	    TABLE_ROW_GROUP: 1 << 12,
	    TABLE_HEADER_GROUP: 1 << 13,
	    TABLE_FOOTER_GROUP: 1 << 14,
	    TABLE_ROW: 1 << 15,
	    TABLE_CELL: 1 << 16,
	    TABLE_COLUMN_GROUP: 1 << 17,
	    TABLE_COLUMN: 1 << 18,
	    TABLE_CAPTION: 1 << 19,
	    RUBY_BASE: 1 << 20,
	    RUBY_TEXT: 1 << 21,
	    RUBY_BASE_CONTAINER: 1 << 22,
	    RUBY_TEXT_CONTAINER: 1 << 23,
	    CONTENTS: 1 << 24,
	    INLINE_BLOCK: 1 << 25,
	    INLINE_LIST_ITEM: 1 << 26,
	    INLINE_TABLE: 1 << 27,
	    INLINE_FLEX: 1 << 28,
	    INLINE_GRID: 1 << 29
	};
	
	var parseDisplayValue = function parseDisplayValue(display) {
	    switch (display) {
	        case 'block':
	            return DISPLAY.BLOCK;
	        case 'inline':
	            return DISPLAY.INLINE;
	        case 'run-in':
	            return DISPLAY.RUN_IN;
	        case 'flow':
	            return DISPLAY.FLOW;
	        case 'flow-root':
	            return DISPLAY.FLOW_ROOT;
	        case 'table':
	            return DISPLAY.TABLE;
	        case 'flex':
	            return DISPLAY.FLEX;
	        case 'grid':
	            return DISPLAY.GRID;
	        case 'ruby':
	            return DISPLAY.RUBY;
	        case 'subgrid':
	            return DISPLAY.SUBGRID;
	        case 'list-item':
	            return DISPLAY.LIST_ITEM;
	        case 'table-row-group':
	            return DISPLAY.TABLE_ROW_GROUP;
	        case 'table-header-group':
	            return DISPLAY.TABLE_HEADER_GROUP;
	        case 'table-footer-group':
	            return DISPLAY.TABLE_FOOTER_GROUP;
	        case 'table-row':
	            return DISPLAY.TABLE_ROW;
	        case 'table-cell':
	            return DISPLAY.TABLE_CELL;
	        case 'table-column-group':
	            return DISPLAY.TABLE_COLUMN_GROUP;
	        case 'table-column':
	            return DISPLAY.TABLE_COLUMN;
	        case 'table-caption':
	            return DISPLAY.TABLE_CAPTION;
	        case 'ruby-base':
	            return DISPLAY.RUBY_BASE;
	        case 'ruby-text':
	            return DISPLAY.RUBY_TEXT;
	        case 'ruby-base-container':
	            return DISPLAY.RUBY_BASE_CONTAINER;
	        case 'ruby-text-container':
	            return DISPLAY.RUBY_TEXT_CONTAINER;
	        case 'contents':
	            return DISPLAY.CONTENTS;
	        case 'inline-block':
	            return DISPLAY.INLINE_BLOCK;
	        case 'inline-list-item':
	            return DISPLAY.INLINE_LIST_ITEM;
	        case 'inline-table':
	            return DISPLAY.INLINE_TABLE;
	        case 'inline-flex':
	            return DISPLAY.INLINE_FLEX;
	        case 'inline-grid':
	            return DISPLAY.INLINE_GRID;
	    }
	
	    return DISPLAY.NONE;
	};
	
	var setDisplayBit = function setDisplayBit(bit, display) {
	    return bit | parseDisplayValue(display);
	};
	
	var parseDisplay = exports.parseDisplay = function parseDisplay(display) {
	    return display.split(' ').reduce(setDisplayBit, 0);
	};

/***/ }),

/***/ 156:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var FLOAT = exports.FLOAT = {
	    NONE: 0,
	    LEFT: 1,
	    RIGHT: 2,
	    INLINE_START: 3,
	    INLINE_END: 4
	};
	
	var parseCSSFloat = exports.parseCSSFloat = function parseCSSFloat(float) {
	    switch (float) {
	        case 'left':
	            return FLOAT.LEFT;
	        case 'right':
	            return FLOAT.RIGHT;
	        case 'inline-start':
	            return FLOAT.INLINE_START;
	        case 'inline-end':
	            return FLOAT.INLINE_END;
	    }
	    return FLOAT.NONE;
	};

/***/ }),

/***/ 157:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	
	var parseFontWeight = function parseFontWeight(weight) {
	    switch (weight) {
	        case 'normal':
	            return 400;
	        case 'bold':
	            return 700;
	    }
	
	    var value = parseInt(weight, 10);
	    return isNaN(value) ? 400 : value;
	};
	
	var parseFont = exports.parseFont = function parseFont(style) {
	    var fontFamily = style.fontFamily;
	    var fontSize = style.fontSize;
	    var fontStyle = style.fontStyle;
	    var fontVariant = style.fontVariant;
	    var fontWeight = parseFontWeight(style.fontWeight);
	
	    return {
	        fontFamily: fontFamily,
	        fontSize: fontSize,
	        fontStyle: fontStyle,
	        fontVariant: fontVariant,
	        fontWeight: fontWeight
	    };
	};

/***/ }),

/***/ 158:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var parseLetterSpacing = exports.parseLetterSpacing = function parseLetterSpacing(letterSpacing) {
	    if (letterSpacing === 'normal') {
	        return 0;
	    }
	    var value = parseFloat(letterSpacing);
	    return isNaN(value) ? 0 : value;
	};

/***/ }),

/***/ 159:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var OVERFLOW = exports.OVERFLOW = {
	    VISIBLE: 0,
	    HIDDEN: 1,
	    SCROLL: 2,
	    AUTO: 3
	};
	
	var parseOverflow = exports.parseOverflow = function parseOverflow(overflow) {
	    switch (overflow) {
	        case 'hidden':
	            return OVERFLOW.HIDDEN;
	        case 'scroll':
	            return OVERFLOW.SCROLL;
	        case 'auto':
	            return OVERFLOW.AUTO;
	        case 'visible':
	        default:
	            return OVERFLOW.VISIBLE;
	    }
	};

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.parseTextShadow = undefined;
	
	var _Color = __webpack_require__(12);
	
	var _Color2 = _interopRequireDefault(_Color);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NUMBER = /^([+-]|\d|\.)$/i;
	
	var parseTextShadow = exports.parseTextShadow = function parseTextShadow(textShadow) {
	    if (textShadow === 'none' || typeof textShadow !== 'string') {
	        return null;
	    }
	
	    var currentValue = '';
	    var isLength = false;
	    var values = [];
	    var shadows = [];
	    var numParens = 0;
	    var color = null;
	
	    var appendValue = function appendValue() {
	        if (currentValue.length) {
	            if (isLength) {
	                values.push(parseFloat(currentValue));
	            } else {
	                color = new _Color2.default(currentValue);
	            }
	        }
	        isLength = false;
	        currentValue = '';
	    };
	
	    var appendShadow = function appendShadow() {
	        if (values.length && color !== null) {
	            shadows.push({
	                color: color,
	                offsetX: values[0] || 0,
	                offsetY: values[1] || 0,
	                blur: values[2] || 0
	            });
	        }
	        values.splice(0, values.length);
	        color = null;
	    };
	
	    for (var i = 0; i < textShadow.length; i++) {
	        var c = textShadow[i];
	        switch (c) {
	            case '(':
	                currentValue += c;
	                numParens++;
	                break;
	            case ')':
	                currentValue += c;
	                numParens--;
	                break;
	            case ',':
	                if (numParens === 0) {
	                    appendValue();
	                    appendShadow();
	                } else {
	                    currentValue += c;
	                }
	                break;
	            case ' ':
	                if (numParens === 0) {
	                    appendValue();
	                } else {
	                    currentValue += c;
	                }
	                break;
	            default:
	                if (currentValue.length === 0 && NUMBER.test(c)) {
	                    isLength = true;
	                }
	                currentValue += c;
	        }
	    }
	
	    appendValue();
	    appendShadow();
	
	    if (shadows.length === 0) {
	        return null;
	    }
	
	    return shadows;
	};

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.parseTransform = undefined;
	
	var _Length = __webpack_require__(18);
	
	var _Length2 = _interopRequireDefault(_Length);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var toFloat = function toFloat(s) {
	    return parseFloat(s.trim());
	};
	
	var MATRIX = /(matrix|matrix3d)\((.+)\)/;
	
	var parseTransform = exports.parseTransform = function parseTransform(style) {
	    var transform = parseTransformMatrix(style.transform || style.webkitTransform || style.mozTransform ||
	    // $FlowFixMe
	    style.msTransform ||
	    // $FlowFixMe
	    style.oTransform);
	    if (transform === null) {
	        return null;
	    }
	
	    return {
	        transform: transform,
	        transformOrigin: parseTransformOrigin(style.transformOrigin || style.webkitTransformOrigin || style.mozTransformOrigin ||
	        // $FlowFixMe
	        style.msTransformOrigin ||
	        // $FlowFixMe
	        style.oTransformOrigin)
	    };
	};
	
	// $FlowFixMe
	var parseTransformOrigin = function parseTransformOrigin(origin) {
	    if (typeof origin !== 'string') {
	        var v = new _Length2.default('0');
	        return [v, v];
	    }
	    var values = origin.split(' ').map(_Length2.default.create);
	    return [values[0], values[1]];
	};
	
	// $FlowFixMe
	var parseTransformMatrix = function parseTransformMatrix(transform) {
	    if (transform === 'none' || typeof transform !== 'string') {
	        return null;
	    }
	
	    var match = transform.match(MATRIX);
	    if (match) {
	        if (match[1] === 'matrix') {
	            var matrix = match[2].split(',').map(toFloat);
	            return [matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]];
	        } else {
	            var matrix3d = match[2].split(',').map(toFloat);
	            return [matrix3d[0], matrix3d[1], matrix3d[4], matrix3d[5], matrix3d[12], matrix3d[13]];
	        }
	    }
	    return null;
	};

/***/ }),

/***/ 162:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var VISIBILITY = exports.VISIBILITY = {
	    VISIBLE: 0,
	    HIDDEN: 1,
	    COLLAPSE: 2
	};
	
	var parseVisibility = exports.parseVisibility = function parseVisibility(visibility) {
	    switch (visibility) {
	        case 'hidden':
	            return VISIBILITY.HIDDEN;
	        case 'collapse':
	            return VISIBILITY.COLLAPSE;
	        case 'visible':
	        default:
	            return VISIBILITY.VISIBLE;
	    }
	};

/***/ }),

/***/ 163:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var parseZIndex = exports.parseZIndex = function parseZIndex(zIndex) {
	    var auto = zIndex === 'auto';
	    return {
	        auto: auto,
	        order: auto ? 0 : parseInt(zIndex, 10)
	    };
	};

/***/ }),

/***/ 164:
/***/ (function(module, exports) {

	'use strict';
	
	/** Highest positive signed 32-bit float value */
	const maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
	
	/** Bootstring parameters */
	const base = 36;
	const tMin = 1;
	const tMax = 26;
	const skew = 38;
	const damp = 700;
	const initialBias = 72;
	const initialN = 128; // 0x80
	const delimiter = '-'; // '\x2D'
	
	/** Regular expressions */
	const regexPunycode = /^xn--/;
	const regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
	const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
	
	/** Error messages */
	const errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	};
	
	/** Convenience shortcuts */
	const baseMinusTMin = base - tMin;
	const floor = Math.floor;
	const stringFromCharCode = String.fromCharCode;
	
	/*--------------------------------------------------------------------------*/
	
	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}
	
	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		const result = [];
		let length = array.length;
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}
	
	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		const parts = string.split('@');
		let result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		const labels = string.split('.');
		const encoded = map(labels, fn).join('.');
		return result + encoded;
	}
	
	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		const output = [];
		let counter = 0;
		const length = string.length;
		while (counter < length) {
			const value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// It's a high surrogate, and there is a next character.
				const extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// It's an unmatched surrogate; only append this code unit, in case the
					// next code unit is the high surrogate of a surrogate pair.
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}
	
	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	const ucs2encode = array => String.fromCodePoint(...array);
	
	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	const basicToDigit = function(codePoint) {
		if (codePoint - 0x30 < 0x0A) {
			return codePoint - 0x16;
		}
		if (codePoint - 0x41 < 0x1A) {
			return codePoint - 0x41;
		}
		if (codePoint - 0x61 < 0x1A) {
			return codePoint - 0x61;
		}
		return base;
	};
	
	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	const digitToBasic = function(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	};
	
	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	const adapt = function(delta, numPoints, firstTime) {
		let k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	};
	
	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	const decode = function(input) {
		// Don't use UCS-2.
		const output = [];
		const inputLength = input.length;
		let i = 0;
		let n = initialN;
		let bias = initialBias;
	
		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.
	
		let basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}
	
		for (let j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}
	
		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.
	
		for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {
	
			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			let oldi = i;
			for (let w = 1, k = base; /* no condition */; k += base) {
	
				if (index >= inputLength) {
					error('invalid-input');
				}
	
				const digit = basicToDigit(input.charCodeAt(index++));
	
				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}
	
				i += digit * w;
				const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	
				if (digit < t) {
					break;
				}
	
				const baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}
	
				w *= baseMinusT;
	
			}
	
			const out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);
	
			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}
	
			n += floor(i / out);
			i %= out;
	
			// Insert `n` at position `i` of the output.
			output.splice(i++, 0, n);
	
		}
	
		return String.fromCodePoint(...output);
	};
	
	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	const encode = function(input) {
		const output = [];
	
		// Convert the input in UCS-2 to an array of Unicode code points.
		input = ucs2decode(input);
	
		// Cache the length.
		let inputLength = input.length;
	
		// Initialize the state.
		let n = initialN;
		let delta = 0;
		let bias = initialBias;
	
		// Handle the basic code points.
		for (const currentValue of input) {
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}
	
		let basicLength = output.length;
		let handledCPCount = basicLength;
	
		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.
	
		// Finish the basic string with a delimiter unless it's empty.
		if (basicLength) {
			output.push(delimiter);
		}
	
		// Main encoding loop:
		while (handledCPCount < inputLength) {
	
			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			let m = maxInt;
			for (const currentValue of input) {
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}
	
			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow.
			const handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}
	
			delta += (m - n) * handledCPCountPlusOne;
			n = m;
	
			for (const currentValue of input) {
				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}
				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer.
					let q = delta;
					for (let k = base; /* no condition */; k += base) {
						const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						const qMinusT = q - t;
						const baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}
	
					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}
	
			++delta;
			++n;
	
		}
		return output.join('');
	};
	
	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	const toUnicode = function(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	};
	
	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	const toASCII = function(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	};
	
	/*--------------------------------------------------------------------------*/
	
	/** Define the public API */
	const punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '2.1.0',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};
	
	module.exports = punycode;


/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _html2canvas = __webpack_require__(153);
	
	var _html2canvas2 = _interopRequireDefault(_html2canvas);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
		data: function data() {
			return {
				quality: 0.8,
				isUnUpload: true,
				isUpload: false,
				isRead: false,
				isPageOut: false,
				base64Img: null,
				htmlImg: "",
				scoreArray: [{
					minScore: 0,
					maxScore: 0.1,
					starNum: 5,
					starMsg: ["小心谨慎", "和蔼可亲", "多重性格"]
				}, {
					minScore: 0.1,
					maxScore: 0.12,
					starNum: 1,
					starMsg: ["表里如一", "心境纯粹", "大智若愚"]
				}, {
					minScore: 0.12,
					maxScore: 0.14,
					starNum: 2,
					starMsg: ["乐天达观", "善解人意", "聪明好学"]
				}, {
					minScore: 0.14,
					maxScore: 0.15,
					starNum: 3,
					starMsg: ["风趣幽默", "感情用事", "豪放不羁"]
				}, {
					minScore: 0.15,
					maxScore: 0.17,
					starNum: 4,
					starMsg: ["外表冷漠", "内心善良", "富正义感"]
				}, {
					minScore: 0.17,
					maxScore: 0.19,
					starNum: 5,
					starMsg: ["深谋远虑", "洞察锐利", "占有欲强"]
				}, {
					minScore: 0.19,
					maxScore: 0.2,
					starNum: 1,
					starMsg: ["纯净质朴", "内心平和", "向往自由"]
				}, {
					minScore: 0.2,
					maxScore: 0.22,
					starNum: 2,
					starMsg: ["感情脆弱", "同理心重", "不拘小节"]
				}, {
					minScore: 0.22,
					maxScore: 0.24,
					starNum: 3,
					starMsg: ["临机应变", "充满活力", "富于童心"]
				}, {
					minScore: 0.24,
					maxScore: 0.25,
					starNum: 4,
					starMsg: ["谦逊有礼", "内心丰富", "不善表达"]
				}, {
					minScore: 0.25,
					maxScore: 0.27,
					starNum: 5,
					starMsg: ["聪明机警", "善于推理", "追求挑战"]
				}, {
					minScore: 0.27,
					maxScore: 0.29,
					starNum: 1,
					starMsg: ["精力充沛", "崇尚调和", "理性公正"]
				}, {
					minScore: 0.29,
					maxScore: 0.3,
					starNum: 2,
					starMsg: ["坦白率真", "不受束缚", "富有野心"]
				}, {
					minScore: 0.3,
					maxScore: 0.32,
					starNum: 3,
					starMsg: ["足智多谋", "好奇心强", "能屈能伸"]
				}, {
					minScore: 0.32,
					maxScore: 0.34,
					starNum: 4,
					starMsg: ["善于倾听", "捉摸不定", "沉默寡言"]
				}, {
					minScore: 0.34,
					maxScore: 0.35,
					starNum: 5,
					starMsg: ["自尊心强", "条理清晰", "极富野心"]
				}, {
					minScore: 0.35,
					maxScore: 0.37,
					starNum: 1,
					starMsg: ["兴趣广泛", "脚踏实地", "个性单纯"]
				}, {
					minScore: 0.37,
					maxScore: 0.39,
					starNum: 2,
					starMsg: ["勤奋努力", "个性明朗", "亲切温暖"]
				}, {
					minScore: 0.39,
					maxScore: 0.4,
					starNum: 5,
					starMsg: ["谨慎谦虚", "创意十足", "眼光敏锐"]
				}, {
					minScore: 0.4,
					maxScore: 1000000,
					starNum: 4,
					starMsg: ["色彩敏感", "细腻入微", "情绪不定"]
				}]
			};
		},
		mounted: function mounted() {
			var self = this;
			console.log(document.body.clientWidth * 74 / 100);
			document.getElementsByClassName("starImg")[0].style.width = document.body.clientWidth * 74 / 100 + "px";
			document.getElementsByClassName("starImg")[0].style.height = document.body.clientWidth * 74 / 460 + "px";
			document.getElementsByClassName("starImg")[0].style.marginTop = -(document.body.clientWidth * 74 / 460) / 2 + "px";
		},
	
		methods: {
			goToUserInfo: function goToUserInfo() {
				var self = this;
	
				if (self.$route.query.isIndex == 0) {
					self.$router.push({
						path: "userinfo"
					});
				} else {
					self.$router.push({
						path: "ai",
						query: {
							isIndex: 1
						}
					});
				}
			},
			mashangtansuo: function mashangtansuo() {
				var self = this;
				var base64Img = self.base64Img;
				if (base64Img == null || base64Img == '') {
					self.toast("请上传自拍照");
					return false;
				}
				var index = base64Img.indexOf(",");
				var openid = window.localStorage.getItem('openid');
				if (index >= 0) {
					base64Img = base64Img.substr(index + 1);
				}
				self.isUnUpload = false;
				self.isUpload = true;
				self.$http.post("v1/em?action=compare&uid=" + openid, {
					base64: base64Img
				}).then(function (response) {
					console.log(response);
					if (response) {
						self.score(response);
					}
				}).catch(function (error) {
					console.log(error);
				});
			},
			score: function score(obj) {
				var self = this;
				var score = obj.data.score;
				var scoreIndex = null;
				self.isUpload = false;
				self.isRead = true;
				setTimeout(function () {
					self.isPageOut = true;
				}, 5000);
				self.scoreArray.forEach(function (element, index) {
					if (score >= element.minScore && score < element.maxScore) {
						scoreIndex = index;
					}
				});
				document.getElementsByClassName("score_1")[0].innerHTML = self.scoreArray[scoreIndex].starMsg[0];
				document.getElementsByClassName("score_2")[0].innerHTML = self.scoreArray[scoreIndex].starMsg[1];
				document.getElementsByClassName("score_3")[0].innerHTML = self.scoreArray[scoreIndex].starMsg[2];
				switch (self.scoreArray[scoreIndex].starNum) {
					case 1:
						document.getElementsByClassName("star")[0].style.width = "53%";
						break;
					case 2:
						document.getElementsByClassName("star")[0].style.width = "64%";
						break;
					case 3:
						document.getElementsByClassName("star")[0].style.width = "74%";
						break;
					case 4:
						document.getElementsByClassName("star")[0].style.width = "85%";
						break;
					case 5:
						document.getElementsByClassName("star")[0].style.width = "100%";
						break;
	
					default:
						break;
				}
			},
			start_upload: function start_upload(obj) {
				var self = this;
				self.compress(event, function (base64Img) {
					self.$refs.imgsss.src = base64Img;
					self.base64Img = base64Img;
				});
			},
			compress: function compress(event, callback) {
				var self = this;
				try {
					var file = event.currentTarget.files[0];
					if (!/image\/\w+/.test(file.type)) {
						alert("请确保文件为图像类型");
						return false;
					}
					var Orientation = null;
	
					EXIF.getData(file, function () {
						Orientation = EXIF.getTag(this, "Orientation");
					});
	
					var reader = new FileReader();
					reader.onload = function (e) {
						var img = new Image();
						img.onload = function () {
							var square = 750;
							var canvas = document.createElement("canvas");
							canvas.width = square;
							canvas.height = square;
							var context = canvas.getContext("2d");
							context.clearRect(0, 0, square, square);
							var imageWidth;
							var imageHeight;
							var offsetX = 0;
							var offsetY = 0;
	
							var base64 = null;
	
							if (navigator.userAgent.match(/iphone/i)) {
	
								if (Orientation != "" && Orientation != 1) {
									switch (Orientation) {
										case 6:
											self.rotateImg(this, "left", canvas);
											break;
										case 8:
											self.rotateImg(this, "right", canvas);
											break;
										case 3:
											self.rotateImg(this, "right", canvas);
											self.rotateImg(this, "right", canvas);
											break;
									}
								}
							}
							if (this.width > this.height) {
								imageWidth = Math.round(square * this.width / this.height);
								imageHeight = square;
								offsetX = -Math.round((imageWidth - square) / 2);
							} else {
								imageHeight = Math.round(square * this.height / this.width);
								imageWidth = square;
								offsetY = -Math.round((imageHeight - square) / 2);
							}
							context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);
							base64 = canvas.toDataURL("image/png", self.quality);
							callback && callback(base64);
						};
						img.src = e.target.result;
					};
					reader.readAsDataURL(file);
				} catch (e) {
					console.log("压缩失败!");
				}
			},
			rotateImg: function rotateImg(img, direction, canvas) {
				var min_step = 0;
				var max_step = 3;
	
				if (img == null) return;
	
				var height = img.height;
				var width = img.width;
	
				var step = 2;
				if (step == null) {
					step = min_step;
				}
				if (direction == "right") {
					step++;
	
					step > max_step && (step = min_step);
				} else {
					step--;
					step < min_step && (step = max_step);
				}
	
				var degree = step * 90 * Math.PI / 180;
				var ctx = canvas.getContext("2d");
				switch (step) {
					case 0:
						canvas.width = width;
						canvas.height = height;
						ctx.drawImage(img, 0, 0);
						break;
					case 1:
						canvas.width = height;
						canvas.height = width;
						ctx.rotate(degree);
						ctx.drawImage(img, 0, -height);
						break;
					case 2:
						canvas.width = width;
						canvas.height = height;
						ctx.rotate(degree);
						ctx.drawImage(img, -width, -height);
						break;
					case 3:
						canvas.width = height;
						canvas.height = width;
						ctx.rotate(degree);
						ctx.drawImage(img, -width, 0);
						break;
				}
			},
			jieping: function jieping(callback) {
				var _this = this;
	
				(0, _html2canvas2.default)(document.getElementById("app")).then(function (canvas) {
					var url = void 0;
					url = canvas.toDataURL();
					_this.htmlImg = url;
					callback();
				});
			}
		}
	};

/***/ }),

/***/ 509:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(39)();
	// imports
	
	
	// module
	exports.push([module.id, ".content[data-v-7bb0b274]{width:100%;height:100%;background-color:#000;overflow:hidden;position:relative}.content .html_img[data-v-7bb0b274]{width:100%;position:absolute;z-index:999}.content .zd-xh-box[data-v-7bb0b274]{width:80%;font-size:30px;text-align:center;color:#fff;font-weight:700;display:block;margin:auto;line-height:200px}.content .zd-xh-text-box[data-v-7bb0b274]{width:100%;position:relative;animation:fuxian 1s}.content .zd-xh-text[data-v-7bb0b274]{position:absolute;z-index:2;font-size:30px;color:#fff;font-weight:700;width:100%;display:inline-block;text-align:center;top:50%;transform:translateY(-50%)}.content .zd-xh-btn[data-v-7bb0b274]{width:20%;display:block;margin:auto;margin-bottom:3%;animation:fuxian1 1s linear infinite alternate}.content .zd-xh[data-v-7bb0b274]{width:100%;position:absolute;bottom:0;z-index:999}.content .bg[data-v-7bb0b274]{width:100%;height:100%;background:url(" + __webpack_require__(36) + ") 50%/cover;position:absolute;top:0;z-index:1}.content .score_box[data-v-7bb0b274]{animation:fuxian .5s linear;opacity:1;z-index:10;position:absolute;width:100%;height:100%}.content .stars[data-v-7bb0b274]{position:absolute;top:50%;margin-top:-25px;left:239px;height:56px;display:block;width:340px;overflow:hidden}.content .album[data-v-7bb0b274]{width:100%;position:absolute;top:12%;z-index:4}.content .album .score[data-v-7bb0b274]{width:300px;line-height:50px;border:2px solid #bb7753;border-radius:10px;color:#3bf6fe;text-shadow:0 0 10px #00fff9;background:rgba(0,0,0,.24);position:absolute;z-index:5;text-align:center;font-size:30px}.content .album .score_1[data-v-7bb0b274]{right:5%;top:21%}.content .album .score_2[data-v-7bb0b274]{left:4%;top:54%}.content .album .score_3[data-v-7bb0b274]{right:9%;top:74%}.content .album .album-content[data-v-7bb0b274]{position:absolute;height:70%;margin-left:-28.2%;width:56%;top:15%;left:50%;overflow:hidden;background:url(" + __webpack_require__(546) + ") no-repeat 50%/cover;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;font-size:32px}.content .album .album-content .title[data-v-7bb0b274]{color:#7ef9ff}.content .album .album-content .imgsss[data-v-7bb0b274],.content .album .album-content .upload[data-v-7bb0b274]{width:100%;height:100%;position:absolute;top:0;left:0}.content .album .album-content .upload[data-v-7bb0b274]{opacity:0;-webkit-opacity:0}.content .album .album-content .upload input[data-v-7bb0b274]{width:100%;height:100%;position:absolute;top:0;left:0}.content .album .waikuang[data-v-7bb0b274]{margin:auto;display:block;width:80%}.content .btns[data-v-7bb0b274]{width:100%;position:absolute;bottom:10%;z-index:4}.content .btns .btn1[data-v-7bb0b274]{width:50%;display:block;margin:auto}.content .sb-btn[data-v-7bb0b274]{width:74%;position:absolute;z-index:4;top:70%;opacity:0;margin-top:-40px;left:13%;animation:fuxian .5s linear}.content .sb-btn .btn1[data-v-7bb0b274]{width:100%;display:block;margin:auto}.content .sb-btn .star[data-v-7bb0b274]{width:100%;height:100%;padding:0;overflow:hidden;position:absolute;top:0;box-sizing:border-box}.content .sb-btn .star img[data-v-7bb0b274]{position:relative;top:50%}.content .sb-btn .is-cs[data-v-7bb0b274]{text-align:center}.content .sb-btn .is-cs[data-v-7bb0b274],.content .sb-btn .is-read[data-v-7bb0b274]{position:absolute;color:#68faff;width:100%;line-height:42px;top:50%;margin-top:-21px;font-size:42px}.content .sb-btn .is-read[data-v-7bb0b274]{text-align:left;padding-left:42px}.content .logo[data-v-7bb0b274]{width:26%;position:absolute;top:20px;right:20px;z-index:2}.content .upload-end[data-v-7bb0b274]{position:absolute;height:70%;margin-left:-28.2%;width:56%;top:15%;left:50%;overflow:hidden}.content .upload-end img[data-v-7bb0b274]{top:0;width:100%;position:absolute}.content .saomiao-animate[data-v-7bb0b274]{animation:toprun 3s linear infinite alternate}@keyframes toprun{0%{transform:translateY(100%)}to{transform:translate(0)}}@keyframes fuxian{0%{opacity:0}to{opacity:1}}@keyframes fuxian1{0%{opacity:.4}to{opacity:1}}.content .animated[data-v-7bb0b274]{animation-fill-mode:forwards}.content .cntu[data-v-7bb0b274]{width:100%;bottom:0;position:absolute;z-index:2;animation:fuxian .5s}", ""]);
	
	// exports


/***/ }),

/***/ 519:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(509);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(47)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7bb0b274&scoped=true!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ImageRecognition.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7bb0b274&scoped=true!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ImageRecognition.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 534:
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAACwCAMAAABn2BtWAAABFFBMVEUAAAB++f9++f9++f9++f////9++f////////////////9++f9++f9++f9++f9++f9++f9++f9++f9++f9++f9++f////////////////////////////////////////////////////////8AAACDg4MICAja2tqYmJjr6+vg4ODU1NSfn59TU1OKiopZWVkxMTHOzs66uro3Nzf39/e0tLQZGRmsrKyRkZFMTEzn5+fBwcH8/Pw+Pj4rKytFRUUfHx/IyMimpqZgYGB2dnZtbW0lJSUTExPY2Njy8vJwcHBmZmbu7u6MjIyBgYHExMSvr697e3vc3NwODg69vb2ioqJISEhCQkLj4+Obm5s7OzuoqKgHcUy0AAAAI3RSTlMAZk0zGmZgM/EaTQZTEyYNQFotOkYgYFoGDUAmE1MgRjot5JOoQFQAAB4oSURBVHja7NvbbtpAFIXhXvIc3cvYxgcCGCdQakw4p6RQFAeSvP97dDbjEEpQ7yoZdX0XM+PJ4erXyNLAFyIiIiIiIiIiIiIiIiIiIiIiIiIiIjr1Vf6NL0TVIxZzp/9BTdbOuZW0dNqIsXCcvbj6eC9y7xRi3TrvWrJyzq2ZO1VSTaY4F0gM41WMAljLLYyZyAy5WDd4F0uAc1PmTpVUEweonwJcKXRqiiTJW73+Ldno4y5JdnhNkoEYEZT+ZSHup3/gMHeqJM29vvA/PGruie/PNPfdvOn7u3nk+x3U5/O6Du2T3Ge+n2juj/6HRZ25U0UdcpcTheZu3GjuuQ4dDHX1Ljx5memI4QKFnGDuVFWH3H0ZxdZSvDL3DE2tOovjHD0RbxIB0cQIxCgmYxhpHAeauyfL2BqJz9ypqsrcJ7DcY+45ouMhvhNjX/6gtIT1aHN3YU2YO1VXmXsMq1HmPhiUp/tBTze6QNvMSowWrNDm3oAVM3eqrsu5v6Xpur/S3Ht9w6yidK65j1KjV+bu9Z+YO12Ty7k7OhivaIqVAZr7BsZN+TLTlT5zp2tyOffRdNqXxd1dikjk7a4r8t3mvp1Oc+R3xgS4l4C50zUpc3f+zP3gBYDmPtfjvANjLUaEdxvZfsrdYe5UXZdP94P7MvcOeuXp/iRGDxZPd7o6Ze7LhjU45j7Mx41GZnOv5/mm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"

/***/ }),

/***/ 543:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/img/querenceshi.dbed5ea.png";

/***/ }),

/***/ 544:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/img/redbtn.b82d5d5.png";

/***/ }),

/***/ 545:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/img/renlianshibiekuangdeng.912d454.png";

/***/ }),

/***/ 546:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/img/renlianshibierenlian.43b33f5.png";

/***/ }),

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/img/saomiao.c7c4325.png";

/***/ }),

/***/ 549:
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 550:
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkgAAACSCAMAAACJ+sX9AAAAaVBMVEUDERgAAAC++/oRx8kRx8kEHCMRx8kRx8kIUVYGNDoRx8kRx8kRx8kDFRwRx8kRx8kRx8kRx8kGLDMRx8kRx8kEJSwIR00HOkARx8kRx8kKZmsJWV8Rx8kMeX0AzegG3O8I4fIE2O0C0uvTrdtJAAAAHnRSTlOmAOYgC6ljQryxBg4DqBk6NCiwPxSsubReTsXAV86Waw6oAAAEF0lEQVR42uzcS46jMABFUWhDQkzAgPkmKRLY/yLbJiqpuxTyoSaWfM8ICc+4YuYXhOFRShk9YV4fQ3jrvT4Ccy6tc/FEXqeU5K83+wjMubwslN6v0Kooc0ry1rt9BPacHvrdmv4yqDKPCMlTxygv1XB5EsigbUmBrEv954VCpDKEl2Qqild96LI2IeXF8OqgEjUheUrWQr3qYyhyGURC9fyR8Js/Uq9EZELSO/N8u92uK6Zpnkd4a56n6brCZGPi2eklpP0S0tfpnDzUtl3VxFkAL2VxU3Vtmzx0Pn0tIe3/CemUdIeHKpMRHfkri01K1eGhLjn9DOl67pp4RZbRkcfM549XNN35+jOk5BAHwEfiQ0JIICQ4gpBASHAHIYGQ4A5CAiHBHYQEQoI7CAmEBHcQEggJ7iAkEBLcQUggJLiDkEBIcMf/IemekPCbkHq9hKQuNqS2IiR8KK5aG9JFieh7RGIiJGwJafoekZB1qWxIXcMtSHwoazobkrKzNvdBrmKuuJaNT2VxNRf3ybZl+k8IMbMTgS0LE7OJZ5n+C48ySut0pCNsKWk08UTyGNp5ZLt/O9IRNshGu468zCPfjQGwwRhahARCggsICYQEdxASCAnuICQQEtxBSCAkuIOQQEh/2aVjAQAAAIBB/tbT2FEM8SESIvEhEiLxIRIi8SESIvEhEiLxIRIi8SESIvEhEiLxIRIi8SESIvEhEiLxIRIi8SESIvEhEiLxIRIi8SESIvEhEiLxIRIi8SESIvEhEiLxIRIi8SESIvEhEiLxIRIi8SESIvEhEiLVzr0sKQoDYBRGAoohEO4XtRV4/4ecgJupLlCZnqpOVc63YpEdp7LLD3sQEv53SEpJKe+JB+yW3E08Ss0hKRnEVXwPKQm7JeHdxBNIdfCUjFMhxFRTEvZ3VE8mnjSWyjMd5ZnOpoKQsD+kYjLx5KYkT1a59n1/bGtCwk5J3Y4mHp1XJqQ06+eQmiL0gF3CoplD6rNUeoHQN/P9ICT8S0gPE89Ni8CEVHZzSNGZkLBTeI7mkLpyCel0JCT8JKTjiZBASPh1hARCgj0ICYQEexASCAn2ICQQEuxBSCAk2IOQQEiwByGBkGAPQgIhwR6EBEKCPdZCurZ1uCFJeDvpMPP7ww11e/0e0nCJ2vOqoqhDnnO7KzG9FMV5VRtdhu8hfV2u0aqmaQsWJpyVmIzapolWXS9ff4VULiENw2PDOE7THc6apnF8bBiGJaRyCUl3/huZiOUBTpKxyPw3Oi2C54jEG1pUhOQoWQntv7GMSMgqL7mR8JMbqcwruQxtlX133NLdep2ngTrASSpIc93fXgTSl8vQlnpOtpWnDeVzkIuQHPVpH958skrFC2lFRw77sA9vPill8IKUdOSyz/r4A1WLDIBuV0rPAAAAAElFTkSuQmCC"

/***/ }),

/***/ 557:
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 558:
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 566:
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(519)
	
	/* script */
	__vue_exports__ = __webpack_require__(248)
	
	/* template */
	var __vue_template__ = __webpack_require__(579)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-7bb0b274"
	
	module.exports = __vue_exports__


/***/ }),

/***/ 579:
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "content"
	  }, [_c('div', {
	    staticClass: "bg"
	  }), _vm._v(" "), _c('img', {
	    staticClass: "logo",
	    attrs: {
	      "src": __webpack_require__(24)
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "album"
	  }, [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isRead),
	      expression: "isRead"
	    }],
	    staticClass: "score_box animated"
	  }, [_c('div', {
	    staticClass: "score score_1"
	  }, [_vm._v("1111")]), _vm._v(" "), _c('div', {
	    staticClass: "score score_2"
	  }, [_vm._v("111")]), _vm._v(" "), _c('div', {
	    staticClass: "score score_3"
	  }, [_vm._v("1111")])]), _vm._v(" "), _c('img', {
	    staticClass: "waikuang",
	    attrs: {
	      "src": __webpack_require__(545)
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "album-content"
	  }, [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isUnUpload),
	      expression: "isUnUpload"
	    }],
	    staticClass: "title"
	  }, [_vm._v("点击上传个人正面自拍照")]), _vm._v(" "), _c('img', {
	    ref: "imgsss",
	    staticClass: "imgsss",
	    attrs: {
	      "src": ""
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "upload"
	  }, [_c('input', {
	    ref: "upload",
	    attrs: {
	      "type": "file",
	      "name": "upload",
	      "accept": "image/*"
	    },
	    on: {
	      "change": function($event) {
	        _vm.start_upload(this)
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isUpload),
	      expression: "isUpload"
	    }],
	    staticClass: "upload-end"
	  }, [_c('img', {
	    staticClass: "saomiao-animate",
	    attrs: {
	      "src": __webpack_require__(547)
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "btns",
	    style: ({
	      display: _vm.isUnUpload ? 'block' : 'none'
	    })
	  }, [_c('img', {
	    staticClass: "btn1",
	    attrs: {
	      "src": __webpack_require__(543)
	    },
	    on: {
	      "click": _vm.mashangtansuo
	    }
	  })]), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isUpload),
	      expression: "isUpload"
	    }],
	    staticClass: "sb-btn animated"
	  }, [_c('img', {
	    staticClass: "btn1",
	    attrs: {
	      "src": __webpack_require__(549)
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "is-cs"
	  }, [_vm._v("正在启动分析...")])]), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isRead),
	      expression: "isRead"
	    }],
	    staticClass: "sb-btn animated"
	  }, [_c('img', {
	    staticClass: "btn1",
	    attrs: {
	      "src": __webpack_require__(550)
	    }
	  }), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c('img', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isRead),
	      expression: "isRead"
	    }],
	    staticClass: "cntu",
	    attrs: {
	      "src": __webpack_require__(534)
	    }
	  }), _vm._v(" "), _c('img', {
	    staticClass: "html_img",
	    style: ({
	      display: _vm.htmlImg ? 'block' : 'none'
	    }),
	    attrs: {
	      "src": _vm.htmlImg
	    }
	  }), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isPageOut),
	      expression: "isPageOut"
	    }],
	    staticClass: "zd-xh",
	    on: {
	      "click": _vm.goToUserInfo
	    }
	  }, [_vm._m(1), _vm._v(" "), _c('img', {
	    staticClass: "zd-xh-btn",
	    attrs: {
	      "src": __webpack_require__(544)
	    }
	  })])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "star"
	  }, [_c('img', {
	    staticClass: "starImg",
	    attrs: {
	      "src": __webpack_require__(557)
	    }
	  })])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "zd-xh-text-box"
	  }, [_c('span', {
	    staticClass: "zd-xh-text"
	  }, [_vm._v("\n          接收到重大信号，马上接收！\n        ")]), _vm._v(" "), _c('img', {
	    staticClass: "zd-xh-box",
	    attrs: {
	      "src": __webpack_require__(558)
	    }
	  })])
	}]}

/***/ })

});