document.body.style.cursor='wait';
$(document).ready(function () {
   
    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

    elems.forEach(function (html) {
        var switchery = new Switchery(html, {
            size: 'small'
        });
    });
    
    $('.trees > li label').parent().find('ul').toggle();
    
    $('.trees > li label').click(function () {
        $(this).parent().find('ul').toggle();
    });

    $('#changingName').click( () => {
        
    })

    var schemas = $('#usedSchemas').val()
    var roles = $('#usedRoles').val()

    roles = JSON.parse(roles);
    var roleNames = roles.map(s => s.role);
    $('#searchRole').keyup(function () {
        var valueSearch = $('#searchRole').val();
        if (valueSearch == '') {
            roleNames.forEach(element => {
                $('#' + element).show();
            });
        } else {
            roleNames.forEach(element => {
                $('#' + element).hide();
            });
            let results = [];
            valueSearch = valueSearch.toLowerCase();
            results = roleNames.filter(x => x.toLowerCase().includes(valueSearch));
            results.forEach(element => {
                $('#' + element).show();
            });
        }
    });

    jQuery(document).ready(function() {
        console.log('eieieiei load');
        document.body.style.cursor='default';
    });
});