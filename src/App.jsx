import "./App.css"
import { Header } from "./Header"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { SelectRegistro } from "./SelectRegistro"
import {Ruta} from './Ruta'
import { RutaConductor } from "./RutaConductor"

export const App = ()=>{

    return(
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Ruta/>} />
                <Route path="/SelectRegistro" element={<SelectRegistro/>}/>
                <Route path="/RutaConductor" element={<RutaConductor/>}/>
            </Routes>
        </Router>
    )
}