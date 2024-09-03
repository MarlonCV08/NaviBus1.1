import { Link } from "react-router-dom";
import { Dropdown } from "../Components/Dropdown";
import { Header } from "../Header";
import "../Styles/Admin.css"
import React, { useState } from 'react';
export const Administrador =()=>{

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [documento, setDocumento] = useState('');
    const [correo, setCorreo] = useState('');
    const [selectedDropdown, setSelectedDropdown] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'nombres':
                setNombres(value);
                break;
            case 'apellidos':
                setApellidos(value);
                break;
            case 'documento':
                setDocumento(value);
                break;
            case 'correo':
                setCorreo(value);
                break;
            default:
                break;
        };
    };

    const handleDropdownChange = (e) => {
        setSelectedDropdown(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            nombres,
            apellidos,
            documento,
            correo,
            rolId: 1,
            Dropdown: selectedDropdown
        };
        fetch('http://localhost:3000/api/administradores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del backend:', data);
        })
        .catch(error => {
            console.error('Error al enviar el formulario:', error);
        })
    }

    return(
        <>
        <Header/>
            <div className="contenedorPadre">
                <form className="contenedor" onSubmit={handleSubmit}>
                    <section>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="Nombres"
                            name="nombres"
                            value={nombres}
                            onChange={handleChange}
                            />
                    </section>
                    <section>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="Apellidos"
                            name="apellidos"
                            value={apellidos}
                            onChange={handleChange}
                            />
                    </section>
                    <section>
                        <Dropdown value={selectedDropdown} onChange={handleDropdownChange} />
                    </section>
                    <section>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="Documento"
                            name="documento"
                            value={documento}
                            onChange={handleChange}
                            />
                    </section>
                    <section>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="Correo"
                            name="correo"
                            value={correo}
                            onChange={handleChange}
                            />
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