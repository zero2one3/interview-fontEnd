/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Compiler.js":
/*!*********************!*\
  !*** ./Compiler.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Watcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Watcher */ \"./Watcher.js\");\n\r\nconst REG = /\\{\\{(.*)\\}\\}/\r\n\r\nclass Compiler{\r\n    constructor(el, vm) {\r\n        this.el = document.querySelector(el)\r\n        this.vm = vm\r\n\r\n        this.frag = this._createFragment()\r\n\r\n        this.el.appendChild(this.frag)\r\n    }\r\n    _createFragment() {\r\n        let frag = document.createDocumentFragment()\r\n        let child\r\n        while (child = this.el.firstChild) {\r\n            this._complie(child)\r\n            frag.appendChild(child)\r\n        }\r\n\r\n        return frag\r\n    }\r\n    _getAllNames(value) {\r\n        \r\n        let string = value.replace(/\\./g, ',')\r\n\r\n        while(string.match(/\\[/) && string.match(/\\]/)) {\r\n            string = string.replace(/\\[/, ',')\r\n            string = string.replace(/\\]/, '')\r\n        }\r\n\r\n        let ret = string.match(/'|\"/)\r\n\r\n        while(ret) {\r\n            string = string.replace(/'|\"/, '')\r\n\r\n            ret = string.match(/'|\"/)\r\n        }\r\n\r\n        let res = string.split(',')\r\n\r\n        return res\r\n\r\n    } \r\n    _complie(node) {\r\n        let _this = this\r\n        if(node.nodeType === 1) {\r\n            let attr = node.attributes\r\n            if(attr.hasOwnProperty('v-model')) {\r\n                let name = attr['v-model'].value\r\n                let string = '_this.vm'\r\n                let arr = [...this._getAllNames(name)]\r\n                for(let i in arr) {\r\n                    string += `['${arr[i]}']`\r\n                }\r\n                node.oninput = function(e) {\r\n                    eval(`${string} = e.target.value`)\r\n                }\r\n                console.log(string);\r\n                node.value = eval(string)\r\n            }\r\n            \r\n        } else if(node.nodeType === 3) {\r\n            let ret_totale = node.nodeValue.match(REG)\r\n            if(!ret_totale) return;\r\n\r\n            let string = ret_totale[1]\r\n            string = string.trim()  \r\n            \r\n            let obj = {\r\n                each: []\r\n            }\r\n            \r\n            let allNames = this._getAllNames(string)\r\n            obj.each = [...allNames]\r\n            \r\n            new _Watcher__WEBPACK_IMPORTED_MODULE_0__[\"default\"](node, obj, this.vm)\r\n            \r\n            \r\n            \r\n        }\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Compiler);\r\n\n\n//# sourceURL=webpack:///./Compiler.js?");

/***/ }),

/***/ "./Dep.js":
/*!****************!*\
  !*** ./Dep.js ***!
  \****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Dep{\r\n    constructor() {\r\n        this.Observers = []\r\n    }\r\n    on(observer) {\r\n        this.Observers.push(observer)\r\n    }\r\n    notify() {\r\n        this.Observers.forEach(o => o.update())\r\n    }\r\n}\r\n\r\nDep.prototype.target = null\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Dep);\r\n\n\n//# sourceURL=webpack:///./Dep.js?");

/***/ }),

/***/ "./Observer.js":
/*!*********************!*\
  !*** ./Observer.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! os */ \"./node_modules/_os-browserify@0.3.0@os-browserify/browser.js\");\n/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Dep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dep */ \"./Dep.js\");\n\r\n\r\n\r\nclass Observer{\r\n    constructor(data) {\r\n        this.data = data\r\n        this._observerAll(data)\r\n    }\r\n    _observerAll(obj) {\r\n        if(typeof obj === 'object' && typeof obj !== null) {\r\n            Object.keys(obj).forEach(key => this._bind(obj, key, obj[key]))\r\n        }\r\n    }\r\n    _bind(data, key, value) {\r\n        let _this = this\r\n\r\n        // 为对象内的对象添加响应式\r\n        this._observerAll(value)\r\n\r\n        let dep = new _Dep__WEBPACK_IMPORTED_MODULE_1__[\"default\"]()\r\n\r\n        Object.defineProperty(data, key, {\r\n            get() {\r\n                if(_Dep__WEBPACK_IMPORTED_MODULE_1__[\"default\"].target) dep.on(_Dep__WEBPACK_IMPORTED_MODULE_1__[\"default\"].target)\r\n                return value\r\n            },\r\n            set(newValue) {\r\n                if(newValue === value) return;    // 值未更改\r\n                _this._observerAll(newValue)   // 若修改整个值为对象，则将对象内的所有数据加上响应式\r\n                value = newValue\r\n                dep.notify()            // 值更改了，通知订阅者\r\n            }\r\n        })\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Observer);\r\n\n\n//# sourceURL=webpack:///./Observer.js?");

/***/ }),

/***/ "./Vue.js":
/*!****************!*\
  !*** ./Vue.js ***!
  \****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Observer */ \"./Observer.js\");\n/* harmony import */ var _Compiler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Compiler */ \"./Compiler.js\");\n\r\n\r\n\r\nclass Vue{\r\n    constructor(options) {\r\n        this.$options = options\r\n        this._data = this.$options.data\r\n        this.$el = this.$options.el\r\n        Object.keys(this._data).forEach(key => this._proxy(key))\r\n\r\n        new _Observer__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this._data)\r\n        new _Compiler__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.$el, this)\r\n    }\r\n    _proxy(key) {\r\n        let _this = this\r\n        Object.defineProperty(this, key, {\r\n            get() {\r\n                return _this._data[key]\r\n            },\r\n            set(value) {\r\n                return _this._data[key] = value\r\n            }\r\n        })\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Vue);\r\n\n\n//# sourceURL=webpack:///./Vue.js?");

/***/ }),

/***/ "./Watcher.js":
/*!********************!*\
  !*** ./Watcher.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Dep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dep */ \"./Dep.js\");\n\r\n\r\nclass Watcher{\r\n    constructor(node, obj ,vm) {\r\n        this.node = node\r\n        this.obj = obj.each\r\n        this.vm = vm\r\n        _Dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"].target = this\r\n        this.string = 'vm._data'\r\n        for(let i in this.obj) {\r\n            this.string += `['${this.obj[i]}']`\r\n        }\r\n        let newVal = eval(this.string)\r\n        _Dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"].target = null\r\n        this.update()\r\n    }\r\n    update() {\r\n        this.node.nodeValue = eval(`this.${this.string}`)\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Watcher);\n\n//# sourceURL=webpack:///./Watcher.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vue */ \"./Vue.js\");\n\r\n\r\nconst vm = new _Vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\r\n    el: '#app',\r\n    data: {\r\n        message: {\r\n            name: '张三'\r\n        }\r\n    }\r\n})\r\n\r\nwindow.$vm = vm\r\n\r\n\n\n//# sourceURL=webpack:///./main.js?");

/***/ }),

/***/ "./node_modules/_os-browserify@0.3.0@os-browserify/browser.js":
/*!********************************************************************!*\
  !*** ./node_modules/_os-browserify@0.3.0@os-browserify/browser.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.endianness = function () { return 'LE' };\n\nexports.hostname = function () {\n    if (typeof location !== 'undefined') {\n        return location.hostname\n    }\n    else return '';\n};\n\nexports.loadavg = function () { return [] };\n\nexports.uptime = function () { return 0 };\n\nexports.freemem = function () {\n    return Number.MAX_VALUE;\n};\n\nexports.totalmem = function () {\n    return Number.MAX_VALUE;\n};\n\nexports.cpus = function () { return [] };\n\nexports.type = function () { return 'Browser' };\n\nexports.release = function () {\n    if (typeof navigator !== 'undefined') {\n        return navigator.appVersion;\n    }\n    return '';\n};\n\nexports.networkInterfaces\n= exports.getNetworkInterfaces\n= function () { return {} };\n\nexports.arch = function () { return 'javascript' };\n\nexports.platform = function () { return 'browser' };\n\nexports.tmpdir = exports.tmpDir = function () {\n    return '/tmp';\n};\n\nexports.EOL = '\\n';\n\nexports.homedir = function () {\n\treturn '/'\n};\n\n\n//# sourceURL=webpack:///./node_modules/_os-browserify@0.3.0@os-browserify/browser.js?");

/***/ })

/******/ });