
import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Styles from '../public/css/style.css';
import MasterPage from './components/masterpage';
import Dashboard from './components/dashboard';
import Body from './components/body';
import TaskContainer from './components/taskcontainer';
import ToastrScss from 'toastr/build/toastr.css'
import { Router, Route, hashHistory } from 'react-router'

ReactDOM.render(
        <Router history={hashHistory}>
            <Route component={MasterPage}>
                <Route path="/" component={Dashboard} />
                <Route path="/taskList" component={TaskContainer}/>
                <Route path="/kanban" component={Body}/>
            </Route>
        </Router>
    , document.getElementById('root')
);