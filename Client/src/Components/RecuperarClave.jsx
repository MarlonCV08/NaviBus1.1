import { motion } from "framer-motion";
import { useState } from "react";
import '../Styles/RecuperarClave.css';

export const RecuperarClave = ({ isOpen, onRequestClose }) => {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false); // Estado para controlar el foco

  const handleEnviarClave = () => {
    fetch('http://localhost:3000/api/recuperar-clave', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Correo enviado correctamente');
          onRequestClose();
        } else {
          alert('Error al enviar el correo');
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud');
      });
  };

  const handleCloseModal = (e) => {
    if (e.target.className === 'modal-backdrop') {
      onRequestClose();
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
        <div className='modalRecuperar'>
          <h2 className="hRecuperar">Recuperar clave</h2>
          <motion.input
            className="inputRecuperar"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ruta"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              padding: '10px',
              borderRadius: '5px',
              width: '100%',
              outline: 'none',
              border: isFocused ? '1px solid #7579e7' : '1px solid #ccc', // Cambia el color del borde en foco
              transition: 'border-color 0.3s ease' // Transición suave
            }}
            onFocus={() => setIsFocused(true)} // Establece el foco en true
            onBlur={() => setIsFocused(false)} // Establece el foco en false
          />
          <div className="divBtnRecuperar">
            <button onClick={handleEnviarClave} className="btnRecuperar">Enviar</button>
            <button onClick={onRequestClose} className="btnRecuperar">Cerrar</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
