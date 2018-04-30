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

    $('#deleteUserModal').on('show.bs.modal', function (e) {
        var curUsername = $(e.relatedTarget).data('id');
        usernameForDelete = curUsername;
        console.log(usernameForDelete);
    });

    $("#DeleteUserBtn").click(function () {
        console.log(usernameForDelete);
        dropUser(usernameForDelete);
    });    

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
                    document.location.href = '/logout';
                }
            });

        }
    }

}

function userDetail(username) {
    window.location = "user_detail?un=" + username

}

dropUser = function (username) {
    var element = $("#usersTable tbody tr:contains('" + username + "')");
    element.addClass("forDelete");

    var sTable = $('#usersTable').DataTable();
    $.ajax({
        type: "POST",
        url: '/security/drop_user',
        data: {
            username: username
        },        
        success: function (res) {
            sTable.row('.forDelete').remove().draw();
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-full-width",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
            toastr.info(res.message);

            console.log('deleted successfully');
        },
        error: function (err) {
            console.log(err);
            document.location.href = '/logout';
        }
    });
}

goToEditUser = function (username) {
    var user = null;

    for (u in users) {
        if (users[u].username == username) {
            user = users[u];
            document.getElementById('userToEdit').value = JSON.stringify(user);
            $('#goToEditUser').submit();
        }
    }
}
