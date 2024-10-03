import "./Styles/Header.css";
import { Example } from "./Components/Menus/MenuAdmin/Example";
import { TituloBienvenida } from "./Components/TituloBienvenida";
import Logo from './Assets/Images/Logo.svg'
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const Navigate = useNavigate();
  const inicio =()=>{
    Navigate('/Ruta')
  }
  return (
    <section className="curved">
      <Example/>
      <TituloBienvenida/>
      <img src={Logo} onClick={inicio}/>
    </section>
  );
};