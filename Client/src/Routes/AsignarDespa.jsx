import { Header } from "../Header"
import { DropdownRuta } from "../Components/DropdownRuta"
import "../Styles/AsignarDespa.css"
import { BotonAsignar } from "../Components/BotonAsignar"

export const AsignarDespa = ()=>{
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
                <BotonAsignar/>
            </div>
        </>
    )
}