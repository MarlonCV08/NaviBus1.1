import Swal from "sweetalert2";
import logoMorado from '../Assets/Images/LogoMorado.svg'
export const LogoMorado = ()=>{
    const naviBus=()=>{
        Swal.fire({
            html: `
              <div style="display: flex; justify-content: center; align-items: center;">
                <img src="${logoMorado}" alt="Logo" style="width: 80px; height: 80px; margin-right: 20px;">
                <h2 style="margin: 0;">Navibus</h2>
              </div>
            `,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
          
    }
    return(
        <img src={logoMorado} className='logoMorado' onClick={naviBus}/>
    )
}