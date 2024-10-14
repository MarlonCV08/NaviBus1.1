import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    display: 'flex',
    transition: {
      y: {
        stiffness: 1000,
        velocity: -100,
      },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    display: 'none',
    transition: {
      y: {
        stiffness: 1000,
      },
    },
  },
};

const menuTexts = ['Inicio', 'Actualizar Datos', 'Cerrar Sesión']; // Textos para cada ítem
const routes = ['/Scanner','/Scanner/Actualizar']; // Rutas correspondientes

export const ItemsDespachador = ({ i }) => {
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const location = useLocation(); // Hook para obtener la ruta actual

  const style = {
    border: `2px solid #7579E7`,
    background: '#7579e7',
    width: '20px',
    height: '20px',
    flex: '20px 0',
    marginRight: '25px',
    marginLeft: '5px'
  };
  
  const styleIn = {
    border: `2px solid #7579E7`,
    background: '#ffffff' // Estilo alternativo (cambia el fondo, por ejemplo)
  };
  
  const textStyle = {
    color: '#7579E7',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0',
    border: `2px solid #7579E7`,
  };

  const handleClick = () => {
    if (i === 2) {
      localStorage.removeItem('token');
      navigate('/Login');
      console.log('Cerrando sesión...');
    } else {
      navigate(routes[i]);
    }
  };

  // Verifica si la ruta actual es la misma que la ruta en el índice `i`
  const isActive = location.pathname === routes[i];

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick} // Asigna la función handleClick al evento onClick
      style={{ cursor: 'pointer' }} // Añade estilo de cursor para indicar que es clickeable
    >
      <div className="icon-placeholder" style={isActive ? style : styleIn} />
      <div className="text-placeholder" style={{...textStyle }}>
        {menuTexts[i]}
      </div>
    </motion.li>
  );
};
