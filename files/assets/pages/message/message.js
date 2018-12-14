  'use strict';
 $(document).ready(function() {

    /*display icon*/
    function setHeight() {
     var $window = $(window);
               if ($window.width() >= 991) {
            $('.contact-btn').css('display', 'none');           
           $('.contact-box').addClass("contact-show");
           
        } 
       else if($window.width() <= 768){
      
          $('.contact-btn').css('display', 'block');
               $('.contact-box').addClass("contact-hide");
          $('.contact-box').css('top', '100px');
        }
         else if($window.width() > 768 && $window.width() <= 990){
   
          $('.contact-btn').css('display', 'block');
               $('.contact-box').addClass("contact-hide");
          $('.contact-box').css('top', '50px');
        }
        else{         
             $('.contact-btn').css('display', 'block');
               $('.contact-box').addClass("contact-hide");
         
      }
    };
        $(window).on('resize',function() {
            setHeight();
        });
    setHeight();

     /*Click on contact button icon*/
            $(".contact-btn").on('click',function() {
                   
                   if($('.contact-box').hasClass("contact-show") == true){
                   
                         $('.contact-box').removeClass("contact-show");  
                        $('.contact-box').addClass("contact-hide");                         
                   }
                   else{
                   
                    $('.contact-box').removeClass("contact-hide"); 
                       $('.contact-box').addClass("contact-show");
                   }
                  
            });
  });