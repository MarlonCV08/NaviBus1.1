import { Header } from "../Header";
import "../Styles/AsignarDespa.css";
import { useEffect, useState } from "react";
import { ModalAsignar } from "../Components/ModalAsignar";
import { ModalInfo } from "../Components/ModalInfo"; // Nuevo modal para mostrar la información
import { AnimatePresence } from "framer-motion"; // Importar AnimatePresence

export const AsignarDespa = () => {
  const [despachadores, setDespachadores] = useState([]);
  const [selectedRutas, setSelectedRutas] = useState(() => {
    const savedData = localStorage.getItem("selectedRutas");
    return savedData ? JSON.parse(savedData) : {};
  });
  
  const [hoveredDespachador, setHoveredDespachador] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/id-despachadores')
      .then(response => response.json())
      .then(data => setDespachadores(data))
      .catch(error => console.error('Error al traer los datos:', error));
  }, []);

  const handleDropdownChange = (cedula, ruta, puntoControl) => {
    setSelectedRutas(prevState => {
      const newState = {
        ...prevState,
        [cedula]: { ruta, puntoControl }
      };
      localStorage.setItem("selectedRutas", JSON.stringify(newState));
      return newState;
    });
  };

  const handleMouseEnter = (despachador) => {
    setHoveredDespachador(despachador);
  };

  const handleMouseLeave = () => {
    setHoveredDespachador(null);
  };

  return (
    <>
      <Header />
      <div className="contenedorConductores">
        {despachadores.map((despachador) => (
          <div className="contInfo" key={despachador.cedula}>
            <div
              className="infoConductorAsi"
              onMouseEnter={() => handleMouseEnter(despachador)}
              onMouseLeave={handleMouseLeave}
            >
              <p>{despachador.nombres} {despachador.apellidos}</p>
              <ModalAsignar 
                cedula={despachador.cedula} 
                onDropdownChange={handleDropdownChange} 
                initialRuta={selectedRutas[despachador.cedula]?.ruta} 
                initialPuntoControl={selectedRutas[despachador.cedula]?.puntoControl}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Mostrar modal si hay un despachador en hover */}
      <AnimatePresence>
        {hoveredDespachador && (
          <ModalInfo despachador={hoveredDespachador} />
        )}
      </AnimatePresence>
    </>
  );
}
