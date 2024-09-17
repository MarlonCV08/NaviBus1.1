import { Link } from "react-router-dom";
import { Dropdown } from "../Components/Dropdown";
import { Header } from "../Header";
import "../Styles/Admin.css"
import React, { useState } from 'react';
import Swal from "sweetalert2";
export const Administrador =()=>{

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [cedula, setCedula] = useState('');
    const [confirmCedula, setConfirmCedula] = useState('')
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
            case 'cedula':
                setCedula(value);
                break;
            case 'confirmCedula':
                setConfirmCedula(value);
                break;
            case 'correo':
                setCorreo(value);
                break;
            default:
                break;
        };
    };

    const handleDropdownChange = (option) => {
        setSelectedDropdown(option);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cedula !== confirmCedula) {
            Swal.fire({
                title: 'Error',
                text: 'El documento y la confirmación de documento no coinciden',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        const formData = {
            nombres,
            apellidos,
            cedula,
            correo,
            rol: 1,
            tipodocumento: selectedDropdown
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

            if (data.success) {
                Swal.fire({
                    title: 'Administrador creado correctamente',
                    text: `El administrador ${formData.nombres} ha sido registrado`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });

                //Limpiar los campos del formulario
                setNombres("");
                setApellidos("");
                setCedula("");
                setConfirmCedula("");
                setCorreo("");
                setSelectedDropdown("");
            } else {
                Swal.fire({
                    title: 'Error al crear administrador',
                    text: data.message || 'Ocurrio un error al registrar el administrador',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
            }
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
                            name="cedula"
                            value={cedula}
                            onChange={handleChange}
                            />
                    </section>
                    <section>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="Confirmar Documento"
                            name="confirmCedula"
                            value={confirmCedula}
                            onChange={handleChange}
                            onPaste={(e) => e.preventDefault()}  // Deshabilitar pegar
                            onCopy={(e) => e.preventDefault()}   // Deshabilitar copiar
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