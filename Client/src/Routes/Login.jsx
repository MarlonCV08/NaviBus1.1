import { useState, useEffect } from 'react';
import OjoAbierto from '../Assets/Images/OjoAbierto.svg';
import OjoCerrado from '../Assets/Images/OjoCerrado.svg';
import '../Styles/Login.css';

export const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [mostrarError, setMostrarError] = useState(false)

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
        setError(data.message || 'Usuario o clave incorrectos');
        setMostrarError(true);
      }
    } catch (error) {
      console.error('Error al iniciar sesión: ', error);
      setError('Hubo un problema con el servidor, por favor intente nuevamente más tarde');
      setMostrarError(true);
    }
  };

  useEffect(() => {
    if(mostrarError) {
      const timer = setTimeout(() => {
        setMostrarError(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [mostrarError]);
  
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
            onChange={(e) => setUsuario(e.target.value)} 
          />
          <label className="usuariotxt">Usuario</label>
        </div>
        <div className="usuario">
          <input 
            type={mostrarClave ? "text" : "password"} // Cambia el tipo de input basado en el estado
            className="inputusuario" 
            value={clave} 
            onChange={handleClaveChange}
          />
          <label className="usuariotxt">Contraseña</label>
          <img 
            src={mostrarClave ? OjoCerrado : OjoAbierto} 
            className={`ojo ${mostrarOjo ? 'visible' : 'noVisible'}`} 
            onClick={toggleMostrarClave}
            alt="Toggle visibility"
          />
        </div>
        <input type="submit" className='button' value="Ingresar" />
      </form>
      {mostrarError && <div className="mensajeError">{error}</div>}
    </div>
  );
};