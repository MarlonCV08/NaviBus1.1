import { MenuConductor } from "./Menus/MenuConductor/MenuConductor"
import '../Styles/HeaderCondu.css'
import Logo from '../Assets/Images/Logo.svg'
import { useNavigate } from "react-router-dom";
export const HeaderCondu = ()=>{
    const Navigate = useNavigate();
    const inicio =()=>{
      Navigate('/Validar/InfoDia')
    }
    return (
        <>
            <section className="curvedCondu">
            <MenuConductor/>
            <img src={Logo} onClick={inicio}/>
            </section>
        </>
    )
}