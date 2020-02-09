import React from 'react'
import { render, fireEvent, debug } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';
import MainPage from '../containers/MainPage'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../store/reducers'

describe('testing MainPage', () => {

    test('render HomePage', () => {
        const store = createStore(
            reducer,
            { user: { id: "AVhIrvyoEIbcggSoUATlLRJQTcq1" } },
        )
        const { container, getByText } = render(
            <Provider store={store}>
                <Router>
                    <MainPage />
                </Router>
            </Provider>
        )

        const linkElement = getByText(/Save Your Password/i);
        const linkElement2 = getByText(/Test Your Password Might/i);
        expect(linkElement).toBeInTheDocument();
        expect(linkElement2).toBeInTheDocument();

        expect(container).not.toBeEmpty()
        debug
    })

    test('render Auth', () => {
        const store1 = createStore(
            reducer,
            { user: null },
        )

        const { container, getByText } = render(
            <Provider store={store1}>
                <Router>
                    <MainPage />
                </Router>
            </Provider>
        )

        const linkElement = getByText(/Just remember your master password and 'I' remembers the rest./i);
        const linkElement2 = getByText(/See for yourself how easy password management can be./i);
        const linkElement3 = getByText(/Doesn't have any account/i);
        // const linkElement4 = getByText(/Already have an account/i);
        expect(linkElement).toBeInTheDocument();
        expect(linkElement2).toBeInTheDocument();
        expect(linkElement3).toBeInTheDocument();

        // expect(linkElement4).toBeInTheDocument();

        expect(container).not.toBeEmpty()
        debug
    })
})