  'use strict';
  $(document).ready(function() {
      $('.f-item').on('click', function() {
          var font_class = $(this).children().attr('class');
          var flag_name = $(this).attr('flag-name');
          var country_name = $(this).parent().children('.content-flag').children(0).html();
          $('#myModal').modal('show');
          $('#icon').removeClass();
          $('#icon').addClass(font_class);
          $('#icon').addClass('fa-lg');
          $('#name').val(country_name);
          $('#code').val('<i class="' + font_class + '"></i>');
      });
  });
