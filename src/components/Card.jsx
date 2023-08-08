// se importa la hoja de estilos
import "../styles/Card.css"

// se importa el componente Graph

import Graph from "./Graph"

// se importa la función colorDec del archivo App.js. Esta función es utilizada para determinar el color del texto en función de si el porcentaje de cambio es positivo o negativo.

import {colorDec} from './App'

//La función Card toma varios props como argumentos: coinId, cur, porcentaje, price e img.

export default function Card({coinId, cur, porcentaje, price, img}){

    // se renderiza el contenido de la tarjeta

    return (

        // Muestra una imagen de la criptomoneda (img) en la parte superior de la tarjeta.

        <div className="card">
            <img src={img} alt=""/>

             {/*Dentro de div con la clase con-main, muestra el título de la tarjeta y el componente Graph.*/}

            <div className="con-main">

                {/*El título incluye*/}

                <div className="con-title">
                    
                    {/*Un h2 con la clase price, que muestra el precio actual de la criptomoneda (price). La clase colorDec(porcentaje) se utiliza para determinar el color del texto en función del porcentaje de cambio utilizando la función colorDec. */}

                    <h2 className={`price ${colorDec(porcentaje)}`}>{price}</h2>

                    {/*Un h4 con la clase porcentajes, que muestra el porcentaje de cambio (porcentaje) seguido del símbolo de porcentaje (%). Al igual que antes, la clase colorDec(porcentaje) determina el color del texto basado en el porcentaje de cambio. */}

                    <h4 className={`porcentajes ${colorDec(porcentaje)}`}>{porcentaje}%</h4>
                </div>
                
                {/*se incluye el componente Graph con los props coin, currency y color, que representan la criptomoneda, la moneda actual y el color correspondiente. */}

                <Graph coin={coinId} currency={cur} color={colorDec(porcentaje)}/>
            </div>
        </div>
    )
}