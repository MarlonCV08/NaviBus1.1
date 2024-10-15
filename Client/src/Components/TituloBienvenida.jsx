import { motion } from 'framer-motion';
import { useLocation, useParams } from 'react-router-dom';
import '../Styles/TituloBienvenida.css';
import { useEffect, useState } from 'react';

export const TituloBienvenida = () => {
  const location = useLocation();
  const { rutaNombre, cedula } = useParams();
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState([]);

  useEffect(() => {
    // Obtener datos de usuarios
    fetch(`http://localhost:3000/api/usuarios/${rutaNombre}`)
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error al obtener los conductores', error));

    // Obtener el nombre del conductor por cédula
    if (cedula) {
      fetch(`http://localhost:3000/api/conductor/${cedula}`) // Cambia la URL según tu endpoint
        .then(response => response.json())
        .then(data => {
          if (data && data.nombres) {
            setNombre(data.nombres); // Suponiendo que el nombre está en data.nombre
          }
        })
        .catch(error => console.error('Error al obtener el nombre del conductor', error));
    }
  }, [rutaNombre, cedula]);
  // Determina el texto del título basado en la ruta actual
  const getTitulo = () => {
    // Si tienes conductor y ruta, incluye sus nombres
    const conductorTitle = nombre ? ` ${nombre}` : '';
    const rutaTitle = rutaNombre ? ` en la ruta ${rutaNombre}` : '';
    switch (location.pathname) {
      case '/Ruta':
        return 'Rutas';
      case `/Ruta/${rutaNombre}`:
        return 'Conductores Asignados';
      case `/Ruta/${rutaNombre}/${cedula}`:
        return `Control de ${conductorTitle}${rutaTitle}`;
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
