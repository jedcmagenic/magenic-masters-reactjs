
import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Styles from '../public/css/style.css';
import MasterPage from './components/masterpage';
import Dashboard from './components/dashboard';
import Body from './components/body';
import TaskMasterList from './components/task/taskmasterlist';
import ToastrScss from 'toastr/build/toastr.css'
import { Router, Route, hashHistory } from 'react-router'
import InitializeActions from './actions/initializeactions';
import TimerManagement from './components//timer/timermanagement';

InitializeActions.initApp();

ReactDOM.render(
        <Router history={hashHistory}>
            <Route component={MasterPage}>
                <Route path="/" component={Dashboard} />
                <Route path="/taskList" component={TaskMasterList}/>
                <Route path="/timerManagement" component={TimerManagement}/>
            </Route>
        </Router>
    , document.getElementById('root')
);