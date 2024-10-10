import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import { Outlet, Navigate, useLocation } from "react-router-dom"
import Swal from "sweetalert2";

export const RutaProtegida = ({ allowedRoles }) => {
  const [isAuth, setIsAuth] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userRole = parseInt(localStorage.getItem('role'));

      console.log('Token', token);
      console.log('Role', userRole);

      if(token) {
        if (isTokenExpired(token)) {
          setIsAuth(false);
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
          });
        } else {
          setIsAuth(allowedRoles.includes(userRole));
        }
      } else {
        setIsAuth(false);
      }
    }
    
    checkAuth();
  }, [allowedRoles, location]);

  const isTokenExpired = (token) => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  }

  if (isAuth === null) {
    // Mostrar un indicador de carga mientras se verifica la autenticación
    return <div>Loading...</div>;
  };

  return isAuth ? <Outlet /> : <Navigate to="/Login" />

};