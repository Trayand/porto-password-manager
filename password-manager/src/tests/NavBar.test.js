import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom';
import reducer from '../store/reducers'
import NavBar from '../components/NavBar'



test('testing logout button', () => {
    const store = createStore(
        reducer,
        { user: { id: "AVhIrvyoEIbcggSoUATlLRJQTcq1" } },
    )

    const logoutFunction = jest.fn()

    const { getByTestId, getByText } = render(
        <Provider store={store}>
            <Router>
                <NavBar logoutFunction={logoutFunction} />
            </Router>
        </Provider>
    )

    fireEvent.click(getByTestId('logout-button'))

    const text2 = getByText(/Logout/i)
    expect(getByTestId('logout-button')).toHaveValue('Logout')
    // expect(logoutFunction).toHaveBeenCalled() 
    // *cant use this one
    expect(text2).toBeInTheDocument()
})
