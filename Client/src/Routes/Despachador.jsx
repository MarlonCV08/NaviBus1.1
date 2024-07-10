import { Dropdown } from "../Components/Dropdown"
import { Header } from "../Header"
import Camara from "../Assets/Images/Camara.svg"
import "../Styles/Despachador.css"
export const Despachador = ()=>{
    return(
        <>
            <Header/>
            <div class="contenedorPadre">
                <form class="contenedor">
                    <img src={Camara} alt=""/>
                    <section>
                        <label for="btn-file" class="label">Subir archivo</label>
                        <input type="file" id="btn-file"/>
                    </section>
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
                    <section class="botones">
                        <input type="button" value="Cancelar" class="boton" onclick="cancelar()"/>
                        <input type="submit" value="Enviar" class="boton"/>
                    </section>
                </form>
            </div>
        </>
    )
}