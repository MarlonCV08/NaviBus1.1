import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../Styles/Menu.css";
import { Logout } from "../Routes/Logout";

export const Menu = () => {
  const [activar, setActivar] = useState(false);
  const handleMenuToggle = () => {
    setActivar((prevActivar) => !prevActivar);
  };

  return (
    <>
      <div id="activar" className="divActivar">
        <button className="btnMenu" onClick={handleMenuToggle}>
          <div className={`${activar ? "divBtn1" : "divBtn1A"}`}></div>
          <div className={`${activar ? "divBtn2" : "divBtn2A"}`}></div>
          <div className={`${activar ? "divBtn3" : "divBtn3A"}`}></div>
        </button>
      </div>
      <ul className={`menu ${activar ? "visible encima" : "abajo"}`}>
        <li>
          <Link to="/Ruta">Inicio</Link>
        </li>
        <li>
          <Link to="/Registro">Registro</Link>
        </li>
        <li>
          <Link to="/Actualizar">Actualizar datos</Link>
        </li>
        <li>
          <Link to="/Asignar">Asignar Ruta</Link>
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </>
  );
};