$(document).ready(function(){

  console.log('park.js linked!')

  $('.slideshow').cycle({
    fx: 'fade',
    pause:   1,
    speed: 4000,
    timeout:  3500,
    startingSlide: 0
  });


  var showModal = function(){
    $('#hello-modal').modal('show');
  };
  showModal();


  $("#trail-map-image").on("click", function() {
    $('#trails-modal-img').attr('src', $('#trail-map-image').attr('src'));
    $('#trails-modal').modal('show');
  });

});