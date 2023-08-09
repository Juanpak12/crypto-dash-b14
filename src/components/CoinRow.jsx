// se importa la hoja de estilos

import "../styles/CoinRow.css"

// se importa el componente Graph

import Graph from './Graph'

// se importa las funciones deleteDec, colorDec y numberF del archivo App.js.

import {deleteDec, colorDec, numberF} from './App'

// La función CoinRow toma un objeto JSON como prop llamado coin que contiene información sobre una criptomoneda específica. También toma index como prop para el índice de la fila en la tabla.

export default function CoinRow({ coin: {id,image, name, current_price, market_cap_change_percentage_24h, total_volume,market_cap}, index }) {
  return (

    // Renderiza una fila (<tr>) en una tabla que muestra los datos de la criptomoneda

    <tr className="row">

      {/* La primera celda muestra el índice de la fila. */}

      <td>{index}</td>
      
      {/* La segunda celda contiene la imagen de la criptomoneda, envuelta en un contenedor con la clase coin_image_container. */}

      <td>
        <div className="coin_image_container">
            <img src={image} title={name} alt={name} />
        </div>
      </td>

      {/* La tercera celda muestra el precio actual de la criptomoneda con formato de moneda utilizando la función numberF.format(current_price) y el símbolo "US$" al final. */}

      <td>{numberF.format(current_price)}US$</td>

      {/* La cuarta celda muestra el porcentaje de cambio en el mercado en las últimas 24 horas, con formato de porcentaje utilizando la función deleteDec y aplicando la clase de color con colorDec. */}

      <td className={colorDec(market_cap_change_percentage_24h)}>{deleteDec(market_cap_change_percentage_24h, 2)}%</td>

      {/* Las siguientes dos celdas muestran el volumen total y la capitalización de mercado de la criptomoneda, ambos con formato de moneda. */}

      <td>{numberF.format(total_volume)}US$</td>
      <td>{numberF.format(market_cap)}US$</td>

      {/* La última celda muestra un componente Graph con los props coin, days y color, que representan la criptomoneda, el número de días para el gráfico y el color basado en el porcentaje de cambio. */}

      <td><Graph coin={id} days={7} color={colorDec(market_cap_change_percentage_24h)}/></td>
    </tr>
  );
}