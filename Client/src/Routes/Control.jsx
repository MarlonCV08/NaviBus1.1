import "../Styles/Control.css";
import { Header } from "../Header";

export const Control = () => {
  return (
    <>
      <Header />
      <div className="tableContainer">
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Información</th>
                <th>Detalles 1</th>
                <th>Detalles 2</th>
                <th>Detalles 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Día</th>
                <td>11/04/2024</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>Ruta</th>
                <td>05</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>Lugar de salida</th>
                <td>Paradero 1</td>
                <td>Paradero 2</td>
                <td>Paradero 3</td>
              </tr>
              <tr>
                <th>Lugar de llegada</th>
                <td>Paradero 2</td>
                <td>Paradero 3</td>
                <td>Paradero 4</td>
              </tr>
              <tr>
                <th>Hora de salida</th>
                <td>6:00 AM</td>
                <td>6:27 AM</td>
                <td>7:02 AM</td>
              </tr>
              <tr>
                <th>Hora de llegada</th>
                <td>6:27 AM</td>
                <td>7:02 AM</td>
                <td>7:29 AM</td>
              </tr>
              <tr>
                <th>Minutos de retraso</th>
                <td>0</td>
                <td>2</td>
                <td>0</td>
              </tr>
              <tr>
                <th>Sanciones</th>
                <td></td>
                <td>4000</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
