import { motion, useCycle } from "framer-motion"
import { useRef } from "react"
import { ToggleDespachador } from "./ToggleDespachador"
import '../../../Styles/Styles.css'
import { UseDimensions } from "../UseDimensions"
import { NavegacionDespa } from "./NavegacionDespa"

const sidebar ={
    open: (height= 1000)=>({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition:{
            type: 'spring',
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed:{
        clipPath: 'circle(30px at 40px 40px)',
        transition:{
            delay: 0.5,
            type: 'spring',
            stiffness: 400,
            damping: 40
        }
    }
}
export const MenuDespachador =()=>{
    const [isOpen, toggleOpen]= useCycle(false, true)
    const containerRef = useRef(null)
    const {height} = UseDimensions(containerRef)
    return(
        <motion.nav
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            custom={height}
            ref={containerRef}
        >
            <motion.div className="background" variants={sidebar}/>
            <NavegacionDespa/>
            <ToggleDespachador toggle={()=> toggleOpen()}/>
        </motion.nav>
    )
}