import React, {useState, useEffect, useRef} from 'react';
import {getRates} from './util/exchange_rate_api';
import './App.css';
import ExchangeInput from './components/ExchangeInput';

const App = () => {
  let rates = useRef();
  const [listLoaded, setListLoaded] = useState(false);
  const [rateList, setRateList] = useState(null);
  const [base, setBase] = useState("EUR");
  const [currency1, setCurrency1] = useState("");
  const [currency2, setCurrency2] = useState("");
  const [rate, setRate] = useState("");

  const currencyList = ["CAD", "HKD", "ISK", "EUR", "PHP", "DKK", "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "ILS", "GBP", "KRW", "MYR"].sort();


  useEffect(() => {
    if (!rateList) {
      
    //   setListLoaded(true);

    // } else {
      
      // getRates()
      // .then((res) => {
      //   setRateList(res.data.rates);
      //   // console.log(Object.keys(res.data.rates));
      // });
    // }
    }
  }, []);

  console.log(rateList);
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
      <ExchangeInput inputName={"currency1"} list={currencyList} currency={currency1} />
      <ExchangeInput inputName={"currency2"} list={currencyList} currency2={currency2} />



    </main>
  );
}

export default App;
