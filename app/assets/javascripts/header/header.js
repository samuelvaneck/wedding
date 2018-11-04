$(document).on('touchstart', '.header-img, .header-content', function() {
  let addingClass = $(this).hasClass('header-img') ? 'header-img-hover' : 'header-content-hover';
  $(this).addClass(addingClass);
});

$(document).on('touchend', '.header-img, .header-content', function() {
  let removingClass = $(this).hasClass('header-img') ? 'header-img-hover' : 'header-content-hover';
  $(this).removeClass(removingClass);
})
