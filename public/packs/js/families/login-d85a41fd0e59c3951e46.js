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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/families/login.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/families/login.js":
/*!************************************************!*\
  !*** ./app/javascript/packs/families/login.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var codeInput0 = false;
var codeInput1 = false;
var codeInput2 = false;
var codeInput3 = false;
var codeInput4 = false;
var codeInput5 = false;
$(document).ready(function () {
  $("#code-input-0").focus();
});
$(document).on("keyup", ".code-input-field", function (event) {
  var idx = parseInt($(event.target).attr("id").split("-")[2]);
  focusInputField(event, idx);

  if (filledLoginCode()) {
    fetchFamily();
  }

  ;
  window["codeInput" + idx] = $(event.target).val().length > 0;
});

function focusInputField(event, idx) {
  if (event.keyCode == 8) {
    if (idx == 0) return;
    if (window["codeInput" + idx]) return;
    $("#code-input-" + (idx - 1)).focus();
  } else {
    if (idx == 5) {
      return;
    }

    ;
    $("#code-input-" + (idx + 1)).focus();
  }
}

function filledLoginCode() {
  var filled = 0;
  $(".code-input-field").each(function (i, d) {
    if ($(d).val().length > 0) {
      filled++;
    }

    ;
  });
  return filled == 6;
}

function fetchFamily() {
  var data = {};
  data.uuid = inputUuid();
  data.card_id = "card-reply";
  data.login = true;
  showSpinner();
  localStorage.setItem("uuid", inputUuid());
  setTimeout(function () {
    $.get("/families/flip_card", data, null, "script").fail(function () {
      hideSpinner();
      $("#status").find(".status-text").text("Geen gasten gevonden");
      localStorage.removeItem("uuid");
      $(".code-input-field").val("");
      $("#code-input-0").focus();
    });
  }, 1000);
}

function inputUuid() {
  var uuid = "";
  $(".code-input-field").map(function (i, d) {
    uuid += $(d).val();
  });
  return uuid.toLowerCase();
}

function showSpinner() {
  $("#status").show().find(".status-text").text("Checking");
  $("#spinner").show();
}

function hideSpinner() {
  $("#status").hide();
}

function clearCodeInputFields() {
  $(".code-input-field").val("");
  $("#code-input-0").focus();
}

/***/ })

/******/ });
//# sourceMappingURL=login-d85a41fd0e59c3951e46.js.map