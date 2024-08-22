import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { HeaderDespa } from "../Components/HeaderDespa";

export const Scanner = () => {
    const [scanResult, setScanResult] = useState(null);
    const [scanner, setScanner] = useState(null);
    const [scanning, setScanning] = useState(false);

    const startScanning = () => {
        if (!scanner) {
            const newScanner = new Html5QrcodeScanner("reader", {
                qrbox: {
                    width: 300,
                    height: 300,
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
                    stopButton.style.display = "none";
                }
            }, 1000); // Esperar un segundo para asegurar que el escáner haya renderizado

            // Limpiar el temporizador al desmontar el componente
            return () => clearTimeout(timer);
        }
    }, [scanner]);

    useEffect(() => {
        // Observa cambios en el estado del escáner y muestra el botón de inicio
        if (scanning) {
            // El escáner está funcionando, no hay necesidad de hacer nada
        } else {
            // El escáner está detenido, mostrar el botón de inicio
            const startButton = document.querySelector("#reader .html5-qrcode-btn-container");
            if (startButton) {
                startButton.style.display = "block";
            }
        }
    }, [scanning]);

    return (
        <div>
            {/* <HeaderDespa /> */}
            <h1>Escáner QR</h1>
            <div id="reader" style={{ width: "300px", display: scanning ? 'block' : 'none' }}></div>
            {!scanning && <button onClick={startScanning}>Iniciar Escaneo</button>}
            {scanning && <button onClick={stopScanning}>Detener Escaneo</button>}
            {scanResult && <p>Redirigiendo a: {scanResult}</p>}
        </div>
    );
};
