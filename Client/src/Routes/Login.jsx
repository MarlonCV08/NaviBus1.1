import { useState, useEffect } from 'react';
import OjoAbierto from '../Assets/Images/Ojo.svg';
import OjoCerrado from '../Assets/Images/OjoCerrado.svg';
import '../Styles/Login.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');
  const [mostrarClave, setMostrarClave] = useState(false);
  const [mostrarOjo, setMostrarOjo] = useState(false);
  const [subirUser, setSubirUser] = useState(false);
  const [subirPass, setSubirPass] = useState(false);

  const navigate = useNavigate();
  
  const notify = (message) => {
    toast.dismiss();
    
    toast.error(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cedula, clave }),
      });

      const data = await response.json();
      console.log('Respuesta del servidor', data);
      
      if (response.ok) {
        const token = data.token;
        const userRole = data.user?.rol;

        console.log('Inicio de sesión exitoso', data);
        console.log('token recibido', token);

        localStorage.setItem('token', token);
        switch (userRole) {
          case 'administrador':
            navigate('/Ruta');
            break;
          case 'conductor':
            navigate('/Validar');
            break;
            case 'despachador':
              navigate('/Scanner');
              break;
          default:
            navigate('/');
            break;
        }
      } else {
        notify(data.message || "Error desconocido.");
      }
    } catch (error) {
      console.error('Error al iniciar sesión: ', error);
      notify('Error al conectar con el servidor');
    }
  };
  const toggleMostrarClave = () => {
    setMostrarClave(!mostrarClave);
  };

  const handleClaveChange = (e) => {
    const value = e.target.value;
    setClave(value);
    setMostrarOjo(value.length > 0);
    setSubirPass(value.length > 0); // Mueve la etiqueta si hay texto
  };

  const handleUsuarioChange = (e) => {
    const value = e.target.value;
    setCedula(value);
    setSubirUser(value.length > 0); // Mueve la etiqueta si hay texto
  };
  return (
    <div className="login">
      <form className="contenedorLog" onSubmit={handleSubmit}>
        <div className="contenedortitulo">
          <label className="titulo">Iniciar Sesión</label>
        </div>
        <div className="usuario">
          <input 
            type="text" 
            id="usuario" 
            className="inputusuario"
            value={cedula} 
            onChange={handleUsuarioChange}
          />
          <label className={`usuariotxt ${subirUser ? 'subir' : ''}`}>Usuario</label>
        </div>
        <div className="usuario">
          <input 
            type={mostrarClave ? "text" : "password"}
            className="inputusuario" 
            value={clave} 
            onChange={handleClaveChange}
          />
          <label className={`usuariotxt ${subirPass ? 'subir' : ''}`}>Contraseña</label>
          <img 
            src={mostrarClave ? OjoCerrado : OjoAbierto} 
            className={`ojo ${mostrarOjo ? 'visible' : 'noVisible'}`} 
            onClick={toggleMostrarClave}
            alt="Toggle visibility"
          />
        </div>
        <input type="submit" className='button' value="Ingresar" />
      </form>
      <ToastContainer closeButton={false} limit={1}/>
    </div>
  );
};