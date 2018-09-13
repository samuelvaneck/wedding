function searchItems(_this) {
  let url = $(_this).attr("data-search-path");
  let data = {};
  data.search = $(_this).val();
  data.target = $(_this).attr("data-table");

  $.get(url, data, "", "script");
}
