import { motion } from "framer-motion"
import { ItemsDespachador } from "./ItemsDespachador"

const variants={
    open:{
        transition:{staggerChildren: 0.07, delayChildren: 0.2}
    },
    closed:{
        transition:{staggerChildren: 0.05, delayChildren: -1}
    }
}
export const NavegacionDespa = ()=>{
    return(
        <motion.ul variants={variants}>
            {itemIds.map(i=>(
                <ItemsDespachador i={i} key={i}/>
            ))}
        </motion.ul>
    )
}
const itemIds = [0, 1]