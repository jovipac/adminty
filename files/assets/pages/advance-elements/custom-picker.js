"use strict";
$(document).ready(function(){
	 // Minimum setup
     $('#datetimepicker1').datetimepicker({
        icons: {
            time: "icofont icofont-clock-time",
            date: "icofont icofont-ui-calendar",
            up: "icofont icofont-rounded-up",
            down: "icofont icofont-rounded-down",
            next: "icofont icofont-rounded-right",
            previous: "icofont icofont-rounded-left"
        }
    });
    // Using Locales
    $('#datetimepicker2').datetimepicker({
        locale: 'ru',
        icons: {
            time: "icofont icofont-clock-time",
            date: "icofont icofont-ui-calendar",
            up: "icofont icofont-rounded-up",
            down: "icofont icofont-rounded-down",
            next: "icofont icofont-rounded-right",
            previous: "icofont icofont-rounded-left"
        }
    });
    // Custom Formats
    $('#datetimepicker3').datetimepicker({
        format: 'LT',
        icons: {
            time: "icofont icofont-clock-time",
            date: "icofont icofont-ui-calendar",
            up: "icofont icofont-rounded-up",
            down: "icofont icofont-rounded-down",
            next: "icofont icofont-rounded-right",
            previous: "icofont icofont-rounded-left"
        }
    });
    // No Icon (input field only)
    $('#datetimepicker4').datetimepicker({
        icons: {
            time: "icofont icofont-clock-time",
            date: "icofont icofont-ui-calendar",
            up: "icofont icofont-rounded-up",
            down: "icofont icofont-rounded-down",
            next: "icofont icofont-rounded-right",
            previous: "icofont icofont-rounded-left"
        }
    });
    // Enabled/Disabled Dates
    $('#datetimepicker5').datetimepicker({
        defaultDate: "11/1/2013",
        disabledDates: [
        moment("12/25/2013"),
        new Date(2013, 11 - 1, 21),
        "11/22/2013 00:53"
        ],
        icons: {
            time: "icofont icofont-clock-time",
            date: "icofont icofont-ui-calendar",
            up: "icofont icofont-rounded-up",
            down: "icofont icofont-rounded-down",
            next: "icofont icofont-rounded-right",
            previous: "icofont icofont-rounded-left"
        }
    });
    // Linked Pickers
    $('#datetimepicker6').datetimepicker({
        icons: {
            time: "icofont icofont-clock-time",
            date: "icofont icofont-ui-calendar",
            up: "icofont icofont-rounded-up",
            down: "icofont icofont-rounded-down",
            next: "icofont icofont-rounded-right",
            previous: "icofont icofont-rounded-left"
        }
    });
    $('#datetimepicker7').datetimepicker({
        useCurrent: false, //Important! See issue #1075
        icons: {
            time: "icofont icofont-clock-time",
            date: "icofont icofont-ui-calendar",
            up: "icofont icofont-rounded-up",
            down: "icofont icofont-rounded-down",
            next: "icofont icofont-rounded-right",
            previous: "icofont icofont-rounded-left"
        }
    });
    $("#datetimepicker6").on("dp.change", function(e) {
        $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepicker7").on("dp.change", function(e) {
        $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
    });

    // Custom icons
    $('#datetimepicker8').datetimepicker({
        icons: {
            time: "icofont icofont-clock-time",
            date: "icofont icofont-ui-calendar",
            up: "icofont icofont-rounded-up",
            down: "icofont icofont-rounded-down"
        }
    });

    // View Mode
    $('#datetimepicker9').datetimepicker({
        viewMode: 'years',
        icons: {
            time: "icofont icofont-clock-time",
            date: "icofont icofont-ui-calendar",
            up: "icofont icofont-rounded-up",
            down: "icofont icofont-rounded-down",
            next: "icofont icofont-rounded-right",
            previous: "icofont icofont-rounded-left"
        }
    });

    // Min View Mode
    $('#datetimepicker10').datetimepicker({
        viewMode: 'years',
        format: 'MM/YYYY',
        icons: {
            time: "icofont icofont-clock-time",
            date: "icofont icofont-ui-calendar",
            up: "icofont icofont-rounded-up",
            down: "icofont icofont-rounded-down",
            next: "icofont icofont-rounded-right",
            previous: "icofont icofont-rounded-left"
        }
    });
    // Disabled Days of the Week
    $('#datetimepicker11').datetimepicker({
        daysOfWeekDisabled: [0, 6],
        icons: {
            time: "icofont icofont-clock-time",
            date: "icofont icofont-ui-calendar",
            up: "icofont icofont-rounded-up",
            down: "icofont icofont-rounded-down",
            next: "icofont icofont-rounded-right",
            previous: "icofont icofont-rounded-left"
        }
    });

    $('input[name="daterange"]').daterangepicker();
    $(function() {
        $('input[name="birthdate"]').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true
        },
        function(start, end, label) {
            var years = moment().diff(start, 'years');
            alert("You are " + years + " years old.");
        });

        $('input[name="datefilter"]').daterangepicker({
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear'
            }
        });
        $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
        });

        $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
        });

        var start = moment().subtract(29, 'days');
        var end = moment();

        function cb(start, end) {
            $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }

        $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            "drops": "up",
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);

        cb(start, end);

        $('.input-daterange input').each(function() {
            $(this).datepicker();
        });
        $('#sandbox-container .input-daterange').datepicker({
            todayHighlight: true
        });
        $('.input-group-date-custom').datepicker({
            todayBtn: true,
            clearBtn: true,
            keyboardNavigation: false,
            forceParse: false,
            todayHighlight: true,
            defaultViewDate: {
                year: '2017',
                month: '01',
                day: '01'
            }
        });
        $('.multiple-select').datepicker({
            todayBtn: true,
            clearBtn: true,
            multidate: true,
            keyboardNavigation: false,
            forceParse: false,
            todayHighlight: true,
            defaultViewDate: {
                year: '2017',
                month: '01',
                day: '01'
            }
        });
        $('#config-demo').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "timePicker": true,
            "timePicker24Hour": true,
            "timePickerSeconds": true,
            "showCustomRangeLabel": false,
            "alwaysShowCalendars": true,
            "startDate": "11/30/2016",
            "endDate": "12/06/2016",
            "drops": "up"
        }, function(start, end, label) {
            console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
        });
    });

// Date-dropper js start

$("#dropper-default").dateDropper( {
        dropWidth: 200,
        dropPrimaryColor: "#1abc9c", 
        dropBorder: "1px solid #1abc9c"
    }),
$("#dropper-animation").dateDropper( {
        dropWidth: 200,
        init_animation: "bounce",
        dropPrimaryColor: "#1abc9c", 
        dropBorder: "1px solid #1abc9c"
    }),
$("#dropper-format").dateDropper( {
        dropWidth: 200,
        format: "F S, Y",
        dropPrimaryColor: "#1abc9c", 
        dropBorder: "1px solid #1abc9c"
    }),
$("#dropper-lang").dateDropper( {
        dropWidth: 200,
        format: "F S, Y",
        dropPrimaryColor: "#1abc9c", 
        dropBorder: "1px solid #1abc9c",
        lang: "ar"
    }),
$("#dropper-lock").dateDropper( {
        dropWidth: 200,
        format: "F S, Y",
        dropPrimaryColor: "#1abc9c", 
        dropBorder: "1px solid #1abc9c",
        lock: "from"
    }),
$("#dropper-max-year").dateDropper( {
        dropWidth: 200,        
        dropPrimaryColor: "#1abc9c", 
        dropBorder: "1px solid #1abc9c",
        maxYear: "2020"
    }),
$("#dropper-min-year").dateDropper( {
        dropWidth: 200,       
        dropPrimaryColor: "#1abc9c", 
        dropBorder: "1px solid #1abc9c",
        minYear: "1990"
    }),
$("#year-range").dateDropper( {
        dropWidth: 200,       
        dropPrimaryColor: "#1abc9c", 
        dropBorder: "1px solid #1abc9c",
        yearsRange: "5"
    }),
$("#dropper-width").dateDropper( {         
        dropPrimaryColor: "#1abc9c", 
        dropBorder: "1px solid #1abc9c",
        dropWidth: 500
    }),
$("#dropper-dangercolor").dateDropper( {  
        dropWidth: 200,       
        dropPrimaryColor: "#e74c3c", 
        dropBorder: "1px solid #e74c3c",        
    }),
$("#dropper-backcolor").dateDropper( {  
        dropWidth: 200,       
        dropPrimaryColor: "#1abc9c", 
        dropBorder: "1px solid #1abc9c", 
        dropBackgroundColor: "#bdc3c7"       
    }),
$("#dropper-txtcolor").dateDropper( {  
        dropWidth: 200,       
        dropPrimaryColor: "#46627f", 
        dropBorder: "1px solid #46627f", 
        dropTextColor: "#FFF",
        dropBackgroundColor: "#e74c3c"       
    }),
$("#dropper-radius").dateDropper( {
        dropWidth: 200,       
        dropPrimaryColor: "#1abc9c", 
        dropBorder: "1px solid #1abc9c",
        dropBorderRadius: "0"
    }),
$("#dropper-border").dateDropper( {
        dropWidth: 200,       
        dropPrimaryColor: "#1abc9c",        
        dropBorder: "2px solid #1abc9c"
    }),
$("#dropper-shadow").dateDropper( {
        dropWidth: 200,       
        dropPrimaryColor: "#1abc9c", 
        dropBorder: "1px solid #1abc9c",
        dropBorderRadius: "20px",
        dropShadow: "0 0 20px 0 rgba(26, 188, 156, 0.6)"
    })
// Date-dropper js end

// Color picker js start
function change_checkbox_color() {
    $('.color-box .show-box').on('click', function() {
        $(".color-box").toggleClass("open");
    });

    $('.colors-list a').on('click', function() {
        var curr_color = $('main').data('checkbox-color');
        var color = $(this).data('checkbox-color');
        var new_colot = 'checkbox-' + color;

        $('.rkmd-checkbox .input-checkbox').each(function(i, v) {
            var findColor = $(this).hasClass(curr_color);

            if (findColor) {
                $(this).removeClass(curr_color);
                $(this).addClass(new_colot);
            }

            $('main').data('checkbox-color', new_colot);

        });
    });
}
// Color picker
$("#custom").spectrum({
    color: "#f00"
});
$("#flat").spectrum({
    flat: true,
    showInput: true
});
$("#flatClearable").spectrum({
    flat: true,
    showInput: true,
    allowEmpty: true
});
// Color picker js end

// Mini-color js start
$('.demo').each( function() {
                //
                // Dear reader, it's actually very easy to initialize MiniColors. For example:
                //
                //  $(selector).minicolors();
                //
                // The way I've done it below is just for the demo, so don't get confused
                // by it. Also, data- attributes aren't supported at this time...they're
                // only used for this demo.
                //
                $(this).minicolors({
                    control: $(this).attr('data-control') || 'hue',
                    defaultValue: $(this).attr('data-defaultValue') || '',
                    format: $(this).attr('data-format') || 'hex',
                    keywords: $(this).attr('data-keywords') || '',
                    inline: $(this).attr('data-inline') === 'true',
                    letterCase: $(this).attr('data-letterCase') || 'lowercase',
                    opacity: $(this).attr('data-opacity'),
                    position: $(this).attr('data-position') || 'bottom left',
                    swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
                    change: function(value, opacity) {
                        if( !value ) return;
                        if( opacity ) value += ', ' + opacity;
                        if( typeof console === 'object' ) {
                            console.log(value);
                        }
                    },
                    theme: 'bootstrap'
                });

            });
// Mini-color js ends
});