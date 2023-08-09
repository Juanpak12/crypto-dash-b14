import "../styles/Graph.css"; // Importa los estilos del componente
import { useState, useEffect, useRef } from "react"; // Importa los hooks de React
import { Line } from "react-chartjs-2"; // Importa el componente Line de react-chartjs-2
import moment from "moment/moment"; // Importa la librería moment para manipulación de fechas
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js"; // Importa componentes y funcionalidades de Chart.js
import { numberF } from "./App"; // Importa la función numberF desde otro archivo

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
); // Registra los componentes y funcionalidades en Chart.js

export default function Graph({
  type = 1,
  coin = "bitcoin",
  currency = "usd",
  days = 30,
  color = "#04D99D",
}) {
  const optionScale = {
    grid: {
      display: false,
    },
    border: {
      display: false,
    },
    ticks: {
      display: false,
    },
  }; // Configuración de escala común para ambos tipos de gráficos

  const [dates, setDates] = useState(); // Estado para almacenar las fechas
  const [prices, setPrices] = useState(); // Estado para almacenar los precios
  const [gradient, setGradient] = useState(); // Estado para el gradiente de fondo
  const graphRef = useRef(null); // Crea una referencia no mutable

  const getData = async () => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`
    ); // Realiza una petición a la API de CoinGecko
    const json = await res.json(); // Convierte la respuesta en formato JSON
    setDates(json.prices.map((item) => moment.unix(item[0]).format("MM-DD"))); // Obtiene las fechas y las formatea
    setPrices(json.prices.map((item) => Math.round(item[1]))); // Obtiene los precios y los redondea
  };

  useEffect(() => {
    getData(); // Llama a la función para obtener los datos
    const canvas = graphRef.current.firstChild; // Accede al primer hijo del componente referenciado
    let BGradient = canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, canvas.height); // Crea un gradiente lineal para el fondo del gráfico
    BGradient.addColorStop(0, "rgba(4, 191, 157, 1)"); // Agrega un color de parada al gradiente
    BGradient.addColorStop(1, "rgba(4, 191, 157, 0)"); // Agrega otra color de parada al gradiente
    setGradient(BGradient); // Establece el gradiente en el estado
  }, []);

  // Configuración de datos y opciones para el tipo 0 (gráfico con relleno)
  const dataType0 = {
    labels: dates,
    datasets: [
      {
        data: prices,
        borderColor: color,
        backgroundColor: gradient,
        pointRadius: 0,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const optionsType0 = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          callback: function (value, index, ticks) {
            return `$${numberF.format(value)} ${currency.toUpperCase()}`;
          },
        },
      },
    },
  };

  // Configuración de datos y opciones para el tipo 1 (gráfico sin relleno)
  const dataType1 = {
    labels: dates,
    datasets: [
      {
        data: prices,
        borderColor: color,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const optionsType1 = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: optionScale,
      y: optionScale,
    },
  };

  return (
    <div ref={graphRef} className="graph">
      {/* Renderiza el componente Line de react-chartjs-2 con datos y opciones dependiendo del tipo */}
      <Line data={type === 0 ? dataType0 : dataType1} options={type === 0 ? optionsType0 : optionsType1} />
    </div>
  );
}