import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './components/App';
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'
import {BrowserRouter} from 'react-router-dom'
import { setContext } from 'apollo-link-context'
import { AUTH_TOKEN } from './constants'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',

});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    });


ReactDOM.render(
    <BrowserRouter>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
