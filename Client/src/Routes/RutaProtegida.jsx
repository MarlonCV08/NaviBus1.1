import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import { Outlet, Navigate, useLocation } from "react-router-dom"
import Swal from "sweetalert2";

export const RutaProtegida = ({ allowedRole }) => {
  const [isAuth, setIsAuth] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    
    const checkAuth = () => {

      if(token) {
        if (isTokenExpired(token)) {
          Swal.fire({
            title: 'Sesión expirada',
            text: 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.',
            icon: 'warning',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
          }).then(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            setIsAuth(false);
          });
        } else {
          if (!allowedRole || userRole === allowedRole) {
            setIsAuth(true);
          } else {
            setIsAuth(false);
          }
        }
      } else {
        setIsAuth(false);
      }
    }
    
    checkAuth();
  }, [allowedRole, location]);

  const isTokenExpired = (token) => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  }

  if (isAuth === null) {
    // Mostrar un indicador de carga mientras se verifica la autenticación
    return <div>Loading...</div>;
  };

  return isAuth ? <Outlet /> : <Navigate to="/" />

};