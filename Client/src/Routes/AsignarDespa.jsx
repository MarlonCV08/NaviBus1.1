import { Header } from "../Header"
import { DropdownRuta } from "../Components/DropdownRuta"
import "../Styles/AsignarDespa.css"
import Swal from "sweetalert2"

export const AsignarDespa = ()=>{
    const handleButton =()=>{
        Swal.fire({
            title: `Ruta asignada correctamente`,
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          })
    }
    return (
        <>
            <Header/>
            <div className="contenedorConductores">
                <div className="contInfo">
                    <div className="infoConductor">
                        <p>despachador 1</p>
                        <DropdownRuta/>
                    </div>
                </div>
                <div className="contInfo">
                    <div className="infoConductor">
                        <p>despachador 2</p>
                        <DropdownRuta/>
                    </div>
                </div>
            </div>
            <button onClick={handleButton} className="botonAsignar">Asignar ruta</button>
        </>
    )
}