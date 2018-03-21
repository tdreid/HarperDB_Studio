$(document).ready(function () {
    $("#collapseResult").hide()
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

    var Textarea = Textcomplete.editors.Textarea;
    var textareaElement = document.getElementById('exampleTextarea')
    var editor = new Textarea(textareaElement);
    var keywords = JSON.parse(document.getElementById('keywordForAuto').value);

    var reserveWords = ['SELECT', 'INSERT', 'UPDATE', 'FROM', 'WHERE', 'INTO', 'SET'].concat(keywords[0]);
    var schemaAndChilds = keywords[1];
    var textcomplete = new Textcomplete(editor, {
        dropdown: {
            maxCount: Infinity
        }
    });
    var curDotName = null;

    checkIsGetChild = (text) => {
        var match;
        match = text.match(/\b(\w+\.\w*)$/g);
        if (match == null)
            return true;
        else {
            var dot = match[0].lastIndexOf(".");
            curDotName = match[0].substring(0, dot);
            return false;
        }

    }

    textcomplete.register([{
            wordsBegin: reserveWords,
            match: /\b(\w+)$/,
            search: function (term, callback) {
                callback($.map(this.wordsBegin, function (word) {
                    return word.toLowerCase().indexOf(term.toLowerCase()) === 0 ? word : null;
                }));
            },
            index: 1,
            replace: function (word) {
                curDotName = word;
                return word;
            },
            context: (text) => {
                return checkIsGetChild(text);
            }
        },
        {
            keywordAndChild: schemaAndChilds,
            match: /\b(\.\w*)$/,
            search: function (term, callback) {
                var dot = term.indexOf('.');
                var fontTerm = term.substring(0, dot - 1);
                var useWordArray = this.keywordAndChild[curDotName];
                callback($.map(useWordArray, function (word) {

                    var subTerm = term.substring(dot + 1, term.length + 1);
                    if (subTerm.length > 0)
                        return word.toLowerCase().indexOf(subTerm.toLowerCase()) === 0 ? word : null;
                    else return word;

                }));
            },
            index: 1,
            replace: function (word, term) {

                return '.' + word;
            }
        },

    ]);

    $('#runSQL, fa-refresh').click(() => {

        var sql = document.getElementById('exampleTextarea').value;

        $(document.body).css({
            'cursor': 'wait'
        });
        $.ajax({
            type: "POST",
            url: '/explore/filter_search',
            data: {
                sql: sql
            },
            success: function (obj) {
                if (obj.result.error != undefined) {
                    $("#collapseResult").hide()
                    toastr.error(obj.result.error);
                } else if (typeof obj.result == 'string') {
                    $("#collapseResult").hide()
                    toastr.error(obj.result);
                } else {
                    $("#collapseResult").show()
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

});