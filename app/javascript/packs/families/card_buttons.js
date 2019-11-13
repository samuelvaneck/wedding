$(document).on("click", "#card-info-btn, #card-reply-btn, #card-post-btn", (event) => {
  const cardId = $(event.target).attr("id").replace("-btn", "");
  const uuid = localStorage.getItem("uuid");
  $.get("/families/flip_card", { card_id: cardId, uuid: uuid }, null, "script");
});

