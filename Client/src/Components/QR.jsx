import QRCode from "react-qr-code";

export const QR = ({ userId }) => {
    // Verifica si userId está definido
    console.log("Valor de userId:", userId);
    if (!userId) {
        return <div>No hay ID de usuario disponible.</div>; // Mensaje alternativo si no hay userId
        
    }

    return (
        <div style={{ height: "auto", margin: "0 auto", width: "50%" }}>
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={userId} // Cambia esto para incluir el ID de usuario
                viewBox={`0 0 256 256`}
                />
        </div>
    );
};
