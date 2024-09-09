import { Link } from "react-router-dom"
import { Header } from "../Header"
import "../Styles/Vehiculo.css"
import { useState } from "react"
import { DropdownLinea } from "../Components/DropdownLinea"
export const Vehiculo = ()=>{

    const [placa, setPlaca] = useState('');
    const [linea, setLinea] = useState('');
    const [modelo, setModelo] = useState('');
    const [chasis, setChasis] = useState('');
    const [motor, setMotor] = useState('');
    const [pasajeros, setPasajeros] = useState('');
    const [cilindrada, setCilindrada] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'placa':
                setPlaca(value);
                break;
            case 'modelo':
                setModelo(value);
                break;
            case 'chasis':
                setChasis(value);
                break;
            case 'motor':
                setMotor(value);
                break;
            case 'pasajeros':
                setPasajeros(value);
                break;
            case 'cilindrada':
                setCilindrada(value);
                break;
            default:
                break;
        };
    };

    const handleSUbmit = (e) => {
        e.preventDefault();

        const formData = {
            placa,
            modelo,
            chasis,
            motor,
            pasajeros,
            cilindrada
        };
        fetch('http://localhost:3000/api/vehiculos')
    }


    return(
        <>
        <Header />
        <div className="contenedorPadre">
            <form className="contenedor">
                <section className="inputs">
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="Placa"
                    />
                    <DropdownLinea/>
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="Modelo"
                    />
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="N° Chasis"
                    />
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="N° Motor"
                    />
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="N° Pasajeros"
                    />
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="Cilindrada"
                    />
                </section>
                <section className="botones">
                <Link to='/Registro' className="linkRegistro">
                    <input type="button" value="Cancelar" className="boton"/>
                </Link>
                    <input type="submit" value="Enviar" className="boton"/>
                </section>
            </form>
        </div>
        </>
    )
}