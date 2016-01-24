$(document).ready(function(){

  console.log('park.js linked!')

  $('.slideshow').cycle({
    fx: 'fade',
    pause:   1,
    speed: 4000,
    timeout:  3500,
    startingSlide: 0
  });



});