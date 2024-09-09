import { Link } from "react-router-dom"
import { Header } from "../Header"
import Despachador from "../Assets/Images/Despachador.svg"
import  Conductor  from "../Assets/Images/Licencia.svg"

export const Asignar = ()=>{
    return(
        <>
            <Header/>
            <div className="containerRol">
            <Link to='/Asignar/Despachador' className="linkRegistro">
                <div className="rol">
                    <img src={Despachador}/>
                    <p>Despachador</p>
                </div>
            </Link>
            <Link to='/Asignar/Conductor' className="linkRegistro">
                <div className="rol">
                    <img src={Conductor}/>
                    <p>Conductor</p>
                </div>
            </Link>
        </div>
        </>
    )
}