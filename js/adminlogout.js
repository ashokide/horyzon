$(window).ready(function () {
    //Check User Session Status
    $.ajax({
        url: "/horyzon/backend/sessioncheck.php",
        type: 'POST',
        success: function (data) {
            if (data['status'] == 0) {
                alert("Unauthorized Access");
                location.href = '/horyzon/';
            }
            else{
                localStorage.setItem('adminname',data['adminname']);
                document.getElementById('adminname').innerText = "Welcome,  " +localStorage.getItem('adminname').toUpperCase();
            }
        },
        error: function () {
            console.log("Error in Server Request");
        },
        dataType: "json"
    }
    );
});

function logout() {
    $.ajax({
        url: "../backend/logout.php",
        type: 'POST',
        success: function (data) {
            if (data['status'] == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: data['msg'],
                    didClose: () => {
                        localStorage.removeItem('adminname');
                        location.href = "../";
                    }
                });
            }
            else {
                console.log("Something Went Wrong");
            }
        },
        error: function () {
            console.log("Error in Server Request");
        },
        dataType: "json"
    }
    );
}