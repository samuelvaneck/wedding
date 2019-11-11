$(document).on("keyup", "#family_message_attributes_content", displayPreview);
$(document).on("keyup", "#family_allergies", displayPreview);


function displayPreview(event) {
  const _this = $(event.target);
  const messagePreview = _this.attr("id") == "family_allergies"
  let previewText = "";

  if (_this.val().length == 0) {
    previewText = messagePreview ? "Allergiën voorbeeld" : "Bericht voorbeeld";
  } else {
    previewText = _this.val();
  }

  _this.closest(".d-flex").find(".preview").text(previewText);
}
