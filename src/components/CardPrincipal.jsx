
// se importa la hoja de estilos

import "../styles/CardPrincipal.css"

// se importa el icono FaPlay desde la libreria de iconos 
import {FaPlay} from 'react-icons/fa'

// Importa las funciones deleteDec y colorDec del archivo App.js.

import {deleteDec, colorDec} from './App'

//Importa el componente Graph.

import Graph from './Graph'

{/* La función CardPrincipal toma un objeto JSON como prop llamado json, que contiene información detallada sobre una criptomoneda. También toma un prop opcional llamado cur para representar la moneda actual (por defecto, "usd"). */}

export default function CardPrincipal({ json: { id,
    symbol,
    current_price,
    image,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
    price_change_percentage_30d_in_currency,
    price_change_percentage_1y_in_currency}, cur = "usd" }){

        //Renderiza la información principal de la criptomoneda en una tarjeta grande:
        
    return (
        <>
            <article className="cripto-first">
                <div className="cripto-title">
                    <img src={image} alt="Icono de cripto" />
                    
                    {/* Muestra el símbolo de la criptomoneda (symbol), el precio actual (current_price), y el porcentaje de cambio a 30 días (price_change_percentage_30d_in_currency). Utiliza la función deleteDec para formatear el precio y el porcentaje, y colorDec para determinar el color del porcentaje. */}

                    <h2>{symbol} - {deleteDec(current_price,0)} {cur}</h2>

                    {/* Muestra un icono de flecha hacia arriba o hacia abajo (icono FaPlay) junto al porcentaje de cambio a 30 días. */}

                    <h2 className={colorDec(price_change_percentage_30d_in_currency)}><FaPlay className={`icon-arrow `}/>{deleteDec(price_change_percentage_30d_in_currency, 2)}%</h2>
                </div>

                {/* Muestra un gráfico (Graph) utilizando el componente Graph y pasando los props type, coin y currency. */}

                <div className="graphic">
                    <Graph type={0} coin={id} currency={cur}/>
                </div>

                {/* Muestra una tabla de capitalización con porcentajes de cambio para diferentes intervalos de tiempo (1 hora, 24 horas, 7 días, 1 mes, 1 año). Utiliza la función deleteDec para formatear los porcentajes y colorDec para determinar el color del texto. */}
                <div className="capitalization">
                    <h2>Capitalización</h2>
                    <table className="capitalization-table">
                        <thead>
                            <tr>
                                <th>1h</th>
                                <th>24h</th>
                                <th>7d</th>
                                <th>1m</th>
                                <th>1y</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                 <td className={colorDec(price_change_percentage_1h_in_currency)}>{deleteDec(price_change_percentage_1h_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_24h_in_currency)}>{deleteDec(price_change_percentage_24h_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_7d_in_currency)}>{deleteDec(price_change_percentage_7d_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_30d_in_currency)}>{deleteDec(price_change_percentage_30d_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_1y_in_currency)}>{deleteDec(price_change_percentage_1y_in_currency, 2)}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>
        </>
    )
}