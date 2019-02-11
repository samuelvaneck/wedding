function openNav(event) {
  $("#mobile-menu").css({ width: "250px" }).show();
  $("#main").css({ marginLeft: "250px" });
  $("#desktop-menu").hide();
};

function closeNav(event) {
  $("#mobile-menu").css({ width: "0px" }).hide();
  $("#main").css({ marginLeft: "0px" });
  $("#desktop-menu").show();
}
