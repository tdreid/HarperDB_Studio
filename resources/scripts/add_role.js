$(document).ready(function () {


    $('.trees > li label').click(function () {
        $(this).parent().find('ul').toggle();
    });

    var schemas = document.getElementById('schemaAll').value

    schemas = JSON.parse(schemas);

    console.log(schemas);

    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

    elems.forEach(function (html) {
        var switchery = new Switchery(html, {
            size: 'small'
        });
    });

    var changeAllSchemas = document.querySelector('#all-schema');
    var specials = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
    specials.shift();
    specials.shift();
    changeAllSchemas.onchange = function () {
        console.log(changeAllSchemas.checked);
        if (changeAllSchemas.checked) {
            //true            
            specials.forEach(special => {
                if (!special.checked) {
                    special.checked = true;
                    if (typeof Event === 'function' || !document.fireEvent) {
                        var event = document.createEvent('HTMLEvents');
                        event.initEvent('change', true, true);
                        special.dispatchEvent(event);
                    } else {
                        special.fireEvent('onchange');
                    }
                }
            });
        } else {
            specials.forEach(special => {
                if (special.checked) {
                    special.checked = false;
                    if (typeof Event === 'function' || !document.fireEvent) {
                        var event = document.createEvent('HTMLEvents');
                        event.initEvent('change', true, true);
                        special.dispatchEvent(event);
                    } else {
                        special.fireEvent('onchange');
                    }
                }
            });
        }
    }

    $('.js-switch.schema').change(function (e) {
        var schemaName = $(this).attr('id');
        var changeAllTable = document.querySelector('#' + schemaName);
        var tableChilds = document.querySelectorAll('.' + schemaName);

        if (changeAllTable.checked) {
            //true            
            tableChilds.forEach(eachNode => {
                if (!eachNode.checked) {
                    eachNode.checked = true;
                    if (typeof Event === 'function' || !document.fireEvent) {
                        var event = document.createEvent('HTMLEvents');
                        event.initEvent('change', true, true);
                        eachNode.dispatchEvent(event);
                    } else {
                        eachNode.fireEvent('onchange');
                    }
                }
            });
        } else {
            tableChilds.forEach(eachNode => {
                if (eachNode.checked) {
                    eachNode.checked = false;
                    if (typeof Event === 'function' || !document.fireEvent) {
                        var event = document.createEvent('HTMLEvents');
                        event.initEvent('change', true, true);
                        eachNode.dispatchEvent(event);
                    } else {
                        eachNode.fireEvent('onchange');
                    }
                }
            });
        }

    })


    $('.js-switch.table').change(function (e) {
        var schemaName = $(this).attr('id');
        var changeAllTable = document.querySelector('#' + schemaName);
        var tableChilds = document.querySelectorAll('.' + schemaName);

        if (changeAllTable.checked) {
            //true            
            tableChilds.forEach(eachNode => {
                if (!eachNode.checked) {
                    eachNode.checked = true;
                    if (typeof Event === 'function' || !document.fireEvent) {
                        var event = document.createEvent('HTMLEvents');
                        event.initEvent('change', true, true);
                        eachNode.dispatchEvent(event);
                    } else {
                        eachNode.fireEvent('onchange');
                    }
                }
            });
        } else {
            tableChilds.forEach(eachNode => {
                if (eachNode.checked) {
                    eachNode.checked = false;
                    if (typeof Event === 'function' || !document.fireEvent) {
                        var event = document.createEvent('HTMLEvents');
                        event.initEvent('change', true, true);
                        eachNode.dispatchEvent(event);
                    } else {
                        eachNode.fireEvent('onchange');
                    }
                }
            });
        }
    })


    $('.js-switch.attribute').change(function (e) {
        var schemaName = $(this).attr('id');
        var changeAllTable = document.querySelector('#' + schemaName);
        var tableChilds = document.querySelectorAll('.' + schemaName);

        if (changeAllTable.checked) {
            //true            
            tableChilds.forEach(eachNode => {
                if (!eachNode.checked) {
                    eachNode.checked = true;
                    if (typeof Event === 'function' || !document.fireEvent) {
                        var event = document.createEvent('HTMLEvents');
                        event.initEvent('change', true, true);
                        eachNode.dispatchEvent(event);
                    } else {
                        eachNode.fireEvent('onchange');
                    }
                }
            });
        } else {
            tableChilds.forEach(eachNode => {
                if (eachNode.checked) {
                    eachNode.checked = false;
                    if (typeof Event === 'function' || !document.fireEvent) {
                        var event = document.createEvent('HTMLEvents');
                        event.initEvent('change', true, true);
                        eachNode.dispatchEvent(event);
                    } else {
                        eachNode.fireEvent('onchange');
                    }
                }
            });
        }
    })

});