$(document).ready(function() {
    $('#res-config').DataTable({
        responsive: true
    });
    var newcs = $('#new-cons').DataTable();

    new $.fn.dataTable.Responsive(newcs);

    $('#show-hide-res').DataTable({
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.childRowImmediate,
                type: ''
            }
        }
    });
});
