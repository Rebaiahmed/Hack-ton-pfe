import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import DemoFive from './DemoFive';
import Preview from './Preview';
import './App.css';
import dataReducer from './reducers/dataReducer';

import thunk from 'redux-thunk';

import { createStore ,applyMiddleware  } from 'redux';

const store = createStore(dataReducer ,applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <HashRouter>
        <div className="app">
        <Switch>

            <Route exact path="/" component={DemoFive} />
            <Route path="/preview" component={Preview} />
            
</Switch>
        </div>
      </HashRouter>
      </Provider>
    );
  }
}

export default App;
