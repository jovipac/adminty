$(document).ready(function() {
    $('#single-select').DataTable({
        select: true
    });
    $('#multi-select').DataTable({
        select: {
            style: 'multi'
        }
    });
    $('#cell-select').DataTable({
        select: {
            style: 'os',
            items: 'cell'
        }
    });
    $('#checkbox-select').DataTable({
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
        ]
    });
    var table = $('#button-select').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'selected',
            'selectedSingle',
            'selectAll',
            'selectNone',
            'selectRows',
            'selectColumns',
            'selectCells'
        ],
        select: true
    });
});
