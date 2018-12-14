"use strict";
$(document).ready(function(){
        $( function() {

            var icons = {
                header: "zmdi zmdi-chevron-down",
                activeHeader: "zmdi zmdi-chevron-up"
            };
            $("#multi-open" ).accordion({
                heightStyle: "content",
                icons: icons
            });
            $( "#sclae-accordion" ).accordion({
                heightStyle: "content",
                icons: icons
            });
            $( "#single-open" ).accordion({
                heightStyle: "content",
                icons: icons
            });
            $( "#color-accordion" ).accordion({
                heightStyle: "content",
                icons: icons
            });
        } );

        if($(".accordion-msg").attr('aria-expanded') == 'true'){
            $(".accordion-msg").addClass("scale_active");
        }
        else{
            $(".accordion-msg").removeClass("scale_active");
        }
    });
