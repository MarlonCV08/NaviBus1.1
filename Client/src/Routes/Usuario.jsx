import { Header } from "../Header"
import "../Styles/Usuario.css"
import Admin from "../Assets/Images/Admin.svg"
import Despachador from "../Assets/Images/Despachador.svg"
import  Conductor  from "../Assets/Images/Licencia.svg"
import { Link } from "react-router-dom"
export const Usuario =()=>{
    return(
        <>
            <Header />
            <div class="contenedorRol">
                <Link to="/Registro/Usuario/Admin" className="Link">
                    <div class="rol">
                        <img src={Admin}/>
                        <p>Administrador</p>
                    </div>
                </Link>
                <Link to="/Registro/Usuario/Despachador" className="Link">
                    <div class="rol">
                        <img src={Despachador}/>
                        <p>Despachador</p>
                    </div>
                </Link>
                <Link to="/Registro/Usuario/Conductor" className="Link">
                    <div class="rol">
                        <img src={Conductor}/>
                        <p>Conductor</p>
                    </div>
                </Link>
            </div>
        </>
    )
}