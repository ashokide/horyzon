let events = [];
let showevents = document.getElementById("showevents");
let displayEvents = () => {
    if (events.length) {
        events.forEach(event => {
            showevents.innerHTML += event['iscompleted'] == 1 ?
                `
            <div class="card w-75 my-2" data-aos="zoom-in" data-aos-duration="4000">
                <div class="card-header bg-danger text-white">
                    Event Name : <strong>${event['eventname']}</strong>
                </div>
                <div class="card-body">
                    Event Description : <p class="card-text">${event['eventdesc']}</p>
                    Event Entry Fee : <h5 class="card-text">Rs.${event['eventcost']}</h5>
                    Registered Students : <h6 class="card-text">${event['count']}</h6>
                    <a class="btn btn-outline-danger disabled">Register</a>
                    <span class="text-danger">Event Ended</span>
                </div>
                <div class="card-footer">
                    Posted By : <a href="mailto:${'postedby'}">${event['postedby']}</a>&nbsp;(Use It For Any Event Related Queries)</span>
                </div>
            </div>
            `
                :
                `
            <div class="card w-75 my-2" data-aos="zoom-in" data-aos-duration="4000">
                <div class="card-header bg-success text-white">
                    Event Name : <strong>${event['eventname']}</strong>
                </div>
                <div class="card-body">
                Event Description : <p class="card-text">${event['eventdesc']}</p>
                Event Entry Fee : <h5 class="card-text">Rs.${event['eventcost']}</h5>
                Registered Students : <h6 class="card-text">${event['count']}</h6>
                    <a class="btn btn-outline-success" onclick='register(${event["sno"]})'>Register</a>
                </div>
                <div class="card-footer">
                    Posted By : <a href="mailto:${'postedby'}">${event['postedby']}</a>&nbsp;(Use It For Any Event Related Queries)</span>
                </div>
            </div>
            `;
        });
    }
    else {
        showevents.innerHTML = "<h4>No Events Registered</h4>";
    }
}

$(document).ready(function () {
    $.ajax({
        url: "../backend/getevents.php",
        success: function (data) {
            events = data['data'];
            displayEvents();
            Swal.fire(
                'Success',
                "Events Fetched Successfully",
                'success'
            );
        },
        error: function () {
            displayEvents();
            Swal.fire(
                'Error',
                "Error in Fetching Events",
                'error'
            );
        },
        dataType: "json"
    }
    );
});

let register = eventno => {
    if (eventno >= 1) {
        Swal.fire({
            title: 'Do you want to register this event?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, register it!',
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "../backend/registerevent.php",
                    type: "POST",
                    data: {
                        eventno
                    },
                    success: function (data) {
                        console.log(data);
                        if (data['status'] == 1) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: data['msg'],
                                didClose: () => {
                                    location.href = "./registeredevents.html";
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
                    error: function () {
                        Swal.fire(
                            'Error',
                            "Error in Registering Event",
                            'error'
                        );
                    },
                    dataType: "json"
                });
            }
        })
    }
    else {
        Swal.fire(
            'Error',
            "Invalid Event No",
            'error'
        );
    }
}