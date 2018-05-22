// === nav btn === //

$('.nav-btn').click(function(){
    $('.nav-btn').toggleClass('open');
    $('.sidebar').toggleClass('showing');
    $('.logo').toggleClass('open-logo')
})


$(document).scroll(function(){
$("#top-nav").css("display","none");
});