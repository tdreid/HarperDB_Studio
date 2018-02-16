$( document ).ready(function() {
//     var logs = JSON.parse(document.getElementById("logs").value)
//     console.log(logs);
//     var odd = false;
//     var tbody = document.getElementById("logs_body");
//     tbody.innerHTML = "";
//     $(logs).each(function( index ) {

//         var tr = document.createElement("tr");
//         if(odd){
//             tr.setAttribute("class", "odd");
//             odd = false;

//         }else{
//             tr.setAttribute("class", "even");
//             odd = true;
//         }

//         tbody.appendChild(tr);

//         var td_level = document.createElement("td");
//         td_level.innerHTML = logs[index].level;
//         tr.appendChild(td_level);

//         var td_message = document.createElement("td");
//         td_message.innerHTML = logs[index].message;
//         tr.appendChild(td_message);

//         var td_timestamp = document.createElement("td");
//         td_timestamp.innerHTML = logs[index].timestamp;
//         td_timestamp.setAttribute("class", "sorting_1");
//         tr.appendChild(td_timestamp);





//     });





    $('#logsTable').DataTable({
        "dom": "<'row'<'col-md-12't><'col-md-4'<'pull-left'l>><'col-md-8 right-pagging'p>>",
        "lengthMenu": [ [10, 50,100, -1], [10, 50, 100,  "All"] ],
        "iDisplayLength": 10,
    });





});






