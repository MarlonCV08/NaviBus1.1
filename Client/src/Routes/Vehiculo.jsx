import { Link } from "react-router-dom"
import { Header } from "../Header"
import "../Styles/Vehiculo.css"
import { useState } from "react"
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
            case 'linea':
                setLinea(value);
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
            linea,
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
        <div class="contenedorPadre">
            <form class="contenedor">
                <section className="inputs">
                    <input 
                        type="text" 
                        class="input" 
                        placeholder="Placa"
                    />
                    <input 
                        type="text" 
                        class="input" 
                        placeholder="Linea"
                    />
                    <input 
                        type="text" 
                        class="input" 
                        placeholder="Modelo"
                    />
                    <input 
                        type="text" 
                        class="input" 
                        placeholder="N° Chasis"
                    />
                    <input 
                        type="text" 
                        class="input" 
                        placeholder="N° Motor"
                    />
                    <input 
                        type="text" 
                        class="input" 
                        placeholder="N° Pasajeros"
                    />
                    <input 
                        type="text" 
                        class="input" 
                        placeholder="Cilindrada"
                    />
                </section>
                <section class="botones">
                <Link to='/Registro' className="linkRegistro">
                    <input type="button" value="Cancelar" class="boton"/>
                </Link>
                    <input type="submit" value="Enviar" class="boton"/>
                </section>
            </form>
        </div>
        </>
    )
}