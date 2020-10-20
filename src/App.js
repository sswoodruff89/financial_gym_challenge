import React, {useEffect} from 'react';
import {getRates} from './util/exchange_rate_api';
import './App.css';

const App = () => {

  useEffect(() => {
    getRates()
      .then((res) => {
        console.log(res);
      });
    
  }, []);

  return (
    <main className="App">

    Hello World
    </main>
  );
}

export default App;
