import '../Styles/Conductores.css'
import Usuario from '../Assets/Images/Usuario.svg'
import Ojo from '../Assets/Images/Ojo.svg'
import { Header } from '../Header'
import { Link, useParams } from 'react-router-dom'
import { Notificacion } from '../Components/Notificacion'
import { useEffect, useState } from 'react'
export const Conductores =()=>{

    const { codigo } = useParams();
    const [conductores, setConductores] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/conductores/${codigo}`)
        .then(response => response.json())
        .then(data => setConductores(data))
        .catch(error => console.error('Error al obtener los conductores', error))
    }, []);

    return(
        <>
            <Header />
            <div className="contInfo">
                {conductores.length > 0 ? (
                    conductores.map((conductor) => (
                        <div className="infoConductor" key={conductor.codigo}>
                            <div className='div'>
                                <img src={Usuario} className="imgUser"/>
                                <p>{conductor.nombres} {conductor.apellidos}</p>
                            </div>
                            <Link to={`/Ruta/${conductor.nombres}`} className='link' >
                                <img src={Ojo} className="imgEye"/>
                            </Link>
                        </div>
                    ))
                ): (
                    <p>No se encontraron conductores</p>
                )}
            </div>
        </>
    )
}