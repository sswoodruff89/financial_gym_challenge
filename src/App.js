import React, {useState, useEffect, useRef} from 'react';
import {getRates} from './util/exchange_rate_api';
import './App.css';

const App = () => {
  let rates = useRef();
  const [listLoaded, setListLoaded] = useState(false);
  const [rateList, setRateList] = useState(null);
  const [base, setBase] = useState("EUR");

  useEffect(() => {
    if (!rateList) {
      
    //   setListLoaded(true);

    // } else {
      
      getRates()
      .then((res) => {
        // rates.current = res.data.rates;
        // localStorage.setItem("rates", res.data.rates);
        // setListLoaded(true);
        //       console.log(rates.current)
        setRateList(res.data.rates);
        // console.log(res.data.rates);
      });
    // }
    }
  }, []);

  console.log(rateList);
  return (
    <main className="App">
      <table className="rateList">
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
      </table>


    </main>
  );
}

export default App;
