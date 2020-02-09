import React from 'react';
import { render, fireEvent, debug } from '@testing-library/react';
import Auth from '../containers/Auth';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom';
import reducer from '../store/reducers'

test('renders text on auth', () => {
    const store = createStore(
        reducer,
        { user: { id: "AVhIrvyoEIbcggSoUATlLRJQTcq1" } },
    )

    const { getByText, container } = render(
        <Provider store={store}>
            <Router>
                <Auth />
            </Router>
        </Provider>
    );


    const text1 = getByText(/Just remember your master password and 'I' remembers the rest./i)
    const text2 = getByText(/Doesn't have any account/i)

    expect(text1).toBeInTheDocument()
    expect(text2).toBeInTheDocument()

    expect(container).not.toBeEmpty();
    debug
});

test('renders button for change form in auth', () => {
    const store = createStore(
        reducer,
        { user: null },
    )

    const { getByText, getByTestId, container } = render(
        <Provider store={store}>
            <Router>
                <Auth />
            </Router>
        </Provider>
    );

    // const changeImage = jest.spyOn(Auth, 'changeImage')

    const text1 = getByText(/Just remember your master password and 'I' remembers the rest./i)
    const text2 = getByText(/Doesn't have any account/i)

    expect(text1).toBeInTheDocument()
    expect(text2).toBeInTheDocument()

    fireEvent.click(getByTestId("change-value-button"))

    expect(getByText(/Already have an account/i)).toBeInTheDocument()
    // expect(text2).not.toBeInTheDocument()

    // expect(changeImage).toHaveBeenCalled()

    expect(container).not.toBeEmpty();
    debug
});