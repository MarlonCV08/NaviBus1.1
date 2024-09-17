import { useState } from "react";

export const DropdownClaseVehiculo = ()=>{
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('Seleccione tipo de vehiculo');
    const options = ['Bus', 'Microbus', 'Buseta', 'Buseton'];
  
    const handleSelectClick = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOptionClick = (option) => {
      setSelected(option);
      setIsOpen(false);
    };
    return (
        <div className="dropdown">
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