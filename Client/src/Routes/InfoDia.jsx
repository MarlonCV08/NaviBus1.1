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
                <label>Ruta</label>
                <label>Dia</label>
                <label>Hora de salida</label>
                <label>Hora de llegada</label>
                <label>Lugar de salida</label>
                <label>Lugar de llegada</label>
                <label>Multas</label>
            </div>
         </div>
        </>
    )
}