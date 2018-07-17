$(document).scroll(function(){
   $("#top-nav").css("display","none"); 
});

$('.nav-btn').click(function(){
    $('.nav-btn').toggleClass('open');
    $('.sidebar').toggleClass('showing');
    $('.logo').toggleClass('open-logo')
})