import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import '../Styles/Scanner.css';
import { HeaderDespa } from "../Components/HeaderDespa";
import ScanQR from '../Assets/Images/ScanQR.svg';
import { toast, ToastContainer } from "react-toastify";
import { ModalNotification } from "../Components/ModalNotification";
import socket from "../Auth/socket";
import { jwtDecode } from "jwt-decode";

export const Scanner = () => {
    const [scanner, setScanner] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [userId, setUserId] = useState(null);
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
            const cedula = decodedToken.cedula;
            setUserId(cedula);

        }
    }, [])
    
    useEffect(() => {
        if (userId) {
            socket.emit('register', userId); // Registra al usuario en el backend
        }
      }, [userId]);
      
      useEffect(() => {
        // Escuchar el evento 'receiveNotification' desde el servidor
        socket.on('receiveNotification', async (data) => {
            console.log('Notificación recibida:', data);

            const message = data.message;
            const conductorId = data.conductorId;

            setNotifications(prevNotifications => [...prevNotifications, message]);

            const isConfirmed = await ModalNotification(message);
            if (isConfirmed) {
                socket.emit('notificationConfirmed', { message, userId, conductorId }); // Enviar confirmación al backend
                console.log("Notificación confirmada y enviada al backend");
            } else {
                console.log("Notificación cancelada");
            }
        });

        return () => {
            socket.off('receiveNotification');
        };
    }, [userId]);

    const startScanning = () => {
        if (!scanner) {
            console.log("Iniciando escáner...");
            const newScanner = new Html5QrcodeScanner("reader", {
                qrbox: {
                    width: 1000,
                    height: 1000,
                },
                fps: 10,
            });

            newScanner.render(
                (result) => {
                    console.log("Resultado escaneado:", result);
                    sendDataToBackend(result);
                    newScanner.clear();
                },
                (error) => {
                    console.warn("Error de escaneo:", error);
                }
            );

            setScanner(newScanner);
            setScanning(true);
        } else {
            console.log("El escáner ya está activo.");
        }
    };

    const stopScanning = () => {
        if (scanner) {
            scanner.clear();
            setScanner(null);
            setScanning(false);
            console.log("Escáner detenido.");
        }
    };

    const sendDataToBackend = (userId) => {
        const now = new Date();
        const dia = now.toISOString().split('T')[0];
        const hora = now.toTimeString().split(' ')[0];
        const puntoControl = "NombreDelPuntoDeControl"; // Cambia esto al valor real que deseas
        const ruta = "NombreDeLaRuta"; // Cambia esto al valor real que deseas

        fetch(`http://localhost:3000/api/usuarios/${userId}`)
        .then(response => response.json())
        .then(userData => {
            fetch('http://localhost:3000/api/guardar-escaneo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    fecha: fecha
                }),
            })
            .then(response => {
                if (response.ok) {
                    toast.success('Datos guardados correctamente.');
                } else {
                    throw new Error('Error en el guardado de datos.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Hubo un problema al guardar los datos.');
            });
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
            toast.error('Error al obtener datos del usuario.');
        });
    };

    useEffect(() => {
        return () => {
            if (scanner) {
                scanner.clear();
            }
        };
    }, [scanner]);

    return (
        <>
            <HeaderDespa />
            <div className="contenedorQR">
                <div className="Hijo">
                    <div id="reader" className={`reader ${scanning ? 'active' : ''}`}></div>
                    <img
                        src={ScanQR}
                        className={`ScanQR ${scanning ? 'hidden' : ''}`}
                        onClick={startScanning}
                        alt="Start Scanning"
                    />
                    <button
                        className={`btn detener ${scanning ? '' : 'hidden'}`}
                        onClick={stopScanning}
                    >
                        Detener Escaneo
                    </button>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};
