function bindPhotoUploadBtn() {
  $("#real-input-field").change(function(){
    $("#visible_photo_field").val($(this).val().replace(/^.*[\\\/]/, ''))
  });
  $("#browse-btn").click(function(){
    $("#real-input-field").click();
  });
}
