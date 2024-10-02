import '../Styles/Conductores.css'
import Usuario from '../Assets/Images/Usuario.svg'
import Ojo from '../Assets/Images/Ojo.svg'
import { Header } from '../Header'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
export const Conductores =()=>{

    const { rutaNombre } = useParams();
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/usuarios/${rutaNombre}`)
        .then(response => response.json())
        .then(data => setUsuarios(data))
        .catch(error => console.error('Error al obtener los conductores', error))
    }, [rutaNombre]);

    return(
        <>
            <Header />
            <div className="contInfo">
                {usuarios.length > 0 ? (
                    usuarios.map((usuario) => (
                        <div className="infoConductor" key={usuario.cedula}>
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