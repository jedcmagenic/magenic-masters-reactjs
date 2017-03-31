
import React from 'react';
import TaskList from './tasklist';
import TaskModal from'./taskmodal';
import { Button } from 'react-bootstrap';
import toastr from 'toastr';
import TaskActions from '../../actions/taskactions.js';
import TaskStore from '../../stores/taskstore.js';

class TaskContainer extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            tasksData: props.tasks,
            showTaskModal: false,
            currentTask: {}
        }

        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleEditTask = this.handleEditTask.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.handleCloseTaskModal = this.handleCloseTaskModal.bind(this);
        this.handleSaveTask = this.handleSaveTask.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            tasksData: nextProps.tasks
        });
    }
    handleAddTask(){
        this.setState({
            currentTask: {
                id:0,
                name:'',
                description:'',
                statusId:1,
                priorityId:1,
                hours:0,
                minutes:0
            },
            showTaskModal: true
        });
    }
    handleEditTask(task){
        this.setState({
            currentTask: task,
            showTaskModal: true
        });
    }
    handleDeleteTask(id){
        TaskActions.deleteTask(id);
        toastr.success("Task deleted");
        this.props.onChange();
    }
    handleCloseTaskModal(){
        this.setState({
            showTaskModal: false
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

        this.props.onChange();
    }
    render(){
        return (
            <div>
                <TaskList 
                    taskItems={ this.state.tasksData } 
                    onEditTask={this.handleEditTask}
                    onDeleteTask={this.handleDeleteTask}/>
                <div className="col-md-6 btn-toolbar">
                    <Button bsStyle="primary" onClick={this.handleAddTask}><span className="glyphicon glyphicon-plus"></span> Add Task</Button>
                </div>
                <TaskModal 
                    show={this.state.showTaskModal}
                    task={this.state.currentTask}
                    onSaveTask={this.handleSaveTask}
                    onCancelClick={this.handleCloseTaskModal}/>
            </div>
        );
    }
};

TaskContainer.propTypes = {
    tasks: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired
}

export default TaskContainer;