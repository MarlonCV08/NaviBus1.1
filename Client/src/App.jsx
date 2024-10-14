import "./App.css"
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import { Registro } from "./Routes/Registro"
import { Ruta } from './Routes/Ruta'
import { Login } from "./Routes/Login"
import { RutaProtegida } from "./Routes/RutaProtegida"
import { Control } from "./Routes/Control"
import { Usuario } from "./Routes/Usuario"
import { Vehiculo } from "./Routes/Vehiculo"
import { Administrador } from "./Routes/Administrador"
import { Despachador } from "./Routes/Despachador"
import { Conductores } from "./Routes/Conductores"
import { Conductor } from "./Routes/Conductor"
import { Actualizar } from "./Routes/Actualizar"
import { Asignar } from "./Routes/Asignar"
import { AsignarDespa } from "./Routes/AsignarDespa"
import { AsignarCondu } from "./Routes/AsignarCondu"
import { Validar } from "./Routes/Validar"
import { InfoDia } from "./Routes/InfoDia"
import { ActualizarCondu } from "./Routes/ActualizarCondu"
import { Scanner } from "./Routes/Scanner"
import { ActualizarDespa } from "./Routes/ActualizarDespa"

const router = createBrowserRouter([
    {
        path: "/Login",
        element: <Login />
    },
    {
        path: "/",
        element: <RutaProtegida allowedRoles={[1]} />, // Admin
        children: [
            {
                path: "Ruta",
                element: <Ruta />
            },
            {
                path: "Ruta/:rutaNombre",
                element: <Conductores />
            },
            {
                path: "Ruta/:rutaNombre/:cedula",
                element: <Control />
            },
            {
                path: "Registro",
                element: <Registro />
            },
            {
                path: "Registro/Usuario",
                element: <Usuario />
            },
            {
                path: "Registro/Usuario/Administrador",
                element: <Administrador />
            },
            {
                path: "Registro/Usuario/Despachador",
                element: <Despachador />
            },
            {
                path: "Registro/Usuario/Conductor",
                element: <Conductor/>
            },
            {
                path: "Registro/Vehiculo",
                element: <Vehiculo />
            },
            {
                path:"Actualizar",
                element: <Actualizar/>
            },
            {
                path:"Asignar",
                element: <Asignar/>
            },
            {
                path: "Asignar/Despachador",
                element: <AsignarDespa/>
            },
            {
                path: "Asignar/Conductor",
                element: <AsignarCondu/>
            },
        ]
    },
    {
        path: "/",
        element: <RutaProtegida allowedRoles={[2]} />, // Conductor
        children: [
            {
                path: "Validar",
                element: <Validar />
            },
            {
                path: "Validar/InfoDia",
                element: <InfoDia />
            },
            {
                path: "Validar/Actualizar",
                element: <ActualizarCondu />
            },
            // Otras rutas para conductores
        ]
    },
    {
        path: "/",
        element: <RutaProtegida allowedRoles={[3]} />, // Despachador
        children: [
            {
                path: "Scanner",
                element: <Scanner />
            },
            {
                path: "Scanner/Actualizar",
                element: <ActualizarDespa />
            },
            // Otras rutas para despachadores
        ]
    }
]);



export const App = ()=>{

    return(
        <RouterProvider router={router} />
    )
}