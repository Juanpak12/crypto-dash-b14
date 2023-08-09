import React, { useState, useRef } from "react";
import "../styles/Convert.css"; // Importa los estilos del componente
import { deleteDec } from './App'; // Importa la función deleteDec desde otro archivo

export default function InputConvert({ coin, sel = "usdt", fun, other, text, type = 1, result = 0 }) {
  const selRef = useRef(null); // Crea una referencia no mutable
  const [selVal, setSelVal] = useState(sel); // Crea un estado para la moneda seleccionada

  return (
    <>
      <div className="input">
        {/* Renderiza un input de número con dos opciones diferentes, basado en el prop 'type' */}
        {(type === 0) ? 
          // Si 'type' es 0, muestra un input editable que permite ingresar una cantidad
          <input type="number" placeholder="0" onChange={e => {text(parseFloat(e.target.value))}} defaultValue={1} />
        : 
          // Si 'type' no es 0, muestra un input solo de lectura con el resultado de la conversión
          <input type="number" placeholder="0" value={deleteDec(result, 8)} readOnly={true} />}
        
        <div className="select">
          <img src="" alt="" /> {/* Aquí se mostrará la imagen de la moneda seleccionada */}
          {/* Renderiza un select (menú desplegable) para seleccionar la moneda */}
          <select value={selVal} ref={selRef} onChange={() => {
              // Cuando cambia la selección, actualiza el estado 'selVal' y llama a la función 'fun' con la moneda seleccionada
              setSelVal(selRef.current.value);
              fun(selRef.current.value);
            }}>
            {/* Mapea sobre el array 'coin' para generar opciones en el select */}
            {coin.map((co) => {
              if (co.symbol === selVal) {
                // Si la moneda coincide con 'selVal', muestra su símbolo y establece la imagen
                selRef.current.previousSibling.src = co.image;
                return <option value={co.symbol} key={co.id}>{co.symbol}</option>;
              } else if (co.symbol !== other) {
                // Si no coincide con 'other', muestra su nombre como opción
                return <option value={co.symbol} key={co.id}>{co.name}</option>;
              } else {
                return null; // Si no se cumple ninguna condición, no renderiza nada (puede ser útil para evitar duplicados)
              }
            })}
          </select>
        </div>
      </div>
    </>
  );
}
