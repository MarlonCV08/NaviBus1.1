import { DropdownVehiculo } from "../Components/DropdownVehiculo"
import { Loader } from "../Components/Loader"
export const Validar = () => {
  return(
    <>
      <div className="validar">
        <section className="sectionValidar">
          <DropdownVehiculo/>
          <input type="text" className="inputValidar" placeholder="Placa"/>
          <input type="text" className="inputValidar" placeholder="ID despachador" />
          <section className="sectionBtnValidar">
            <button className="btnValidar">Validar</button>
          </section>
          <Loader/>
        </section>
      </div>
    </>
  )
}