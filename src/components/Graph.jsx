import "../styles/Graph.css";
import { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment/moment";
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
} from "chart.js";
import { numberF } from "./App";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

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
  };

  const [dates, setDates] = useState();
  const [prices, setPrices] = useState();
  const [gradient, setGradient] = useState();
  const graphRef = useRef(null);

  const getData = async () => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`
    );
    const json = await res.json();
    setDates(json.prices.map((item) => moment.unix(item[0]).format("MM-DD")));
    setPrices(json.prices.map((item) => Math.round(item[1])));
  };

  useEffect(() => {
    getData();
    const canvas = graphRef.current.firstChild;
    let BGradient = canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, canvas.height);
    BGradient.addColorStop(0, "rgba(4, 191, 157, 1)");
    BGradient.addColorStop(1, "rgba(4, 191, 157, 0)");
    setGradient(BGradient);
  }, []);

  // Configuración de datos y opciones para el tipo 0
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

  // Configuración de datos y opciones para el tipo 1
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
      <Line data={type === 0 ? dataType0 : dataType1} options={type === 0 ? optionsType0 : optionsType1} />
    </div>
  );
}