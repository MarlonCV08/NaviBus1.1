import { useEffect, useRef, useState } from "react";

export const DropdownMarca = ({ value, onChange })=>{
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('Seleccione Marca');
    const [options, setOptions] = useState([]);
    const dropdownRef = useRef(null);

    useEffect(() => {
      fetch('http://localhost:3000/api/marca')
      .then(response => response.json())
      .then(data => setOptions(data))
      .catch(error => console.error('Error al traer los datos:', error))
    }, []);

    useEffect(() => {
      if (value === "") {
        setSelected('Seleccione Marca');
      } else {
        const selectedOption = options.find(option => option.codigo === value);
        if (selectedOption) {
          setSelected(selectedOption.nombre);
        }
      }
    }, [value, options]);
  
    const handleSelectClick = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOptionClick = (option) => {
      setSelected(option.nombre);
      onChange(option.codigo);
      setIsOpen(false);
    };

    // Cerrar el dropdown al hacer clic fuera
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className={`select ${isOpen ? 'select-clicked' : ''}`} onClick={handleSelectClick}>
                <span className="selected">{selected}</span>
                <div className={`caret ${isOpen ? 'caret-rotate' : ''}`}></div>
            </div>
            <ul className={`menuListDoc ${isOpen ? 'menu-open' : ''}`}>
                {options.map((option) => (
                  <li
                    key={option.codigo}
                    className={option.nombre === selected ? 'active' : ''}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.nombre}
                  </li>
                ))}
            </ul>
        </div>
    )
}