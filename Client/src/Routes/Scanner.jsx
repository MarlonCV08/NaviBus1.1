import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import '../Styles/Scanner.css';
import { HeaderCondu } from "../Components/HeaderCondu";
import ScanQR from '../Assets/Images/ScanQR.svg';

export const Scanner = () => {
    const [scanner, setScanner] = useState(null);
    const [scanning, setScanning] = useState(false);

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
            <HeaderCondu />
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
            </div>
        </>
    );
};
