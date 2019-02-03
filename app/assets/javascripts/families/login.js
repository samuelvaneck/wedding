var codeInput0 = false;
var codeInput1 = false;
var codeInput2 = false;
var codeInput3 = false;
var codeInput4 = false;
var codeInput5 = false;

$(document).ready(function () {
  $("#code-input-0").focus();
});

$(document).on("keyup", ".code-input-field", (event) => {
  const idx = parseInt($(event.target).attr("id").split("-")[2]);

  focusInputField(event, idx);
  if (filledLoginCode()) { fetchFamily() };
  window["codeInput" + idx] = $(event.target).val().length > 0;
});

function focusInputField(event, idx) {
  if (event.keyCode == 8) {
    if (idx == 0) return;
    if (window["codeInput" + idx]) return;
    $("#code-input-" + (idx - 1)).focus();
  } else {
    if (idx == 5) { return };
    $("#code-input-" + (idx + 1)).focus();
  }
}

function filledLoginCode() {
  let filled = 0

  $(".code-input-field").each((i, d) => {
    if ($(d).val().length > 0) { filled++ };
  });
  return filled == 6
}

function fetchFamily() {
  let data     = {};
  data.uuid    = inputUuid();
  data.card_id = "card-reply";
  data.login   = true;

  showSpinner();
  localStorage.setItem("uuid", inputUuid());

  setTimeout(function () {
    $.get("/families/flip_card", data, null, "script").fail(() => {
      hideSpinner();
      $("#status").find(".status-text").text("Geen gasten gevonden")
      localStorage.removeItem("uuid");
      $(".code-input-field").val("");
      $("#code-input-0").focus();
    });
  }, 1000);
}

function inputUuid() {
  let uuid = "";
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
  $(".code-input-field").val("")
  $("#code-input-0").focus();
}
