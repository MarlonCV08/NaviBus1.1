import { useEffect } from 'react';
import Swal from 'sweetalert2';

export const Modal = () => {
  useEffect(() => {
    let timerInterval;
    Swal.fire({
      title: "Bienvenido",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          if (timer) {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("El modal se cerró por el temporizador");
      }
    });
  }, []); // Se ejecuta solo cuando el componente se monta
};
