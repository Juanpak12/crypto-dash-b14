import { useEffect, useState } from "react";
import InputConvert from "./InputConvert"; // Componente
import { FaExchangeAlt } from "react-icons/fa"; // Icono
import "../styles/Convert.css"; // Estilos

export default function Convert() {
  const [coin, setCoin] = useState([])
  const [selCoin1, setSelCoin1] = useState("usdt")
  const [selCoin2, setSelCoin2] = useState("btc")
  const [mainTxt, setMainTxt] = useState(1)
  const [res, setRes] = useState(0)

  // Función asíncrona para obtener los datos de la API
  const getData = async () => {
    // Hacer petición a la API
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1")
    const json = await res.json()
    // Establecer el valor de los datos obtenidos
    setCoin(json);
    getResult(json)
    // Mostrar datos obtenidos en consola
    // console.log(result.data)
  };
  const getResult = obj => {
    let a,b
    obj.forEach(({symbol, current_price}) =>{
      if(symbol === selCoin1){
        a = (mainTxt * current_price) / 1
      }else if(symbol === selCoin2){
        b = current_price
      }
    })
     a ? setRes(a / b) : setRes(0)
  }
  // Obtener los datos cuando el componente cargue
  useEffect(() => {
    // Datos de la API
    getData()
  }, []);

  useEffect(_ => {
    getResult(coin)
  },[mainTxt,selCoin1,selCoin2])

  return (
    <div className="contenedor">
      <h2>Convertir Monedas</h2>

      <div className="input-convert">
        <InputConvert coin={coin} fun={setSelCoin1} other={selCoin2} text={setMainTxt} type={0} />

        <FaExchangeAlt className="icono" />

        <InputConvert coin={coin} sel="btc" fun={setSelCoin2} other={selCoin1} result={res}/>
      </div>
    </div>
  );
}
