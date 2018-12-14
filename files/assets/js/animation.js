"use strict";
  $(document).ready(function(){
        $('.js--triggerAnimation').on('click',function(e){
            e.preventDefault();
            var anim = $('.js--animations').val();
            testAnim(anim);
        });

        $('.js--animations').on('change',function(){
            var anim = $(this).val();
            testAnim(anim);
        });

          function testAnim(x) {
        $('#animationSandbox').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
    };
    });