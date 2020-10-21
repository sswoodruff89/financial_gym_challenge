import React, {useState, useEffect, useRef, useContext} from 'react';
import {getRates} from './util/exchange_rate_api';
import './App.css';
import ExchangeInput from './components/ExchangeInput';
import {ExchangeRateContext} from "./context/exchangeRateContext";

const App = () => {
  // let rates = useRef();
  const [state, dispatch] = useContext(ExchangeRateContext);
  // const [listLoaded, setListLoaded] = useState(false);
  const [rateList, setRateList] = useState(null);
  // const [base, setBase] = useState("EUR");
  const [currency1, setCurrency1] = useState("");
  const [currency2, setCurrency2] = useState("");
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [rate, setRate] = useState(1);

  const amount1Ref = useRef(amount1);
  const amount2Ref = useRef(amount2);

  const currencyList = ["CAD", "HKD", "ISK", "EUR", "PHP", "DKK", "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "ILS", "GBP", "KRW", "MYR"].sort();


  useEffect(() => {
      
    //   setListLoaded(true);

      
      // getRates()
      // .then((res) => {
      //   setRateList(res.data.rates);
      //   // console.log(Object.keys(res.data.rates));
      // });
    // }
  }, []);

  // useEffect(() => {
  //   console.log(currency1)
  // })

  // console.log(rateList);

  const updateCurrencyCache = () => {
    if (!state.currencies[currency1][currency2]) {
      dispatch({
        type: "UPDATE_CURRENCIES",
        currency1,
        currency2,
        rate
      })
    }
  }

  const getRate = () => {

  }

  // const calculateRate = () => {
  //   if (amount1Ref.current !== amount1) {
  //     if 
  //   }
  // }
  return (
    <main className="App">
      {/* <table className="rateList">
        <tbody>
          <tr className="rate-header">
            <td>Currency</td>
            <td>Rate</td>
          </tr>
        {rateList && Object.keys(rateList).map((rate, i) => (
          <tr key={i} className="rate-item">
            <td>{rate}</td>
            <td>{rateList[rate]}</td>
          </tr>
        ))}
          
        </tbody>
      </table> */}
      <h2>Global Currency Converter</h2>

      <section className="currency-convert-container">
        <input 
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


        <button 
          className="convert-button" 
          disabled={currency1.length && currency2.length && amount1 > 0 ? false : true}>
          Convert
        </button>
      </section>

      {/* <ExchangeInput inputName={"currency2"} list={currencyList} currency2={currency2} amount={amount2} /> */}



    </main>
  );
}

export default App;
