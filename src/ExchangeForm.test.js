import React from 'react'
import ReactDOM from 'react-dom'
import TestRenderer from 'react-test-renderer'
import ExchangeForm from './ExchangeForm'

const fakeExchange = {
  'rates': {
            'ARS': 185.5345,
            'USD': 1.4245,
            'BRL': 15.4245,
          },
  'base':'EUR',
  'date':'2021-01-21'
}

const defaultBase = 'EUR'

it('renders without crashing', () => {

  const props = { exchange: {
                    amount: "",
                    currencyFrom: "",
                    currencyTo: "",
                    rate: ""
                  },
                  onChange: (e) => {}
  }



  const div = document.createElement('div');
  ReactDOM.render(<ExchangeForm {...props}/>, div);
})

it('renders amount input', () => {

  const props = { exchange: {
                    amount: "",
                    currencyFrom: "",
                    currencyTo: "",
                    rate: ""
                  },
                  onChange: (e) => {}
  }

  const testInstance = TestRenderer.create(<ExchangeForm {...props}/>).root

  // Query for all inputs
  const inputs = testInstance.findAllByType('input')

  // Set expected input attributes
  const expectedInputProps = {
    type: 'number',
    className: 'border border-secondary rounded-lg',
    id: 'original-currency-amount',
    placeholder: '1.00',
    value: '',
    name: 'amount',
    autoFocus: true
  }

  // For each expected object attribute,input prop should match
  Object.entries(expectedInputProps).map((entry) => {
    const expectedKey = entry[0]
    const expectedValue = entry[1]
    expect(inputs[0].props[expectedKey]).toBe(expectedValue)
  })

})

it('renders currencyFrom select', () => {

  const props = { exchange: {
                    amount: "",
                    currencyFrom: "",
                    currencyTo: "",
                    rate: ""
                  },
                  onChange: (e) => {}
  }

  const testInstance = TestRenderer.create(<ExchangeForm {...props}/>).root

  // Query for all selects
  const selects = testInstance.findAllByType('select')

  // Set expected input attributes
  const expectedSelectProps = {
    className: 'border border-secondary rounded-lg bg-white',
    value: '',
    name: 'currencyFrom'
  }

  // For each expected object attribute,input prop should match
  Object.entries(expectedSelectProps).map((entry) => {
    const expectedKey = entry[0]
    const expectedValue = entry[1]
    expect(selects[0].props[expectedKey]).toBe(expectedValue)
  })

})

it('renders currencyTo select', () => {

  const props = { exchange: {
                    amount: "",
                    currencyFrom: "",
                    currencyTo: "",
                    rate: ""
                  },
                  onChange: (e) => {}
  }

  const testInstance = TestRenderer.create(<ExchangeForm {...props}/>).root

  // Query for all selects
  const selects = testInstance.findAllByType('select')

  // Set expected input attributes
  const expectedSelectProps = {
    className: 'border border-secondary rounded-lg bg-white',
    value: '',
    name: 'currencyTo'
  }

  // For each expected object attribute,input prop should match
  Object.entries(expectedSelectProps).map((entry) => {
    const expectedKey = entry[0]
    const expectedValue = entry[1]
    expect(selects[1].props[expectedKey]).toBe(expectedValue)
  })

})

it('renders rate input', () => {

  const props = { exchange: {
                    amount: "",
                    currencyFrom: "",
                    currencyTo: "",
                    rate: ""
                  },
                  onChange: (e) => {}
  }

  const testInstance = TestRenderer.create(<ExchangeForm {...props}/>).root

  // Query for all inputs
  const inputs = testInstance.findAllByType('input')

  // Set expected input attributes
  const expectedInputProps = {
    type: 'number',
    className: 'border border-secondary rounded-lg bg-light',
    id: 'exchange-rate',
    placeholder: '1.00',
    value: '',
    name: 'rate',
    readOnly: true
  }

  // For each expected object attribute,input prop should match
  Object.entries(expectedInputProps).map((entry) => {
    const expectedKey = entry[0]
    const expectedValue = entry[1]
    expect(inputs[1].props[expectedKey]).toBe(expectedValue)
  })

})

it('fills currencyFrom select options with currency codes', async () => {

  const props = { exchange: {
                    amount: "",
                    currencyFrom: "",
                    currencyTo: "",
                    rate: ""
                  },
                  onChange: (e) => {}
  }

  const expectedCurrencies = [
     { label: 'Select', value: ''},
     { label: 'ARS', value: 'ARS'},
     { label: 'BRL', value: 'BRL'},
     { label: defaultBase, value: defaultBase },
     { label: 'USD', value: 'USD'}
  ]

  // Mock the API call on getCurrencies
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeExchange)
    })
  );

  let testRenderer
  await TestRenderer.act(async () => {
    testRenderer = TestRenderer.create(<ExchangeForm {...props}/>)
  })


  // Query for all options in the first select
  const testInstance = testRenderer.root
  const options = testInstance.findAllByType('select')[0].findAllByType('option')

  // For each expected currency, option props should match
  expectedCurrencies.map((entry, i) => {
    expect(options[i].props.value).toBe(entry.value)
    expect(options[i].props.children).toBe(entry.label)
  })
})
