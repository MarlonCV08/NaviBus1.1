import { useState, useEffect } from 'react';
import OjoAbierto from '../Assets/Images/Ojo.svg';
import OjoCerrado from '../Assets/Images/OjoCerrado.svg';
import '../Styles/Login.css';
import { ToastContainer, toast } from 'react-toastify';

export const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [mostrarError, setMostrarError] = useState(false);
  const [mostrarClave, setMostrarClave] = useState(false);
  const [mostrarOjo, setMostrarOjo] = useState(false);
  const [subirUser, setSubirUser] = useState(false);
  const [subirPass, setSubirPass] = useState(false);
  
  const notify = () => toast.error('Usuario o contraseña incorrectos', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, clave }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Inicio de sesión exitoso', data);
        window.location.href = '/Ruta';
      } else {
        setError(notify);
        setMostrarError(true);
      }
    } catch (error) {
      console.error('Error al iniciar sesión: ', error);
      setError('Hubo un problema con el servidor, por favor intente nuevamente más tarde');
      setMostrarError(true);
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
    setUsuario(value);
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
            value={usuario} 
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
      <ToastContainer closeButton={false}/>
    </div>
  );
};