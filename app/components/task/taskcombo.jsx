import React from 'react';
import toastr from 'toastr';
import SelectFormControl from '../common/selectformcontrol';
import { ButtonGroup, Button } from 'react-bootstrap';
import TaskActions from '../../actions/taskactions';
import TaskStore from '../../stores/taskstore.js';

class TaskCombo extends React.Component {
    constructor (){
        super()
        const tasks = TaskStore.getTasksByStatusId(2);
        this.state={
            tasks: tasks,
            selectedId: (tasks && tasks.length > 0) ? tasks[0].id : 0
        }
        this.handleTaskOptionChange = this.handleTaskOptionChange.bind(this)
        this.handleCompleteTaskClick = this.handleCompleteTaskClick.bind(this)
        this.handleTaskListChange = this.handleTaskListChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }
    handleTaskListChange(){
        const tasks = TaskStore.getTasksByStatusId(2);
        this.setState({
            tasks: tasks,
            selectedId: (tasks && tasks.length > 0) ? tasks[0].id : 0
        });
    }
    handleTaskOptionChange(event){
        const selectedId = parseInt(event.currentTarget.selectedOptions[0].value);
        this.setState({
            selectedId: selectedId
        })
        const task = _.find(this.state.tasks, {id: selectedId});
        this.props.onOptionChange(task);
    }
    handleCompleteTaskClick(){
        TaskActions.completeTask(this.state.selectedId);
        toastr.success("Task marked as Done");
    }
    componentWillMount(){
        TaskStore.addChangeListener(this.handleTaskListChange);
    }
    componentWillUnmount(){
        TaskStore.removeChangeListener(this.handleTaskListChange);
    }
    render (){
        if(this.state.tasks && this.state.tasks.length > 0){
            return (
                <div className="row">
                    <div className="col-md-8">
                        <SelectFormControl name="timerConfiguration" label="Configuration" 
                            options={this.state.tasks} 
                            onChangeEvent={this.handleTaskOptionChange} placeholder="Select Configuration"
                            value={this.state.selectedId} />
                    </div>
                    <div className="col-md-4">
                        <label>&nbsp;</label>
                        <Button bsStyle="primary" onClick={this.handleCompleteTaskClick}>Complete Task</Button>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="row text-center">
                    <div className="col-md-12">
                        No tasks to display 
                    </div>
                </div>)
        }
    }
}

TaskCombo.propTypes = {
    statusIdFilter: React.PropTypes.number,
    priorityIdFilter: React.PropTypes.number
    
};


export default TaskCombo;