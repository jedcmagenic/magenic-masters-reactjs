import React from 'react';
import TimerConfigurationContainer from './timerconfigurationcontainer';
import TimerContainer from './timercontainer';
import TimerConfigurationStore from '../../stores/timerconfigurationstore.js';

export default class TimerManagement extends React.Component{
    constructor (){
        super()
        this.state={
            timerConfigurations: TimerConfigurationStore.getAllTimerConfigurations()
        }
        this.handleTimerConfigurationListChange = this.handleTimerConfigurationListChange.bind(this);
    }
    handleTimerConfigurationListChange(){
        this.setState({
            timerConfigurations: TimerConfigurationStore.getAllTimerConfigurations()
        });
    }
    componentWillMount(){
        TimerConfigurationStore.addChangeListener(this.handleTimerConfigurationListChange);
    }
    componentWillUnmount(){
        TimerConfigurationStore.removeChangeListener(this.handleTimerConfigurationListChange);
    }
    render(){
        return (
            <div className="container-fluid">
                <div className="col-md-12">
                    <h3>Timer Configuration Management</h3>
                </div>
                <div className="col-md-4">
                    <TimerContainer
                        timerConfigurationOptions={this.state.timerConfigurations} 
                        />
                </div>
                <div className="col-md-8">
                    <div className="panel panel-primary">
                        <div className="panel-heading">All Timer Configurations </div>
                        <div className="panel-body">
                            <TimerConfigurationContainer 
                                timerConfigurations={this.state.timerConfigurations} />
                        </div>
                    </div>
                </div>
            </div>
            )
    }
};