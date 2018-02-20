import React, { Component } from 'react';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import newStore from './Store/Store';

import Home from './Home/Home';

// Create a history of your choosing (we're using a browser history in this case)
// And
// Build the middleware for intercepting and dispatching navigation actions
const history = createHistory();
const middleware = routerMiddleware(history);
const store = newStore(middleware);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route path="/" component={Home}/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
