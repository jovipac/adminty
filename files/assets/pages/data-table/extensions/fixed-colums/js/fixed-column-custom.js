$(document).ready(function() {

    var lrfix = $('#left-right-fix').DataTable({
        scrollY: "300px",
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        fixedColumns: {
            leftColumns: 0,
            rightColumns: 5
        }
    });

    var rfix = $('#right-fix').DataTable({
        scrollY: "300px",
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        fixedColumns: {
            leftColumns: 0,
            rightColumns: 5
        }
    });
    
    var mfix = $('#multi-fix').DataTable( {
        scrollY: "300px",
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        fixedColumns:{
            leftColumns: 0,
            rightColumns: 5
        
        }
    } );
    
});
