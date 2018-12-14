 $(document).ready(function() {
     /***************************************/
     /* Popup menu forms */
     /***************************************/
     // If user clicks on the 'subscribe' item
     // Open popup-menu subscribe form
     $('#sub-popup-menu').on('click', function() {
         if ($('#sub-popup-menu .popup-list-wrapper').css('display') == 'none') {
             $('#sub-popup-menu .popup-list-wrapper').css({
                 display: 'block',
                 left: 'auto',
                 right: '0',
                 opacity: '1'
             });
         }
     });
     // If user clicks on the 'login' item
     // Open popup-menu login form
     $('#log-popup-menu').on('click', function() {
         if ($('#log-popup-menu .popup-list-wrapper').css('display') == 'none') {
             $('#log-popup-menu .popup-list-wrapper').css({
                 display: 'block',
                 left: 'auto',
                 right: '0',
                 opacity: '1'
             });
         }
     });
     // If user clicks on the 'registration' item
     // Open popup-menu registration form
     $('#reg-popup-menu').on('click', function() {
         if ($('#reg-popup-menu .popup-list-wrapper').css('display') == 'none') {
             $('#reg-popup-menu .popup-list-wrapper').css({
                 display: 'block',
                 left: 'auto',
                 right: '0',
                 opacity: '1'
             });
         }
     });

     // Add an event listener
     // If user clicks outside a form
     // The form will disappear
     $(document).on('click touchstart', function(event) {
         // Close popup-menu 'subscribe' form
         if (!$(event.target).closest('#sub-popup-menu').length) {
             if ($('#sub-popup-menu .popup-list-wrapper').css('display') == 'block') {
                 $('#sub-popup-menu .popup-list-wrapper').css({
                     display: 'none',
                     left: '-9999px',
                     opacity: '0'
                 });
             }
         }
         // Close popup-menu 'login' form
         if (!$(event.target).closest('#log-popup-menu').length) {
             if ($('#log-popup-menu .popup-list-wrapper').css('display') == 'block') {
                 $('#log-popup-menu .popup-list-wrapper').css({
                     display: 'none',
                     left: '-9999px',
                     opacity: '0'
                 });
             }
         }
         // Close popup-menu 'registration' form
         if (!$(event.target).closest('#reg-popup-menu').length) {
             if ($('#reg-popup-menu .popup-list-wrapper').css('display') == 'block') {
                 $('#reg-popup-menu .popup-list-wrapper').css({
                     display: 'none',
                     left: '-9999px',
                     opacity: '0'
                 });
             }
         }
     });
     /***************************************/
     /* end popup menu forms */
     /***************************************/
 });
