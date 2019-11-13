window.handleKeyUpSearch = (_this => {
  delaySearch(() => {
    searchItems(_this);
  }, 400);
});

var searchItems = (_this => {
  let url = $(_this).attr("data-search-path");
  let data = {};
  data.search = $(_this).val();
  data.target = $(_this).attr("data-target");

  $.get(url, data, "", "script");
});

var delaySearch = (() => {
  let timer = 0;
  return (callback, ms) => {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
