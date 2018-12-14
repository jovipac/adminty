$(document).ready(function() {
    $('#basic-col-reorder').DataTable({
        colReorder: true
    });
    $('#realtime-reorder').dataTable({
        colReorder: {
            realtime: true
        }
    });
    $('#saving-reorder').dataTable({
        colReorder: true,
        stateSave: true
    });

    $('#predefine-reorder').dataTable({
        colReorder: {
            order: [4, 3, 2, 1, 0, 5]
        }
    });
});
