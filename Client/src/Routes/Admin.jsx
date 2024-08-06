import { Link } from "react-router-dom";
import { Dropdown } from "../Components/Dropdown";
import { Header } from "../Header";
import "../Styles/Admin.css"
import React, { useState } from 'react';
export const Admin =()=>{
    return(
        <>
        <Header/>
            <div className="contenedorPadre">
                <form className="contenedor">
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
                        <input type="hidden" name="1"/>
                    </section>
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