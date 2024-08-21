import { useEffect, useState } from "react"
import { Outlet, Navigate } from "react-router-dom"

export const RutaProtegida = ({ allowedRole }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (token && (!allowedRole || userRole === allowedRole)) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [allowedRole]);

  if (isAuth === null) {
    // Mostrar un indicador de carga mientras se verifica la autenticación
    return <div>Loading...</div>;
  };

  return isAuth ? <Outlet /> : <Navigate to="/" />

};