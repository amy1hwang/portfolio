//sticky bar
var num = 100;
$(window).bind('scroll', function () {
    if ($(window).scrollTop() > num) {
      $('nav').addClass('fixed');
    } else {
      $('nav').removeClass('fixed');
    };
});

//scroll to the next section
$(function() {
  $('.to-about').click(function() {
    $('body,html').animate({
      scrollTop: $("#about").offset().top},
      300);
  });
  $('.to-projects').click(function() {
    $('body,html').animate({
      scrollTop: $("#projects").offset().top},
      300);
  });
  $('.to-contact').click(function() {
    $('body,html').animate({
      scrollTop: $("#contact").offset().top},
      300);
  });
});



//show to-the-top-icon
var n = 250;
$(window).scroll(function() {
  if ($(this).scrollTop() > n) {
    $('.to-the-top').fadeIn();
  } else {
    $('.to-the-top').fadeOut();
  }
});

//scroll up to the top
$(function() {
  $('.to-the-top').click(function() {
    $('body,html').animate({
      scrollTop : 0
    }, 800);
    $('.to-the-top').css('display', 'none');
  });
})
