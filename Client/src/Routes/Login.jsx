import { useState, useRef} from 'react';
import OjoAbierto from '../Assets/Images/Ojo.svg';
import OjoCerrado from '../Assets/Images/OjoCerrado.svg';
import '../Styles/Login.css';

export const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [mostrarClave, setMostrarClave] = useState(false);
  const [mostrarOjo, setMostrarOjo] = useState(false);
  const [subirUser, setSubirUser] = useState(false);
  const [subirPass, setSubirPass] = useState(false);

  // Referencias para los inputs
  const usuarioRef = useRef(null);
  const claveRef = useRef(null);

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
      <form className="contenedorLog">
        <div className="contenedortitulo">
          <label className="titulo">Iniciar Sesión</label>
        </div>
        <div className="usuario" ref={usuarioRef}>
          <input 
            type="text" 
            id="usuario" 
            className="inputusuario"
            value={usuario} 
            onChange={handleUsuarioChange}
            onFocus={() => handleFocus('usuario')} // Maneja el enfoque en el input de usuario
          />
          <label className={`usuariotxt ${subirUser ? 'subir' : ''}`}>Usuario</label>
        </div>
        <div className="usuario" ref={claveRef}>
          <input 
            type={mostrarClave ? "text" : "password"}
            className="inputusuario" 
            value={clave} 
            onChange={handleClaveChange}
            onFocus={() => handleFocus('clave')} // Maneja el enfoque en el input de contraseña
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
    </div>
  );
};