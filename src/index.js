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
//import { ApolloClient, HttpLink } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
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

//const link = new HttpLink({ uri: 'http://164.90.166.95:4000/graphql' });
//const link = createHttpLink({
//    uri: 'http://164.90.166.95:4000/graphql',
//  credentials: 'include',
//    fetch: fetch,
//
//});


const client = new ApolloClient({
    //link: 'http://164.90.166.95:4000/graphql',
    link: new HttpLink({ uri: 'https://apollo.simulacron-3.com/graphql' }),
    //link: new HttpLink({ uri: '//apollo.simulacron-3.com/graphql' }),
    //link: new HttpLink({ uri: 'https://apollo.simulacron-3.com:4000/graphql' }),
    cache: new InMemoryCache(),
    credentials: 'include',
   //link, 
    //link: createHttpLink({ uri: 'http://164.90.166.95:4000/' }),
    //opts: {
	//			mode: "no-cors",
	//		},
    onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});


//const client = new ApolloClient({
//  link: ApolloLink.from([
//    onError(({ graphQLErrors, networkError }) => {
//      if (graphQLErrors)
//        graphQLErrors.forEach(({ message, locations, path }) =>
//          console.log(
//            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
//          ),
//        );
//      if (networkError) console.log(`[Network error]: ${networkError}`);
//    }),
//    new HttpLink({
//      uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
//      credentials: 'same-origin'
//    })
//  ]),
//  cache: new InMemoryCache()
//});



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
