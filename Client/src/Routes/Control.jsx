import "../Styles/Control.css";
import { Header } from "../Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const Control = () => {

  const { rutaNombre, cedula } = useParams();
  const [controlData, setControlData] = useState([]);
  const [nombre, setNombre] = useState('');

  useEffect(() => {

    fetch(`http://localhost:3000/api/conductor/${cedula}`)
    .then((response) => response.json())
    .then((data) => setNombre(data.nombres))
    .catch((error) => console.error('Error al obtener el nombre del conductor', error));

    fetch(`http://localhost:3000/api/control/${rutaNombre}/${cedula}`)
      .then((response) => response.json())
      .then((data) => {
        const processedData = proccessControlData(data);
        setControlData(processedData);
      })
      .catch((error) => console.error('Error al obtener los datos de control', error));
  }, [rutaNombre, cedula]);

  const proccessControlData = (data) => {
    const processed = [];
    let previousHour= null;
    let vueltaCount = 1;
    let puntosEnVuelta = 0;

    data.forEach((control) => {
      const hour = new Date(control.hora.replace(" ", "T"));
      const currentHour = hour.getHours() * 60 + hour.getMinutes();

      let delayMinutes = 0;
      let sanction = 0;

      if (previousHour !== null) {
        const timeDifference = currentHour - previousHour;
        if (timeDifference > 1) {
          delayMinutes = timeDifference - 1;
          sanction = delayMinutes * 2000;
        }
      }

      const formattedHour = String(hour.getHours()).padStart(2, '0') + ':' + String(hour.getMinutes()).padStart(2, '0');

      processed.push({
        vuelta: vueltaCount,
        puntoscontrol: control.puntoscontrol || 'N/A',
        hora: formattedHour,
        minutosRetraso: delayMinutes,
        sanciones: sanction,
        ultimo: control.ultimo
      });

      if (control.ultimo) {
        vueltaCount++;
        puntosEnVuelta = 0;
      }
      previousHour = currentHour;
    });

    return processed;
  }

  return (
    <>
      <Header />
      <div className="tableContainer">
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
                controlData.map((control, index, array) => {
                  const esPrimeraFilaDeVuelta = index === 0 || array[index - 1].vuelta !== control.vuelta;
                  const esUltimaFilaDeVuelta = index === array.length - 1 || array[index + 1].vuelta !== control.vuelta;
                  const rowspan = array.filter(c => c.vuelta === control.vuelta).length;

                  return (
                    <tr key={index}>
                      {/* Si es la primera fila de la vuelta, mostrar la celda con rowspan */}
                      {esPrimeraFilaDeVuelta && (
                        <th rowSpan={rowspan} className="vuelta-cell">
                          {control.vuelta}
                        </th>
                      )}
                      <td>{control.puntoscontrol}</td>
                      <td>{control.hora}</td>
                      <td>{control.minutosRetraso || '0'}</td>
                      <td>$ {control.sanciones || '0'}</td>
                    </tr>
                  );
                })
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