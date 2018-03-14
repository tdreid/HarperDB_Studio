$(document).ready(function () {
    $('#deleteModal').on('show.bs.modal', function (e) {
        var curType = $(e.relatedTarget).data('id');
        usernameForDelete = curType;
        console.log(usernameForDelete);
    });
});