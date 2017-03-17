'use strict'

var React = require('react');
import { Link } from 'react-router'

var Header = new React.createClass({
    render: function(){
        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                        <a className="navbar-brand" href="#">{this.props.text}</a>
                        
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li><Link to="/taskList">Tasks</Link></li>
                                <li><Link to="/kanban">Kanban</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            )
    }
});

module.exports = Header;