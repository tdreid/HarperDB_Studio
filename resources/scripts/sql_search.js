// #exampleTextarea
$(document).ready(function () {
    var Textarea = Textcomplete.editors.Textarea;
    var textareaElement = document.getElementById('exampleTextarea')
    var editor = new Textarea(textareaElement);
    var keywords = JSON.parse(document.getElementById('keywordForAuto').value);
    console.log(keywords);
    // var keywords = JSON.parse(localStorage.getItem('keyword'));

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

    arrayOf = {
        dog: [
            'breed',
            'name',
            'age'
        ],
        dev: [
            'id',
            'gender',
            'foo'
        ]
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

});