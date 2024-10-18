import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../Styles/ModalAdd.css';
import PlusButton from './PlusButton';
import Swal from "sweetalert2";
import { toast, ToastContainer } from 'react-toastify';
import TrashIcon from './TrashIcon';

export const ModalAdd = ({ isOpen, onClose }) => {
  const [ruta, setRuta] = useState('');
  const [puntos, setPuntos] = useState(['']);
  const [focusedIndex, setFocusedIndex] = useState(null);

  const notify = (message) => {
    toast.dismiss();
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
  };

  const addInput = () => {
    setPuntos([...puntos, '']); // Añade un nuevo input vacío
  };

  const removePunto = (index) => {
    // Solo elimina si hay más de un punto
    if (puntos.length > 1) {
      const newPuntos = puntos.filter((_, i) => i !== index);
      setPuntos(newPuntos);
      console.log('Punto eliminado'); // Confirmar que se eliminó
    } else {
      notify('Debe haber al menos un punto de control'); // Notificar si no se puede eliminar
    }
  };

  const handleRutaChange = (e) => {
    setRuta(e.target.value);
  };

  const handlePuntoChange = (e, index) => {
    const newPuntos = [...puntos];
    newPuntos[index] = e.target.value; // Actualiza el punto correspondiente
    setPuntos(newPuntos);
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const handleSubmit = async () => {
    if (!ruta.trim()) {
      notify('La ruta es obligatoria');
      return;
    }

    if (puntos.length === 0 || puntos.some(punto => !punto.trim())) {
      notify('Debe haber al menos un punto de control válido');
      return;
    }

    const puntosData = puntos.map((punto, index) => ({
      nombre: punto,
      ultimo: index === puntos.length -1 ? 1 : 0,
    }));

    const formData = {
      ruta,
      puntos: puntosData,
    };

    try {
      const response = await fetch('http://localhost:3000/api/crear-ruta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Ruta creada con éxito',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setRuta('');
        setPuntos(['']); // Reinicia los puntos
        onClose();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al crear la ruta',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error de red. Intente nuevamente.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  // Manejo del cierre del modal
  const handleCloseModal = (e) => {
    if (e.target.className === 'modal-backdrop') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleCloseModal}>
      <motion.div
        className="divModal"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        onClick={(e) => e.stopPropagation()} // Evitar que los clics en el contenido cierren el modal
      >
        <div className='modal-content'>
          <div className="RName">
            <motion.input
              className="RNameInput"
              type="text"
              value={ruta}
              onChange={handleRutaChange}
              placeholder="Ruta"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                padding: '10px',
                borderRadius: '5px',
                width: '100%',
                outline: 'none',
                border: focusedIndex === 0 ? '1px solid #7579e7' : '1px solid #ccc',
              }}
              onFocus={() => handleFocus(0)}
              onBlur={handleBlur}
            />
          </div>
          <div className="raya"></div>
          <div className='PName'>
            {puntos.map((punto, index) => (
              <div key={index} className="punto-item">
                <motion.input
                  className='PNameInput'
                  type="text"
                  value={punto}
                  onChange={(e) => handlePuntoChange(e, index)}
                  placeholder={`Punto ${index + 1}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    padding: '10px',
                    borderRadius: '5px',
                    width: '85%', // Ajusta para hacer espacio para el ícono de eliminar
                    outline: 'none',
                    marginBottom: '10px',
                    border: focusedIndex === index + 1 ? '1px solid #7579e7' : '1px solid #ccc',
                  }}
                  onFocus={() => handleFocus(index + 1)}
                  onBlur={handleBlur}
                />
                <TrashIcon 
                  onClick={(e) => { 
                    e.stopPropagation(); // Evitar que el clic cierre el modal
                    removePunto(index); 
                  }} 
                />
              </div>
            ))}
            <div className="PDiv">
              <PlusButton onClick={addInput} />
            </div>
          </div>
        </div>
        <div>
          <button onClick={handleSubmit} className='btnCrear'>Crear</button>
        </div>
      </motion.div>
      <ToastContainer closeButton={false} limit={1} />
    </div>
  );
};
