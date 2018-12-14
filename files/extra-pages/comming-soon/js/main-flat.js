/*  TABLE OF CONTENTS
    ---------------------------
    1. Loading / Opening
    2. Custom scroll bar
    3. Newsletter / Pop-up
    4. SlitSlider
*/

/* ------------------------------------- */
/* 1. Loading / Opening ................ */
/* ------------------------------------- */

$(window).load(function(){
    "use strict";

    setTimeout(function(){

        $("#loading").addClass('animated-middle fadeOut');

    },2000);

    setTimeout(function(){

        setTimeout(function() {

            $('.text-intro').each(function(i) {
                (function(self) {
                    setTimeout(function() {
                        $(self).addClass('animated-middle fadeInUp').removeClass('opacity-0');
                    },(i*150)+150);
                })(this);
            });

        }, 0);
        
    },2000);

    setTimeout(function(){

        $(".bar-intro").addClass('animated-middle slideInDown').removeClass('opacity-0');

    },3000);

    setTimeout(function(){

    	$("#loading").remove();

    },3300);

    setTimeout(function(){

    	$(".text-intro").removeClass('animated-middle fadeInUp');

    },4000);

});

$(document).ready(function(){
    "use strict";

    $("#loading").removeClass('dark-back');
    $(".loading-text").addClass('animated-middle fadeIn').removeClass('opacity-0');

    /* ------------------------------------- */
	/* 2. Custom scroll bar ................ */
	/* ------------------------------------- */

    function scrollbar(){

        $('.content-slide').mCustomScrollbar({
            scrollInertia: 150,
            axis            :"y"
        });
    }
    
    scrollbar();

    /* ------------------------------------- */
    /* 3. Newsletter / Pop-up .............. */
    /* ------------------------------------- */

    $("#notifyMe").notifyMe();

    (function() {

        var dlgtrigger = document.querySelector( '[data-dialog]' ),
            somedialog = document.getElementById( dlgtrigger.getAttribute( 'data-dialog' ) ),
            dlg = new DialogFx( somedialog );

        dlgtrigger.addEventListener( 'click', dlg.toggle.bind(dlg) );

    })();

    /* ------------------------------------- */
    /* 4. SlitSlider ....................... */
    /* ------------------------------------- */

    $(function() {
			
		var Page = (function() {

			var $navArrows = $( '#nav-arrows' ),
				$nav = $( '#nav-multi-square > span' ),
				slitslider = $( '#slider' ).slitslider( {
					onBeforeChange : function( slide, pos ) {

						$nav.removeClass( 'nav-square-current' );
						$nav.eq( pos ).addClass( 'nav-square-current' );

					}
				} ),

				init = function() {

					initEvents();
					
				},
				initEvents = function() {

					// add navigation events
					$navArrows.children( ':last' ).on( 'click', function() {

						slitslider.next();
						return false;

					} );

					$navArrows.children( ':first' ).on( 'click', function() {
						
						slitslider.previous();
						return false;

					} );

					$nav.each( function( i ) {
					
						$( this ).on( 'click', function( event ) {
							
							var $dot = $( this );
							
							if( !slitslider.isActive() ) {

								$nav.removeClass( 'nav-square-current' );
								$dot.addClass( 'nav-square-current' );
							
							}
							
							slitslider.jump( i + 1 );
							return false;
						
						} );
						
					} );

				};

				return { init : init };

		})();

		Page.init();
	
	});

});