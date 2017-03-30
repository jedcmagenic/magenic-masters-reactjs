
import React from 'react';
import { Link } from 'react-router'
import { OverlayTrigger, Button, Popover  } from 'react-bootstrap';
import PriorityTasks from './prioritytasks';

export default class Header extends React.Component{
    constructor(){
        super()
    }
    handleShowPriorityTasks(){

    }
    render(){
        const prioritiesPopOver = (
            <Popover id="popover-positioned-left" title="Utmost Priority">
                <PriorityTasks />
            </Popover>
        );
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
                            <ul className="nav navbar-nav pull-right">
                                <li>
                                    <OverlayTrigger trigger="click" placement="bottom" overlay={prioritiesPopOver} rootClose="true">
                                        <Link onClick={this.handleShowPriorityTasks}>Priority Tasks</Link>
                                    </OverlayTrigger>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            )
    }
};
