import React from 'react';
import TaskContainer from './taskcontainer';
import TaskStore from '../../stores/taskstore';

export default class TaskInProgress extends React.Component {
    constructor (){
        super()
        this.state={
            tasks: TaskStore.getTasksByStatusId(2)
        }
        this.handleTaskListChange = this.handleTaskListChange.bind(this);
    }
    handleTaskListChange(){
        this.setState({
            tasks: TaskStore.getTasksByStatusId(2)
        });
    }
    render (){
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">Outstanding Tasks </div>
                <div className="panel-body">
                    <TaskContainer 
                        tasks={this.state.tasks}
                        onChange={this.handleTaskListChange} />
                </div>
            </div>
        );
    }
}
