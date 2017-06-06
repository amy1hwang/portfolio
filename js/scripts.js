$(function() {

  //sticky bar
  var navTop = $('nav').offset().top;
  var aboutTop = $('.about').offset().top - 40;
  var projectsTop = $('.projects').offset().top;
  $(window).bind('scroll', function () {
      if ( aboutTop < $(window).scrollTop() && $(window).scrollTop() < projectsTop) {
        $('nav').addClass('reverse');
      } else if ( navTop < $(window).scrollTop()) {
        $('nav').removeClass('reverse');
        $('nav').addClass('fixed');
      } else {
        $('nav').removeClass('reverse');
        $('nav').removeClass('fixed');
      };
  });

  $('.intro').addClass('load');
  // $('.intro').fadeIn(400);
  $('.sub-intro').addClass('load');

  //scroll to the next section
  $('.to-about').click(function() {
    $('body,html').animate({
      scrollTop: $("#about").offset().top + 40},
      500);
  });
  $('.to-projects').click(function() {
    $('body,html').animate({
      scrollTop: $("#projects").offset().top},
      500);
  });
  $('.to-contact').click(function() {
    $('body,html').animate({
      scrollTop: $("#contact").offset().top},
      500);
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

  $('.to-the-top').click(function() {
    $('html, body').animate({
      scrollTop : 0
    }, 500);
    $('.to-the-top').css('display', 'none');
  });
})
