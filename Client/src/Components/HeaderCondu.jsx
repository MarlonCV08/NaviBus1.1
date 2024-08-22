import { Link } from "react-router-dom"
import Usuario from '../Assets/Images/UserCondu.svg'
export const HeaderCondu = ()=>{
    return (
        <>
            <section className="curvedCondu">
            <Link to='/Validar/Actualizar' className="linkRegistro">
                    <img src={Usuario}/>
            </Link>
            </section>
        </>
    )
}