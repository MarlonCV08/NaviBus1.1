import "../Styles/Control.css"
import { Header } from "../Header"
export const Control=()=>{
    return(
        <>
            <Header />
            <div className="tableContainer">
                <div className="table">
                    <table>
                        <tr><td>Dia</td><td className="td">11/04/2024</td></tr>
                        <tr><td>Ruta</td><td className="td">05</td></tr>
                        <tr><td>Lugar de salida</td></tr>
                        <tr><td>Lugar de llegada</td></tr>
                        <tr><td>Hora de salida</td></tr>
                        <tr><td>Hora de llegada</td></tr>
                        <tr><td>Minutos de retraso</td></tr>
                        <tr><td>Sanciones</td></tr>
                    </table>
                </div>
            </div>
        </>
    )
}