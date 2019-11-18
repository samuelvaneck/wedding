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

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /app/app/javascript/packs/admin/donut_percentage.js: Unexpected token (36:14)\n\n  34 |   let progress = 0;\n  35 | \n> 36 |   setTimeout(() {\n     |               ^\n  37 |     path = path.data(pie(dataset.upper));\n  38 |     path.transition().duration(duration).attrTween(\"d\", (d) => {\n  39 |       const dp = d3.interpolate(this._current, d)\n    at Object.raise (/app/node_modules/@babel/parser/lib/index.js:6932:17)\n    at Object.unexpected (/app/node_modules/@babel/parser/lib/index.js:8325:16)\n    at Object.parseParenAndDistinguishExpression (/app/node_modules/@babel/parser/lib/index.js:9754:12)\n    at Object.parseExprAtom (/app/node_modules/@babel/parser/lib/index.js:9505:21)\n    at Object.parseExprAtom (/app/node_modules/@babel/parser/lib/index.js:4084:20)\n    at Object.parseExprSubscripts (/app/node_modules/@babel/parser/lib/index.js:9167:23)\n    at Object.parseMaybeUnary (/app/node_modules/@babel/parser/lib/index.js:9147:21)\n    at Object.parseExprOps (/app/node_modules/@babel/parser/lib/index.js:9013:23)\n    at Object.parseMaybeConditional (/app/node_modules/@babel/parser/lib/index.js:8986:23)\n    at Object.parseMaybeAssign (/app/node_modules/@babel/parser/lib/index.js:8932:21)\n    at Object.parseExprListItem (/app/node_modules/@babel/parser/lib/index.js:10254:18)\n    at Object.parseCallExpressionArguments (/app/node_modules/@babel/parser/lib/index.js:9364:22)\n    at Object.parseSubscript (/app/node_modules/@babel/parser/lib/index.js:9272:29)\n    at Object.parseSubscripts (/app/node_modules/@babel/parser/lib/index.js:9188:19)\n    at Object.parseExprSubscripts (/app/node_modules/@babel/parser/lib/index.js:9177:17)\n    at Object.parseMaybeUnary (/app/node_modules/@babel/parser/lib/index.js:9147:21)\n    at Object.parseExprOps (/app/node_modules/@babel/parser/lib/index.js:9013:23)\n    at Object.parseMaybeConditional (/app/node_modules/@babel/parser/lib/index.js:8986:23)\n    at Object.parseMaybeAssign (/app/node_modules/@babel/parser/lib/index.js:8932:21)\n    at Object.parseExpression (/app/node_modules/@babel/parser/lib/index.js:8882:23)\n    at Object.parseStatementContent (/app/node_modules/@babel/parser/lib/index.js:10742:23)\n    at Object.parseStatement (/app/node_modules/@babel/parser/lib/index.js:10613:17)\n    at Object.parseBlockOrModuleBlockBody (/app/node_modules/@babel/parser/lib/index.js:11189:25)\n    at Object.parseBlockBody (/app/node_modules/@babel/parser/lib/index.js:11176:10)\n    at Object.parseBlock (/app/node_modules/@babel/parser/lib/index.js:11160:10)\n    at Object.parseFunctionBody (/app/node_modules/@babel/parser/lib/index.js:10179:24)\n    at Object.parseFunctionBodyAndFinish (/app/node_modules/@babel/parser/lib/index.js:10149:10)\n    at /app/node_modules/@babel/parser/lib/index.js:11321:12\n    at Object.withTopicForbiddingContext (/app/node_modules/@babel/parser/lib/index.js:10488:14)\n    at Object.parseFunction (/app/node_modules/@babel/parser/lib/index.js:11320:10)");

/***/ })

/******/ });
//# sourceMappingURL=donut_percentage-1317323d0465542ecb80.js.map