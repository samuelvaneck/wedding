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
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/admin/donut_percentage.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/admin/donut_percentage.js":
/*!********************************************************!*\
  !*** ./app/javascript/packs/admin/donut_percentage.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function percentageChart(id) {
  var _this = this;

  var duration = 1500;
  var transition = 200;
  var width = 170;
  var height = 170;
  var percentage = $(id).attr("data-percentage");
  var dataset = {
    lower: calcPercent(0),
    upper: calcPercent(percentage)
  };
  var radius = Math.min(width, height) / 3;
  var pie = d3.pie().sort(null);
  var format = d3.format(".0%");
  var color = d3.scaleOrdinal(["#00539C", "#EEEEEE"]);
  var arc = d3.arc().innerRadius(radius * .95).outerRadius(radius);
  var svg = d3.select(id).append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  var path = svg.selectAll("path").data(pie(dataset.lower)).enter().append("path").attr("fill", function (d, i) {
    return color(i);
  }).attr("d", arc).each(function (d) {
    _this._current = d;
  });
  var text = svg.append("text").attr("text-anchor", "middle").attr("dy", ".3em");
  var progress = 0;
  setTimeout(function () {
    path = path.data(pie(dataset.upper));
    path.transition().duration(duration).attrTween("d", function (d) {
      var dp = d3.interpolate(_this._current, d);
      var p = d3.interpolate(progress, percentage);
      return function (t) {
        text.text(format(p(t) / 100));
        return arc(dp(t));
      };
    });
  }, transition);

  function calcPercent(percentage) {
    return [parseInt(percentage), 100 - parseInt(percentage)];
  }
}

/***/ })

/******/ });
//# sourceMappingURL=donut_percentage-01d489c1b2d767f6c88a.js.map