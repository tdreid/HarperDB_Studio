

$(document).ready(function () {
    google.charts.load('current', { packages: ['corechart'] });
    $("#clickGenerateChart").click(function () {
        $("#collapseResultChart").show();
        switch ($("#type-chart").val()) {
            case "Line":
                lineChart()
                break;
            case "Bar":
                barChart()
                break;
            case "Pie":
                break;

        }
    })


})

var barChart = function () {
    google.charts.setOnLoadCallback(drawAxisTickColors);

    function drawAxisTickColors() {
        var data = google.visualization.arrayToDataTable([
            ['City', '2010 Population', '2000 Population'],
            ['New York City, NY', 8175000, 8008000],
            ['Los Angeles, CA', 3792000, 3694000],
            ['Chicago, IL', 2695000, 2896000],
            ['Houston, TX', 2099000, 1953000],
            ['Philadelphia, PA', 1526000, 1517000]
        ]);

        var options = {
            title: 'Population of Largest U.S. Cities',
            'width': 800,
            'height': 300,
            chartArea: { width: '50%' },
            hAxis: {
                title: 'Total Population',
                minValue: 0,
                textStyle: {
                    bold: true,
                    fontSize: 12,
                    color: '#4d4d4d'
                },
                titleTextStyle: {
                    bold: true,
                    fontSize: 18,
                    color: '#4d4d4d'
                }
            },
            vAxis: {
                title: 'City',
                textStyle: {
                    fontSize: 14,
                    bold: true,
                    color: '#848484'
                },
                titleTextStyle: {
                    fontSize: 14,
                    bold: true,
                    color: '#848484'
                }
            }
        };
        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
    $("#collapseResultChart").show();
}

var lineChart = () => {
    console.log('line charts');
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Year', 'Sales', 'Expenses'],
            ['2004', 1000, 400],
            ['2005', 1170, 460],
            ['2006', 660, 1120],
            ['2007', 1030, 540]
        ]);

        var options = {
            title: 'Company Performance',
            curveType: 'function',
            legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

        chart.draw(data, options);
    }
}