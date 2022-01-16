let events = [];
let showevents = document.getElementById("showevents");

const displayEvents = ()=>{
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
                    Event Cost : <p class="card-text">${event['eventcost']}Rs</p>
                    Event Status : <p class="card-text">Ended</p>
                    </div>
                    <div class="card-footer">
                    Posted By : <a href="mailto:${'postedby'}">${event['postedby']}</a>&nbsp;(Use It For Any Event Related Queries)</span>
                    </div>
                </div>
                `:
                `
                <div class="card w-75 my-2" data-aos="zoom-in" data-aos-duration="4000">
                    <div class="card-header bg-success text-white">
                        Event Name : <strong>${event['eventname']}</strong>
                    </div>
                    <div class="card-body">
                    Event Description : <p class="card-text">${event['eventdesc']}</p>
                    Event Cost : <p class="card-text">${event['eventcost']}Rs</p>
                    Event Status : <p class="card-text">Not Ended</p>
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
        url: "../backend/getregisteredevents.php",
        type: "POST",
        success: function (data) {
            if (data['status'] == 1) {
                events = data['data'];
                console.log(events);
                displayEvents();
                Swal.fire(
                    'Success',
                    "Events Fetched Successfully",
                    'success'
                );

            }
            else {
                displayEvents();
                Swal.fire(
                    'Information',
                    data['data'],
                    'warning'
                );
            }
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