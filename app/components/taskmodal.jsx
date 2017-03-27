
import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class TaskModal extends React.Component {
    constructor(){
        super()
        this.state = {
            id: 0,
            name: '',
            description: '',
            priorityId: 1,
            statusId: 1
        }
        this.handleCloseAddTaskModal = this.handleCloseAddTaskModal.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleSaveTask = this.handleSaveTask.bind(this);
    }
    componentWillMount(){
        console.log("taskModal: componentWillMount");
        
    }
    handleNameChange(event){
        const inputName = event.target.value
        this.setState({name: inputName});
    }
    handleDescriptionChange(event){
        const inputDescription = event.target.value
        this.setState({description: inputDescription});
    }
    handlePriorityChange(event){
        const selectedPriorityId = parseInt(event.currentTarget.selectedOptions[0].value);
        this.setState({priorityId: selectedPriorityId});
    }
    handleStatusChange(event){
        const selectedStatusId = parseInt(event.currentTarget.selectedOptions[0].value);
        this.setState({statusId: selectedStatusId});
    }
    handleSaveTask(){
        const taskObj = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            priorityId: this.state.priorityId,
            statusId: this.state.statusId,
        }
        this.props.onSaveTask(taskObj);
    }
    handleCloseAddTaskModal(){
        this.props.onCancelClick();
    }
    render(){
        console.log("taskModal: render");
        
        return (
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup controlId="txtTaskName">
                        <ControlLabel>Task name</ControlLabel>
                        <FormControl type="text" value={this.state.name} onChange={this.handleNameChange}/>
                        </FormGroup>

                        <FormGroup controlId="txtTaskDescription">
                        <ControlLabel>Task description</ControlLabel>
                        <FormControl type="text" value={this.state.description} onChange={this.handleDescriptionChange}/>
                        </FormGroup>

                        <FormGroup controlId="selPriority">
                        <ControlLabel>Priority</ControlLabel>
                        <FormControl componentClass="select" value={this.state.priorityId} onChange={this.handlePriorityChange}>
                            <option value="1">Low</option>
                            <option value="2">Medium</option>
                            <option value="3">High</option>
                        </FormControl>
                        </FormGroup>

                        <FormGroup controlId="selStatus">
                        <ControlLabel>Status</ControlLabel>
                        <FormControl componentClass="select" value={this.state.statusId} onChange={this.handleStatusChange}>
                            <option value="1">To do</option>
                            <option value="2">In Progress</option>
                            <option value="3">Done</option>
                        </FormControl>
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.handleSaveTask}>Save</Button>
                    <Button onClick={this.handleCloseAddTaskModal}>Cancel</Button>
                </Modal.Footer>
            </div>
            )
    }
}
