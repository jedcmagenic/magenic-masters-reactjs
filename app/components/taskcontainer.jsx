
import React from 'react';
import TaskList from './tasklist';
import TaskApi from '../api/tasks-api.js';

const api = new TaskApi();

export default class TaskContainer extends React.Component{
    constructor(){
        super()
        this.state ={
            tasksData: JSON.parse(api.getItems()),
        }

        this.handleUpdateTaskRepo = this.handleUpdateTaskRepo.bind(this);
    }

    handleUpdateTaskRepo(taskItems){
        api.setItems(taskItems);
    }
    componentWillUnmount(){
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
                                onSaveChanges={this.handleUpdateTaskRepo}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
