$(document).ready(function () {
    // var users = JSON.parse(document.getElementById("users").value)
    // var user = JSON.parse( document.getElementById("user").value)
    // console.log(user);
    // var odd = false;
    // var tbody = document.getElementById("users_body");
    // tbody.innerHTML = "";
    // $(users).each(function (index) {
    //     if (users[index].username != user.username) {
    //         var tr = document.createElement("tr");
    //         if (odd) {
    //             tr.setAttribute("class", "odd");
    //             odd = false;

    //         } else {
    //             tr.setAttribute("class", "even");
    //             odd = true;
    //         }

    //         tbody.appendChild(tr);
    //         var td_icon = document.createElement("td");
    //         var span = document.createElement("span");
    //         span.setAttribute("class", "pe-7s-user");
    //         span.setAttribute("style", "font-size:50px;");
    //         span.setAttribute("onclick", "userDetail('" + users[index].username + "')")
    //         td_icon.appendChild(span);
    //         tr.appendChild(td_icon);


    //         var td_username = document.createElement("td");

    //         var username_span = document.createElement("span");
    //         var username = users[index].username;
    //         username_span.innerHTML = username
    //         td_username.appendChild(username_span);
    //         td_username.setAttribute("class", "sorting_1");
    //         tr.appendChild(td_username);


    //         var activeInput = document.createElement("input");
    //         activeInput.setAttribute("type", "checkbox");
    //         activeInput.setAttribute("class", "js-switch");
    //         activeInput.setAttribute("onchange", "toggleActive('" + username + "')");

    //         activeInput.setAttribute("checked", "false");
    //         if (users[index].active) {
    //             activeInput.setAttribute("checked", "true");
    //         }
    //         var td_active = document.createElement("td");
    //         td_active.appendChild(activeInput);

    //         tr.appendChild(td_active);

    //         var td_role = document.createElement("td");
    //         td_role.innerHTML = users[index].role.role;
    //         tr.appendChild(td_role);



    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
 
    elems.forEach(function(html) {
      var switchery = new Switchery(html);
    });

    //     }

    // });


    // wrapper.count-title.d-flex.pull-right
    // i.fa.fa-search(aria-hidden='true')


    sTable = $('#usersTable').DataTable({
        "dom": 'rtlp',
        // "dom": "tl<'buttom'<'right'p>>",
        
        // "dom": "<'warpper count-title d-flex pill-right' <'i.fa.fa-search'>f><'row'<'col-sm-6'><'col-sm-6'>>t<'row'<'col-sm-6'i><'col-sm-6'lp>>",
        "lengthMenu": [
            [10, 50, 100, -1],
            [10, 50, 100, "All"]
        ],
        "iDisplayLength": 10,
    });

    $('#searchSecurity').keyup(function(){
        sTable.search($(this).val()).draw();
  })




});

function toggleActive(username) {
    var users = JSON.parse(document.getElementById("users").value);
    var user = null;

    for (u in users) {
        if (users[u].username == username) {
            user = users[u];
        }
    }

    if (user) {
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

function userDetail(username) {
    window.location = "user_detail?un=" + username

}