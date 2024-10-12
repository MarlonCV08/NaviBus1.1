import { useEffect, useRef, useState } from "react";
import '../Styles/Scanner.css';
import { HeaderDespa } from "../Components/HeaderDespa";
import ScanQR from '../Assets/Images/ScanQR.svg';
import { toast, ToastContainer } from "react-toastify";
import { ModalNotification } from "../Components/ModalNotification";
import socket from "../Auth/socket";
import { jwtDecode } from "jwt-decode";
import { Html5Qrcode } from 'html5-qrcode';
import axios from 'axios';

export const Scanner = () => {
    const [scanning, setScanning] = useState(false);
    const [userId, setUserId] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [scannedData, setScannedData] = useState('');
    const [error, setError] = useState(null);
    const html5QrCodeRef = useRef(null);
    const isScanningRef = useRef(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const cedula = decodedToken.cedula;
            setUserId(cedula);
        }
    }, []);
    
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

    useEffect(() => {
        const html5QrCode = new Html5Qrcode("reader");
        html5QrCodeRef.current = html5QrCode;
        return () => {
            stopScanner(); // Detener escáner si el componente se desmonta
        };
    }, []);

    const startScanner = async () => {
        try {
            const cameras = await Html5Qrcode.getCameras();
            if (cameras && cameras.length) {
                const cameraId = cameras[0].id;
                await html5QrCodeRef.current.start(
                    cameraId,
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                    },
                    qrCodeSuccessCallback,
                    qrCodeErrorCallback
                );
                console.log("Escaneo de QR Code iniciado.");
                isScanningRef.current = true;
                setScanning(true);
            } else {
                setError("No se encontraron cámaras.");
            }
        } catch (err) {
            console.error("Error al iniciar el escáner:", err);
            setError("Error al iniciar el escáner. Asegúrate de que el navegador tenga permisos para acceder a la cámara.");
        }
    };

    const stopScanner = async () => {
        if (html5QrCodeRef.current && isScanningRef.current) {
            try {
                await html5QrCodeRef.current.stop();
                console.log("Escáner detenido.");
                isScanningRef.current = false;
                setScanning(false);
            } catch (err) {
                console.error("Error al detener el escáner:", err);
            }
        } else {
            console.log("El escáner ya está detenido o no se ha iniciado.");
        }
    };

    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        console.log(`QR Code detectado: ${decodedText}`, decodedResult);
        setScannedData(decodedText);
        if (isScanningRef.current) {
            html5QrCodeRef.current.stop()
                .then(() => {
                    console.log("Escaneo de QR Code detenido.");
                    isScanningRef.current = false;
                    setScanning(false);
                    const name = decodedText;
                    const puntoControl = '103'
                    const getLocalTimestamp = () => {
                        const now = new Date();
                        const year = now.getFullYear();
                        const month = String(now.getMonth() + 1).padStart(2, '0');
                        const day = String(now.getDate()).padStart(2, '0');
                        const hours = String(now.getHours()).padStart(2, '0');
                        const minutes = String(now.getMinutes()).padStart(2, '0');
                        const seconds = String(now.getSeconds()).padStart(2, '0');
                      
                        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                      };
                      
                      const timestamp = getLocalTimestamp();
                    console.log("Enviando datos al backend:", { name, puntoControl, timestamp });

                    axios.post(`http://localhost:3000/api/save`, { name, puntoControl, timestamp })
                        .then(response => {
                            console.log("Datos guardados:", response.data);
                        })
                        .catch(error => {
                            if (error.response) {
                                console.error("Error en la respuesta del servidor:", error.response.data);
                            } else if (error.request) {
                                console.error("No se recibió respuesta del servidor:", error.request);
                            } else {
                                console.error("Error al configurar la solicitud:", error.message);
                            }
                        });
                }).catch(err => {
                    console.error("No se pudo detener el escaneo.", err);
                });
        }
    };

    const qrCodeErrorCallback = (errorMessage) => {
        console.warn(`Error de escaneo: ${errorMessage}`);
    };

    const [options, setOptions] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/api/show')
            .then(response => response.json())
            .then(data => setOptions(data))
            .catch(err => console.error('Error al traer los datos', err));
    }, []);

    return (
        <>
            <HeaderDespa />
            <div className="contenedorQR">
                <div className="Hijo">
                    <div id="reader" className={`reader ${scanning ? 'active' : ''}`}></div>
                    <img
                        src={ScanQR}
                        className={`ScanQR ${scanning ? 'hidden' : ''}`}
                        onClick={startScanner}
                        alt="Start Scanning"
                    />
                    <button
                        className={`btn detener ${scanning ? '' : 'hidden'}`}
                        onClick={stopScanner}
                    >
                        Detener Escaneo
                    </button>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};
