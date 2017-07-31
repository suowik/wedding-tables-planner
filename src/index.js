import React, {Component} from 'react';
import auth from './auth/auth.js';

import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Router, Route, hashHistory, IndexRoute} from 'react-router'


import Login from './auth/Login.js'
import Logout from './auth/Logout.js'
import Layout from './Layout.js'
import Register from './Register.js'

import TablesPlanner from './planner/TablesPlanner.js';


function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({
            pathname: '/login',
            state: {nextPathname: nextState.location.pathname}
        })
    }
}


class Routes extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Layout} onEnter={requireAuth}>
                    <IndexRoute component={TablesPlanner}/>
                </Route>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/logout" component={Logout}/>
            </Router>
        )
    }
}


ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
