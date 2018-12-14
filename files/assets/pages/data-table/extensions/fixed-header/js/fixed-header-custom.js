$(document).ready(function() {
    $('#fix-header').DataTable({
        fixedHeader: true
    });

    var hfoot = $('#header-footer-fix').DataTable({
        fixedHeader: {
            header: true,
            footer: true
        }
    });
    var colheader = $('#col-header').DataTable({
        fixedHeader: true,
        colReorder: true
    });
});
