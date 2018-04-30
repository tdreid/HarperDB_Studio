
$(document).ready(function () {
    google.charts.load('current', { packages: ['corechart', 'line', 'bar', 'map', 'scatter', 'gauge', 'treemap'] });
    var graphDetail = document.getElementById('graphDetail').value;
    graphDetail = JSON.parse(graphDetail);

    selectChart(graphDetail.graphType, graphDetail.data, JSON.parse(graphDetail.options));
})