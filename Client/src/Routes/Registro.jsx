import { Header } from "../Header"
import "../Styles/Registro.css"
import Usuario from '../Assets/Images/Usuario.svg'
import Bus from '../Assets/Images/Bus.svg'
import { Link } from "react-router-dom";

export const Registro = ()=>{
    return(
    <>
    <Header />
        <div className="containerRol">
            <Link to='/Registro/Usuario' className="linkRegistro">
                <div className="rol">
                    <img src={Usuario} alt=""/>
                    <p>Usuario</p>
                </div>
            </Link>
            <Link to='/Registro/Vehiculo' className="linkRegistro">
                <div className="rol">
                    <img src={Bus} alt=""/>
                    <p>Vehiculo</p>
                </div>
            </Link>
        </div>
    </>
    )
}