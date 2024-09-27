import Swal from 'sweetalert2';
import '../Styles/ModalNotification.css'
export const ModalNotification = (message) => {
  return Swal.fire({
    title: "Nueva Notificación",
    text: message,
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    return result.isConfirmed; // Devuelve true si se confirmó, false si se canceló
  });
};