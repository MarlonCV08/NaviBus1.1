import Swal from "sweetalert2";
import "../Styles/BotonAsignar.css"
export const BotonAsignar=()=>{
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
    <div>
      <button onClick={handleButton} className="botonAsignar">Asignar ruta</button>
    </div>
  );
}