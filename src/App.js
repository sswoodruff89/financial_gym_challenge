import React, {useState, useEffect, useRef, useContext} from 'react';
import {getRates, getRate} from './util/exchange_rate_api';
import './App.css';
import ExchangeInput from './components/ExchangeInput';
import {ExchangeRateContext} from "./context/exchangeRateContext";

const App = () => {
  // let rates = useRef();
  const [state, dispatch] = useContext(ExchangeRateContext);

  const [currency1, setCurrency1] = useState("");
  const [currency2, setCurrency2] = useState("");
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [rate, setRate] = useState(0);
  const [conversionList, setConversionList] = useState([]);

  const curr1 = useRef(currency1);
  const curr2 = useRef(currency2);

  const currencyList = ["CAD", "HKD", "ISK", "EUR", "PHP", "DKK", "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "ILS", "GBP", "KRW", "MYR"].sort();


  useEffect(() => {
    let newRate;
    if (!state.currencies[currency1] || !state.currencies[currency1][currency2]) {
      getRate(currency1, currency2)
        .then((res) => {
          newRate = res.data.rates[currency2];
          console.log(newRate);
          updateCurrencyCache(newRate);
          setRate(newRate);
          // calculateCurrency(newRate);
        })
    } else {
      newRate = state.currencies[currency1][currency2];
      setRate(newRate);
      // calculateCurrency();
      // console.log(amount2)
    }
    // curr1.current = currency1;
    // curr2.current = currency2;

  }, [currency1, currency2])


  useEffect(() => {
    calculateCurrency(rate);
  }, [amount1, rate]);

  const updateCurrencyCache = (rate) => {
    if (!currency1.length && !currency2.length) return;

    if (!state.currencies[currency1] || !state.currencies[currency1][currency2]) {
      dispatch({
        type: "UPDATE_CURRENCIES",
        currency1,
        currency2,
        rate
      })
    }
  }


  const calculateCurrency = (rate) => {
    setAmount2(amount1 * rate);
  }
  return (
    <main className="App">

      <h2>Global Currency Converter</h2>

      <form className="currency-convert-container">
        <input 
          className="number-input"
          type="number" 
          value={amount1} 
          onChange={(e) => {setAmount1(e.target.value)}}/>
        <ExchangeInput 
          inputName={"From"} 
          list={currencyList} 
          currency={currency1}
          handleCurrency={(value) => setCurrency1(value)}
           />
        <ExchangeInput 
          inputName={"To"} 
          list={currencyList} 
          currency={currency2}
          handleCurrency={(value) => setCurrency2(value)}

           />

        {/* <button 
          type="submit"
          className="convert-button" 

          disabled={currency1.length && currency2.length && amount1 > 0 ? false : true}>
          Convert
        </button> */}
      </form>

      {/* <ExchangeInput inputName={"currency2"} list={currencyList} currency2={currency2} amount={amount2} /> */}


      <section className="converted-amount-container">
        {amount2 > 0 && (
          <div className="amount">
            <h4>{currency2}</h4>
            <h1>{amount2.toFixed(2)}</h1>
          </div>
        )}
      </section>

    </main>
  );
}

export default App;
