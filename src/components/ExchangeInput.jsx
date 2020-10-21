import React from 'react';
const ExchangeInput = ({inputName, list, currency, handleCurrency}) => {
    

    return (
        <div className="currency-select">
            <span>{inputName}:</span>
            <select 
                id={inputName} 
                className="currency-select"
                value={currency}
                onChange={
                    e => handleCurrency(e.target.value)
                }
                >
                <option disabled value="" >
                    -----
                </option>
                {list.map((cur, i) => (
                    <option value={cur} key={i} >
                        {cur}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default ExchangeInput;