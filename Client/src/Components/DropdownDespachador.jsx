import { useEffect, useState } from "react";

export const DropdownDespachador = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Seleccione Despachador');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchDespachadores = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/id-despachadores');
        const data = await response.json();
        setOptions(data);
      } catch(error) {
        console.error('Error al obtener los despachadores', error);
        toast.error('Error al cargar los despachadores.');
      }
    };
    fetchDespachadores();
  }, []);

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (despachador) => {
    setSelected(`${despachador.cedula} - ${despachador.nombres}`);
    setIsOpen(false);
    onSelect(despachador.cedula);
  };

  return(
    <div className="dropdownValidar">
        <div className={`select ${isOpen ? 'select-clicked' : ''}`} onClick={handleSelectClick}>
            <span className="selected">{selected}</span>
            <div className={`caret ${isOpen ? 'caret-rotate' : ''}`}></div>
        </div>
        <ul className={`menuListDoc ${isOpen ? 'menu-open' : ''}`}>
          {options.length > 0 ? (
            options.map((despachador) => (
              <li
                key={despachador.cedula}
                className={despachador.cedula === selected ? 'active' : ''}
                onClick={() => handleOptionClick(despachador)}
              > 
                {`${despachador.cedula} - ${despachador.nombres}`}
              </li>
            ))
          ) : (
            <li>No hay despachadores disponibles</li>
          )}
        </ul>
    </div>
  )
}