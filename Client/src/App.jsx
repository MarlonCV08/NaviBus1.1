import "./App.css"
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import { Registro } from "./Routes/Registro"
import { Ruta } from './Routes/Ruta'
import { Conductor } from "./Routes/Conductor"
import { Login } from "./Routes/Login"
import { RutaProtegida } from "./Routes/RutaProtegida"
import { Control } from "./Routes/Control"
import { Usuario } from "./Routes/Usuario"
import { Vehiculo } from "./Routes/Vehiculo"
import { Admin } from "./Routes/Admin"
import { Despachador } from "./Routes/Despachador"

const router = createBrowserRouter ([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/",
        element: <RutaProtegida />,
        children: [
            {
                path: "/Ruta",
                element: <Ruta />
            }
        ]
    },
    {
        path: "/Ruta/Conductor",
        element: <Conductor />
    },
    {
        path: "/Ruta/Conductor/Control",
        element: <Control />
    },
    {
        path: "/Registro",
        element: <Registro />
    },
    {
        path: "/Registro/Usuario",
        element: <Usuario />
    },
    {
        path: "/Registro/Usuario/Admin",
        element: <Admin />
    },
    {
        path: "/Registro/Usuario/Despachador",
        element: <Despachador />
    },
    {
        path: "/Registro/Vehiculo",
        element: <Vehiculo />
    }
])

export const App = ()=>{

    return(
        <RouterProvider router={router} />
    )
}