import { Header } from "../Header"
import { DropdownRuta } from "../Components/DropdownRuta"
import "../Styles/AsignarDespa.css"
import { BotonAsignar } from "../Components/BotonAsignar"
import { useEffect, useState } from "react"

export const AsignarCondu = ()=>{

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
                            <div className="infoConductor">
                                <p>{conductor.nombres} {conductor.apellidos}</p>
                                <DropdownRuta/>
                            </div>
                        </div>
                    ))}
                <BotonAsignar/>
            </div>
        </>
    )
}