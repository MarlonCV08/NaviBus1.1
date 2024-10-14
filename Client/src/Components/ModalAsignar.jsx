import '../Styles/ModalAsignar.css'
import { useState } from "react";
import { motion } from "framer-motion";
import { DropdownRuta } from './DropdownRuta';
import Swal from 'sweetalert2';
import { DropdownPuntoControl } from './DropdownPuntoControl';

export const ModalAsignar = ({ cedula, onDropdownChange }) => {
  const [selectedRuta, setSelectedRuta] = useState(""); // Estado para la ruta seleccionada
  const [selectedPuntoControl, setSelectedPuntoControl] = useState(""); // Estado para el punto de control
  const [isVisible, setIsVisible] = useState(false);
  const [botonVisible, setBotonVisible] = useState(true);

  // Maneja el cambio de ruta en el DropdownRuta
  const handleRutaChange = (ruta) => {
    setSelectedRuta(ruta);
    onDropdownChange(cedula, ruta); // Comunicar al componente padre la ruta seleccionada
  };

  // Maneja el cambio de punto de control en el DropdownPuntoControl
  const handlePuntoControlChange = (puntoControl) => {
    setSelectedPuntoControl(puntoControl);
  };

  const show = {
    opacity: 1,
    display: "flex"
  };

  const hide = {
    opacity: 0,
    transitionEnd: {
      display: "none"
    }
  };
  const showButton={
    opacity:1,
    display: 'flex'
  }

  const handleButton =()=>{

    if (selectedRuta && selectedPuntoControl) {
      fetch('http://localhost:3000/api/asignar-despachador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cedula: cedula,
          ruta: selectedRuta,
          puntoControl: selectedPuntoControl,
        }),
      })
      .then(response => response.json())
      .then(() => {
        Swal.fire({
          title: `Despachador asignado correctamente`,
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setTimeout(() => {
          onDropdownChange(cedula);
          setIsVisible(!isVisible)
          setBotonVisible(!botonVisible)
        }, 2100);
      })
      .catch((error) => {
        console.error('Error al asignar:', error);
        Swal.fire({
          title: `Error al asignar`,
          icon: 'error',
          text: 'Inténtalo nuevamente.',
        });
      });
    } else {
      Swal.fire({
        title: 'Faltan datos',
        text: 'Debes seleccionar una ruta y un punto de control',
        icon: 'warning',
      });
    }
  }
  

    return (
      <div className="example">
        <motion.div className="box" animate={isVisible ? show : hide}>
          <section className='dropdownSection'>
            <DropdownRuta value={selectedRuta} onChange={handleRutaChange} />
            <DropdownPuntoControl value={selectedPuntoControl} onChange={handlePuntoControlChange} selectedRuta={selectedRuta} />
          </section>
          <section className="buttonSection">
          <motion.button
            className='botonModal'
            onClick={handleButton}
          >
            Asignar
          </motion.button>
          <motion.button
            className='botonModal'
            onClick={() => {setIsVisible(!isVisible); setBotonVisible(!botonVisible)}}
          >
            Cancelar
          </motion.button>
          </section>
        </motion.div>
        <div className="controls">
          <motion.button
          className='botonModal'
            whileTap={{ scale: 0.95 }}
            onClick={() => {setIsVisible(!isVisible); setBotonVisible(!botonVisible)}}
            animate={botonVisible ? showButton : hide}
          >
            Asignar
          </motion.button>
        </div>
      </div>
  );
}