$(document).ready(function () {
    setTimeout(() => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: true,
            timer: 10000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire(
            "Information",
            '<span class="text-danger">*For Testing Purpose*</span> <br>Admin Username : admin@eec <br>Password : admin',
            "info"
        )
    }, 1000);
});