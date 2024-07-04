import { Header } from "./Header"
import "./SelectRegistro.css"
import Usuario from './Assets/Usuario.svg'
import Bus from './Assets/Bus.svg'
export const SelectRegistro = ()=>{
    return(
        <div className="containerRol">
        <div className="rol">
            <img src={Usuario} alt=""/>
            <p>Usuario</p>
        </div>
        <div className="rol">
            <img src={Bus} alt=""/>
            <p>Vehiculo</p>
        </div>
    </div>
    )
}