// se importa la hoja de estilos

import '../styles/App.css';

// se importan elementos de react

import { useState, useEffect, useCallback } from 'react';

// se importan componentes

import CardPrincipal from '../components/CardPrincipal';
import Card from './Card';
import Header from './Header';
import TableCoins from './TableCoins';
import Convert from './Convert';
import Footer from './Footer';

// define el componente principal llamado app
function App() {

  //Se declara tres estados utilizando useState:
  //coins: Almacena datos de las criptomonedas.
  //currencys: Almacena las monedas admitidas para conversión.
  //selCur: Almacena la moneda seleccionada para la conversión (por defecto, 'usd').

  const [coins, setCoins] = useState();
  const [currencys, setCurrencys] = useState();
  const [selCur, setSelCur] = useState('usd');

  //Define la función getData, que utiliza useCallback para garantizar que la función no se vuelva a crear en cada renderizado. Esta función realiza llamadas a la API de CoinGecko para obtener datos de las criptomonedas y las monedas admitidas.

  const getData = useCallback(async () => {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selCur}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y`);
    const json = await res.json();
    const curRes = await fetch('https://api.coingecko.com/api/v3/simple/supported_vs_currencies');
    const curJson = await curRes.json();
    setCoins(json);
    setCurrencys(curJson);
  }, [selCur]);

//Utiliza useEffect para ejecutar la función getData cuando el componente se monta ([]) y cuando selCur cambia.
  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    getData();
  }, [selCur]);

  // Renderiza la interfaz del componente:
  //Muestra un mensaje de "Cargando..." si coins es false (aún no se ha cargado la información).
  
  return !coins ? 'Cargando...' : (

    //Si coins tiene datos, muestra varios componentes personalizados, como Header, Convert, main (contiene tarjetas y un componente principal), TableCoins y Footer.

    <>
      <Header currencys={currencys} fun={setSelCur} cur={selCur} />
      <Convert />
      <main>
        <div className="cards_con">

          {/*En el bloque coins.map dentro de la sección main, se mapean los datos de las criptomonedas para crear tarjetas Card para cada una de las cuatro primeras criptomonedas excepto la primera). */} 

          {coins.map(({ id, symbol, image, price_change_percentage_30d_in_currency, current_price }, index) => {
            if (index !== 0 && index <= 3) {
              return (
                <Card
                  key={index}
                  coinId={id}
                  cur={selCur}
                  porcentaje={deleteDec(price_change_percentage_30d_in_currency, 2)}
                  price={`${symbol} - ${current_price} ${selCur}`}
                  img={image}
                />
              );
            } else {
              return null; // Agrega un valor de retorno en el caso contrario
            }
          })}
        </div>
        <CardPrincipal json={coins[0]} cur={selCur} />
      </main>
      <TableCoins coins={coins} />
      <Footer />
    </>
  );
}

export default App;

// El método deleteDec se utiliza para formatear el porcentaje de cambio. El bloque else retorna null para omitir las criptomonedas restantes.
// funciones exportadas
// deleteDec: Una función que toma un valor numérico y un número de decimales, y formatea el valor a un número con la cantidad de decimales especificada.

export function deleteDec(val, decimal) {
  return val.toFixed(decimal);
}

//colorDec: Una función que toma un número y devuelve 'green' si es positivo y 'red' si es negativo.

export function colorDec(num) {
  return num > 0 ? 'green' : 'red';
}

//numberF: Una instancia de Intl.NumberFormat configurada para formatear números en el formato específico 'es-ES'.
export const numberF = Intl.NumberFormat('es-ES');