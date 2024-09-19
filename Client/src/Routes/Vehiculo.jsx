import { Link } from "react-router-dom"
import { Header } from "../Header"
import "../Styles/Vehiculo.css"
import { useState } from "react"
import { DropdownLinea } from "../Components/DropdownLinea"
import { DropdownClaseVehiculo } from "../Components/DropdownClaseVehiculo"
import { DropdownMarca } from "../Components/DropdownMarca"
export const Vehiculo = ()=>{

    const [placa, setPlaca] = useState('');
    const [modelo, setModelo] = useState('');
    const [chasis, setChasis] = useState('');
    const [motor, setMotor] = useState('');
    const [pasajeros, setPasajeros] = useState('');
    const [cilindrada, setCilindrada] = useState('');
    const [marca, setMarca] = useState('');
    const [linea, setLinea] = useState('');
    const [clasevehiculo, setClasevehiculo] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'placa':
                setPlaca(value.toUpperCase());
                break;
            case 'modelo':
                setModelo(value);
                break;
            case 'chasis':
                setChasis(value.toUpperCase());
                break;
            case 'motor':
                setMotor(value.toUpperCase());
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            placa,
            modelo,
            chasis,
            motor,
            pasajeros,
            cilindrada,
            marca,
            linea,
            clasevehiculo
        };
        fetch('http://localhost:3000/api/vehiculos')
    }


    return(
        <>
        <Header />
        <div className="contenedorPadre">
            <form className="contenedor" onSubmit={handleSubmit}>
                <section className="inputs">
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="Placa"
                        name="placa"
                        value={placa}
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="Modelo"
                        name="modelo"
                        value={modelo}
                        onChange={handleChange}
                        />
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="N° Chasis"
                        name="chasis"
                        value={chasis}
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="N° Motor"
                        name="motor"
                        value={motor}
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="N° Pasajeros"
                        name="pasajeros"
                        value={pasajeros}
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="Cilindrada"
                        name="cilindrada"
                        value={cilindrada}
                        onChange={handleChange}
                    />
                        <DropdownMarca value={marca} onChange={setMarca} />
                        <DropdownLinea marcaCod={marca} value={linea} onChange={setLinea} />
                        <DropdownClaseVehiculo onChange={setClasevehiculo} />
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