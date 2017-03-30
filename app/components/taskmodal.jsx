
import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import TextInputFormControl from './common/textinputformcontrol';
import NumericInputFormControl from './common/numericinputformcontrol';
import SelectFormControl from './common/selectformcontrol';

export default class TaskModal extends React.Component {
    constructor(){
        super()
        this.state = {
            id: 0,
            name: '',
            description: '',
            priorityId: 1,
            statusId: 1,
            hours: 0,
            minutes: 0,
            nameError: '',
            descriptionError: ''
        }

        this.handleCloseTaskModal = this.handleCloseTaskModal.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDurationHoursChange = this.handleDurationHoursChange.bind(this);
        this.handleDurationMinutesChange = this.handleDurationMinutesChange.bind(this);
        this.handleSaveTask = this.handleSaveTask.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            id: nextProps.task.id,
            name: nextProps.task.name,
            description: nextProps.task.description,
            priorityId: nextProps.task.priorityId,
            statusId: nextProps.task.statusId,
            hours: nextProps.task.hours,
            minutes: nextProps.task.minutes,
            nameError: '',
            descriptionError: ''
        })
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
    handleDurationHoursChange(event){
        const hoursValue = parseInt(event.target.value);
        this.setState({hours: hoursValue});
    }
    handleDurationMinutesChange(event){
        const minutesValue = parseInt(event.target.value);
        this.setState({minutes: minutesValue});
    }
    handleSaveTask(){
        let hasErrors = false;
        if(!this.state.name){
            hasErrors = true;
            this.setState({
                nameError: "Please enter a task name"
            })
        }
        if(this.state.description && this.state.description.length < 3){
            hasErrors = true;
            this.setState({
                descriptionError: "Description must be more than 3 characters"
            })
        }

        if(hasErrors)
            return;

        const taskObj = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            priorityId: this.state.priorityId,
            statusId: this.state.statusId,
            hours: parseInt(this.state.hours),
            minutes: parseInt(this.state.minutes)
        }

        this.setState({
            id: 0,
            name: '',
            description: '',
            priorityId: 1,
            statusId: 1
        });
        this.props.onSaveTask(taskObj);
    }
    handleCloseTaskModal(){
        this.props.onCancelClick();
    }
    render(){
        let mode = this.state.id ? 'Edit Task': 'Add Task';    
        return (
            <Modal show={this.props.show} onHide={this.handleCloseTaskModal}>
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>{mode}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <TextInputFormControl name="taskName" label="Task Name" onChangeEvent={this.handleNameChange} placeholder="Name"
                            value={this.state.name} error={this.state.nameError}/>

                        <TextInputFormControl name="taskDescription" label="Task Description" onChangeEvent={this.handleDescriptionChange} placeholder="Description"
                            value={this.state.description} error={this.state.descriptionError}/>

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
                        <NumericInputFormControl name="durationHours" label="Duration(Hours)" onChangeEvent={this.handleDurationHoursChange} placeholder="0"
                            value={this.state.hours} error={this.state.descriptionError} />
                        
                        <NumericInputFormControl name="durationMinutes" label="Duration(Minutes)" onChangeEvent={this.handleDurationMinutesChange} placeholder="0"
                            value={this.state.minutes} error={this.state.descriptionError} maxValue="60"/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.handleSaveTask}>Save</Button>
                    <Button onClick={this.handleCloseTaskModal}>Cancel</Button>
                </Modal.Footer>
            </div>
            </Modal>
            )
    }
}
