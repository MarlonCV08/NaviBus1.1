import { Header } from "../Header"
import "../Styles/Usuario.css"
import Admin from "../Assets/Images/Admin.svg"
import Despachador from "../Assets/Images/Despachador.svg"
import  Conductor  from "../Assets/Images/Licencia.svg"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
export const Usuario =()=>{

    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);

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

    const handleRolClick = (rolId, route) => {
        fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rolId })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del backend:', data);
            navigate(route);
        })
        .catch(error => {
            console.error('Error al enviar el rolId: ', error);
            setError('Hubo un problema al envia el rol seleccionado');
        });
    }

    return(
        <>
            <Header />
            <div className="contenedorUsuario">
                {roles.map(rol => {

                    let route = '';
                    switch (rol.descripcion) {
                        case 'Administrador':
                            route = '/Registro/Usuario/Administrador';
                            break;
                        case 'Despachador':
                            route = '/Registro/Usuario/Despachador';
                            break;
                        case 'Conductor':
                            route = '/Registro/Usuario/Conductor';
                            break;
                        default:
                            route = '/Registro';
                            break;
                    }

                    return (

                        <div key={rol.codigo} onClick={() => handleRolClick(rol.codigo, route)} className="Link" >
                            <div className="rol">
                                <img src={getImage(rol.imagen)} alt="" />
                                <p>{rol.descripcion}</p>
                            </div>
                        </div>
                    )

                })}
            </div>
        </>
    )
}