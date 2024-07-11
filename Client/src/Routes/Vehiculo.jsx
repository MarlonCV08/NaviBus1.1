import { Link } from "react-router-dom"
import { Header } from "../Header"
import "../Styles/Vehiculo.css"
export const Vehiculo = ()=>{
    return(
        <>
        <Header />
        <div class="contenedorPadre">
            <form class="contenedor">
                <section className="inputs">
                    <input type="text" class="input" placeholder="Placa"/>
                    <input type="text" class="input" placeholder="Linea"/>
                    <input type="text" class="input" placeholder="Modelo"/>
                    <input type="text" class="input" placeholder="N° Chasis"/>
                    <input type="text" class="input" placeholder="N° Motor"/>
                    <input type="text" class="input" placeholder="N° Pasajeros"/>
                    <input type="text" class="input" placeholder="Cilindrada"/>
                </section>
                <section class="botones">
                <Link to='/Registro' className="linkRegistro">
                    <input type="button" value="Cancelar" class="boton"/>
                </Link>
                    <input type="submit" value="Enviar" class="boton"/>
                </section>
            </form>
        </div>
        </>
    )
}