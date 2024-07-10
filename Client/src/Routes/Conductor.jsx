import '../Styles/Conductor.css'
import Usuario from '../Assets/Images/Usuario.svg'
import Ojo from '../Assets/Images/Ojo.svg'
import { Header } from '../Header'
import { Link } from 'react-router-dom'
export const Conductor =()=>{
    return(
        <>
        <Header />
            <div className="contInfo">
                <div className="infoConductor">
                    <div className='div'>
                    <img src={Usuario} className="imgUser"/>
                    <p>Conductor 1</p>
                    </div>
                    <Link to='/Ruta/Conductor/Control' className='link'>
                    <img src={Ojo} className="imgEye"/>
                    </Link>
                </div>
                <div className="infoConductor">
                    <div className='div'>
                    <img src={Usuario} className="imgUser"/>
                    <p>Conductor 2</p>
                    </div>
                    <img src={Ojo} className="imgEye"/>
                </div>
                <div className="infoConductor">
                    <div className='div'>
                    <img src={Usuario} className="imgUser"/>
                    <p>Conductor 3</p>
                    </div>
                    <img src={Ojo} className="imgEye"/>
                </div>
            </div>
        </>
    )
}