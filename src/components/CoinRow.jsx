import "../styles/CoinRow.css"
import Graph from './Graph'
import {deleteDec, colorDec, numberF} from './App'

export default function CoinRow({ coin: {id,image, name, current_price, market_cap_change_percentage_24h, total_volume,market_cap}, index }) {
  return (
    <tr className="row">
      <td>{index}</td>
      <td>
        <div className="coin_image_container">
            <img src={image} title={name} alt={name} />
        </div>
      </td>
      <td>{numberF.format(current_price)}US$</td>
      <td className={colorDec(market_cap_change_percentage_24h)}>{deleteDec(market_cap_change_percentage_24h, 2)}%</td>
      <td>{numberF.format(total_volume)}US$</td>
      <td>{numberF.format(market_cap)}US$</td>
      <td><Graph coin={id} days={7} color={colorDec(market_cap_change_percentage_24h)}/></td>
    </tr>
  );
}