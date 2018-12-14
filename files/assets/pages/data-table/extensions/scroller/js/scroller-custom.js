$(document).ready(function() {
    $('#basic-scroller').DataTable({
        ajax: "dt-json-data/2500.txt",
        deferRender: true,
        scrollY: 200,
        scrollCollapse: true,
        scroller: true
    });
    $('#state-scroller').DataTable({
        ajax: "dt-json-data/2500.txt",
        deferRender: true,
        scrollY: 200,
        scrollCollapse: true,
        scroller: true,
        stateSave: true
    });
    $('#api-scroller').DataTable({
        ajax: "dt-json-data/2500.txt",
        deferRender: true,
        scrollY: 200,
        scrollCollapse: true,
        scroller: true,
        initComplete: function() {
            this.api().row(1000).scrollTo();
        }
    });
});
