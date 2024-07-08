import "./App.css"
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import { SelectRegistro } from "./Routes/SelectRegistro"
import { Ruta } from './Routes/Ruta'
import { RutaConductor } from "./Routes/RutaConductor"
import { Login } from "./Routes/Login"
import { RutaProtegida } from "./Routes/RutaProtegida"

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
        path: "/Ruta/RutaConductor",
        element: <RutaConductor />
    },
    {
        path: "/SelectRegistro",
        element: <SelectRegistro />
    },
])

export const App = ()=>{

    return(
        <RouterProvider router={router} />
    )
}