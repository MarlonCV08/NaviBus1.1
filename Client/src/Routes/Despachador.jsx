import { Dropdown } from "../Components/Dropdown"
import { Header } from "../Header"
import Camara from "../Assets/Images/Camara.svg"
import "../Styles/Despachador.css"
import { Link } from "react-router-dom"
export const Despachador = ()=>{
    return(
        <>
            <Header/>
            <div class="contenedorPadre">
                    <form class="contenedor">
                        <div class="contenedorHijo">
                            <div className="contenedorCamara">
                                <img src={Camara} alt=""/>
                                <section>
                                    <label for="btn-file" class="label">Subir archivo</label>
                                    <input type="file" id="btn-file"/>
                                </section>
                            </div>
                            <div class="contenedorInput">
                                <section>
                                    <input type="text" class="input" placeholder="Nombres"/>
                                </section>
                                <section>
                                    <input type="text" class="input" placeholder="Apellidos"/>
                                </section>
                                <section>
                                    <Dropdown/>
                                </section>
                                <section>
                                    <input type="text" class="input" placeholder="Documento"/>
                                </section>
                                <section>
                                    <input type="text" class="input" placeholder="Correo"/>
                                </section>
                                <section>
                                    <input type="hidden" name="3"/>
                                </section>
                            </div>
                        </div>
                            <section class="botones">
                                <Link to='/Registro/Usuario' className="linkRegistro">
                                    <input type="button" value="Cancelar" class="boton"/>
                                </Link>
                                <input type="submit" value="Enviar" class="boton"/>
                            </section>
                    </form>
            </div>
        </>
    )
}