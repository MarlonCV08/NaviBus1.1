import React, { useState, useEffect } from 'react';
import { DropdownVehiculo } from "../Components/DropdownVehiculo";
import { Loader } from "../Components/Loader";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import socket from '../Auth/socket';
import { DropdownDespachador } from '../Components/DropdownDespachador';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';


export const Validar = () => {

  const [loading, setLoading] = useState(false);
  const [despachadorId, setDespachadorId] = useState(''); // ID del despachador
  const navigate = useNavigate();
  const [userId, setUserId]= useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Token decodificado:', decodedToken);
        const currentUserId = decodedToken.cedula;
        setUserId(currentUserId)
        socket.emit('register', currentUserId);

        const notificationShown = sessionStorage.getItem('notificationShown');

        //Obtener las rutas asignadas al conductor al iniciar sesion
        fetch(`http://localhost:3000/api/rutas-asignadas/${currentUserId}`)
        .then(response => response.json())
        .then(data => {
          if (!notificationShown && data.length > 0) {
            // Mostrar notificación con SweetAlert al iniciar sesión
            Swal.fire({
              title: `Te han asignado a la ruta: ${data[0].nombre}`,
              icon: 'info',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            sessionStorage.setItem('notificationShown', 'false');
          }

        })
        .catch(error => {
          console.error('Error al obtener las rutas asignadas:', error);
        })
      } catch(error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }, []);

  
  const handleValidation = () => {

    setLoading(true);
    
    // Envía la notificación al despachador con el ID ingresado
    const notificationMessage = `El Conductor con ID ${userId} validó el vehículo.`;
    socket.emit('sendNotification', {
      recipientCedula: despachadorId, // Usamos el ID del despachador ingresado
      message: notificationMessage,
      conductorId: userId
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
            <DropdownDespachador onSelect={setDespachadorId} />
            <section className="sectionBtnValidar">
              <button onClick={handleValidation} className="btnValidar">Validar</button>
            </section>
          </section>
        </div>
      )}
    </>
  );
};
