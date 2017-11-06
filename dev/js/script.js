$(document).ready(function() {
	$(".form__item").on('click', function(){
        if($(this).children().is(":checked"))
         {$(this).addClass('active') }
        else {$(this).removeClass('active')}
        });
        $(".town__link").on('click',function(){
              $(this).children().toggleClass('show');
        });
        $(".more").on('click',function(){
                $(this).children() .toggleClass('show');

        });
        
});