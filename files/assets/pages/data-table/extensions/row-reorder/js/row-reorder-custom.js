$(document).ready(function() {
    var basicrow = $('#basic-row-reorder').DataTable({
        rowReorder: true
    });

    var fullrow = $('#full-row-reorder').DataTable({
        rowReorder: {
            selector: 'tr'
        },
        columnDefs: [
            { targets: 0, visible: false }
        ]
    });
    var resrow = $('#responsive-reorder').DataTable({
        rowReorder: {
            selector: 'td:nth-child(2)'
        },
        responsive: true
    });
    
    var rowevents = $('#reorder-events').DataTable({
        rowReorder: true
    });

    rowevents.on('row-reorder', function(e, diff, edit) {
        var result = 'Reorder started on row: ' + edit.triggerRow.data()[1] + '<br>';

        for (var i = 0, ien = diff.length; i < ien; i++) {
            var rowData = rowevents.row(diff[i].node).data();

            result += rowData[1] + ' updated to be in position ' +
                diff[i].newData + ' (was ' + diff[i].oldData + ')<br>';
        }

        $('#result').html('Event result:<br>' + result);
    });
});
