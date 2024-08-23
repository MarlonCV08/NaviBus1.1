import "../Styles/Ruta.css"
import { Link } from "react-router-dom";
import RutaImg from "../Assets/Images/Ruta.svg"
import { Header } from "../Header";
import { useEffect, useState } from "react";
export const Ruta = ()=>{

    const [rutas, setRutas ] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/rutas?conductor=1')
        .then(response => response.json())
        .then(data => setRutas(data))
        .catch(error => console.error('Error al obtener las rutas:', error))
    }, []);

    return(
        <>
            <Header />
            <div className="contRutas">
                {rutas.map((ruta, index) => (
                    <Link to={`/Ruta/${ruta.codigo}`} className="linkRuta" key={index}>
                        <div className="rutas">
                            <img src={RutaImg} />
                            <p>{ruta.codigo}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}