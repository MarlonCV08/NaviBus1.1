import React, { useState } from 'react';
import { DropdownVehiculo } from "../Components/DropdownVehiculo";
import { Loader } from "../Components/Loader";
import { useNavigate } from 'react-router-dom';
export const Validar = () => {
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleValidation = () => {
    setLoading(true); 
    setTimeout(() => {
      setLoading(false);
      navigate('/Validar/InfoDia')
    }, 3000);
  };

  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Loader />
        </div>
      ) : (
        <div className="validar">
          <section className="sectionValidar">
            <DropdownVehiculo />
            <input type="text" className="inputValidar" placeholder="Placa" />
            <input type="text" className="inputValidar" placeholder="ID despachador" />
            <section className="sectionBtnValidar">
              <button onClick={handleValidation} className="btnValidar">Validar</button>
            </section>
          </section>
        </div>
      )}
    </>
  );
};