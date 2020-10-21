import React, {useState, useEffect, useContext} from 'react';
import { getRate} from './util/exchange_rate_api';
import './App.css';
import ExchangeInput from './components/ExchangeInput';
import {ExchangeRateContext} from "./context/exchangeRateContext";

const App = () => {
  const [state, dispatch] = useContext(ExchangeRateContext);

  const [currency1, setCurrency1] = useState("");
  const [currency2, setCurrency2] = useState("");
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [rate, setRate] = useState(0);

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
        })
    } else {
      newRate = state.currencies[currency1][currency2];
      setRate(newRate);
    }
  }, [currency1, currency2])


  useEffect(() => {
    calculateCurrency(rate);
  }, [amount1, rate]);

  const updateCurrencyCache = (rate) => {
    if (!currency1.length && !currency2.length) return;
    // This updates the Context store with fetched currency rates for short term caching.
    // I implemented this to limit number of requests to the Exchange Rate API

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
      <section className="converter-widget">

        <h1>Global Currency Converter</h1>

        <form className="currency-convert-container">
          <input 
            className="number-input"
            type="number" 
            min={0}
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
        </form>

        <section className="converted-amount-container">
          {amount2 > 0 && (
            <>
            <div className="amount">
              <h4>{currency2}</h4>
              <h1>{amount2.toFixed(2)}</h1>
            </div>
            <div className="calculation">{`(${currency1} ${amount1} x ${rate})`}</div>
            </>
          )}
        </section>
      </section>

    </main>
  );
}

export default App;
