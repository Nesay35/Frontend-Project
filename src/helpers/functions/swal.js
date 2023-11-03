import Swal from 'sweetalert2';

export const swalAlert = (title, text="", icon="info") => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: "Ok",
    });
};
export const swalConfirm = (title, text) =>{
    return Swal.fire({
      title,
      text,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: 'Yes',
    })
  }