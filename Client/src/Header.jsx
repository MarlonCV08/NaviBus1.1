import "./Styles/Header.css";
import { useLocation } from "react-router-dom";
import { Lupa } from "./Components/Lupa";
import { Example } from "./Components/Menus/HeaderAdmin/Example";
import { TituloBienvenida } from "./Components/TituloBienvenida";

export const Header = () => {
  const location = useLocation();
  const noLupa = ["/Registro", "/Registro/Usuario", "/Registro/Usuario/Admin", "/Registro/Usuario/Despachador", "/Registro/Usuario/Conductor", "/Registro/Vehiculo", "/Ruta/Conductor/Control", "/Actualizar", "/Asignar"];

  return (
    <section className="curved">
      <Example/>
      <TituloBienvenida/>
    </section>
  );
};