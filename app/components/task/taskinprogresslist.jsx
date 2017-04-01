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
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }
    handleTaskListChange(){
        this.setState({
            tasks: TaskStore.getTasksByStatusId(2)
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
            <TaskContainer 
                title="Outstanding Tasks"
                tasks={this.state.tasks} />
        );
    }
}
