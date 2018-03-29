var NumRecords = [];
$(document).ready(function () {
    createuploadFileType();
    $('#deleteModal').on('show.bs.modal', function (e) {
        var name = $(e.relatedTarget).data('id');
        var type = $(e.relatedTarget).data('type');
        document.getElementById('deleteName').value = name;
        document.getElementById('deleteType').value = type;
        console.log(document.getElementById('deleteName'))
        console.log( document.getElementById('deleteType'))

        document.getElementById('comfirmMessage').innerHTML = 'Are you sure for delete ' + name + ' ?';
    });

    $('#uploadCSVModal').on('show.bs.modal', function (e) {
        var tableName = $(e.relatedTarget).data('id');
        document.getElementById('tableName').value = tableName;
    });

    $('#addCSVForm').submit(function() {
        $("#addCSVBtn").attr("disabled", true);
        return true;
    });

    $("#csvType").change(function () {
        var type = document.getElementById('csvType').value;

        if (type == 'file')
            createuploadFileType();
        else if (type == 'url')
            createUrlCSVType()
        else 
        createDataCSVType();
    });

    getNumOfRecords();

});

createuploadFileType = () => {

    var appendChangeType = document.getElementById('changeCSVType');

    appendChangeType.innerHTML = '';
   
    var btnDiv = document.createElement('div')
    btnDiv.setAttribute('class', 'btn-group clear mr-2')
    btnDiv.setAttribute('style', 'float:left')

    var span = document.createElement('span')
    span.setAttribute('class', 'minwidth150 mr-2')
    span.append('Path CSV File')


    var upload = document.createElement('input');
    upload.setAttribute('type', 'text');
    upload.setAttribute('name', 'csvPath')
    upload.setAttribute('id', 'uploadFileCsv')
    upload.setAttribute('class', 'minwidth250 form-controls')
    btnDiv.append(span)
    btnDiv.append(upload)
    appendChangeType.append(btnDiv);
}

createUrlCSVType = () => {
    var appendChangeType = document.getElementById('changeCSVType');

    appendChangeType.innerHTML = '';
   
    var btnDiv = document.createElement('div')
    btnDiv.setAttribute('class', 'btn-group clear mr-2')
    btnDiv.setAttribute('style', 'float:left')

    var span = document.createElement('span')
    span.setAttribute('class', 'minwidth150 mr-2')
    span.append('CSV Url')


    var upload = document.createElement('input');
    upload.setAttribute('type', 'text');
    upload.setAttribute('name', 'csvUrl')
    upload.setAttribute('class', 'minwidth250 form-controls')
    btnDiv.append(span)
    btnDiv.append(upload)
    appendChangeType.append(btnDiv);
}

createDataCSVType = () => {
    var appendChangeType = document.getElementById('changeCSVType');

    appendChangeType.innerHTML = '';
   
    var btnDiv = document.createElement('div')
    btnDiv.setAttribute('class', 'btn-group clear mr-2')
    btnDiv.setAttribute('style', 'float:left')

    var span = document.createElement('span')
    span.setAttribute('class', 'minwidth150 mr-2')
    span.append('CSV Data')
    

    var upload = document.createElement('textarea');
    upload.setAttribute('name', 'csvData')
    upload.setAttribute('class', 'minwidth250 form-controls')
    btnDiv.append(span)
    btnDiv.append(upload)
    appendChangeType.append(btnDiv);
}

getNumOfRecords = () => {
    var schemaName = document.getElementById('schemaName').value;
    $( "span.numOfRecords" ).each(function( index ) {
        var tableName = $( this )[0].id;
        console.log( schemaName + '.'  + tableName );
        $.ajax({
            type: "POST",
            url: '/schema/records',
            data: {
                schemaName: schemaName,
                tableName: tableName
            },
            success: function (res) {
                console.log(res[0]);
                console.log( tableName );
                if (res[0] != undefined)                    
                    $( 'span.numOfRecords#' + tableName).html(res[0].num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ' records / datasize');
                else                     
                    $( 'span.numOfRecords#' + tableName).html('no record / datasize');
            },
            error: function (err) {
                console.log(err);
            }
        });
      });

}