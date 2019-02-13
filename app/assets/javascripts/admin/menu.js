function openNav(event) {
  if ($("#mobile-menu").width() == 250) {
    closeNav();
  } else {
    $("#mobile-menu").css({ width: "250px" }).show();
    $("#main").css({ marginLeft: "250px" });
    $("#desktop-menu").hide();
  }
};

function closeNav(event) {
  $("#mobile-menu").css({ width: "0px" }).hide();
  $("#main").css({ marginLeft: "0px" });
  $("#desktop-menu").show();
}
