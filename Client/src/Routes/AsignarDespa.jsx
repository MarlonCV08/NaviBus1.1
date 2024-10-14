import { Header } from "../Header"
import "../Styles/AsignarDespa.css"
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
        console.log('Cédula:', cedula, 'Ruta:', ruta);
        setSelectedRutas((prevState) => {
            const newState = {
                ...prevState,
                [cedula]: ruta
            };
            console.log('Nuevo estado:', newState);
            return newState;
        });
    };
    
    return (
        <>
            <Header/>
            <div className="contenedorConductores">
                {despachadores.map((despachador) => (
                    <div className="contInfo" key={despachador.cedula}>
                        <div className="infoConductorAsi">
                            <p>{despachador.nombres} {despachador.apellidos}</p>
                            <ModalAsignar cedula={despachador.cedula} onDropdownChange={handleDropdownChange} />
                        </div>
                    </div>
                    ))}
            </div>
        </>
    )
}