// cvv popup
jQuery(function($){
    $('a.cvv-open-link').click(function() {
        var clickId = this.id;
        $('#cvv-popup-wrapper').fadeIn(300);
    });
    $('a.cvv-close-link').click(function() {
        $('#cvv-popup-wrapper').fadeOut(300);
    });
    $(document).keydown(function(eventObject) {
        if ($('[id^="cvv-popup-wrapper"]').is(":visible")){
            if (eventObject.which == '27') {
                $('#cvv-popup-wrapper').fadeOut(300);
            }
        }
    });
    $(document).mouseup(function (e) {
        var container = $('[id^="cvv-popup-wrapper"]');
        if (container.has(e.target).length === 0){
            container.fadeOut(300);
        }
    });
});
// end cvv popup

// yellow-message bottom
jQuery(function($){
    $('.yellow-message2.top').delay(1000).fadeIn(500);
    $('.yellow-message2.top a.close-link').click(function(){
        $('.yellow-message.top').fadeOut(300);
    });
    
    if ($('#last_hour_info').length && $('#people_viewing_info').length)
    {
    	setInterval(function() {
    		people_viewing_info_show();    		
    		setTimeout(function() {
    			last_hour_info_show();
    		}, 5000);
    	}, 10000);
    }
});
// end yellow-message bottom

// top bar bottom
jQuery(function($){
    $('.top-bar').delay(2000).slideDown(300);
});
// end top bar

// info popup
jQuery(function($){
    $('.terms-link').click(function(){
        $('.info-popup.terms').fadeIn(300);
    })
    $('.pravicy-link').click(function(){
        $('.info-popup.pravicy').fadeIn(300);
    })
    $('.info-popup .close-link').click(function(){
        $('.info-popup').fadeOut(300);
    })
    
    $('input').keydown(function() {
    		$(this).removeClass('error');
    		$(this).closest('div[class^="line"]').removeClass('error');
    });
    
    $('select').change(function() {
    	$(this).removeClass('error');
    		$(this).closest('div[class^="line"]').removeClass('error');
    });
    
    
});
$(document).mouseup(function (e) {
    var container = $('.info-popup');
    if (container.has(e.target).length === 0){
        container.fadeOut(300);
    }    
});
// end info popup

// popup tip
jQuery(function($){
	if ($('.popup .tip').length )
	{
	    $('.popup .tip').mouseenter(function(){
	        $('.popup .tip .text').fadeIn();
	    });
	    $('.popup .tip').mouseleave(function(){
	        $('.popup .tip .text').fadeOut();
	    });
	}
});
// end popup tip


function last_hour_info_show()
{
	$('#people_viewing_info').fadeOut(500);
	$('#last_hour_info').delay(500).fadeIn(500);	
}

function people_viewing_info_show()
{
	$('#last_hour_info').fadeOut(500);
	$('#people_viewing_info').delay(500).fadeIn(500);
}