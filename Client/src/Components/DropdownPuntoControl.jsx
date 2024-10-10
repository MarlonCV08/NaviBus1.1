import { useEffect, useRef, useState } from "react";
export const DropdownPuntoControl = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('Punto de control');
    const dropdownRef = useRef(null);
    const options = ['UDEA', 'Porvenir', 'San Antonio', 'San nicolas', 'La pola'];
  
    const handleSelectClick = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOptionClick = (option) => {
      setSelected(option);
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

    return(
        <div className="dropdownRuta" ref={dropdownRef}>
            <div className={`select ${isOpen ? 'select-clicked' : ''}`} onClick={handleSelectClick}>
                <span className="selected">{selected}</span>
                <div className={`caret ${isOpen ? 'caret-rotate' : ''}`}></div>
            </div>
            <ul className={`menuListDoc ${isOpen ? 'menu-open' : ''}`}>
                {options.map((option, index) => (
                  <li
                    key={index}
                    className={option === selected ? 'active' : ''}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
            </ul>
        </div>
    )
}