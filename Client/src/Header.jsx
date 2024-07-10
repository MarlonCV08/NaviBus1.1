import "./Styles/Header.css";
import { useLocation } from "react-router-dom";
import { Lupa } from "./Components/Lupa";
import { Menu } from "./Components/Menu";

export const Header = () => {
  const location = useLocation();
  const noLupa = ["/Registro", "/Registro/Usuario", "/Registro/Usuario/Admin", "/Registro/Usuario/Despachador", "/Registro/Vehiculo", "/Ruta/Conductor/Control"];

  return (
    <section className="curved">
      <Menu />
      {!noLupa.includes(location.pathname) && <Lupa />}
    </section>
  );
};