$(window).ready(function () {
    //Check User Session Status
    $.ajax({
        url: "/horyzon/backend/sessioncheck.php",
        type: 'POST',
        success: function (data) {
            if (data['status'] == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: "Logged In Successfully",
                    didClose: () => {
                        location.href = '/horyzon/pages/home.html';
                    }
                });
            }
            else if(data['status'] == 2) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: "Admin Logged In",
                    didClose: () => {
                        location.href = '/horyzon/pages/admin.html';
                    }
                });
            }
        },
        error: function () {
            console.log("Error in Server Request");
        },
        dataType: "json"
    }
    );
});
