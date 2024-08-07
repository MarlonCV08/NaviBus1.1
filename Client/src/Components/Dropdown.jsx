import { useState } from "react";
import "../Styles/Dropdown.css"
export const Dropdown = ()=>{
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('Tipo de documento');
    const options = ['Cedula de ciudadanía', 'Cedula de extranjería'];
  
    const handleSelectClick = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOptionClick = (option) => {
      setSelected(option);
      setIsOpen(false);
    };
    return(
        <div className="dropdown">
            <div className={`select ${isOpen ? 'select-clicked' : ''}`} onClick={handleSelectClick}>
                <span className="selected">{selected}</span>
                <div className={`caret ${isOpen ? 'caret-rotate' : ''}`}></div>
            </div>
            <ul className={`menuList ${isOpen ? 'menu-open' : ''}`}>
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