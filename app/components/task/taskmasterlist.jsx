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
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }
    handleTaskListChange(){
        this.setState({
            tasks: TaskStore.getAllTasks()
        });
    }
    componentWillMount(){
        TaskStore.addChangeListener(this.handleTaskListChange);
    }
    componentWillUnmount(){
        TaskStore.removeChangeListener(this.handleTaskListChange);
    }
    render (){
        return (
            <div className="container-fluid">
                <div className="col-md-12">
                    <h3>Task Management</h3>
                </div>
                <div className="col-md-12"><TaskContainer
                    title="Tasks Masterlist"
                    tasks={this.state.tasks} />
                </div>
            </div>
        );
    }
}
