import { useEffect, useState } from "react"
import { Outlet, Navigate } from "react-router-dom"

export const RutaProtegida = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  if (isAuth === null) {
    // Mostrar un indicador de carga mientras se verifica la autenticación
    return <div>Loading...</div>;
  }

  return isAuth ? <Outlet /> : <Navigate to="/" />

};