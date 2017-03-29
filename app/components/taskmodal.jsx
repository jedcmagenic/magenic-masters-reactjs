
import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import InputFormControl from './common/inputformcontrol';
import SelectFormControl from './common/selectformcontrol';

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
        this.handleCloseTaskModal = this.handleCloseTaskModal.bind(this);
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
    handleCloseTaskModal(){
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
                        <InputFormControl name="taskName" label="Task Name" onChangeEvent={this.handleNameChange} placeholder="Name"
                            value={this.state.name} />

                        <InputFormControl name="taskDescription" label="Task Description" onChangeEvent={this.handleDescriptionChange} placeholder="Description"
                            value={this.state.description} />

                        <SelectFormControl name="taskPriority" label="Task Priority" 
                            options={[{id: "1", name: 'Low'}
                                    , {id: "2", name: 'Medium'}
                                    , {id: "3", name: 'High'}]} 
                            onChangeEvent={this.handlePriorityChange} placeholder="Select Priority"
                            value={this.state.priorityId} />

                        <SelectFormControl name="taskStatus" label="Task Status" 
                            options={[{id: "1", name: 'To Do'}
                                    , {id: "2", name: 'In Progress'}
                                    , {id: "3", name: 'Done'}]} 
                            onChangeEvent={this.handleStatusChange} placeholder="Select Status"
                            value={this.state.statusId} />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.handleSaveTask}>Save</Button>
                    <Button onClick={this.handleCloseTaskModal}>Cancel</Button>
                </Modal.Footer>
            </div>
            )
    }
}
