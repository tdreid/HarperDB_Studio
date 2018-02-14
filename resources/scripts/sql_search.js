// #exampleTextarea
$(document).ready(function () {
var Textarea = Textcomplete.editors.Textarea;
var textareaElement = document.getElementById('exampleTextarea')
var editor = new Textarea(textareaElement);

var textcomplete = new Textcomplete(editor, {
    dropdown: {
      maxCount: Infinity
    }
  })

  textcomplete.register([
    { // tech companies
        wordsBegin: ['SELECT', 'INSERT', 'UPDATE', 'FROM', 'WHERE'],
        // match: /.\b(\w{1,})$/,
        match: /\b(\w{1,})$/,
        search: function (term, callback) {
            callback($.map(this.wordsBegin, function (word) {            
                return word.toLowerCase().indexOf(term.toLowerCase()) === 0 ? word : null;
            }));
        },
        index: 1,
        replace: function (word) {
            return word;
        }
    },

    { // tech companies
        wordsBegin: ['1111111111', '222', '3', '4', '5'],
        // match: /.\b(\w{1,})$/,
        match: /\b(\w{5,})$/,
        search: function (term, callback) {
            callback($.map(this.wordsBegin, function (word) {            
                return word.toLowerCase().indexOf(term.toLowerCase()) === 0 ? word : null;
            }));
        },
        index: 1,
        replace: function (word) {
            return word;
        }
    },

]);

});