/******************************************************************************************
 * 
 * Class: main.jsx
 * 
 * Description: 
 * 
 * @see PartnerSummary.jsx, PartnerDetailsContainer.jsx
 * 
 * I18N = TRUE
 * 
 * (c) Sony Computer Entertainment Europe, 2017
 *               
 */

// React and Redux
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import Reducer from '../reducers/reducer';

// Routing
import {Router, Route, browserHistory} from 'react-router';

// Our Components
import PartnerCreate from '../components/PartnerCreate.jsx';
import PartnerDetailsContainer from '../components/PartnerDetailsContainer.jsx';
import PartnerSummary from '../components/PartnerSummary.jsx';

/* Set up our store.  All we need is our current language setting */
let defaultStore = {
  language: {
    id: 0,
    current: 'en'
  }
}

// Initialise our REDUX store
let store = createStore( Reducer, defaultStore );

/**
 * Render our components in our app ID.  We need to wrap it all in the REDUX provider 
 * component.
 */
ReactDOM.render(

    <div>

      <Provider store={store}>
        <Router  history={browserHistory}>
          <Route path="/" component={PartnerSummary}/>
          <Route path="/partnercreate/" component={PartnerCreate}/>
          <Route path="/partnerdetails/:id" component={PartnerDetailsContainer}/>
        </Router>
      </Provider>
      
    </div>, document.getElementById('app')
    
);


