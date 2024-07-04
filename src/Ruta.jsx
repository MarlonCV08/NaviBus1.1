import "./Ruta.css"
import { Link } from "react-router-dom";
import RutaImg from "./Assets/Ruta.svg"
export const Ruta = ()=>{
    return(
        <div className="contRutas">
            <Link to='/RutaConductor' className="link">
                <div className="rutas">
                    <img src={RutaImg} className="imgRuta"/>
                    <p>Ruta 1</p>
                </div>
            </Link>
            <div className="rutas">
                <img src={RutaImg} className="imgRuta"/>
                <p>Ruta 2</p>
            </div>
            <div className="rutas">
                <img src={RutaImg} className="imgRuta"/>
                <p>Ruta 3</p>
            </div>
            <div className="rutas">
                <img src={RutaImg} className="imgRuta"/>
                <p>Ruta 4</p>
            </div>
            <div className="rutas">
                <img src={RutaImg} className="imgRuta"/>
                <p>Ruta 5</p>
            </div>
            <div className="rutas">
                <img src={RutaImg} className="imgRuta"/>
                <p>Ruta 6</p>
            </div>
            
            
            
        </div>
    )
}