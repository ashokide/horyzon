let events = [];
let users = [];
let bodyContent = document.getElementById("bodyContent");
let tablebody = document.getElementById("tablebody");
let displayEvents = () => {
    if (events.length) {
        events.forEach(event => {
            bodyContent.innerHTML +=
                `
                <div class="card my-4" data-aos="zoom-in" data-aos-duration="4000" style="width: 18rem;">
                <div class="card-header">
                    Event Name : <strong>${event['eventname']}</strong>
                </div>
                <div class="card-body">
                    Event Description : <p class="card-text">${event['eventdesc']}</p>
                    Event Entry Fee : <h5 class="card-text">Rs.${event['eventcost']}</h5>
                    Registered Students : <h6 class="card-text">${event['count']}</h6>
                    Event Status : <h6 class="card-text">${event['iscompleted']}</h6>
                </div>
                <div class="text-center mx-auto w-100 my-2">
                    <button type="button" class="btn btn-outline-success w-50" data-bs-toggle="modal"
                        data-bs-target="#updatemodal" data-bs-whatever="${event['sno']}">Edit</button>
                    </div>
                <div class="card-footer">
                    Posted By : <h6 class="card-text">${event['postedby']}</h6>
                </div>
            </div>
            `;
        });
    }
    else {
        showevents.innerHTML = "<h4>No Events Registered</h4>";
    }
}

let displayUsers = ()=>{
    if (users.length) {
        users.forEach((user,index) => {
            tablebody.innerHTML +=
                `
                <tr>
                    <th scope="row">${index+1}</th>
                    <td>${user['eventname']}</td>
                    <td>${user['username']}</td>
                    <td>${user['datetime']}</td>
                </tr>
            `;
        });
    }
    else {
        showevents.innerHTML = "<h4>No User Data</h4>";
    }
}
$(document).ready(function () {
    $('#tabledata').hide();
    $.ajax({
        url: "../backend/getevents.php",
        success: function (data) {
            events = data['data'];
            displayEvents();
        },
        error: function () {
            displayEvents();
        },
        dataType: "json"
    }
    );
    $.ajax({
        url: "../backend/userdetails.php",
        success: function (data) {
            users = data['data'];
            displayUsers();
        },
        error: function () {
            console.log("Error in user details fetching");
        },
        dataType: "json"
    }
    );
});

var updatemodal = document.getElementById('updatemodal');
var addmodal = document.getElementById('addmodal');
updatemodal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    var eventno = button.getAttribute('data-bs-whatever');
    let modaldata = events.filter(e => e.sno == eventno);

    var modalTitle = updatemodal.querySelector('.modal-body #eventsno');
    var modalBodyEventName = updatemodal.querySelector('.modal-body #eventname');
    var modalBodyEventDesc = updatemodal.querySelector('.modal-body #eventdesc');
    var modalBodyEventCost = updatemodal.querySelector('.modal-body #eventcost');
    var modalBodyEventStatus = updatemodal.querySelector('.modal-body #eventstatus');
    var modalBodyPostedBy = updatemodal.querySelector('.modal-body #postedby');

    modalTitle.value = modaldata[0]['sno'];
    modalBodyEventName.value = modaldata[0]['eventname'];
    modalBodyEventDesc.value = modaldata[0]['eventdesc'];
    modalBodyPostedBy.value = modaldata[0]['postedby'];
    modalBodyEventCost.value = modaldata[0]['eventcost'];
    modalBodyEventStatus.value = modaldata[0]['iscompleted'];
})

let update = () => {
    var modalTitle = updatemodal.querySelector('.modal-body #eventsno').value.trim();
    var modalBodyEventName = updatemodal.querySelector('.modal-body #eventname').value.trim();
    var modalBodyEventDesc = updatemodal.querySelector('.modal-body #eventdesc').value.trim();
    var modalBodyEventCost = updatemodal.querySelector('.modal-body #eventcost').value.trim();
    var modalBodyEventStatus = updatemodal.querySelector('.modal-body #eventstatus').value.trim();
    var modalBodyPostedBy = updatemodal.querySelector('.modal-body #postedby').value.trim();
    if (modalBodyEventName != "" && modalBodyEventDesc != "" && modalBodyPostedBy != "" && modalBodyEventCost > 0 && (modalBodyEventStatus == 0 || modalBodyEventStatus == 1)) {
        $.ajax({
            url: "../backend/updateevents.php",
            type: "POST",
            data: {
                sno: parseInt(modalTitle),
                eventname: modalBodyEventName,
                eventdesc: modalBodyEventDesc,
                postedby: modalBodyPostedBy,
                eventcost: parseInt(modalBodyEventCost),
                eventstatus: parseInt(modalBodyEventStatus),
            },
            success: function (data) {
                if (data['status'] === 1) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: data['msg'],
                        didClose: () => {
                            location.href = "./admin.html";
                        }
                    });
                }
                else {
                    Swal.fire(
                        'Failure',
                        data['msg'],
                        'error'
                    );
                }
            },
            error: function (err) {
                console.log(err);
                Swal.fire(
                    'Error',
                    "Error in Updating Events",
                    'error'
                );
            },
            dataType: "json"
        }
        );
    }
    else {
        Swal.fire(
            'Error',
            "Invalid Data",
            'error'
        );
    }
}
let insert = () => {
    var modalBodyEventName = addmodal.querySelector('.modal-body #eventname').value.trim();
    var modalBodyEventDesc = addmodal.querySelector('.modal-body #eventdesc').value.trim();
    var modalBodyEventCost = addmodal.querySelector('.modal-body #eventcost').value.trim();
    var modalBodyPostedBy = addmodal.querySelector('.modal-body #postedby').value.trim();
    if (modalBodyEventName != "" && modalBodyEventDesc != "" && modalBodyEventCost > 0) {
        $.ajax({
            url: "../backend/updateevents.php",
            type: "POST",
            data: {
                eventname: modalBodyEventName,
                eventdesc: modalBodyEventDesc,
                postedby: modalBodyPostedBy,
                eventcost: parseInt(modalBodyEventCost),
            },
            success: function (data) {
                if (data['status'] === 1) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: data['msg'],
                        didClose: () => {
                            location.href = "./admin.html";
                        }
                    });
                }
                else {
                    Swal.fire(
                        'Failure',
                        data['msg'],
                        'error'
                    );
                }
            },
            error: function (err) {
                console.log(err);
                Swal.fire(
                    'Error',
                    "Error in Inserting Events",
                    'error'
                );
            },
            dataType: "json"
        }
        );
    }
    else {
        Swal.fire(
            'Error',
            "Invalid Data",
            'error'
        );
    }
}

$('#tabledatabtn').click(function () {
    $('#events').hide(1000);
    $('#tabledata').show(1000);
    $('#tabledatabtn').hide(1000);
});

$('#crudbtn').click(function () {
    $('#tabledatabtn').show(1000);
    $('#tabledata').hide(1000);
    $('#events').show(1000);
});