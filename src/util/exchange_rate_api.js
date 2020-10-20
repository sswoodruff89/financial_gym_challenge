import axios from 'axios';


export const getRates = () => (
    axios.get(
        "https://api.exchangeratesapi.io/latest"
    )
)