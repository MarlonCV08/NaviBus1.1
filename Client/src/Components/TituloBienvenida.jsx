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
      case '/Registro':
        return 'Seleccione tipo de registro';
        case '/Registro/Usuario':
          return 'Seleccione tipo de Usuario';
        case '/Registro/Usuario/Administrador':
          return 'Registro de administrador';
        case '/Registro/Usuario/Conductor':
          return 'Registro de conductor';
        case '/Registro/Usuario/Despachador':
          return 'Registro de despachador';
        case '/Registro/Vehiculo':
          return 'Registro de vehiculo';
        case '/Actualizar':
          return 'Actualizar datos de usuario';
        case '/Asignar':
          return 'Seleccione tipo de usuario para asignar';
        case '/Asignar/Despachador':
          return 'Asignación de ruta y punto de control';
        case '/Asignar/Conductor':
          return 'Asignación de ruta';
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
