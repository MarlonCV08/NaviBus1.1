import { motion } from 'framer-motion'
import '../Styles/TituloBienvenida.css'
export const TituloBienvenida=()=>{
    return(
        <motion.h1
          initial={{ y: -100 }}
          animate={{ y: [ -100, 0, 0, -100 ] }}  // El elemento se mueve hacia abajo, se detiene brevemente, y sigue
          transition={{
            duration: 3,           // Duración total de la animación
            times: [0, 0.4, 0.6, 1], // Controla cuándo se produce cada valor
            ease: "easeInOut"
          }}
        >
          Bienvenido
        </motion.h1>
    )
}