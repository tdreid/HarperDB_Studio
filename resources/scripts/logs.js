$( document ).ready(function() {

    var logTable = $('#logsTable').DataTable({
        "dom": "<'row'<'col-md-12't><'col-md-4'<'pull-left'l>><'col-md-8 right-pagging'p>>",
        "lengthMenu": [ [10, 50,100, -1], [10, 50, 100,  "All"] ],
        "iDisplayLength": 10,
    });

    $('#searchlogs').keyup(function () {        
        logTable.search($(this).val()).draw();
    });

});






