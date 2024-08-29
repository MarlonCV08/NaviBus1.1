import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import '../Styles/Scanner.css';
import { HeaderCondu } from "../Components/HeaderCondu";
import ScanQR from '../Assets/Images/ScanQR.svg'

export const Scanner = () => {
    const [scanResult, setScanResult] = useState(null);
    const [scanner, setScanner] = useState(null);
    const [scanning, setScanning] = useState(false);

    const startScanning = () => {
        if (!scanner) {
            const newScanner = new Html5QrcodeScanner("reader", {
                qrbox: {
                    width: 600,
                    height: 400,
                },
                fps: 10,
            });

            newScanner.render(
                (result) => {
                    setScanResult(result);
                    newScanner.clear();

                    if (result.startsWith("http://") || result.startsWith("https://")) {
                        window.location.href = result;
                    } else {
                        console.warn("El resultado escaneado no es un enlace válido:", result);
                    }
                },
                (error) => {
                    console.warn("No se pudo escanear el código QR. Inténtalo de nuevo.", error);
                }
            );

            setScanner(newScanner);
            setScanning(true); // Ocultar el botón de inicio al comenzar el escaneo
        }
    };

    const stopScanning = () => {
        if (scanner) {
            scanner.clear();
            setScanner(null);
            setScanning(false); // Mostrar el botón de inicio al detener el escaneo
        }
    };

    useEffect(() => {
        if (scanner) {
            // Encontrar y ocultar el botón de detener escaneo predeterminado
            const timer = setTimeout(() => {
                const stopButton = document.querySelector("#reader .html5-qrcode-btn-container");
                if (stopButton) {
                    stopButton.classList.add('hidden');
                }
            }, 1000); // Esperar un segundo para asegurar que el escáner haya renderizado

            // Limpiar el temporizador al desmontar el componente
            return () => clearTimeout(timer);
        }
    }, [scanner]);

    return (
        <>
            <HeaderCondu/>
            <div className="contenedorQR">
                <div className="Hijo">
                    <div id="reader" className={`reader ${scanning ? 'active' : ''}`} style={{ width: "300px", height:"220px"}}>
                        {/* El contenido generado por html5-qrcode será inyectado aquí */}
                    </div>
                    <img
                        src={ScanQR}
                        className={`ScanQR ${scanning ? 'hidden' : ''}`} 
                        onClick={startScanning}
                    >
                    </img>
                    <button 
                        className={`btn detener ${scanning ? '' : 'hidden'}`} 
                        onClick={stopScanning}
                    >
                        Detener Escaneo
                    </button>
                    {scanResult && <p>Redirigiendo a: {scanResult}</p>}
                </div>
            </div>
        </>
    );
};
