import React from 'react';
const ExchangeInput = ({inputName, list}) => {
    

    return (
        <section>
            <label>
                <span>{inputName === "currency1" ? "From:" : "To:"}</span>
                <input type="number" />
                <select id={inputName} className="currency-select">
                    <option disabled value="" selected>
                        Select a Currency
                    </option>
                    {list.map(currency => (
                        <option value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </label>
        </section>
    )
}

export default ExchangeInput;