
$(document).ready(function () {
    google.charts.load('current', { packages: ['corechart', 'line', 'bar', 'map', 'scatter', 'gauge', 'treemap', 'geochart'], 'mapsApiKey': 'AIzaSyAP0UYqFCuSOOIMOQ6Ltmrx1B79XUw4Tmw' });
    var graphDetail = document.getElementById('graphDetail').value;
    graphDetail = JSON.parse(graphDetail);

    selectChart(graphDetail.graphType, graphDetail.data, JSON.parse(graphDetail.options));
})