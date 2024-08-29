import { Header } from "../Header"
import "../Styles/Usuario.css"
import Admin from "../Assets/Images/Admin.svg"
import Despachador from "../Assets/Images/Despachador.svg"
import  Conductor  from "../Assets/Images/Licencia.svg"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
export const Usuario =()=>{

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/roles')
        .then(response => response.json())
        .then(data => setRoles(data))
        .catch(error => console.error('Error al obtener los roles: ', error));
    }, []);

    const getImage = (imagen) => {
        switch (imagen) {
            case 'Admin.svg':
                return Admin;
            case 'Despachador.svg':
                return Despachador;
            case 'Licencia.svg':
                return Conductor;
            default:
                return null;
        }
    }

    return(
        <>
            <Header />
            <div className="contenedorRol">
                {roles.map(rol => (
                    <Link key={rol.codigo} to={`${rol.descripcion}`} className="link" >
                        <div className="rol">
                            <img src={getImage(rol.imagen)} alt="" />
                            <p>{rol.descripcion}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}