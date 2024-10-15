import React, { useEffect, useState } from "react";
import "../Styles/ModalInfo.css";
import { motion } from "framer-motion";

export const ModalInfo = ({ despachador }) => {
    const [asignaciones, setAsignaciones] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Realiza la consulta usando la cédula
      fetch(`http://localhost:3000/api/info/${despachador.cedula}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
          }
          return response.json();
        })
        .then(data => setAsignaciones(data))
        .catch(error => {
          console.error('Error al traer los datos:', error);
          setError(error.message);
        });
    }, [despachador.cedula]); // Dependencia de cédula
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    return (
      <motion.div
        className="modalInfo"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        {asignaciones.length > 0 ? (
          <div>
            <h3>Asignaciones de {despachador.nombres}</h3>
            <p>Ruta: {asignaciones[0].nombre_ruta}</p>
            <p>Punto de control: {asignaciones[0].nombre_punto_control}</p>
          </div>
        ) : (
          <p>No hay asignaciones disponibles.</p>
        )}
      </motion.div>
    );
  };
