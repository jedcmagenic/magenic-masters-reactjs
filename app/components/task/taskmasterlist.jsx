import React from 'react';
import TaskContainer from './taskcontainer';
import TaskStore from '../../stores/taskstore';

export default class TaskMasterList extends React.Component {
    constructor (){
        super()
        this.state={
            tasks: TaskStore.getAllTasks()
        }
        this.handleTaskListChange = this.handleTaskListChange.bind(this);
    }
    handleTaskListChange(){
        this.setState({
            tasks: TaskStore.getAllTasks()
        });
    }
    render (){
        return (
            <div className="container-fluid">
                <div className="col-md-12">
                    <h2>Tasks Masterlist</h2>
                    <div className="panel panel-primary">
                        <div className="panel-heading">All Tasks </div>
                        <div className="panel-body">
                            <TaskContainer 
                                tasks={this.state.tasks}
                                onChange={this.handleTaskListChange} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
