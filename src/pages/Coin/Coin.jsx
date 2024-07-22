import React, { useEffect } from "react";
import "./Coin.css";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { CoinContext } from "../../context/CoinContext";
import { useState } from "react";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [coinHistoricalData, setCoinHistoricalData] = useState();
  const { currency } = useContext(CoinContext);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-jhMid9jud2dbstYDdiNTBA9x",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-jhMid9jud2dbstYDdiNTBA9x",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=20&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setCoinHistoricalData(response); // Set the state with fetched historical data
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchData();
      await fetchHistoricalData();
      setLoading(false);
    };

    fetchDataAsync();
  }, [currency, coinId]);

  if (loading || !coinData || !coinHistoricalData) {
    return (
      <>
        <Link to={"/"}>
          <button className="back">Back</button>
        </Link>
        <div className="spinner">
          <div className="spin"></div>
        </div>
      </>
    );
  }

  return (
    <div className="coin">
      <Link to={"/"}>
        <button className="back">Back</button>
      </Link>
      <div className="coin-name">
        <img src={coinData.image.large}></img>
        <p style={{ fontSize: "40px", fontWeight: "500" }}>
          {coinData.name}({coinData.symbol.toUpperCase()})
        </p>
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <LineChart coinHistoricalData={coinHistoricalData} />
      </div>
      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>
            {currency.symbol}
            {coinData.market_data.current_price[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>
            {currency.symbol}
            {coinData.market_data.market_cap[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24 Hour High</li>
          <li>
            {currency.symbol}
            {coinData.market_data.high_24h[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24 Hour Low</li>
          <li>
            {currency.symbol}
            {coinData.market_data.low_24h[currency.name].toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;
