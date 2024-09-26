import React, { useState, useEffect } from 'react';
import { DropdownVehiculo } from "../Components/DropdownVehiculo";
import { Loader } from "../Components/Loader";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import socket from '../Auth/socket';


export const Validar = () => {
  const [loading, setLoading] = useState(false);
  const [placa, setPlaca] = useState('');
  const [despachadorId, setDespachadorId] = useState(''); // ID del despachador
  const navigate = useNavigate();
  const [userId, setUserId]= useState('')

  useEffect(() => {
    const currentUserId = '1045738520';
    setUserId(currentUserId);
    socket.emit('register', currentUserId); // Registra al usuario en el backend
  }, []);

  
  const handleValidation = () => {
    if (placa === '' || despachadorId === '') {
      toast.error('Por favor, llena todos los campos.');
      return;
    }

    setLoading(true);
    
    // Envía la notificación al despachador con el ID ingresado
    const notificationMessage = `El Conductor con ID ${userId} validó el vehículo con placa ${placa}.`;
    socket.emit('sendNotification', {
      recipientCedula: despachadorId, // Usamos el ID del despachador ingresado
      message: notificationMessage,
    });
    
    toast.success('Notificación enviada. Esperando confirmación...');
    
    // Esperar confirmación del escáner
  };
  useEffect(() => {
    socket.on('confirmationReceived', (data) => {
      console.log('Confirmación recibida en el frontend', data);
      setLoading(false);
      toast.success('Confirmación recibida. Procediendo...');
      navigate('/Validar/InfoDia');
      // Aquí puedes agregar la lógica que quieras después de la confirmación
    });
    return () => {
      // Limpiar el evento al desmontar el componente
      socket.off('confirmationReceived');
    };
  }, [socket, navigate]);
  
  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Loader />
        </div>
      ) : (
        <div className="validar">
          <section className="sectionValidar">
            <DropdownVehiculo />
            <input 
              type="text" 
              className="inputValidar" 
              placeholder="Placa" 
              value={placa} 
              onChange={(e) => setPlaca(e.target.value)} 
            />
            <input 
              type="text" 
              className="inputValidar" 
              placeholder="ID despachador" 
              value={despachadorId} 
              onChange={(e) => setDespachadorId(e.target.value)} 
            />
            <section className="sectionBtnValidar">
              <button onClick={handleValidation} className="btnValidar">Validar</button>
            </section>
          </section>
        </div>
      )}
    </>
  );
};
