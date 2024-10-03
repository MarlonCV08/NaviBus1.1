import { useEffect, useState } from "react";
import "../Styles/DropdownVehiculo.css"
import { toast } from "react-toastify";
export const DropdownVehiculo = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('Seleccione Vehiculo');
    const [options, setOptions] = useState([]);

    useEffect(() => {
      const fetchVehiculos = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/vehiculos');
          const data = await response.json();
          setOptions(data);
        } catch(error) {
          console.error('Error al obtener los vehículos', error);
          toast.error('Error al cargar los vehículos.');
        }
      };

      fetchVehiculos();
    }, []);
  
    const handleSelectClick = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOptionClick = (option) => {
      setSelected(option);
      setIsOpen(false);
    };
    return(
        <div className="dropdownValidar">
            <div className={`select ${isOpen ? 'select-clicked' : ''}`} onClick={handleSelectClick}>
                <span className="selected">{selected}</span>
                <div className={`caret ${isOpen ? 'caret-rotate' : ''}`}></div>
            </div>
            <ul className={`menuListDoc ${isOpen ? 'menu-open' : ''}`}>
              {options.length > 0 ? (
                options.map((vehiculo) => (
                  <li
                    key={vehiculo.placa}
                    className={vehiculo.placa === selected ? 'active' : ''}
                    onClick={() => handleOptionClick(`${vehiculo.placa}`)}
                  > 
                    {`${vehiculo.placa}`}
                  </li>
                ))
              ) : (
                <li>No hay vehículos disponibles</li>
              )}
            </ul>
        </div>
    )
}