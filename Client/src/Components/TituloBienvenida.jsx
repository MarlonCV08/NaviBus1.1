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
        return 'Rutas';
      case `/Ruta/${rutaNombre}`:
        return 'Conductores Asignados';
      case '/Registro':
        return 'Seleccione Tipo de Registro';
        case '/Registro/Usuario':
          return 'Seleccione Tipo de Usuario';
        case '/Registro/Usuario/Administrador':
          return 'Registro de Administrador';
        case '/Registro/Usuario/Conductor':
          return 'Registro de Conductor';
        case '/Registro/Usuario/Despachador':
          return 'Registro de Despachador';
        case '/Registro/Vehiculo':
          return 'Registro de Vehículo';
        case '/Actualizar':
          return 'Actualizar Datos de Usuario';
        case '/Asignar':
          return 'Seleccione Tipo de Usuario Para Asignar';
        case '/Asignar/Despachador':
          return 'Asignación de Despachadores';
        case '/Asignar/Conductor':
          return 'Asignación de Conductores';
      default:
        return 'Bienvenido';
    }
  };

  return (
    <motion.h1
    className='tituloMotion'
      initial={{ y: -100 }}
      animate={{ y: [-100, 0] }}  // El elemento se mueve hacia abajo, se detiene brevemente, y sigue
      transition={{
        duration: 1,           // Duración total de la animación
        times: [0, 0.4, 0.6, 1], // Controla cuándo se produce cada valor
        ease: 'easeInOut',
      }}
    >
      {getTitulo()}
    </motion.h1>
  );
};
