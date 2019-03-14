$(document).on("keyup", "#family_message_attributes_content", displayMessagePreview)

function displayMessagePreview(event) {
  $("#message-preview").text($(event.target).val());
}