import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import FormForLogin from '../components/LoginRegisterForm'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom';
import reducer from '../store/reducers'

const setup = () => {
    const store = createStore(
        reducer,
        { user: { id: "AVhIrvyoEIbcggSoUATlLRJQTcq1" } },
    )

    const utils = render(
        <Provider store={store}>
            <Router>
                <FormForLogin />
            </Router>
        </Provider>)
    const input = utils.getByTestId('test-input-email')
    return {
        input,
        ...utils,
    }
}

test('It should have value test@mail.com', () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: 'test@mail.com' } })
    expect(input.value).toBe('test@mail.com')
})

test('It should have not equel test@mail.com when inputed by tray@mail.com', () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: 'tray@mail.com' } })
    expect(input.value).not.toBe('test@mail.com')
})

test('testing console log event', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    // console.log('hello');

    expect(consoleSpy).toHaveBeenCalledWith('hello');
})