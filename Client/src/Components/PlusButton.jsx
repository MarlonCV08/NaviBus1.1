import React from 'react';
import { motion } from 'framer-motion';

const PlusButton = ({ onClick }) => {
  return (
    <motion.button
      className="plus-button"
      onClick={onClick}
      whileHover={{ rotate: 180 }} // Rotación de 45 grados al hacer hover
      transition={{ duration: 0.3 }} // Duración de la transición
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <motion.path
          stroke="#fefefe"
          strokeWidth="2" // Añadir un ancho de trazo para que se vea
          variants={{
            closed: { d: "M 11.5 6 L 11.5 17" }, // Línea vertical más corta
            open: { d: "M 6 11.5 L 17 11.5" },   // Línea horizontal más corta
          }}
          initial="closed"
          animate="closed"
          transition={{ duration: 0.3 }}
        />
        <motion.path
          stroke="#fefefe"
          strokeWidth="2" // Añadir un ancho de trazo para que se vea
          variants={{
            closed: { d: "M 6 11.5 L 17 11.5" }, // Línea horizontal más corta
            open: { d: "M 11.5 6 L 11.5 17" },   // Línea vertical más corta
          }}
          initial="closed"
          animate="closed"
          transition={{ duration: 0.3 }}
        />
      </svg>
    </motion.button>
  );
};

export default PlusButton;
