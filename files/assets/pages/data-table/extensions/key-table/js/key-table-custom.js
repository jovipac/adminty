$(document).ready(function() {
    $('#basic-key-table').DataTable({
        keys: true
    });
    var skeytable = $('#scrool-key').DataTable({
        scrollY: 300,
        paging: false,
        keys: true
    });
    $('#focus-key').DataTable({
        keys: true
    });
    var events = $('#events');
    var ekt = $('#events-key-table').DataTable( {
        keys: true
    } );
 
    ekt
        .on( 'key', function ( e, datatable, key, cell, originalEvent ) {
            events.prepend( '<div>Key press: '+key+' for cell <i>'+cell.data()+'</i></div>' );
        } )
        .on( 'key-focus', function ( e, datatable, cell ) {
            events.prepend( '<div>Cell focus: <i>'+cell.data()+'</i></div>' );
        } )
        .on( 'key-blur', function ( e, datatable, cell ) {
            events.prepend( '<div>Cell blur: <i>'+cell.data()+'</i></div>' );
        } )
});
