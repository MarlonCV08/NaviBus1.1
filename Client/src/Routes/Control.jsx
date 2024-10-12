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
                <th>Vuelta</th>
                <th>Punto de Control</th>
                <th>Hora</th>
                <th>Minutos de Retraso</th>
                <th>Sanciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowSpan="6">1</th> {/* La primera vuelta cubre 6 filas */}
                <td>Barro Blanco</td>
                <td>6:00 a.m.</td>
                <td>0:00</td>
                <td>Sin Sanciones</td>
              </tr>
              <tr>
                <td>Alto de Vallejo</td>
                <td>6:28 a.m.</td>
                <td>0:00</td>
                <td>Sin Sanciones</td>
              </tr>
              <tr>
                <td>Abreito</td>
                <td>7:02 a.m.</td>
                <td>0:03</td>
                <td>6000</td>
              </tr>
              <tr>
                <td>Fonda Buenos Aires</td>
                <td>7:35 a.m.</td>
                <td>0:05</td>
                <td>10000</td>
              </tr>
              <tr>
                <td>El Carmin</td>
                <td>7:59 a.m.</td>
                <td>0:00</td>
                <td>Sin Sanciones</td>
              </tr>
              <tr>
                <td>Alto de los Correas</td>
                <td>8:27 a.m.</td>
                <td>0:00</td>
                <td>Sin Sanciones</td>
              </tr>
              <tr>
                <th rowSpan="2">2</th> {/* La segunda vuelta cubre 2 filas */}
                <td>Barro Blanco</td>
                <td>8:58 a.m.</td>
                <td>0:00</td>
                <td>Sin Sanciones</td>
              </tr>
              <tr>
                <td>Alto de Vallejo</td>
                <td>9:31 a.m.</td>
                <td>0:01</td>
                <td>2000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
