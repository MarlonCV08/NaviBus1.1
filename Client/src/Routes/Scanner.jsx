import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import '../Styles/Scanner.css';
import { HeaderCondu } from "../Components/HeaderCondu";
import ScanQR from '../Assets/Images/ScanQR.svg';
import { toast, ToastContainer } from "react-toastify";
import { ModalNotification } from "../Components/ModalNotification";
import socket from "../Auth/socket";
import { HeaderDespa } from "../Components/HeaderDespa";

export const Scanner = () => {
    const [scanner, setScanner] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        const userId = '1036743213'; // Este puede ser el ID del usuario actual que está usando la aplicación
        socket.emit('register', userId); // Registra al usuario en el backend
      }, []);
      useEffect(() => {
        // Escuchar el evento 'receiveNotification' desde el servidor
        socket.on('receiveNotification', async (message) => {
            console.log('Notificación recibida:', message);
            setNotifications(prevNotifications => [...prevNotifications, message]);
            
            // Mostrar el modal y esperar la confirmación
            const isConfirmed = await ModalNotification(message);

            if (isConfirmed) {
                socket.emit('notificationConfirmed', { message, userId: '1045738520' }); // Enviar confirmación al backend
                console.log("Notificación confirmada y enviada al backend");
            } else {
                console.log("Notificación cancelada");
            }
        });

        // Limpiar el evento cuando el componente se desmonte
        return () => {
          socket.off('receiveNotification');
        };
    }, []);
    const startScanning = () => {
        if (!scanner) {
            const newScanner = new Html5QrcodeScanner("reader", {
                qrbox: {
                    width: 1000,
                    height: 1000,
                },
                fps: 10,
            });

            newScanner.render(
                (result) => {
                    console.log("Scanned result:", result);
                    sendDataToBackend(result); // Enviar datos al backend
                    newScanner.clear(); // Detener escaneo después de obtener el resultado
                },
                (error) => {
                    console.warn("Scan error:", error);
                }
            );

            setScanner(newScanner);
            setScanning(true);
        }
    };

    const stopScanning = () => {
        if (scanner) {
            scanner.clear();
            setScanner(null);
            setScanning(false);
        }
    };

    const sendDataToBackend = (data) => {
        fetch('https://your-backend-endpoint.com/api/save-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ qrData: data }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
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
                <ToastContainer/>
            </div>
        </>
    );
};
