import "../Styles/Control.css";
import { Header } from "../Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const Control = () => {

  const { rutaNombre, cedula } = useParams();
  const [controlData, setControlData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/control/${rutaNombre}/${cedula}`)
      .then((response) => response.json())
      .then((data) => setControlData(data))
      .catch((error) => console.error('Error al obtener los datos de control', error));
  }, [rutaNombre, cedula]);

  const proccessControlData = (data) => {
    const processed = [];
    let previousHour= null;

    data.forEach((control) => {
      const hour = new Date(control.hora);
      const currentHour = hour.getHours() * 60 + hour.getMinutes();

      let delayMinutes = 0;
      let sanction = 0;

      if (previousHour !== null) {
        const timeDifference = currentHour - previousHour;
        if (timeDifference > 1) {
          delayMinutes = timeDifference;
          sanction = delayMinutes * 2000;
        }
      }

      processed.push({
        puntoscontrol: control.puntoscontrol || 'N/A',
        hora: hour.toLocaleTimeString([], { hour: '2-digit', hour12: false }),
        minutosRetraso: delayMinutes,
        sanciones: sanction
      });
      previousHour = currentHour;
    });

    return processed
  }

  return (
    <>
      <Header />
      <div className="tableContainer">
        {/* <h2>Control de la Ruta: {rutaNombre}</h2>
        <h3>Conductor: {cedula}</h3> */}
        
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Vuelta</th>
                <th>Punto de Control</th>
                <th>Hora</th>
                <th>Minutos de Retraso</th>
                <th>Sanciones</th>
              </tr>
            </thead>
            <tbody>
              {controlData.length > 0 ? (
                controlData.map((control, index) => (
                  <tr key={index}>
                    <td>{control.cedula}</td>
                    <td>{control.puntoscontrol}</td>
                    <td>{control.hora}</td>
                    <td>{control.minutosRetraso || '0'}</td>
                    <td>{control.sanciones || '0'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No se encontraron datos de control para este usuario</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};