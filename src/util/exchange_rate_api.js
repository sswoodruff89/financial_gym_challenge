import axios from 'axios';


export const getRates = (base = '') => (
    axios.get(
        `https://api.exchangeratesapi.io/latest?=${base}`
    )
)

export const getRate = (currency1, currency2) => (
    axios.get(
        `https://api.exchangeratesapi.io/latest?symbols=${currency1},${currency2}`
    )
)