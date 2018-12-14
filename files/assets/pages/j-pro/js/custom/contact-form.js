$(document).ready(function() {

    /***************************************/
    /* Google map */
    /***************************************/
    function initialize() {
        var mapProp = {
            center: new google.maps.LatLng(40.7456584, -73.9787703, 12),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("google-map"), mapProp);
    }

    google.maps.event.addDomListener(window, 'load', initialize);
    /***************************************/
    /* end Google map */
    /***************************************/

    // Phone masking
    $('#phone').mask('(999) 999-9999', { placeholder: 'x' });

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
            message: {
                required: "Enter your message"
            }
        }
    });
});
