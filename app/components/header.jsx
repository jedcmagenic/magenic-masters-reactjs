
import React from 'react';
import { Link } from 'react-router'
import { OverlayTrigger, Button, Popover, DropdownButton, MenuItem, Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';
import PriorityTasks from './task/prioritytasks';
import TaskActions from '../actions/taskactions.js';
import toastr from 'toastr';
import TaskModal from'./task/taskmodal';
import { LinkContainer } from 'react-router-bootstrap';

export default class Header extends React.Component{
    constructor(){
        super()
        this.state={
            showTaskModal: false,
            currentTask: {
                id:0,
                name:'',
                description:'',
                statusId:1,
                priorityId:1,
                hours:0,
                minutes:0,
                seconds: 0
            },
        }
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleSaveTask = this.handleSaveTask.bind(this);
        this.handleCloseTaskModal = this.handleCloseTaskModal.bind(this);
    }
    handleAddTask(){
        this.setState({
            showTaskModal: true,
            currentTask: {
                id:0,
                name:'',
                description:'',
                statusId:1,
                priorityId:1,
                hours:0,
                minutes:0,
                seconds: 0
            },
        });
    }
    handleSaveTask(task){
        if(task.id > 0){
            TaskActions.updateTask(task)
        } else {
            TaskActions.addTask(task)
        }
        toastr.success("Task saved");
        this.setState({
            showTaskModal:false,
        });
    }
    handleCloseTaskModal(){
        this.setState({
            showTaskModal:false,
        });
    }
    render(){
        const prioritiesPopOver = (
            <Popover id="popover-positioned-left" title="Utmost Priority">
                <PriorityTasks />
            </Popover>
        );
        return (
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">{this.props.text}</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/timerManagement">
                            <NavItem eventKey={1} href="#">Timer Management</NavItem>
                        </LinkContainer>
                        <NavDropdown eventKey={2} title="Task Management" id="basic-nav-dropdown">
                            <LinkContainer to="/taskList">
                                <MenuItem eventKey={2.1}>Tasks</MenuItem>
                            </LinkContainer>
                            <MenuItem eventKey={2.2} onClick={this.handleAddTask}>Add Task</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <OverlayTrigger trigger="click" placement="bottom" overlay={prioritiesPopOver} rootClose={false}>
                            <NavItem eventKey={1} onClick={this.handleShowPriorityTasks}>Priority Tasks</NavItem>
                        </OverlayTrigger>
                    </Nav>
                    </Navbar.Collapse>
                    <TaskModal 
                    show={this.state.showTaskModal}
                    task={this.state.currentTask}
                    onSaveTask={this.handleSaveTask}
                    onCancelClick={this.handleCloseTaskModal}/>
                </Navbar>
            )
    }
};
