import { MenuDespachador } from "./Menus/MenuDespachador/MenuDespachador"
import Logo from '../Assets/Images/Logo.svg'
import { useNavigate } from "react-router-dom";
export const HeaderDespa = ()=>{
    const Navigate = useNavigate();
    const inicio =()=>{
      Navigate('/Scanner')
    }
    return (
        <>
            <section className="curvedCondu">
                <MenuDespachador/>
                <img src={Logo} onClick={inicio}/>
            </section>
        </>
    )
}