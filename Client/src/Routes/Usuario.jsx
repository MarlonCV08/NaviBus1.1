import { Header } from "../Header"
import "../Styles/Usuario.css"
import Admin from "../Assets/Images/Admin.svg"
import Despachador from "../Assets/Images/Despachador.svg"
import  Conductor  from "../Assets/Images/Licencia.svg"
export const Usuario =()=>{
    return(
        <>
            <Header />
            <div class="contenedorRol">
                <div class="rol" onclick="abrirRegistroAdmin()">
                    <img src={Admin}/>
                    <p>Administrador</p>
                </div>
                <div class="rol" onclick="abrirRegistroDespa()">
                    <img src={Despachador}/>
                    <p>Despachador</p>
                </div>
                <div class="rol" onclick="abrirRegistroCondu()">
                    <img src={Conductor}/>
                    <p>Conductor</p>
                </div>
            </div>
        </>
    )
}