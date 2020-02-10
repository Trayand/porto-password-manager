import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom';
import reducer from '../store/reducers'
import Strength from '../components/Strength'



test('testing logout button', () => {
    const store = createStore(
        reducer,
        { user: { id: "AVhIrvyoEIbcggSoUATlLRJQTcq1" } },
    )

    const password = 'Se$34a'

    const { getByText } = render(
        <Provider store={store}>
            <Router>
                <Strength password={password} />
            </Router>
        </Provider>
    )

    const text2 = getByText(/Password setidaknya harus memiliki satu karakter huruf special./i)
    expect(text2).toBeInTheDocument()
})
