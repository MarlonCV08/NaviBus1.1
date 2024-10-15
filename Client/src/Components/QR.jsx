import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export const QR = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            // Decodifica el token para obtener la cédula
            const decodedToken = jwtDecode(token);
            const { cedula } = decodedToken; // Extrae la cédula del token decodificado
            
            setUserId(cedula); // Asigna la cédula como userId
        }
    }, []);
    // Verifica si userId está definido
    console.log("Valor de userId:", userId);
    if (!userId) {
        return <div>No hay ID de usuario disponible.</div>; // Mensaje alternativo si no hay userId
        
    }

    return (
        <div style={{ height: "auto", margin: "0 auto", width: "250px" }}>
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={userId} // Cambia esto para incluir el ID de usuario
                viewBox={`0 0 256 256`}
                />
        </div>
    );
};
