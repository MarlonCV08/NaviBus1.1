import "../Styles/Ruta.css"
import { Link, useParams } from "react-router-dom";
import RutaImg from "../Assets/Images/Ruta.svg"
import { Header } from "../Header";
import { useEffect, useState } from "react";
export const Ruta = ()=>{

    const [rutas, setRutas ] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/rutas')
        .then(response => response.json())
        .then(data => setRutas(data))
        .catch(error => console.error('Error al obtener las rutas:', error))
    }, []);

    return(
        <>
            <Header />
            <div className="contRutas">
                {rutas.map((ruta) => (
                    <Link to={`/Ruta/${ruta.nombre}`} className="linkRuta" key={ruta.codigo}>
                        <div className="rutas">
                            <img src={RutaImg} />
                            <p>{ruta.nombre}</p>
                        </div>
                    </Link>
                ))}
            </div>
                
        </>
    )
}