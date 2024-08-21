import "./App.css"
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import { Registro } from "./Routes/Registro"
import { Ruta } from './Routes/Ruta'
import { Login } from "./Routes/Login"
import { RutaProtegida } from "./Routes/RutaProtegida"
import { Control } from "./Routes/Control"
import { Usuario } from "./Routes/Usuario"
import { Vehiculo } from "./Routes/Vehiculo"
import { Admin } from "./Routes/Admin"
import { Despachador } from "./Routes/Despachador"
import { Conductores } from "./Routes/Conductores"
import { Conductor } from "./Routes/Conductor"
import { Actualizar } from "./Routes/Actualizar"
import { Asignar } from "./Routes/Asignar"
import { AsignarDespa } from "./Routes/AsignarDespa"
import { AsignarCondu } from "./Routes/AsignarCondu"
import { Validar } from "./Routes/Validar"

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
            },
            {
                path: "/Ruta/Conductores",
                element: <Conductores />
            },
            {
                path: "/Ruta/Conductores/Control",
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
                path: "/Registro/Usuario/Conductor",
                element: <Conductor/>
            },
            {
                path: "/Registro/Vehiculo",
                element: <Vehiculo />
            },
            {
                path:"/Actualizar",
                element: <Actualizar/>
            },
            {
                path:"/Asignar",
                element: <Asignar/>
            },
            {
                path: "/Asignar/Despachador",
                element: <AsignarDespa/>
            },
            {
                path: "/Asignar/Conductor",
                element: <AsignarCondu/>
            },
            {
                path: "Validar",
                element: <Validar />,
                allowedRole: "conductor"
            }
        ]
    }
]);

export const App = ()=>{

    return(
        <RouterProvider router={router} />
    )
}