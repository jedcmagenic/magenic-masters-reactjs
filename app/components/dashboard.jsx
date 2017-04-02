import React from 'react';
import TaskInProgressList from './task/taskinprogresslist';
import TimerContainer from './timer/timercontainer';
import TimerConfigurationStore from '../stores/timerconfigurationstore.js';
import TaskStore from '../stores/taskstore.js';

export default class Dashboard extends React.Component{
    render(){
        return (
            <div className="container-fluid">
                <div className="col-md-12">
                    <h3>Welcome to your Dashboard!</h3>
                </div>
                <div className="col-md-4">
                    <TimerContainer />
                </div>
                <div className="col-md-8">
                    <TaskInProgressList />
                </div>
            </div>
            )
    }
};
