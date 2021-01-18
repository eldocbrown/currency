import React from "react"

function Exchange(props) {
        
        const exchange = props.exchange
        
        let exchangeHtml = <p style={{ color: "indianred" }}><i>Please complete all fields</i></p>
        
        if (exchange.amount && exchange.currencyFrom && exchange.currencyTo && exchange.rate) {
            exchangeHtml =
            <p>Your
                <span style={{ color: "green" }}><strong> {Number(exchange.amount).toFixed(2)} {exchange.currencyFrom.toUpperCase()} </strong></span>
                will buy you
                <span style={{ color: "green" }}><strong> {Number(exchange.amount*exchange.rate).toFixed(2)} {exchange.currencyTo.toUpperCase()} </strong></span>
            </p>
        }

        return (
            <div id="exchangeContainer">
                {exchangeHtml}
            </div>
        )
}

export default Exchange