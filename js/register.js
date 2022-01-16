function register() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    if (username != "" || password != "" || email != "") {
        $.ajax({
            url: "../backend/register.php",
            type: 'POST',
            data: {
                username,
                password,
                email
            },
            success: function (data) {
                if (data['status'] == 1) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: data['msg'],
                        didClose: () => {
                            location.href = "./home.html";
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
                    "Something Went Wrong",
                    'error'
                );
            },
            dataType: "json"
        }
        );
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("email").value = "";
    }
    else {
        Swal.fire(
            'Warning',
            'Both Input Fields Are Required',
            'warning'
        );
    }
}