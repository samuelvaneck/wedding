function bindDataUploadBtn(visibleField) {
  $('#real-input-field').change(function(){
    $(visibleField).val($(this).val().replace(/^.*[\\\/]/, ''))
  });
  $('#browse-btn').click(function(){
    $('#real-input-field').click();
  });
}