import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    const inputvalue = e.target.value.toLowerCase();
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const filtered = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    return setDisplayCoin(filtered);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="Home">
      <div className="Head">
        <h2>
          Vk7
          <br /> CryptoCurrency MarketPlace
        </h2>
        <p>Welcome to CryptoCurrency MarketPlace</p>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={input}
            onChange={inputHandler}
            list="coinlist"
            placeholder="Enter Crypto..."
            required
          ></input>
          <datalist id="coinlist">
            {allCoin.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </datalist>
          <button type="submit">SEARCH</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p style={{ marginLeft: "-100px" }}>Coins</p>
          <p style={{ textAlign: "center" }}>Price</p>
          <p>24Hr Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
      </div>
      <div>
        {displayCoin.slice(0, 20).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div className="imgandname">
              <img src={item.image} className="img"></img>
              <p>{item.name + "-" + item.symbol}</p>
            </div>
            <p>{currency.symbol + " " + item.current_price.toLocaleString()}</p>
            <p className={item.price_change_24h > 0 ? "pos" : "neg"}>
              {item.price_change_24h.toFixed(3)}
            </p>
            <p className="market-cap">{item.market_cap.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
