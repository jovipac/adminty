$(document).ready(function() {
    $('#autofill').DataTable({
        autoFill: true
    });

    $('#key-intergration').DataTable({
        keys: true,
        autoFill: true
    });

    $('#confirm-table').DataTable({
        autoFill: {
            alwaysAsk: true
        }
    });

    $('#colum-select').DataTable({
        columnDefs: [{
            orderable: false,
            className: 'select-checkbox',
            targets: 0
        }],
        select: {
            style: 'os',
            selector: 'td:first-child'
        },
        order: [
            [1, 'asc']
        ],
        autoFill: {
            columns: ':not(:first-child)'
        }
    });

    var safill = $('#scroll-fill').dataTable( {
        scrollY: 400,
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        autoFill: true
    } );


});
