//Importa los hooks useEffect y useState desde React para manejar el ciclo de vida y el estado del componente.

import { useEffect, useState } from "react";

//importa el componente

import InputConvert from "./InputConvert";

// se importa el icono

import { FaExchangeAlt } from "react-icons/fa";

// se importa la hoja de estilos

import "../styles/Convert.css"; // Estilos

// se define el componente funcional Convert

export default function Convert() {

  // se define varios estados con el hook useState para manejar los datos y la interacción del usuario

  // coin: Almacena los datos de criptomonedas obtenidos de la API.

  const [coin, setCoin] = useState([])

  //selCoin1: Almacena la moneda seleccionada para la conversión (moneda de origen).

  const [selCoin1, setSelCoin1] = useState("usdt")

  // selCoin2: Almacena la moneda objetivo de la conversión (moneda de destino).

  const [selCoin2, setSelCoin2] = useState("btc")

  //mainTxt: Almacena la cantidad que se va a convertir.

  const [mainTxt, setMainTxt] = useState(1)

  //res: Almacena el resultado de la conversión.

  const [res, setRes] = useState(0)

  // Función asíncrona para obtener los datos de la API
  const getData = async () => {
    // Esta función asíncrona hace una petición a la API de Coingecko para obtener datos de las criptomonedas en USD.
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1")
    const json = await res.json()
    // Establece los datos obtenidos en el estado coin y llama a la función getResult para calcular el resultado de la conversión.
    setCoin(json);
    getResult(json)
    // Mostrar datos obtenidos en consola
    // console.log(result.data)
  };
  
  const getResult = obj => {
    let a, b; // Declara dos variables, 'a' y 'b', para almacenar valores temporales.
  
    // Itera a través de cada objeto en el array 'obj' (datos de las criptomonedas).
    obj.forEach(({ symbol, current_price }) => {
      // Comprueba si el símbolo de la criptomoneda coincide con 'selCoin1'.
      if (symbol === selCoin1) {
        // Si coincide, calcula el valor de 'a' multiplicando la cantidad ingresada ('mainTxt') por el precio actual ('current_price').
        // La división por 1 es innecesaria y puede ser un error tipográfico.
        a = (mainTxt * current_price) / 1;
      } else if (symbol === selCoin2) {
        // Si coincide con 'selCoin2', almacena el precio actual en la variable 'b'.
        b = current_price;
      }
    });
  
    // Comprueba si 'a' tiene un valor. Si es cierto, realiza la conversión y actualiza el estado 'res'.
    // Si 'a' no tiene valor, establece 'res' en 0.
    a ? setRes(a / b) : setRes(0);
  }

  {/* Este primer efecto se ejecuta una vez cuando el componente se monta. Utiliza el hook useEffect para realizar la petición de datos a la API (mediante la función getData) cuando el componente se carga inicialmente. La matriz de dependencias vacía [] asegura que este efecto solo se ejecute una vez. */}

  // Obtener los datos cuando el componente cargue
  useEffect(() => {
    // Datos de la API
    getData()
  }, []);

  {/* Este segundo efecto se dispara cada vez que alguno de los valores en la matriz de dependencias [mainTxt, selCoin1, selCoin2] cambia. En este caso, cuando mainTxt, selCoin1 o selCoin2 cambian, se ejecuta este efecto. Llama a la función getResult con los datos de las criptomonedas (coin) para calcular el resultado de la conversión. */}

  useEffect(_ => {
    getResult(coin)
  },[mainTxt,selCoin1,selCoin2])

  //se define el contenido del componente Convert que se va a renderizar

  return (

    //Se crea un contenedor con la clase contenedor.

    <div className="contenedor">

      {/* Se agrega un encabezado <h2> con el texto "Convertir Monedas". */}

      <h2>Convertir Monedas</h2>

      {/* Se crea un contenedor con la clase input-convert, que contiene dos componentes InputConvert y un ícono FaExchangeAlt. */}

      <div className="input-convert">

        {/* El primer componente InputConvert se utiliza para la moneda de origen (selCoin1), donde se pasa la información de las criptomonedas (coin), la función para establecer la moneda (setSelCoin1), la moneda de destino (selCoin2), la función para establecer la cantidad (setMainTxt), y un prop type con valor 0. */}

        <InputConvert coin={coin} fun={setSelCoin1} other={selCoin2} text={setMainTxt} type={0} />

        {/* Entre ambos componentes InputConvert, se renderiza el ícono de intercambio FaExchangeAlt. */}

        <FaExchangeAlt className="icono" />

        {/* El segundo componente InputConvert se utiliza para la moneda de destino (selCoin2), donde se pasa la información de las criptomonedas (coin), la función para establecer la moneda (setSelCoin2), la moneda de origen (selCoin1), y el resultado de la conversión (res). */}

        <InputConvert coin={coin} sel="btc" fun={setSelCoin2} other={selCoin1} result={res}/>
      </div>
    </div>
  );
}
