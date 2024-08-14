import { useState } from 'react';
import OjoAbierto from '../Assets/Images/OjoAbierto.svg';
import OjoCerrado from '../Assets/Images/OjoCerrado.svg';
import '../Styles/Login.css';

export const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [mostrarClave, setMostrarClave] = useState(false); // Estado para alternar visibilidad de la contraseña
  const [mostrarOjo, setMostrarOjo] = useState(false);

  const toggleMostrarClave = () => {
    setMostrarClave(!mostrarClave);
  };

  const handleClaveChange = (e) => {
    const value = e.target.value;
    setClave(value);
    setMostrarOjo(value.length > 0); // Muestra el ojo solo si hay texto
  };

  return (
    <div className="login">
      <form className="contenedorLog">
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
    </div>
  );
};