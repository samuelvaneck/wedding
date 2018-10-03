$(document).ready(function() {
  $("#code-input-0").focus();
});

$(document).on("keyup", ".code-input-field", function(e) {
  focusInputField($(this), e);
  if (filledLoginCode()) { fetchFamily() };
});

function focusInputField(_this, e) {
  const idx = $(_this).attr("id").split("-")[2];
  if (e.keyCode == 8) {
    if (idx == 0) { return };
    $(_this).parent().prev("div").find("input").focus();
  } else {
    if (idx == 5) { return };
    $(_this).parent().next("div").find("input").focus();
  }
}

function filledLoginCode() {
  let filled = 0
  $(".code-input-field").each(function(i, d) {
    if ($(d).val().length > 0) { filled++ };
  });
  return filled == 6
}

function fetchFamily() {
  let data = {};
  data.uuid = inputUuid();

  showSpinner();

  setTimeout(function() {
    $.get("/families", data, null, "script").fail(function() {
      hideSpinner();
      $("#status").find(".status-text").text("Geen gasten gevonden")
    });
  }, 1000);
}

function inputUuid() {
  let uuid = "";
  $(".code-input-field").map(function(i, d) {
    uuid += $(d).val();
  });
  return uuid;
}

function showSpinner() {
  $("#status").show().find(".status-text").text("Checking");
  $("#spinner").show();
}

function hideSpinner() {
  $("#status").hide();
}
