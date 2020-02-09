import React from 'react';
import { render, debug } from '@testing-library/react';
import HomePage from '../containers/HomePage'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore } from 'redux'
import reducer from '../store/reducers'

test('renders text on home page', () => {
    const store = createStore(
        reducer,
        {
            user: {
                id: "AVhIrvyoEIbcggSoUATlLRJQTcq1"
            }
        },
    )

    const { getByText } = render(
        <Provider store={store}>
            <Router>
                <HomePage />
            </Router>
        </Provider>

    );
    const linkElement = getByText(/Save Your Password/i);
    const linkElement2 = getByText(/Test Your Password Might/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement2).toBeInTheDocument();

    // debug()
});