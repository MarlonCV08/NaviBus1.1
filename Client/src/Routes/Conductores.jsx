import '../Styles/Conductores.css'
import Usuario from '../Assets/Images/Usuario.svg'
import Ojo from '../Assets/Images/Ojo.svg'
import { Header } from '../Header'
import { Link, useParams } from 'react-router-dom'
import { Notificacion } from '../Components/Notificacion'
import { useEffect, useState } from 'react'
export const Conductores =()=>{

    const { codigo } = useParams();
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/usuarios/${codigo}`)
        .then(response => response.json())
        .then(data => setUsuarios(data))
        .catch(error => console.error('Error al obtener los conductores', error))
    }, []);

    return(
        <>
            <Header />
            <div className="contInfo">
                {usuarios.length > 0 ? (
                    usuarios.map((usuario, index) => (
                        <div className="infoConductor" key={index}>
                            <div className='div'>
                                <img src={Usuario} className="imgUser"/>
                                <p>{usuario.nombres} {usuario.apellidos}</p>
                            </div>
                            <Link to={`/Ruta/${usuario.nombres}`} className='link' >
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