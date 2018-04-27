

var barChart = function (datas, options) {
    google.charts.setOnLoadCallback(drawAxisTickColors);

    function drawAxisTickColors() {
        var data = google.visualization.arrayToDataTable(datas);
        var chart = new google.charts.Bar(document.getElementById('chart_div'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
    }
}

var lineChart = (datas, options) => {
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(datas);
        var chart = new google.charts.Line(document.getElementById('chart_div'));

        chart.draw(data, google.charts.Line.convertOptions(options));
    }
}

var pieChart = (datas, options) => {
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(datas);
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, google.charts.Line.convertOptions(options));
    }
}

var scatterChart = (datas, options) => {
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(datas);
        var chart = new google.charts.Scatter(document.getElementById('chart_div'));
        chart.draw(data, google.charts.Scatter.convertOptions(options));
    }
}

var areaChart = (datas, options) => {
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(datas);
        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(data, google.charts.Scatter.convertOptions(options));
    }
}
var steppedAreaChart = (datas, options) => {
    google.charts.setOnLoadCallback(drawChart);
    options.isStacked = true;
    function drawChart() {
        var data = google.visualization.arrayToDataTable(datas);
        var chart = new google.visualization.SteppedAreaChart(document.getElementById('chart_div'));
        chart.draw(data, google.charts.Scatter.convertOptions(options));
    }
}

var bubbleChart = (datas, options) => {
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable(datas);
        var chart = new google.visualization.BubbleChart(document.getElementById('chart_div'));
        chart.draw(data, google.charts.Scatter.convertOptions(options));
    }
}

var columnChart = function (datas, options) {
    google.charts.setOnLoadCallback(drawAxisTickColors);

    function drawAxisTickColors() {
        var data = google.visualization.arrayToDataTable(datas);
        var chart = new google.charts.Bar(document.getElementById('chart_div'));
        options.bars = 'vertical';
        chart.draw(data, google.charts.Bar.convertOptions(options));
    }
}

var gaugeChart = function (datas, options) {

    options = {
        width: 400, height: 120,
        redFrom: 90, redTo: 100,
        yellowFrom: 75, yellowTo: 90,
        minorTicks: 5
    };

    google.charts.setOnLoadCallback(drawAxisTickColors);

    function drawAxisTickColors() {
        var data = google.visualization.arrayToDataTable(datas);
        var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
        options.bars = 'vertical';
        chart.draw(data, options);
    }
}

var treemapChart = function (datas, options) {
    Object.assign(options, {
        minColor: '#f00',
        midColor: '#ddd',
        maxColor: '#0d0',
        headerHeight: 15,
        fontColor: 'black',
        showScale: true
    });
    google.charts.setOnLoadCallback(drawAxisTickColors);
    function drawAxisTickColors() {
        var data = google.visualization.arrayToDataTable(datas);
        var chart = new google.visualization.TreeMap(document.getElementById('chart_div'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
    }
}

var mapChart = (datas, options) => {
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        // var data = google.visualization.arrayToDataTable(datas);
        var data = google.visualization.arrayToDataTable([
            ['Country', 'Population'],
            ['China', 'China: 1,363,800,000'],
            ['India', 'India: 1,242,620,000'],
            ['US', 'US: 317,842,000'],
            ['Indonesia', 'Indonesia: 247,424,598'],
            ['Brazil', 'Brazil: 201,032,714'],
            ['Pakistan', 'Pakistan: 186,134,000'],
            ['Nigeria', 'Nigeria: 173,615,000'],
            ['Bangladesh', 'Bangladesh: 152,518,015'],
            ['Russia', 'Russia: 146,019,512'],
            ['Japan', 'Japan: 127,120,000']
        ]);
        var chart = new google.visualization.Map(document.getElementById('chart_div'));
        chart.draw(data, google.charts.Line.convertOptions(options));
    }
}

var transformDataArray = (data) => {
    var transform = [];
    try {
        transform.push(Object.keys(data[0]))
        data.forEach(element => {
            transform.push(Object.values(element))
        });
        return transform;
    } catch {
        return transform;
    }
}

var getData = (sql) => {
    return new Promise(resolve => {
        $.ajax({
            type: "POST",
            url: '/explore/filter_search',
            data: {
                sql: sql
            },
            success: function (obj) {
                console.log(obj);

                if (obj.result.error != undefined) {
                    toastr.error(obj.result.error);
                } else if (typeof obj.result == 'string') {
                    toastr.error(obj.result);
                } else {
                    resolve(obj.result)
                }
                resolve(false)
            },
            error: function (error) {
                console.log(error);
            }
        })
    })
}

var generateChart = (graphType, sqlQuery, options) => {
    getData(sqlQuery).then(res => {
        $("#collapseResultChart").show();
        $("#collapseResult").hide()
        selectChart(graphType, res, options);

    })
}

var selectChart = (graphType, data, options) => {
    var data = transformDataArray(data);
    switch (graphType) {
        case "Line":
            lineChart(data, options)
            break;
        case "Bar":
            barChart(data, options)
            break;
        case "Pie":
            pieChart(data, options)
            break;
        case "Map":
            mapChart(data, options)
            break;
        case "Scatter":
            scatterChart(data, options)
            break;
        case "Area":
            areaChart(data, options)
            break;
        case "Bubble":
            bubbleChart(data, options)
            break;
        case "Column":
            columnChart(data, options)
            break;
        case "Gauge":
            gaugeChart(data, options)
            break;
        case "SteppedArea":
            steppedAreaChart(data, options)
            break;
        case "Treemap":
            treemapChart(data, options)
            break;

    }
}