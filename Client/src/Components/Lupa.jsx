import "../Styles/Lupa.css"
import lupaImage from "../Assets/Images/Lupa.svg"
import { useState } from "react";
export const Lupa = ()=>{
    const [lupa, setLupa] = useState(false);
    const handleMenuToggle = () => {
        setLupa(prevLupa => !prevLupa);
    };
    return(
        <div className="lupa">
            <div className="lupaHijo">
                <input type="text" className={`noVisible ${lupa ? 'grow visible' : 'shrink  noVisible'}`} placeholder="Buscar..."/>

                <img src={lupaImage} className="imgLupa"  onClick={handleMenuToggle}/>
            </div>
        </div>
    )
}