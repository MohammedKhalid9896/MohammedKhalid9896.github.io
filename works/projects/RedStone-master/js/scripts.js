// === nav btn === //

$('.nav-btn').click(function(){
    $('.nav-btn').toggleClass('open');
    $('.sidebar').toggleClass('showing');
    $('.logo').toggleClass('open-logo')
})

// === slider === //

$(document).ready(function(){
    $('.carousel').slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 7,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        focusOnSelect: true,
        pauseOnFocus: false,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '0px',
              slidesToShow: 3
            }
          },
          {
            breakpoint: 500,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '0px',
              slidesToShow: 1,
            }
          }
        ]
    });
  });