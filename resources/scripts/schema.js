$(document).ready(function () {
    createAddTableType();
    $("#addType").change(function () {
        var type = document.getElementById('addType').value;
        if (type == 'table')
            createAddTableType();
        else
            createAddSchemaType();
    })

});

createAddTableType = () => {
    var schemas = document.getElementById('schemas').value;
    var appendChangeType = document.getElementById('changeAddType');

    appendChangeType.innerHTML = '';
    schemas = JSON.parse(schemas);
    var schemaNames = [];
    for (var prop in schemas) {
        schemaNames.push(prop);
    }

    var btnDiv = document.createElement('div')
    btnDiv.setAttribute('class', 'btn-group clear mr-2')
    btnDiv.setAttribute('style', 'float:left')

    var span = document.createElement('span')
    span.setAttribute('class', 'minwidth150 mr-2')
    span.append('Select Schema')

    var select = document.createElement('select');
    select.setAttribute('class', 'minwidth250')
    select.setAttribute('name', 'schemaName')
    select.setAttribute('id', 'schemaName')
    select.setAttribute('required', true)
    
    schemaNames.forEach(element => {
        var options = document.createElement('option');
        options.setAttribute('value', element)
        options.append(element)
        select.append(options);
    });

    btnDiv.append(span);
    btnDiv.append(select);
    appendChangeType.append(btnDiv);

    btnDiv = document.createElement('div')
    btnDiv.setAttribute('class', 'btn-group clear mt-2')
    btnDiv.setAttribute('style', 'float:left')

    var input = document.createElement('input');
    input.setAttribute('class', 'minwidth250')
    input.setAttribute('name', 'tableName')
    input.setAttribute('id', 'tableName')
    input.setAttribute('required', true)

    span = document.createElement('span')
    span.setAttribute('class', 'minwidth150 mr-2')
    span.append('Table Name')

    btnDiv.append(span)
    btnDiv.append(input)

    appendChangeType.append(btnDiv);

    btnDiv = document.createElement('div')
    btnDiv.setAttribute('class', 'btn-group clear mt-2')
    btnDiv.setAttribute('style', 'float:left')
    
    var input = document.createElement('input');
    input.setAttribute('class', 'minwidth250')
    input.setAttribute('name', 'hashAttribute')
    input.setAttribute('id', 'hashAttribute')
    input.setAttribute('required', true)

    span = document.createElement('span')
    span.setAttribute('class', 'minwidth150 mr-2')
    span.append('Hash Attribute')

    btnDiv.append(span)
    btnDiv.append(input)
    appendChangeType.append(btnDiv);
    $("div #exampleModalLongTitle").text("Add Table");
}

createAddSchemaType = () => {
    var appendChangeType = document.getElementById('changeAddType');
    exampleModalLongTitle
    appendChangeType.innerHTML = '';
    var btnDiv = document.createElement('div')

    btnDiv.setAttribute('class', 'btn-group')
    btnDiv.setAttribute('style', 'float:left')

    var span = document.createElement('span')
    span.setAttribute('class', 'minwidth150 mr-2')
    span.append('Schema Name')

    var input = document.createElement('input');
    input.setAttribute('class', 'minwidth250')
    input.setAttribute('name', 'schemaName')
    input.setAttribute('id', 'schemaName')
    input.setAttribute('required', true)

    btnDiv.append(span);
    btnDiv.append(input);
    appendChangeType.append(btnDiv);
    $("div #exampleModalLongTitle").text("Add Schema");
}