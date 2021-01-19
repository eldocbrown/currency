import React from 'react'
import ReactDOM from 'react-dom'
import TestRenderer from 'react-test-renderer'
import Exchange from "./Exchange"

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Exchange />, div);
});

it('renders complete all fields message when no props are available', () => {
  const testRenderer = TestRenderer.create(<Exchange />)
  const testInstance = testRenderer.root

  expect(testInstance.findByType('p').findByType('i').props.children).toBe('Please complete all fields')
});

it('renders exchange calc result with props complete', () => {

  const props = { exchange: {
                    amount: "100",
                    currencyFrom: "USD",
                    currencyTo: "ARS",
                    rate: "146.5"
                  }
  }

  const testRenderer = TestRenderer.create(<Exchange {...props}/>)
  const testInstance = testRenderer.root

  expect(testInstance.findByType('p').props.children[0]).toBe('Your')
  expect(testInstance.findByType('p').props.children[2]).toBe('will buy you')

  const spans = testInstance.findByType('p').findAllByType('span')

  expect(spans[0].findByType('strong').props.children.join('')).toBe(' 100.00 USD ')
  expect(spans[1].findByType('strong').props.children.join('')).toBe(' 14650.00 ARS ')

});

it('renders complete all fields message when amount prop is missing', () => {
  const testRenderer = TestRenderer.create(<Exchange />)
  const testInstance = testRenderer.root

  const props = { exchange: {
                    amount: "",
                    currencyFrom: "USD",
                    currencyTo: "ARS",
                    rate: "146.5"
                  }
  }

  expect(testInstance.findByType('p').findByType('i').props.children).toBe('Please complete all fields')
});

it('renders complete all fields message when currencyFrom prop is missing', () => {
  const testRenderer = TestRenderer.create(<Exchange />)
  const testInstance = testRenderer.root

  const props = { exchange: {
                    amount: "100",
                    currencyFrom: "",
                    currencyTo: "ARS",
                    rate: "146.5"
                  }
  }

  expect(testInstance.findByType('p').findByType('i').props.children).toBe('Please complete all fields')
});

it('renders complete all fields message when currencyTo prop is missing', () => {
  const testRenderer = TestRenderer.create(<Exchange />)
  const testInstance = testRenderer.root

  const props = { exchange: {
                    amount: "100",
                    currencyFrom: "USD",
                    currencyTo: "",
                    rate: "146.5"
                  }
  }

  expect(testInstance.findByType('p').findByType('i').props.children).toBe('Please complete all fields')
});

it('renders complete all fields message when rate prop is missing', () => {
  const testRenderer = TestRenderer.create(<Exchange />)
  const testInstance = testRenderer.root

  const props = { exchange: {
                    amount: "100",
                    currencyFrom: "USD",
                    currencyTo: "ARS",
                    rate: ""
                  }
  }

  expect(testInstance.findByType('p').findByType('i').props.children).toBe('Please complete all fields')
});
