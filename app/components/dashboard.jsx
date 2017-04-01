import React from 'react';
import TaskContainer from './task/taskcontainer';
import TimerContainer from './timer/timercontainer';
import TimerConfigurationStore from '../stores/timerconfigurationstore.js';
import TaskStore from '../stores/taskstore.js';

export default class Dashboard extends React.Component{
    constructor (){
        super()
        const tasks = TaskStore.getTasksByStatusId(2);
        this.state={
            tasks: tasks,
            timerConfigurations: this.getTimerConfigurations(tasks)
        }
        this.handleTimerConfigurationListChange = this.handleTimerConfigurationListChange.bind(this);
        this.handleTaskListChange = this.handleTaskListChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }
    getTimerConfigurations(tasks){
        const timerConfigurations = tasks && tasks.length > 0 ? 
                TimerConfigurationStore.getTimerConfigurationsForTasks(tasks) : [TimerConfigurationStore.getTimerConfigurationById(1)];
        return timerConfigurations;
    }
    handleTimerConfigurationListChange(){
        this.setState({
            timerConfigurations: this.getTimerConfigurations(this.state.tasks)
        });
    }
    handleTaskListChange(){
        const tasks = TaskStore.getTasksByStatusId(2);
        this.setState({
            tasks: tasks,
            timerConfigurations: this.getTimerConfigurations(tasks)
        });
    }
    componentWillMount(){
        TaskStore.addChangeListener(this.handleTaskListChange);
        TimerConfigurationStore.addChangeListener(this.handleTimerConfigurationListChange);
    }
    componentWillUnmount(){
        TaskStore.removeChangeListener(this.handleTaskListChange);
        TimerConfigurationStore.removeChangeListener(this.handleTimerConfigurationListChange);
    }
    render(){
        return (
            <div className="container-fluid">
                <div className="col-md-12">
                    <h3>Welcome to your Dashboard!</h3>
                </div>
                <div className="col-md-4"><TimerContainer timerConfigurationOptions={this.state.timerConfigurations}  /></div>
                <div className="col-md-8">
                    <TaskContainer 
                        title="Outstanding Tasks"
                        tasks={this.state.tasks} />
                    </div>
            </div>
            )
    }
};
