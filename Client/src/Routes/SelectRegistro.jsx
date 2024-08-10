import { Header } from "../Header"
import "../Styles/SelectRegistro.css"
import Usuario from '../Assets/Images/Usuario.svg'
import Bus from '../Assets/Images/Bus.svg'

export const SelectRegistro = ()=>{
    return(
    <>
    <Header />
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
    </>
    )
}