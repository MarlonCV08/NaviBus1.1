import { Link } from "react-router-dom"
import Usuario from '../Assets/Images/UserCondu.svg'
export const HeaderCondu = ()=>{
    return (
        <>
            <section className="curvedCondu">
            <Link to='/Registro/Usuario' className="linkRegistro">
                    <img src={Usuario}/>
            </Link>
            </section>
        </>
    )
}