import React, {useState, useEffect} from "react"
import Exchange from "./Exchange"
import ExchangeForm from "./ExchangeForm"
import Header from "./Header"

function App() {
    
    const [ exchange, setExchange ] = useState({
        amount: "",
        currencyFrom: "",
        currencyTo: "",
        rate: ""
    })
    
    function handleChange(event) {
        const {name, value} = event.target
        
        setExchange({
            ...exchange,
            [name]: value
            }
        )
    }

    async function getRate(base, to) {
        const response = await fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
        const data = await response.json()
        setExchange({
            ...exchange,
            rate: data.rates[to]
            }
        )
    }

    useEffect(() => {
        
        if (exchange.currencyFrom && exchange.currencyTo) { 
            getRate(exchange.currencyFrom, exchange.currencyTo)
        }
        
    }, [exchange.currencyFrom, exchange.currencyTo])
    
    return (
        <div className="container-fluid shadow p-3 mb-5 bg-light rounded-lg card">
            <Header />
            <ExchangeForm exchange={exchange} onChange={handleChange}/>
            <Exchange exchange={exchange}/>
        </div>
    )
}


export default App