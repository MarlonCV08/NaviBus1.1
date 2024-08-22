import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { HeaderDespa } from "../Components/HeaderDespa";

export const Scanner = () => {
    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader", {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 10,
        });

        scanner.render(
            (result) => {
                setScanResult(result);
                scanner.clear();

                // Redirigir automáticamente al enlace escaneado
                if (result.startsWith("http://") || result.startsWith("https://")) {
                    window.location.href = result;
                } else {
                    console.warn("El resultado escaneado no es un enlace válido:", result);
                }
            },
            (error) => {
                console.warn("Error en el escaneo: ", error);
            }
        );

        return () => {
            scanner.clear();
        };
    }, []);

    return (
        <div>
            <HeaderDespa />
            <h1>Escáner QR</h1>
            <div id="reader" style={{ width: "300px" }}></div>
            {scanResult && <p>Redirigiendo a: {scanResult}</p>}
        </div>
    );
};