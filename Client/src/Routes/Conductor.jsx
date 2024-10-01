import { Header } from "../Header"
import { Dropdown } from "../Components/Dropdown"
import Camara from "../Assets/Images/Camara.svg"
import { Link } from "react-router-dom"
import { Categoria } from "../Components/Categoria"
import "../Styles/Conductor.css"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { toast, ToastContainer } from "react-toastify"
export const Conductor =()=>{

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [cedula, setCedula] = useState('');
    const [confirmCedula, setConfirmCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [selectedDropdown, setSelectedDropdown] = useState('');
    const [categoria, setCategoria] = useState('');
    const [errorQueue, setErrorQueue] = useState([]);
    const [showingError, setShowingError] = useState(false);

    const notify = (message) => {
        toast.dismiss();
        toast.error(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        })
    }

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

    useEffect(() => {
        if (errorQueue.length > 0 && !showingError) {
            setShowingError(true);
            notify(errorQueue[0]);
        }
    }, [errorQueue, showingError]);

    const handleDropdownChange = (option) => {
        setSelectedDropdown(option);
    };

    const handleCategoria = (option) => {
        setCategoria(option);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cedula !== confirmCedula) {
            notify('El documento y la confirmación de documento no coinciden');
            return;
        }

        const formData = {
            nombres,
            apellidos,
            cedula,
            categoria: categoria,
            correo,
            rol: 2,
            tipodocumento: selectedDropdown
        };
        fetch('http://localhost:3000/api/conductores', {
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
                    title: 'Conductor creado correctamente',
                    text: `El conductor ${formData.nombres} ha sido registrado`,
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });

                //Limpiar los campos del formulario
                setNombres('');
                setApellidos('');
                setCedula('');
                setConfirmCedula('');
                setCorreo('');
                setSelectedDropdown('');
                setCategoria('');
            } else {
                if (data.errors) {
                    setErrorQueue(data.errors.map(error => error.msg));
                    setShowingError(false);
                } else {
                    notify(data.message || 'Error desconocido');
                }
            }
        })
        .catch(error => {
            console.error('Error al registrar el conductor', error);
        })
    }

    return (
        <>
            <Header/>
            <div className="contenedorPadre">
                    <form className="contenedorCondu" onSubmit={handleSubmit}>
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
                                    <Categoria value={categoria} onChange={handleCategoria} />
                                </section>
                                <section>
                                    <input 
                                        type="text" 
                                        className ="input" 
                                        placeholder="Correo"
                                        name="correo"
                                        value={correo}
                                        onChange={handleChange}
                                        />
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
                    <ToastContainer closeButton={false} limit={1}/>
            </div>
        </>
    )
}