import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import arrow_icon from "../../assets/arrow_icon.png";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (e) => {
    switch (e.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };
  return (
    <div className="Navbar">
      <Link to={"/"} className="brand">
        <img src={logo} alt="" className="Logo" />
        <p className="brand-name">Vk7 CryptoTracker</p>
      </Link>
      <div className="Curr">
        <p style={{ fontWeight: "700", fontStyle: "italic" }}>Currency</p>
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="inr">INR</option>
          <option value="eur">EURO</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
