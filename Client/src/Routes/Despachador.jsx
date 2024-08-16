import { Dropdown } from "../Components/Dropdown"
import { Header } from "../Header"
import Camara from "../Assets/Images/Camara.svg"
import "../Styles/Despachador.css"
import { Link } from "react-router-dom"
export const Despachador = ()=>{
    return(
        <>
            <Header/>
            <div className="contenedorPadre">
                    <form className="contenedor">
                        <div className="contenedorHijo">
                            <div className="contenedorCamara">
                                <img src={Camara} alt=""/>
                                <section>
                                    <label className="label">Subir archivo</label>
                                    <input type="file" id="btn-file"/>
                                </section>
                            </div>
                            <div className="contenedorInput">
                                <section>
                                    <input type="text" className="input" placeholder="Nombres"/>
                                </section>
                                <section>
                                    <input type="text" className="input" placeholder="Apellidos"/>
                                </section>
                                <section>
                                    <Dropdown/>
                                </section>
                                <section>
                                    <input type="text" className="input" placeholder="Documento"/>
                                </section>
                                <section>
                                    <input type="text" className="input" placeholder="Correo"/>
                                </section>
                                <section>
                                    <input type="hidden" value={2}/>
                                </section>
                            </div>
                        </div>
                            <section className="botones">
                                <Link to='/Registro/Usuario' className="linkRegistro">
                                    <input type="button" value="Cancelar" className="boton"/>
                                </Link>
                                <input type="submit" value="Enviar" className="boton"/>
                            </section>
                    </form>
            </div>
        </>
    )
}