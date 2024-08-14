import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Styles/BotonAsignar.css"
export const BotonAsignar=()=>{
  const notify = () => toast.success('La ruta ha sido asignada correctamente', {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
  return (
    <div>
      <button className='botonAsignar' onClick={notify}>Notify!</button>
      <ToastContainer closeButton={false}/>
    </div>
  );
}