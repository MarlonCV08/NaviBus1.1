import { HeaderCondu } from "../Components/HeaderCondu"
import { Dropdown } from "../Components/Dropdown"
import Volante from '../Assets/Images/Volante.svg'
import { Link } from "react-router-dom"
import { Categoria } from "../Components/Categoria"
export const ActualizarCondu = ()=>{
    return(
        <>
            <HeaderCondu/>
            <div className="contenedorPadre">
                    <form className="contenedor">
                        <div className="contenedorHijo">
                            <div className="contenedorCamara">
                                <img src={Volante} alt=""/>
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
                                    <Categoria/>
                                </section>
                                <section>
                                    <input type="text" className ="input" placeholder="Correo"/>
                                </section>
                                <section>
                                    <input type="hidden" value={3}/>
                                </section>
                            </div>
                        </div>
                            <section className="botones">
                                <Link to='/Validar/InfoDia' className="linkRegistro">
                                    <input type="button" value="Cancelar" className="boton"/>
                                </Link>
                                <input type="submit" value="Enviar" className="boton"/>
                            </section>
                    </form>
            </div>
        </>
    )
}