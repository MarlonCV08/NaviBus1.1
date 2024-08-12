import '../Styles/RutaConductor.css'
import Usuario from '../Assets/Images/Usuario.svg'
import Ojo from '../Assets/Images/Ojo.svg'
import { Header } from '../Header'
export const RutaConductor =()=>{
    return(
        <>
        <Header />
            <div className="contInfo">
                <div className="infoConductor">
                    <div className='div'>
                    <img src={Usuario} className="imgUser"/>
                    <p>Conductor 1</p>
                    </div>
                    <img src={Ojo} className="imgEye" onclick="abrirParadero()"/>
                </div>
                <div className="infoConductor">
                    <div className='div'>
                    <img src={Usuario} className="imgUser"/>
                    <p>Conductor 2</p>
                    </div>
                    <img src={Ojo} className="imgEye" onclick="abrirParadero()"/>
                </div>
                <div className="infoConductor">
                    <div className='div'>
                    <img src={Usuario} className="imgUser"/>
                    <p>Conductor 3</p>
                    </div>
                    <img src={Ojo} className="imgEye" onclick="abrirParadero()"/>
                </div>
            </div>
        </>
    )
}