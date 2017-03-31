import React from 'react';
import TaskInProgressList from './task/taskinprogresslist';
import TimerContainer from './timer/timercontainer';

export default class Dashboard extends React.PureComponent{
    render(){
        return (
            <div className="container-fluid">
                <div className="col-md-12">
                    <h3>Welcome to your Dashboard!</h3>
                </div>
                <div className="col-md-4"><TimerContainer /></div>
                <div className="col-md-8"><TaskInProgressList /></div>
            </div>
            )
    }
};
