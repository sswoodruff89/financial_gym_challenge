import React, {useReducer, createContext} from "react";


export const ExchangeRateContext = createContext();
const currencies = {};
// Create a Context store to temporarily cache rates fetched from Exchange Rate API
// Upon each change, it's the store is stringified and set to localStorage
// I did this based on Exchange Rate API suggestion to cache in order to limit repeated requests

let initialState = localStorage.getItem("currencies") ? {
    currencies: JSON.parse(localStorage.getItem("currencies"))
} : {currencies}

const reducer = (state, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case "UPDATE_CURRENCIES":
      if (!newState.currencies[action.currency1]) {
        newState.currencies[action.currency1] = {};        
      }
      newState.currencies[action.currency1][action.currency2] = action.rate;
      localStorage.setItem("currencies", JSON.stringify(newState.currencies));
      return newState;
    default:
      return state;
  }
}

export const ExchangeRateProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <ExchangeRateContext.Provider value={[state, dispatch]}>
            {props.children}
        </ExchangeRateContext.Provider>
    )
}
