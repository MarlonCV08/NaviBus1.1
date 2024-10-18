import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../Styles/ModalAdd.css';
import PlusButton from './PlusButton';
import Swal from "sweetalert2"

export const ModalAdd = ({ isOpen, onClose }) => {
  const [ruta, setRuta] = useState('');
  const [puntos, setPuntos] = useState(['']);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [isPlusButtonOpen, setIsPlusButtonOpen] = useState(false); // Nuevo estado

  const addInput = () => {
    setPuntos([...puntos, '']);
  };

  const handleRutaChange = (e) => {
    setRuta(e.target.value);
  }

  const handlePuntoChange = (e, index) => {
    const newPuntos = [...puntos];
    newPuntos[index] = e.target.value;
    setPuntos(newPuntos);
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  // Función para manejar el clic en el botón Plus
  const handlePlusButtonClick = () => {
    addInput();
    setIsPlusButtonOpen(!isPlusButtonOpen); // Alternar el estado
  };

  const handleSubmit = async () => {
    const formData = {
      ruta,
      puntos,
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
        });
        onClose();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al crear la ruta',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error de red. Intente nuevamente.',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        onClick={(e) => e.stopPropagation()}
      >
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
            <motion.input
              className='PNameInput'
              key={index}
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
                width: '100%',
                outline: 'none',
                marginBottom: '10px',
                border: focusedIndex === index + 1 ? '1px solid #7579e7' : '1px solid #ccc',
              }}
              onFocus={() => handleFocus(index + 1)}
              onBlur={handleBlur}
            />
          ))}
          <div className="PDiv">
            <PlusButton onClick={handlePlusButtonClick} />
          </div>
        <button onClick={handleSubmit}>Crear</button>
        </div>
      </motion.div>
    </div>
  );
};
