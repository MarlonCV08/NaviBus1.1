import { Header } from "../Header"
import { DropdownRuta } from "../Components/DropdownRuta"
import "../Styles/AsignarDespa.css"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"
export const AsignarCondu = ()=>{
    const [conductores, setConductores] = useState([]);
    const [selectedRutas, setSelectedRutas] = useState({});
    
    useEffect(() => {
        fetch('http://localhost:3000/api/id-conductores')
        .then(response => response.json())
        .then(data => setConductores(data))
        .catch(error => console.error('Error al traer los datos:', error))
    }, []);
    const handleButton =()=>{
        fetch('http://localhost:3000/api/asignar-rutas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedRutas),
        })
        .then(response => {
            if (response.ok) {
                // Eliminar conductores asignados
                const conductoresAsignados = Object.keys(selectedRutas);
                fetch('http://localhost:3000/api/id-conductores')
                .then(response => response.json())
                .then(data => {
                    setConductores(data);
                    setSelectedRutas({});
                    // Mostrar mensaje para cada conductor asignado
                    const messages = conductoresAsignados.map(cedula => {
                        const ruta = selectedRutas[cedula];
                        const conductor = conductores.find(conductor => conductor.cedula === cedula);
                        if (conductor) {
                            return `El conductor ${conductor.nombres} ${conductor.apellidos} se asignó correctamente a la ruta ${ruta.nombre}.`;
                        } else {
                            return `El conductor con cédula ${cedula} no se encontró.`;
                        }
                    });
                    Swal.fire({
                        title: messages.join('\n'),
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                });
            } else {
                Swal.fire({
                    title: 'Error al asignar las rutas',
                    icon: 'error',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
            }
        })
        .catch(error => {
            console.error('Error al asignar las rutas', error)
        })
    }
    const handleDropdownChange = (cedula, ruta) => {
        setSelectedRutas((prevState) => ({
            ...prevState,
            [cedula]: ruta
        }));
    };
    return (
        <>
            <Header/>
            <div className="contenedorConductores">
                {conductores.map((conductor) => (
                        <div className="contInfo" key={conductor.cedula}>
                            <div className="infoConductorAsi">
                                <p>{conductor.nombres} {conductor.apellidos}</p>
                                <DropdownRuta value={selectedRutas[conductor.cedula]} onChange={(ruta) => handleDropdownChange(conductor.cedula, ruta)} />
                            </div>
                        </div>
                    ))}
            </div>
            <button onClick={handleButton} className="botonAsignar">Asignar Ruta</button>
        </>
    )
}