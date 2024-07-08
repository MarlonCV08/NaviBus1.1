import { useState } from 'react';
import OjoAbierto from '../Assets/Images/OjoAbierto.svg';
import OjoCerrado from '../Assets/Images/OjoCerrado.svg';
import '../Styles/Login.css';

export const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

  return (
    <div className="login">
      <form className="contenedor">
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
            type="password" 
            className="inputusuario" 
            value={clave} 
            onChange={(e) => setClave(e.target.value)}
          />
          <label className="usuariotxt">Contraseña</label>
          <img src={OjoAbierto} className='ojo' />
        </div>
        <input type="submit" className='button' value="Ingresar" />
      </form>
    </div>
  )
}