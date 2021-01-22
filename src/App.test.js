import React from 'react'
import ReactDOM from 'react-dom'
import TestRenderer, {create, act} from 'react-test-renderer'
import App from "./App"
import ExchangeForm from "./ExchangeForm"
import Exchange from "./Exchange"

const fakeExchange = {
  'rates': {
            'ARS': 185.5345,
            'USD': 1.4245,
            'BRL': 15.4245,
          },
  'base':'EUR',
  'date':'2021-01-21'
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
})

it('renders a div with card class', () => {
  const testInstance = TestRenderer.create(<App />).root

  // query for element
  const element = testInstance.findByType("div");

  // assert that className to include btn-group
  expect(element.props.className.includes("container-fluid shadow p-3 mb-5 bg-light rounded-lg card")).toBe(true)
})

it('renders a div with a Header, an ExchangeForm and an Exchange', () => {
  const testRenderer = TestRenderer.create(<App />)
  const testInstance = testRenderer.root

  // query for element
  const element = testInstance.findByType("div")

  // assert that className to include btn-group
  expect(element.props.children[0].type.name).toBe('Header')
  expect(element.props.children[1].type.name).toBe('ExchangeForm')
  expect(element.props.children[2].type.name).toBe('Exchange')
})

it('calculates exchange when amount, currencyFrom, and currencyTo are completed in changed in ExchangeForm', async () => {

  // Mock the API call on getRate
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeExchange)
    })
  );

  // Render the App component
  let testRenderer
  await act(async () => {
    testRenderer = create(<App />)
  })

  // Query for the ExchangeForm component
  let testInstance = testRenderer.root
  let exchangeForm = testInstance.findByType(ExchangeForm)

  // Change state values that are bound to the input value field
  exchangeForm.props.exchange.amount = 1.0
  exchangeForm.props.exchange.currencyFrom = 'EUR'
  exchangeForm.props.exchange.currencyTo = 'ARS'

  // Update the entire App component
  await act(async () => {
    testRenderer.update(<App />)
  })

  // Get values in Exchange component
  testInstance = testRenderer.root
  const strong = testInstance.findByType(Exchange).findAllByType('strong')
  const amount = strong[0].props.children[1]
  const currencyFrom = strong[0].props.children[3]
  const result = strong[1].props.children[1]
  const currencyTo= strong[1].props.children[3]

  // Expect thar exchange has been calculated and values match with fakeExchange rates
  expect(amount).toBe('1.00')
  expect(currencyFrom).toBe('EUR')
  expect(currencyTo).toBe('ARS')
  expect(result).toBe('185.53')

})
