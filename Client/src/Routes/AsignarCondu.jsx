import { Header } from "../Header"
import { DropdownRuta } from "../Components/DropdownRuta"
import "../Styles/AsignarDespa.css"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"

export const AsignarCondu = ()=>{
    const handleButton =()=>{
        Swal.fire({
            title: `Ruta asignada correctamente`,
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          })
    }

    const [conductores, setConductores] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/id-conductores')
        .then(response => response.json())
        .then(data => setConductores(data))
        .catch(error => console.error('Error al traer los datos:', error))
    }, []);

    return (
        <>
            <Header/>
            <div className="contenedorConductores">
                {conductores.map((conductor) => (
                        <div className="contInfo" key={conductor.cedula}>
                            <div className="infoConductorAsi">
                                <p>{conductor.nombres} {conductor.apellidos}</p>
                                <DropdownRuta/>
                            </div>
                        </div>
                    ))}
            </div>
            <button onClick={handleButton} className="botonAsignar">Asignar ruta</button>
        </>
    )
}