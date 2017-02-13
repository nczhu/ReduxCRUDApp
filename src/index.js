import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// browser history: whenenver url updates, Router will interpret everything AFTER the protocol
// www.blog.com/[posts/5]
// hashHistory: .../#post/5
// memoryHistory
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import reducers from './reducers';

import promise from 'redux-promise';


const createStoreWithMiddleware = applyMiddleware(
	promise
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container'));
