  'use strict';
  //gallery
  $(document).ready(function() {

      // $('#lightgallery').lightGallery();
      // $('#lightgallery1').lightGallery();
      // $('#lightgallery2').lightGallery();
      // $('#lightgallery3').lightGallery();
      // $('#lightgallery4').lightGallery();
      // $('#lightgallery5').lightGallery();
      // $('#lightgallery6').lightGallery();
      // $('#lightgallery7').lightGallery();
      // $('#lightgallery8').lightGallery();
      // $('#lightgallery9').lightGallery();
      // $('#lightgallery10').lightGallery();
      // $('#lightgallery11').lightGallery();




      $('#post-new').hide();
      $('#post-message').keyup(function() {
          if (($(this).val() != "")) {
              $('#post-new').show();
          } else
              $('#post-new').hide();
      });

  });
