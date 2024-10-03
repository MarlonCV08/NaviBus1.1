import '../Styles/Camion.css'
import Camion2 from '../Assets/Images/Camion2.svg'
import CamionImg from '../Assets/Images/Camion.svg'
export const Camion = () => {
  return (
    <div className='divCamiones'>
        <img src={Camion2} className='camion2'/>
        <img src={CamionImg} className="camion"/>
    </div>
  );
};
