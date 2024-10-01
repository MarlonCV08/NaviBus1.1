import { motion } from 'framer-motion';
import { useLocation, useParams } from 'react-router-dom';
import '../Styles/TituloBienvenida.css';
import { useEffect, useState } from 'react';

export const TituloBienvenida = () => {
  const location = useLocation();
  const { rutaNombre } = useParams();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
      fetch(`http://localhost:3000/api/usuarios/${rutaNombre}`)
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error al obtener los conductores', error))
  }, [rutaNombre]);
  // Determina el texto del título basado en la ruta actual
  const getTitulo = () => {
    switch (location.pathname) {
      case '/Ruta':
        return 'Seccion de rutas';
      case `/Ruta/${rutaNombre}`:
        return 'Conductores asignados';
      case '/configuracion':
        return 'Configuraciones';
      default:
        return 'Bienvenido';
    }
  };

  return (
    <motion.h1
      initial={{ y: -100 }}
      animate={{ y: [-100, 0, 0, -100] }}  // El elemento se mueve hacia abajo, se detiene brevemente, y sigue
      transition={{
        duration: 3,           // Duración total de la animación
        times: [0, 0.4, 0.6, 1], // Controla cuándo se produce cada valor
        ease: 'easeInOut',
      }}
    >
      {getTitulo()}
    </motion.h1>
  );
};
