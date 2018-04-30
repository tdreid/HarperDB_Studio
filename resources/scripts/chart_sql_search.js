
var globalOptions = {};
var gGraphType = null;
$(document).ready(function () {
    google.charts.load('current', { packages: ['corechart', 'line', 'bar', 'map', 'scatter', 'gauge', 'treemap'] });


    $("#clickGenerateChart").click(function () {
        var sqlQuery = $("#exampleTextarea").val();

        var options = {
            // 'width': 800,
            'height': 350,
            // chartArea: { width: '80%' },
            title: $('#chartTitle').val(),
            titleTextStyle: {
                color: '#FFF',
                bold: true,
            },
            subtitle: $('#chartSubtitle').val(),
            hAxis: {
                title: $('#hTitle').val(),
                textStyle: { color: '#FFF' },
                titleTextStyle: { color: '#FFF' }
            },
            vAxis: {
                title: $('#vTitle').val(),
                textStyle: { color: '#FFF' },
                titleTextStyle: { color: '#FFF' }
            },
            bars: 'horizontal' // Required for Material Bar Charts.
            ,
            backgroundColor: '#48494B',
            series: {
                0: { color: '#403B8A' },
                1: { color: '#009455' }
            },
            legend: { textStyle: { color: '#FFF' } }
        };
        globalOptions = options;
        var gType = $("#type-chart").val()
        gGraphType = gType;

        generateChart(gType, sqlQuery, options);
    })

    $('#saveLivelinkCenter').on('shown.bs.modal', function (e) {
        var sqlQuery = $("#exampleTextarea").val();
        $.ajax({
            type: "POST",
            url: '/livelink/getlivelink',
            data: {
                sql: sqlQuery,
                options: JSON.stringify(globalOptions),
                livelinkName: $('#livelinkName').val(),
                notes: $('#livelinkNote').val(),
                graphType: gGraphType
            },
            success: function (obj) {
                var host = window.location.host;
                var liveLink = host + '/livelink/public/' + obj
                $('#liveLinkUrl').val(liveLink);
            },
            error: function (error) {
                document.location.href = '/logout';
                console.log(error);
            }
        })
    })

    $('#shareLivelinkModal').on('shown.bs.modal', function (e) {
        $.ajax({
            type: "GET",
            url: '/livelink/livelinklist',
            success: function (result) {
                console.log(result);
                $('#livelinkList')
                    .empty()
                result.forEach(element => {

                    $('#livelinkList')
                        .append($("<option></option>")
                            .attr("value", element.en_url)
                            .text(element.livelinkName));
                });
                if (result.length > 0)
                    $('#liveLinkShareUrl').val(window.location.host + '/livelink/public/' + result[0].en_url)

            },
            error: function (error) {
                document.location.href = '/logout';
                console.log(error);
            }
        })
    });

    $('#livelinkList').on('change', function () {
        $('#liveLinkShareUrl').val(window.location.host + '/livelink/public/' + this.value)
    })

    $("#livelinkForm").submit(function (event) {

        saveLivelink().then(() => {
            $('#saveLivelinkCenter').modal('toggle');
        });
        event.preventDefault();
    });
})

function copyLiveLink() {
    /* Get the text field */
    var copyText = document.getElementById("liveLinkUrl");
    console.log(copyText);

    /* Select the text field */
    // copyText.focus();
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
}

function copyLiveLinkShare() {
    /* Get the text field */
    var copyText = document.getElementById("liveLinkShareUrl");
    console.log(copyText);

    /* Select the text field */
    // copyText.focus();
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
}


function saveLivelink() {
    var sqlQuery = $("#exampleTextarea").val();
    return new Promise(resolve => {
        $.ajax({
            type: "POST",
            url: '/livelink/save',
            data: {
                sql: sqlQuery,
                options: JSON.stringify(globalOptions),
                livelinkName: $('#livelinkName').val(),
                notes: $('#livelinkNote').val(),
                graphType: gGraphType
            },
            success: function (result) {
                toastr.success(JSON.stringify(result));
                resolve(true);
            }, error: function (err) {
                document.location.href = '/logout';
                console.log(err);
            }
        })
    })

}
