$( document ).ready(function() {
    var users = JSON.parse(document.getElementById("users").value)
    var odd = false;
    var tbody = document.getElementById("users_body");
    tbody.innerHTML = "";
    $(users).each(function( index ) {

        var tr = document.createElement("tr");
        if(odd){
            tr.setAttribute("class", "odd");
            odd = false;

        }else{
            tr.setAttribute("class", "even");
            odd = true;
        }

        tbody.appendChild(tr);
        var td_icon = document.createElement("td");
        var span = document.createElement("span");
        span.setAttribute("class", "pe-7s-user");
        span.setAttribute("style", "font-size:50px;");
        span.setAttribute("onclick", "userDetail('" +users[index].username+"')" )
        td_icon.appendChild(span);
        tr.appendChild(td_icon);


        var td_username = document.createElement("td");

        var username_span = document.createElement("span");
        var username = users[index].username;
        username_span.innerHTML = username
        td_username.appendChild(username_span);
        td_username.setAttribute("class", "sorting_1");
        tr.appendChild(td_username);


        var activeInput = document.createElement("input");
        activeInput.setAttribute("type", "checkbox");
        activeInput.setAttribute("class", "js-switch");
        activeInput.setAttribute("onchange", "toggleActive('"+username+"')");

         activeInput.setAttribute("checked", "false");
         if(users[index].active){
            activeInput.setAttribute("checked", "true");
        }
        var td_active = document.createElement("td");
        td_active.appendChild(activeInput);

        tr.appendChild(td_active);

        var td_role = document.createElement("td");
        td_role.innerHTML = users[index].role.role;
        tr.appendChild(td_role);



        //var elem = document.querySelector('.js-switch');
        var init = new Switchery(activeInput);



    });





    $('#usersTable').DataTable({
        "dom": "<'row'<'col-sm-6'l><'col-sm-6'f>>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
        "lengthMenu": [ [10, 50,100, -1], [10, 50, 100,  "All"] ],
        "iDisplayLength": 10,
    });




});

function toggleActive(username){
    var users = JSON.parse(document.getElementById("users").value);

    var user = null;

    for(u in users){
        if(users[u].username == username){
            user = users[u];
        }
    }

    if(user){
        if(user.active){
            user.active = false;
        }else{
            user.active  = true;
        }

        $.ajax({
            type: "POST",
            url: 'security/update_user',
            data: user,
            success: function(){
                console.log('updated successfully');
            },
            error: function(err){
                console.log(err);
            }
        });
    }


}

function userDetail(username){
    window.location = "user_detail?un=" + username

}




