import React from 'react';
import ReactDOM from 'react-dom';
import {
    Switch,
    Route,
} from "react-router-dom";

import { HashRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import Done from './pages/Done';
import * as serviceWorker from './serviceWorker';

/* Apollo dependencies */
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
//import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import '@ionic/react/css/core.css';

/* Theme variables */
import './theme/variables.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

export const link = new HttpLink({ uri: 'http://164.90.166.95:4000/' });


export const client = new ApolloClient({
  //uri: 'http://164.90.166.95:4000',
    link,
  cache: new InMemoryCache(),
    onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});



ReactDOM.render(
    <HashRouter>
            <Switch>

	<ApolloProvider client={client}>
<Route exact path="/:client/" component={App}/>
<Route exact path="/:client/done" component={Done}/>

	</ApolloProvider>
    </Switch>
    </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();