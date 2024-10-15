import { useEffect, useRef, useState } from "react";
export const DropdownPuntoControl = ({ value, onChange, selectedRuta }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('Punto de Control');
    const dropdownRef = useRef(null);
    const [options, setOptions] = useState([]);

    useEffect(() => {
      console.log('Ruta seleccionada', selectedRuta.ruta_codigo);
      if (selectedRuta) {
        fetch(`http://localhost:3000/api/puntos-control/${selectedRuta.ruta_codigo}`)
        .then(response => response.json())
        .then(data => setOptions(data))
        .catch(error => console.error('Error al traer los datos:', error))
      } else {
        setOptions([]);
      }
    }, [selectedRuta]);

    useEffect(() => {
      if (value === "") {
          setSelected('Punto de Control');
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
      setIsOpen(false);
      onChange(option.codigo)
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

    return(
        <div className="dropdownRuta" ref={dropdownRef}>
            <div className={`select ${isOpen ? 'select-clicked' : ''}`} onClick={handleSelectClick}>
                <span className="selected">{selected}</span>
                <div className={`caret ${isOpen ? 'caret-rotate' : ''}`}></div>
            </div>
            <ul className={`menuListDoc ${isOpen ? 'menu-open' : ''}`}>
                {options.map((option) => (
                  <li
                    key={option.codigo}
                    className={option.codigo === value ? 'active' : ''}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.nombre}
                  </li>
                ))}
            </ul>
        </div>
    )
}