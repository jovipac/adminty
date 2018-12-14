$(document).ready(function() {

    // Phone masking
    $("#phone").mask("(999) 999-9999", { placeholder: "x" });

    /***************************************/
    /* Datepicker */
    /***************************************/
    // Start date
    function dateFrom(date_from, date_to) {
        $(date_from).datepicker({
            dateFormat: "mm/dd/yy",
            prevText: '<i class="fa fa-caret-left"></i>',
            nextText: '<i class="fa fa-caret-right"></i>',
            onClose: function(selectedDate) {
                $(date_to).datepicker("option", "minDate", selectedDate);
            }
        });
    }

    // Finish date
    function dateTo(date_from, date_to) {
        $(date_to).datepicker({
            dateFormat: "mm/dd/yy",
            prevText: '<i class="fa fa-caret-left"></i>',
            nextText: '<i class="fa fa-caret-right"></i>',
            onClose: function(selectedDate) {
                $(date_from).datepicker("option", "maxDate", selectedDate);
            }
        });
    }

    // Destroy date
    function destroyDate(date) {
        $(date).datepicker("destroy");
    }

    // Initialize date range
    dateFrom("#date_from", "#date_to");
    dateTo("#date_from", "#date_to");
    /***************************************/
    /* end datepicker */
    /***************************************/

    // Validation
    $("#j-pro").justFormsPro({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true
            },
            adults: {
                required: true,
                integer: true,
                minvalue: 0
            },
            children: {
                required: true,
                integer: true,
                minvalue: 0
            },
            date_from: {
                required: true
            },
            date_to: {
                required: true
            },
            message: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Add your name"
            },
            email: {
                required: "Add your email",
                email: "Incorrect email format"
            },
            phone: {
                required: "Add your phone"
            },
            adults: {
                required: "Field is required",
                integer: "Only integer allowed",
                minvalue: "Value not less than 0"
            },
            children: {
                required: "Field is required",
                integer: "Only integer allowed",
                minvalue: "Value not less than 0"
            },
            date_from: {
                required: "Select check-in date"
            },
            date_to: {
                required: "Select check-out date"
            },
            message: {
                required: "Enter your message"
            }
        },
        afterSubmitHandler: function() {
            // Destroy date range
            destroyDate("#date_from");
            destroyDate("#date_to");

            // Initialize date range
            dateFrom("#date_from", "#date_to");
            dateTo("#date_from", "#date_to");

            return true;
        }
    });
});
