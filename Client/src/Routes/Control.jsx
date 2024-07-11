import "../Styles/Control.css";
import { Header } from "../Header";

export const Control = () => {
  const rows = [
    ["Dia", "11/04/2024"],
    ["Ruta", "05"],
    ["Lugar de salida", "paradero 1", "paradero 2", "Paradero 3"],
    ["Lugar de llegada", "Paradero 2", "Paradero 3", "Paradero 4"],
    ["Hora de salida", "6:00 AM", "6:27 AM", "7:02 AM"],
    ["Hora de llegada", "6:27 AM", "7:02 AM", "7:29"],
    ["Minutos de retraso", "0", "2", "0"],
    ["Sanciones", "", "4000", ""]
  ];

  // Encontrar el número máximo de columnas en cualquier fila
  const maxColumns = rows.reduce((max, row) => Math.max(max, row.length), 0);

  return (
    <>
      <Header />
      <div className="tableContainer">
        <div className="table">
          <table>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => {
                    // Asignar colSpan a las filas de "Dia" y "Ruta"
                    const colSpan = rowIndex === 0 || rowIndex === 1 ? maxColumns - 1 : 1;
                    return (
                      <td key={cellIndex} colSpan={cellIndex === 1 ? colSpan : 1} className={cellIndex === 1 ? 'td' : ''}>
                        {cell}
                      </td>
                    );
                  })}
                  {/* Asegurarse de que las filas sin suficiente columnas se llenen */}
                  {row.length < maxColumns && rowIndex > 1 && (
                    <td colSpan={maxColumns - row.length}></td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};