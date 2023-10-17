import Swal from 'sweetalert2';

export const swalAlert = (title, text="", icon="info") => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: "Ok"
    })
}