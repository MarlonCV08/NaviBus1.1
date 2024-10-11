import { motion } from "framer-motion"
import { ItemsConductor } from "./ItemsConductor"

const variants={
    open:{
        transition:{staggerChildren: 0.07, delayChildren: 0.2}
    },
    closed:{
        transition:{staggerChildren: 0.05, delayChildren: -1}
    }
}
export const Navegacion = ()=>{
    return(
        <motion.ul variants={variants}>
            {itemIds.map(i=>(
                <ItemsConductor i={i} key={i}/>
            ))}
        </motion.ul>
    )
}
const itemIds = [0, 1, 2]