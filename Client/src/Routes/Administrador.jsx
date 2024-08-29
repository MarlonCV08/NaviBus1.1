import { Link } from "react-router-dom";
import { Dropdown } from "../Components/Dropdown";
import { Header } from "../Header";
import "../Styles/Admin.css"
import React, { useState } from 'react';
export const Administrador =()=>{
    return(
        <>
        <Header/>
            <div className="contenedorPadre">
                <form className="contenedor">
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
                        <input type="hidden" value={1}/>
                    </section>
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