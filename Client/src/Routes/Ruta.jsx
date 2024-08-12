import "../Styles/Ruta.css"
import { Link } from "react-router-dom";
import RutaImg from "../Assets/Images/Ruta.svg"
import { Header } from "../Header";
export const Ruta = ()=>{
    return(
        <>
            <Header />
            <div className="contRutas">
                <Link to='/Ruta/Conductores' className="linkRuta">
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
        </>
    )
}