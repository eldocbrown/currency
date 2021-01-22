import React, {useState, useEffect} from "react"

function ExchangeForm(props) {
    const base = 'EUR'
    const [ currencies, setCurrencies ] = useState([])
    const exchange = props.exchange

    useEffect(() => {
        async function getCurrencies() {
            const response = await fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
            const data = await response.json()
            let curr = [{ label: "Select", value: ""} , { label: base, value: base }]
            for (const key of Object.keys(data.rates)) {
                curr.push({ label: key, value: key })
            }
            curr.sort((a, b) => {
                const nameA = a.value.toUpperCase(); // ignore upper and lowercase
                const nameB = b.value.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            })
            setCurrencies(curr)
        }
        getCurrencies()
    }, []);

    return (
        <div id="exchangeForm">
            <p>
                Convert

                <input
                    type="number"
                    className="border border-secondary rounded-lg"
                    id="original-currency-amount"
                    placeholder="1.00"
                    value={exchange.amount}
                    onChange={props.onChange}
                    name="amount"
                    autoFocus
                />

                <select
                    className="border border-secondary rounded-lg bg-white"
                    value={exchange.currencyFrom}
                    onChange={props.onChange}
                    name="currencyFrom"
                >
                    {
                        currencies.map(({ label, value }) => (
                            <option key={value} value={value}>{label}</option>
                        ))
                    }
                </select>

                to

                <select
                    className="border border-secondary rounded-lg bg-white"
                    value={exchange.currencyTo}
                    onChange={props.onChange}
                    name="currencyTo"
                >
                    {
                        currencies.map(({ label, value }) => (
                            <option key={value} value={value}>{label}</option>
                        ))
                    }
                </select>
            </p>
            <p>
                Exchange Rate:

                <input
                    type="number"
                    className="border border-secondary rounded-lg bg-light"
                    id="exchange-rate"
                    placeholder="1.00"
                    value={exchange.rate}
                    onChange={props.onChange}
                    name="rate"
                    readOnly
                />
            </p>
        </div>
    )
}

export default ExchangeForm
