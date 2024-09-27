import '../Styles/ModalAsignar.css'
import { useState } from "react";
import { motion } from "framer-motion";
import { DropdownRuta } from './DropdownRuta';
import Swal from 'sweetalert2';
import { DropdownPuntoControl } from './DropdownPuntoControl';

export const ModalAsignar=()=>{
  const show = {
    opacity: 1,
    display: "block"
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
    Swal.fire({
        title: `Ruta asignada correctamente`,
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      })
      setTimeout(() => {
        setIsVisible(!isVisible)
        setBotonVisible(!botonVisible)
      }, 2100);
}
  const [isVisible, setIsVisible] = useState(false);
  const [botonVisible, setBotonVisible] = useState(true)

    return (
      <div className="example">
        <motion.div className="box" animate={isVisible ? show : hide}>
          <section className='dropdownSection'>
            <DropdownRuta/>
            <DropdownPuntoControl/>
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
            asignar
          </motion.button>
        </div>
      </div>
  );
}