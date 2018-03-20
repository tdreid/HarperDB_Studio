let firstFilterCol = '';
let grobalSchemas = '';
let operations = ['=', '<', '<=', '>', '>=', 'LIKE', 'in']
let condition = ['AND', 'OR']

$(document).ready(function () {

    var schemas = document.getElementById('schemas').value;
    grobalSchemas = JSON.parse(schemas);
    var keys = Object.keys(grobalSchemas);

    firstFilterCol = $('#firstFilterColumn').children();

    getSchemas(keys);
    removeFilter();

    $('#AddFilterColumn').click(e => {

        var firstFilter = $('#firstFilterColumn');
        if (firstFilter.children().length == 0) {
            createFirstFilterColumn();
        } else
            createOtherFilterColumn();
    })

    selectToggle();

    $('#searchSqlBtn, .fa-refresh').click(function (e) {
        $(document.body).css({
            'cursor': 'wait'
        });
        var table = document.getElementById('selectTable').value
        var schema = document.getElementById('selectSchema').value
        table = "\"" + table + "\"";
        schema = "\"" + schema + "\"";
        var tableName = schema + '.' + table;
        let queryString = "SELECT * FROM " + tableName;
        var first = $('#firstFilterColumn .col-md-12').children().children();
        var whereString = '';
        if (first.length > 0) {
            whereString = " WHERE " + first[1].value + " " + first[2].value + " " + first[3].value.replace(/"/g, '\'');;
        }

        var others = $('#otherFilterColumn .col-md-12').children().children();
        var moreQuery = '';
        if (others.length > 0) {
            moreQuery = ' ';
            for (var i = 0; i < others.length; i++) {
                var curValue = null;
                if (i % 5 != 4) {
                    if (i % 5 == 1)
                        curValue = "\"" + others[i].value + "\""
                    else
                        curValue = others[i].value.replace(/"/g, '\'');
                    moreQuery += curValue + ' ';
                }
            }

        }

        $.ajax({
            type: "POST",
            url: '/explore/filter_search',
            data: {
                sql: queryString + whereString + moreQuery
            },
            success: function (obj) {
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-top-full-width",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }

                if (obj.result.error != undefined) {
                    toastr.error(obj.result.error);
                } else {
                    toastr.success(obj.sql);
                    var columnssss = [];
                    if (obj.result.length > 0) {
                        Object.keys(obj.result[0]).forEach(element => {
                            columnssss.push({
                                title: element
                            })
                        });

                        var data = [];
                        obj.result.forEach(element => {
                            data.push(Object.values(element));
                        });
                        if ($.fn.DataTable.isDataTable('#resultTable')) {
                            sTable.destroy();
                            $('#resultTable').empty();
                        }
                        sTable = $('#resultTable').DataTable({
                            data: data,
                            columns: columnssss,
                            "dom": "<'col-md-12't><'col-md-4'<'pull-left'l>><'col-md-8 right-pagging'p>",
                            "lengthMenu": [
                                [10, 50, 100, -1],
                                [10, 50, 100, "All"]
                            ],
                            "iDisplayLength": 10,
                            buttons: [{
                                extend: 'csvHtml5',
                                text: '<i class="fa fa-refresh"></i>',
                                titleAttr: 'CSV'
                            }]
                        });
                    } else {
                        if ($.fn.DataTable.isDataTable('#resultTable')) {
                            sTable.destroy();
                            $('#resultTable').empty();
                        }
                        alert('data is empty');
                    }
                }
                $(document.body).css({
                    'cursor': 'default'
                });

            },
            error: function (err) {
                $(document.body).css({
                    'cursor': 'default'
                });
                console.log(err);
            }
        });
    })

    //export
    $('.fa-sign-out').click(() => {
        sTable.button(0).trigger();
    })

    //reset
    
});
var removeFilter = () => {
    $('.removeicon .fa').click(function (e) {
        console.log(e);
        $(this).parent().parent().parent().remove();
    })
}

var selectToggle = () => {
    $("#selectSchema").change(function () {
        $('#otherFilterColumn').children().remove()
        var type = document.getElementById('selectSchema').value;

        getTables(type);
    });

    $("#selectTable").change(function () {
        $('#otherFilterColumn').children().remove()
        var schema = document.getElementById('selectSchema').value;
        var table = document.getElementById('selectTable').value;
        getAttribute(schema, table);
    });
}

createFirstFilterColumn = () => {
    $('#firstFilterColumn').append(firstFilterCol);
    removeFilter();

}

createOtherFilterColumn = () => {

    var curNum = $('#otherFilterColumn .row').length;
    curNum += 1;
    while (-1) {
        if (document.getElementById('conditionsAttribute' + curNum) != null)
            curNum++;
        else
            break;
    }
    var rowDiv = document.createElement('div');
    rowDiv.setAttribute('class', 'row filterrow')

    var colDiv = document.createElement('div')
    colDiv.setAttribute('class', 'col-md-12')


    var btnGroupDiv = document.createElement('div')
    btnGroupDiv.setAttribute('class', 'btn-group minfiltertitle')
    btnGroupDiv.setAttribute('style', 'float:left')

    var conditions = document.createElement('select')
    conditions.setAttribute('id', 'conditionsAttribute' + curNum)
    conditions.setAttribute('name', 'conditionsAttribute' + curNum)
    condition.forEach(element => {
        var conditionOption = document.createElement('option')
        conditionOption.setAttribute('value', element)
        conditionOption.append(element)
        conditions.append(conditionOption);
    });

    // var andDiv = document.createElement('div')
    // andDiv.append(conditions);

    btnGroupDiv.append(conditions)

    colDiv.append(btnGroupDiv)

    var btnGroupDivColumn = document.createElement('div')
    btnGroupDivColumn.setAttribute('class', 'btn-group minfiltertitle')
    btnGroupDivColumn.setAttribute('style', 'float:left; margin-left:10px;')

    var columnSelect = document.createElement('select')
    columnSelect.setAttribute('id', 'selectAttribute' + curNum)
    columnSelect.setAttribute('name', 'selectedAttribute' + curNum)

    var attributes = [];
    var schema = document.getElementById('selectSchema').value;
    var table = document.getElementById('selectTable').value;
    if (grobalSchemas[schema][table]['attributes'] != undefined)
        attributes = grobalSchemas[schema][table]['attributes'].map(a => a.attribute);

    var options = document.createElement('option')
    options.setAttribute('value', '')
    options.append('Select Column')

    attributes.forEach(element => {
        options = document.createElement('option')
        options.setAttribute('value', element)
        options.append(element)
        columnSelect.append(options);
    });

    btnGroupDivColumn.append(columnSelect);

    colDiv.append(btnGroupDivColumn)

    var btnGroupDivOperation = document.createElement('div')
    btnGroupDivOperation.setAttribute('class', 'btn-group minfiltertitle')
    btnGroupDivOperation.setAttribute('style', 'float:left; margin-left:10px;')

    var operationSelect = document.createElement('select')
    operationSelect.setAttribute('id', 'selectOperation' + curNum)
    operationSelect.setAttribute('name', 'selectedOperation' + curNum)

    operations.forEach(element => {
        var options = document.createElement('option')
        options.setAttribute('value', element)
        options.append(element)
        operationSelect.append(options);
    });

    btnGroupDivOperation.append(operationSelect);

    colDiv.append(btnGroupDivOperation)

    var valueDiv = document.createElement('div')

    var valueInput = document.createElement('input')
    valueInput.setAttribute('name', 'value' + curNum)
    valueInput.setAttribute('class', 'form-control minwidthtextbox')
    valueInput.setAttribute('style', 'float:left; margin-left:10px; max-width:200px; margin-right:5px;')
    valueInput.setAttribute('placeholder', 'Enter Value')
    valueDiv.append(valueInput);
    colDiv.append(valueDiv)

    var removeDiv = document.createElement('div')
    removeDiv.setAttribute('class', 'removeicon')

    var removeIcon = document.createElement('i')
    removeIcon.setAttribute('class', 'fa fa-times text-red')

    removeDiv.append(removeIcon);

    colDiv.append(removeDiv)

    rowDiv.append(colDiv);
    $('#otherFilterColumn').append(rowDiv);
    selectToggle();
    removeFilter();
}

var getSchemas = (schemas) => {
    schemas.forEach(element => {
        $('#selectSchema').append('<option value="' + element + '"> ' + element + '</option>');
    });
}

var getTables = (schema) => {

    var tableKeys = [];
    if (grobalSchemas[schema] != undefined)
        tableKeys = Object.keys(grobalSchemas[schema]);

    $('#selectTable').children().remove();
    $('#selectTable').append('<option value="">Select Table</option>');
    tableKeys.forEach(element => {
        $('#selectTable').append('<option value="' + element + '"> ' + element + '</option>');
    });
}

var getAttribute = (schema, table) => {
    var attributes = [];

    if (grobalSchemas[schema][table]['attributes'] != undefined)
        attributes = grobalSchemas[schema][table]['attributes'].map(a => a.attribute);
    $('#selectAttribute').children().remove();
    attributes.forEach(element => {
        $('#selectAttribute').append('<option value="' + element + '"> ' + element + '</option>');
    });

}