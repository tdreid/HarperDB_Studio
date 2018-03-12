$(document).ready(function () {
    // $.ajax({
    //     type: "POST",
    //     url: '/security/getalluser',
    //     success: (res => {
    //         console.log(res);
    //     }),
    //     dataType: 'json'
    // });
    
    var checkbox = document.querySelector('input[name="active"]');
    var username = document.querySelector('input[name="username"]');
    var password = document.querySelector('input[name="password"]');
    var role = document.querySelector('input[name="role"]');

    // alert(checkbox.checked);
    // console.log($("input[name='active']").val());

    $("input[name='active']").click(() => {
        alert(checkbox.checked);
        console.log($("input[name='active']").val());
    })
});
