$(document).on("click", "#card-info-btn, #card-rsvp-btn, #card-post-btn", (event) => {
  let cardId = $(event.target).attr("id").replace("-btn", "");  
  $.get("/families/flip_card", { card_id: cardId }, null, "script");
});

