import "./Styles/Header.css";
import { useLocation } from "react-router-dom";
import { Lupa } from "./Components/Lupa";
import { Menu } from "./Components/Menu";

export const Header = () => {
  const location = useLocation();
  const noLupa = ["/SelectRegistro"]; // Asegúrate de que la ruta sea correcta

  return (
    <section className="curved">
      <Menu />
      {!noLupa.includes(location.pathname) && <Lupa />}
    </section>
  );
};