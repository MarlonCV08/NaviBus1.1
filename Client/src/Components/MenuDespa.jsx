import { useState } from "react";
import { Link } from "react-router-dom"
import Usuario from '../Assets/Images/UserCondu.svg'
import { Logout } from "../Routes/Logout";
import '../Styles/MenuCondu.css'
export const MenuDespa = ()=>{
    const [activar, setActivar] = useState(false);
    const handleMenuToggle = () => {
        setActivar((prevActivar) => !prevActivar);
     };
    return (
        <>
            <img src={Usuario} onClick={handleMenuToggle}/>
            <ul className={`menuCondu ${activar ? "visible encima" : "abajo"}`}>
                <li>
                  <Link to="/Actualizar Despachador">Actualizar Datos</Link>
                </li>
                <li>
                  <Logout />
                </li>
            </ul>
        </>
    )
}