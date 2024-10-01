import { Header } from "../Header"
import { Dropdown } from "../Components/Dropdown";
import "../Styles/Admin.css"
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
export const Actualizar = ()=>{

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [selectedDropdown, setSelectedDropdown] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/usuario-logueado', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            setNombres(data.nombres);
            setApellidos(data.apellidos);
            setCedula(data.cedula);
            setCorreo(data.correo);
            setSelectedDropdown(data.tipodocumento);
        })
        .catch(error => {
            console.error('Error al obtener los datos del usuario', error);
        });
    }, []);

    const handleDropdownChange = (option) => {
        setSelectedDropdown(option);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            nombres,
            apellidos,
            cedula,
            correo,
            rol: 1,
            tipodocumento: selectedDropdown
        };

        fetch('http://localhost:3000/actualizar-usuario', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    title: '¡Bien hecho!',
                    text: 'Los datos han sido actualizados con éxito',
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: data.message || 'Hubo un error al actualizar el usuario',
                    icon: 'error',
                    showConfirmButton: true,
                });
            }
        })
        .catch(error => {
            console.error('Error al actualizar los datos del usuario', error);
        })
    }

    return (
        <>
            <Header/>
            <div className="contenedorPadre">
                <form className="contenedor" onSubmit={handleSubmit}>
                    <section>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="Nombres"
                            value={nombres}
                            onChange={(e) => setNombres(e.target.value)}
                        />
                    </section>
                    <section>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="Apellidos"
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                        />
                    </section>
                    <section>
                        <Dropdown
                            value={selectedDropdown}
                            onChange={handleDropdownChange}  
                        />
                    </section>
                    <section>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="Documento"
                            value={cedula}
                            readOnly
                        />
                    </section>
                    <section>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="Correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </section>
                    <section className="botones">
                    <Link to='/Ruta' className="linkRegistro">
                        <input type="button" value="Cancelar" className="boton"/>
                    </Link>
                        <input type="submit" value="Enviar" className="boton"/>
                    </section>
                </form>
            </div>
        </>
    )
}