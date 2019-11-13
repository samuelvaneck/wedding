$(document).on('change', '#real-input-field', function(){
  $("#visible_file_upload_field").val($(this).val().replace(/^.*[\\\/]/, ''))
});
$(document).on('click',  '#browse-btn', function(){
  $('#real-input-field').click();
});