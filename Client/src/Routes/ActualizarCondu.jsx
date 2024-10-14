import { HeaderCondu } from "../Components/HeaderCondu"
import { Dropdown } from "../Components/Dropdown"
import Camara from "../Assets/Images/Camara.svg"
import { Link } from "react-router-dom"
import { Categoria } from "../Components/Categoria"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
export const ActualizarCondu = ()=>{

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [selectedDropdown, setSelectedDropdown] = useState('');
    const [categoria, setCategoria] = useState('');

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
            setCategoria(data.categoria)
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
            rol: 2,
            tipodocumento: selectedDropdown,
            categoria
        };

        fetch('http://localhost:3000/actualizar-conductor', {
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

    return(
        <>
            <HeaderCondu/>
            <div className="contenedorPadre">
                    <form className="contenedor" onSubmit={handleSubmit}>
                        <div className="contenedorHijo">
                            <div className="contenedorCamara">
                                <img src={Camara} alt=""/>
                                <section>
                                    <label htmlFor="btn-file" className="label">Subir archivo</label>
                                    <input type="file" id="btn-file"/>
                                </section>
                            </div>
                            <div className="contenedorInput">
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
                                        disabled={true}
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
                                    <Categoria 
                                        value={categoria}
                                        onChange={setCategoria}
                                    />
                                </section>
                                <section>
                                    <input 
                                        type="text" 
                                        className ="input" 
                                        placeholder="Correo"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                    />
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