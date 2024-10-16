import React, { useState } from "react";
import Modal from 'react-modal';


export const RecuperarClave = ({ isOpen ,onRequestClose }) => {
  const [email, setEmail] = useState('');
  
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

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Recuperar clave</h2>
      <input 
        type="email"
        placeholder="Escribe donde tu correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleEnviarClave}>Enviar</button>
      <button onClick={onRequestClose}>Cerrar</button>
    </Modal>
  );
};