import React, {useReducer, createContext} from "react";


export const ExchangeRateContext = createContext();

let initialState = {
    currencies: {

    }
}

const reducer = (state, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case "UPDATE_CURRENCIES":
      if (!newState.currencies[action.currency1]) {
        newState.currencies[action.currency1] = {};        
      }
      newState.currencies[action.currency1][action.currency2] = action.rate;

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
