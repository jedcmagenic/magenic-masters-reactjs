
import React from 'react';
import TaskList from './tasklist';
import TaskModal from'./taskmodal';
import { Button } from 'react-bootstrap';
import toastr from 'toastr';
import TaskActions from '../actions/taskactions.js';
import TaskStore from '../stores/taskstore.js';

export default class TaskContainer extends React.Component{
    constructor(){
        super()
        this.state ={
            tasksData: TaskStore.getAllTasks(),
            showTaskModal: false,
            currentTask: {}
        }

        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleEditTask = this.handleEditTask.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.handleCloseTaskModal = this.handleCloseTaskModal.bind(this);
        this.handleSaveTask = this.handleSaveTask.bind(this);
    }
    handleAddTask(){
        this.setState({
            currentTask: {
                id:0,
                name:'',
                description:'',
                statusId:1,
                priorityId:1
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
        this.setState({
            tasksData: TaskStore.getAllTasks()
        });
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
            tasksData: TaskStore.getAllTasks()
        });
    }
    render(){
        return (
            <div className="container-fluid">
                <div className="col-md-12">
                    <h2>Tasks Masterlist</h2>
                    <div className="panel panel-primary">
                        <div className="panel-heading">Task Master List </div>
                        <div className="panel-body">
                            <TaskList 
                                taskItems={ this.state.tasksData } 
                                onEditTask={this.handleEditTask}
                                onDeleteTask={this.handleDeleteTask}/>
                            <div className="col-md-6 btn-toolbar">
                                <Button bsStyle="primary" onClick={this.handleAddTask}><span className="glyphicon glyphicon-plus"></span> Add Task</Button>
                            </div>
                        </div>
                    </div>
                    <TaskModal 
                        show={this.state.showTaskModal}
                        task={this.state.currentTask}
                        onSaveTask={this.handleSaveTask}
                        onCancelClick={this.handleCloseTaskModal}/>
                </div>
            </div>
        );
    }
};
