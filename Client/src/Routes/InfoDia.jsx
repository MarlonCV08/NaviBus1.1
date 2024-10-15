import { jwtDecode } from "jwt-decode"
import { HeaderCondu } from "../Components/HeaderCondu"
import { QR } from "../Components/QR"
import '../Styles/InfoDia.css'
import { useEffect, useState } from "react"
export const InfoDia = ()=>{

    const [infoDia, setInfoDia] = useState(null);
    const [cedula, setCedula] = useState('');
    const minutosRetraso = localStorage.getItem('minutosRetraso');
    const sanciones = localStorage.getItem('sanciones');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setCedula(decodedToken.cedula);

        }
    }, []);
    
    useEffect(() => {
        const fetchInfoDia = () => {
            if (!cedula) return;
    
            fetch(`http://localhost:3000/api/ultimo-registro/${cedula}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('No se pudo obtener la información');
                    }
                    return response.json();
                })
                .then(data => {
                    // Aquí imprimimos la data para verificar su contenido
                    console.log('Datos recibidos de la API:', data);
                    setInfoDia(data);

                    
                })
                .catch(error => {
                    console.error('Error al obtener la información', error);
                });
            };
            
            fetchInfoDia();
        }, [cedula]);
        
    return (
        <>
            <HeaderCondu />
            <div className="contenedorInfo">
                <QR />
                <div className="contenedorTabla">
                    {infoDia ? (
                        <table className="custom-tableInfo">
                            <tbody>
                                <tr>
                                    <th>Punto de Control</th>
                                    <td>{infoDia.puntoscontrol}</td>
                                </tr>
                                <tr>
                                    <th>Hora</th>
                                    <td>{new Date(infoDia.hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <p>Cargando información...</p>
                    )}
                </div>
            </div>
        </>
    );
}