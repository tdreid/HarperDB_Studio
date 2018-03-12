var users = null;
$(document).ready(function () {
    users = JSON.parse(document.getElementById("users").value)


    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

    elems.forEach(function (html) {
        var switchery = new Switchery(html, {
            size: 'small'
        });
    });


    sTable = $('#usersTable').DataTable({
        "dom": "<'col-md-12't><'col-md-4'<'pull-left'l>><'col-md-8 right-pagging'p>",
        "lengthMenu": [
            [10, 50, 100, -1],
            [10, 50, 100, "All"]
        ],
        "iDisplayLength": 10,
    });

    $('#searchSecurity').keyup(function () {
        sTable.search($(this).val()).draw();
    })

});

function toggleActive(username) {
    var user = null;

    for (u in users) {
        if (users[u].username == username) {
            user = users[u];

            if (user.active) {
                user.active = false;
            } else {
                user.active = true;
            }

            $.ajax({
                type: "POST",
                url: 'security/update_user',
                data: user,
                success: function () {
                    console.log('updated successfully');
                },
                error: function (err) {
                    console.log(err);
                }
            });

        }
    }

}

function userDetail(username) {
    window.location = "user_detail?un=" + username

}