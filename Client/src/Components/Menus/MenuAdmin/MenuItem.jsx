import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Usa useNavigate en lugar de Navigate
import { Logout } from "../../../Routes/Logout";

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

const menuTexts = ['Inicio', 'Registro', 'Actualizar datos', 'Asignar ruta', 'Cerrar sesión']; // Textos para cada ítem
const routes = ['/Ruta', '/Registro', '/Actualizar', '/Asignar']; // Rutas correspondientes

export const MenuItem = ({ i }) => {
  const navigate = useNavigate(); // Hook para navegar entre rutas

  const style = {
    border: `2px solid #7579E7`,
  };

  const textStyle = {
    color: '#7579E7',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0',
  };

  const handleClick = () => {
    if (i === 4) {
      localStorage.removeItem('token');
      navigate('/');
      console.log('Cerrando sesión...');
    } else {
      navigate(routes[i]);
    }
  };

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick} // Asigna la función handleClick al evento onClick
      style={{ cursor: 'pointer' }} // Añade estilo de cursor para indicar que es clickeable
    >
      <div className="icon-placeholder" style={style} />
      <div className="text-placeholder" style={{ ...style, ...textStyle }}>
        {menuTexts[i]}
      </div>
    </motion.li>
  );
};
