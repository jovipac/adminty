 $(document).ready(function() {
     /***************************************/
     /* Initiallizing for the plugin */
     /***************************************/
     $('.currency').autoNumeric('init');
     /***************************************/
     /* end Initiallizing for the plugin */
     /***************************************/

     /***************************************/
     /* Select currency section */
     /***************************************/
     $('#input-select-currency').autoNumeric('init');

     $('#radio-select-currency').change(function() {
         var value = $('#radio-select-currency input:checked').val();

         if (value == 'dollar') {
             $('#input-select-currency').autoNumeric('update', { aSign: '$ ' });
         }
         if (value == 'euro') {
             $('#input-select-currency').autoNumeric('update', { aSign: '€ ' });
         }
         if (value == 'pound') {
             $('#input-select-currency').autoNumeric('update', { aSign: '£ ' });
         }
         if (value == 'yen') {
             $('#input-select-currency').autoNumeric('update', { aSign: '¥ ' });
         }
     }).change();
     /***************************************/
     /* end Select currency section */
     /***************************************/


 });


 $(function() {
     // Default
     $("#stepper1").stepper({});

     // Disable mouse wheel
     $("#stepper2").stepper({
         allowWheel: false,
         UI: false,
         arrowStep: 0.1
     });

     // Value range (min: -10; max: 10)
     $("#stepper3").stepper({
         limit: [-10, 10],
         wheelStep: 0.2,
     });

     // Limit (min: 5)
     $("#stepper4").stepper({
         limit: [5, ]
     });
 });
