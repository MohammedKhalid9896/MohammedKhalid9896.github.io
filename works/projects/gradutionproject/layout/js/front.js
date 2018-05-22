$(function() {
    
    'use strict';
    //trigger the selectboxit 
     $("select").selectBoxIt({
         autoWidth:false
     });
    
    //switch between login & signup 
    
    $('.login-page h1 span').click(function() {
       $(this).addClass('selected').siblings().removeClass('selected');
       $('.login-page form').hide();     
       $('.' + $(this).data('class')).fadeIn(100);
    });
    
    //hide placeholder
$('[placeholder]').focus(function() {
    
    $(this).attr('data-text',$(this).attr('placeholder'));
    $(this).attr('placeholder','');
})

    .blur(function() {
        
        $(this).attr('placeholder',$(this).attr('data-text'));
    });
    
    //add asterisk on required field 
    $('input').each(function () {
        if ($(this).attr('required') === 'required'){
           $(this).after('<span class= "asterisk">*</span>');
        }
    });
    
    //confirmation Message on button
    $('.confirm').click(function() {
        return confirm('Are You Sure?'); 
    });
    
    
    $('.live-name').keyup(function (){
      $('.live-preview .caption h3').text($(this).val()); 
    });
    
     $('.live-description').keyup(function (){
      $('.live-preview .caption p').text($(this).val()); 
    });
    
    $('.live-price').keyup(function (){
      $('.live-preview .price-tag').text('$' + $(this).val()); 
    });
    
    
});





  












