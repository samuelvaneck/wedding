(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./app/javascript/packs/admin/donut_percentage.js":
/*!********************************************************!*\
  !*** ./app/javascript/packs/admin/donut_percentage.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {window.percentageChart = function (id) {
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
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/src/jquery.js")))

/***/ })

}]);
//# sourceMappingURL=3-a4b5adc7f1c23d8fbdb2.chunk.js.map