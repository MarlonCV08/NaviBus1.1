import { Link } from "react-router-dom"
import { Header } from "../Header"
import "../Styles/Vehiculo.css"
import { useEffect, useState } from "react"
import { DropdownLinea } from "../Components/DropdownLinea"
import { DropdownClaseVehiculo } from "../Components/DropdownClaseVehiculo"
import { DropdownMarca } from "../Components/DropdownMarca"
import Swal from "sweetalert2"
import { toast, ToastContainer } from "react-toastify"

export const Vehiculo = ()=>{

    const [placa, setPlaca] = useState('');
    const [modelo, setModelo] = useState('');
    const [numchasis, setNumchasis] = useState('');
    const [nummotor, setNummotor] = useState('');
    const [numpasajeros, setNumpasajeros] = useState('');
    const [cilindrada, setCilindrada] = useState('');
    const [marca, setMarca] = useState('');
    const [linea, setLinea] = useState('');
    const [clasevehiculo, setClasevehiculo] = useState('');
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
        });
      };

      useEffect(() => {
        if (errorQueue.length > 0 && !showingError) {
          setShowingError(true);
          notify(errorQueue[0]);
        }
      }, [errorQueue, showingError]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'placa':
                setPlaca(value.toUpperCase());
                break;
            case 'modelo':
                setModelo(value);
                break;
            case 'numchasis':
                setNumchasis(value.toUpperCase());
                break;
            case 'nummotor':
                setNummotor(value.toUpperCase());
                break;
            case 'numpasajeros':
                setNumpasajeros(value);
                break;
            case 'cilindrada':
                setCilindrada(value);
                break;
            default:
                break;
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            placa,
            modelo,
            numchasis,
            nummotor,
            numpasajeros,
            cilindrada,
            marca,
            linea,
            clasevehiculo
        };
        console.log('Datos del formulario:', formData);
        fetch('http://localhost:3000/api/vehiculos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del backend', data);

            if (data.success) {
                Swal.fire({
                    title: 'Vehiculo creado correctamente',
                    text: `El vehiculo con placas ${formData.placa} ha sido registrado`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });

                //Limpiar los campos del formulario
                setPlaca('');
                setModelo('');
                setNumchasis('');
                setNummotor('');
                setNumpasajeros('');
                setCilindrada('');
                setMarca('');
                setLinea('');
                setClasevehiculo('');
            } else {
                if (data.errors) {
                    setErrorQueue(data.errors.map(error => error.msg));
                    setShowingError(false);
                  } else {
                    notify(data.message || "Error desconocido.");
                  }
            }
        })
        .catch(error => console.error('Error al registrar vehiculo', error))
    }


    return(
        <>
        <Header />
        <div className="contenedorPadre">
            <form className="contenedor" onSubmit={handleSubmit}>
                <section className="inputs">
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="Placa"
                        name="placa"
                        value={placa}
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="Modelo"
                        name="modelo"
                        value={modelo}
                        onChange={handleChange}
                        />
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="N° Chasis"
                        name="numchasis"
                        value={numchasis}
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="N° Motor"
                        name="nummotor"
                        value={nummotor}
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="N° Pasajeros"
                        name="numpasajeros"
                        value={numpasajeros}
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="Cilindrada"
                        name="cilindrada"
                        value={cilindrada}
                        onChange={handleChange}
                    />
                        <DropdownMarca value={marca} onChange={setMarca} />
                        <DropdownLinea marcaCod={marca} value={linea} onChange={setLinea} />
                        <DropdownClaseVehiculo value={clasevehiculo} onChange={setClasevehiculo} />
                </section>
                <section className="botones">
                <Link to='/Registro' className="linkRegistro">
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