import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../Styles/ModalAdd.css';
import PlusButton from './PlusButton';

export const ModalAdd = ({ isOpen, onClose }) => {
  const [inputs, setInputs] = useState(['']);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [isPlusButtonOpen, setIsPlusButtonOpen] = useState(false); // Nuevo estado

  const addInput = () => {
    setInputs([...inputs, '']);
  };

  const handleInputChange = (e, index) => {
    const newInputs = [...inputs];
    newInputs[index] = e.target.value;
    setInputs(newInputs);
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
          {inputs.map((input, index) => (
            <motion.input
              className='PNameInput'
              key={index}
              type="text"
              value={input}
              onChange={(e) => handleInputChange(e, index)}
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
            <PlusButton onClick={handlePlusButtonClick} /> {/* Usamos el componente PlusButton aquí */}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
