import '../Styles/Conductores.css'
import Usuario from '../Assets/Images/Usuario.svg'
import Ojo from '../Assets/Images/Ojo.svg'
import { Header } from '../Header'
import { Link } from 'react-router-dom'
import { Notificacion } from '../Components/Notificacion'
import { useEffect, useState } from 'react'
export const Conductores =()=>{

    const [conductores, setConductores] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/conductores')
        .then(response => response.json())
        .then(data => setConductores(data))
        .catch(error => console.error('Error al obtener los conductores', error))
    }, []);

    return(
        <>
            <Header />
            <div className="contInfo">
                {conductores.map((conductor, index) => (
                    <div className="infoConductor">
                        <div className='div'>
                            <img src={Usuario} className="imgUser"/>
                            <p>{conductor.nombres}</p>
                        </div>
                        <Link to='/Ruta/:codigo/:nombres' className='link' key={index}>
                            <img src={Ojo} className="imgEye"/>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}