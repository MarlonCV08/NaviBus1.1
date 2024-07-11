import { useState } from "react"
import { Outlet, Navigate } from "react-router-dom"

export const RutaProtegida = () => {
  const [isAuth, setIsAuth] = useState(true)

  return isAuth ? <Outlet /> : <Navigate to="/" />

}