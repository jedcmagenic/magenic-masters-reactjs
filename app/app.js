'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Bootstrap = require('bootstrap/dist/css/bootstrap.css');
var Styles = require('../public/css/style.css');
var MasterPage = require('./components/masterpage');
var Dashboard = require('./components/dashboard');
var Body = require('./components/body');
var TaskContainer = require('./components/taskcontainer');

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