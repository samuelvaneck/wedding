$(document).on('touchstart', '.header-img, .header-content', function() {
  let addingClass = $(this).hasClass('header-img') ? 'header-img-hover' : 'header-content-hover';
  console.log(addingClass);
  $(this).addClass(addingClass);
});

$(document).on('touchend', '.header-img, .header-content', function() {
  let removingClass = $(this).hasClass('header-img') ? 'header-img-hover' : 'header-content-hover';
  console.log(removingClass);
  $(this).removeClass(removingClass);
})