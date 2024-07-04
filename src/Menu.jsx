import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./Menu.css";

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
      <ul className={`menu ${activar ? "visible" : ""}`}>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/SelectRegistro">Registro</Link>
        </li>
        <li>
          <Link to="/actualizar">Actualizar datos</Link>
        </li>
        <li>
          <Link to="/asignar-ruta">Asignar ruta</Link>
        </li>
        <li>
          <a href="../../sesiones/logout.php">Cerrar sesión</a>
        </li>
      </ul>
    </>
  );
};