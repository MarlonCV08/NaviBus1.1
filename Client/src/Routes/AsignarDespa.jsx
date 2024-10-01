import { Header } from "../Header"
import { DropdownRuta } from "../Components/DropdownRuta"
import "../Styles/AsignarDespa.css"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import { ModalAsignar } from "../Components/ModalAsignar"

export const AsignarDespa = ()=>{
    const [despachadores, setDespachadores] = useState([]);
    const [selectedRutas, setSelectedRutas] = useState({});
    
    useEffect(() => {
        fetch('http://localhost:3000/api/id-despachadores')
        .then(response => response.json())
        .then(data => setDespachadores(data))
        .catch(error => console.error('Error al traer los datos:', error))
    }, []);

    const handleDropdownChange = (cedula, ruta) => {
        setSelectedRutas((prevState) => ({
            ...prevState,
            [cedula]: ruta
        }));
    };
    
    const handleButton =()=>{
        Swal.fire({
            title: `Ruta asignada correctamente`,
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          })
    }
    return (
        <>
            <Header/>
            <div className="contenedorConductores">
                {despachadores.map((despachador) => (
                    <div className="contInfo" key={despachador.cedula}>
                        <div className="infoConductorAsi">
                            <p>{despachador.nombres} {despachador.apellidos}</p>
                            <ModalAsignar/>
                            {/* <DropdownRuta value={selectedRutas[despachador.cedula]} onChange={(ruta) => handleDropdownChange(despachador.cedula, ruta)} /> */}
                        </div>
                    </div>
                    ))}
            </div>
        </>
    )
}