import axios from 'axios';

// Not used, but to meant to get all rates compared to a base currency
// EUR is the default when nothing is passed to the Exchange Rate API
export const getRates = (base = '') => (
    axios.get(
        `https://api.exchangeratesapi.io/latest?=${base}`
    )
)

export const getRate = (currency1, currency2) => (
    axios.get(
        `https://api.exchangeratesapi.io/latest?base=${currency1}&symbols=${currency2}`
    )
)