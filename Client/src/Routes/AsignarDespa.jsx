import { Header } from "../Header"
import { DropdownRuta } from "../Components/DropdownRuta"
import "../Styles/AsignarDespa.css"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"

export const AsignarDespa = ()=>{
    const handleButton =()=>{
        Swal.fire({
            title: `Ruta asignada correctamente`,
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          })
    }
    const [despachadores, setDespachadores] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/id-despachadores')
        .then(response => response.json())
        .then(data => setDespachadores(data))
        .catch(error => console.error('Error al traer los datos:', error))
    }, []);

    return (
        <>
            <Header/>
            <div className="contenedorConductores">
                {despachadores.map((despachador) => (
                    <div className="contInfo" key={despachador.cedula}>
                        <div className="infoConductor">
                            <p>{despachador.nombres} {despachador.apellidos}</p>
                            <DropdownRuta/>
                        </div>
                    </div>
                    ))}
            </div>
            <button onClick={handleButton} className="botonAsignar">Asignar ruta</button>
        </>
    )
}