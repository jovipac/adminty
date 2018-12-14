  'use strict';
  $(document).ready(function() {
      $(".task-right-header-action").on('click', function() {
          $(".task-right-content-action").slideToggle();
      });

      $(".task-right-header-status").on('click', function() {
          $(".taskboard-right-progress").slideToggle();
      });

      $(".task-right-header-users").on('click', function() {
          $(".taskboard-right-users").slideToggle();
      });

      $(".task-right-header-revision").on('click', function() {
          $(".taskboard-right-revision").slideToggle();
      });

      $('.collapse').on('shown.bs.collapse', function() {
          $(this).parent().find(".fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down");
      }).on('hidden.bs.collapse', function() {
          $(this).parent().find(".fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-up");
      });

      var progression1 = 0;
      var progression2 = 0;
      var progression3 = 0;
      var progression4 = 0;
      var progression5 = 0;
      var progress = setInterval(function() {

          $('.progress .faq-text1').text(progression1 + '%');
          $('.progress .faq-text1').css({ 'left': progression1 + '%' });
          $('.progress .faq-text1').css({ 'top': '-20px' });
          $('.progress .faq-bar1').css({ 'width': progression1 + '%' });

          if (progression1 == 70) {
              clearInterval(progress);

          } else
              progression1 += 1;

      }, 100);

      var progress1 = setInterval(function() {
          $('.progress .faq-text2').text(progression2 + '%');
          $('.progress .faq-text2').css({ 'left': progression2 + '%' });
          $('.progress .faq-text2').css({ 'top': '-20px' });
          $('.progress .faq-bar2').css({ 'width': progression2 + '%' });
          if (progression2 == 50) {
              clearInterval(progress1);

          } else
              progression2 += 1;

      }, 100);
      var progress2 = setInterval(function() {
          $('.progress .faq-text3').text(progression3 + '%');
          $('.progress .faq-text3').css({ 'left': progression3 + '%' });
          $('.progress .faq-text3').css({ 'top': '-20px' });
          $('.progress .faq-bar3').css({ 'width': progression3 + '%' });
          if (progression3 == 80) {
              clearInterval(progress2);

          } else
              progression3 += 1;

      }, 100);
      var progress3 = setInterval(function() {
          $('.progress .faq-text4').text(progression4 + '%');
          $('.progress .faq-text4').css({ 'left': progression4 + '%' });
          $('.progress .faq-text4').css({ 'top': '-20px' });
          $('.progress .faq-bar4').css({ 'width': progression4 + '%' });
          if (progression4 == 60) {
              clearInterval(progress3);

          } else
              progression4 += 1;

      }, 100);
  });
