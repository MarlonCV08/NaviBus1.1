import { HeaderCondu } from "../Components/HeaderCondu"
import { QR } from "../Components/QR"
import '../Styles/InfoDia.css'
export const InfoDia = ()=>{
    return (
        <>
        <HeaderCondu/>
         <div className="contenedorInfo">
            <QR/>
            <div className="contenedorTabla">
                <table className="custom-tableInfo">
                    <tbody>
                        <tr>
                            <th>Punto de Control</th>
                            <td>Barro Blanco</td>
                        </tr>
                        <tr>
                            <th>Hora</th>
                            <td>06:00 a.m.</td>
                        </tr>
                        <tr>
                            <th>Minutos de retraso</th>
                            <td>0:00</td>
                        </tr>
                        <tr>
                            <th>Sanciones</th>
                            <td>Sin Sanciones</td>
                        </tr>
                    </tbody>
                </table>
            </div>

         </div>
        </>
    )
}