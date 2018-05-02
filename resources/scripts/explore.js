$(document).ready(function () {
    var recents = localStorage.getItem('recentSql');
    recents = JSON.parse(recents);
    if (recents != null) {
        for (var i = recents.length - 1; i >= 0; i--) {
            recents[i].sql
            var host = window.location.host;
            var url = recents[i].url.replace(host, "");
            if (i % 2 == 0)
                $("<a class='list-group-item list-group-item-action list-group-item-dark' href='" + url + "'>" + recents[i].sql + "</a>").appendTo('#listRecent');
            else
                $("<a class='list-group-item list-group-item-action' href='" + url + "'>" + recents[i].sql + "</a>").appendTo('#listRecent');
        }
    }
    else {
        $("<a class='list-group-item list-group-item-action list-group-item-dark' href='#'>no recent query</a>").appendTo('#listRecent');
    }

});