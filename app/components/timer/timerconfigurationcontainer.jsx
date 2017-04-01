
import React from 'react';
import TimerConfigurationList from './timerconfigurationlist';
import TimerConfigurationModal from'./timerconfigurationmodal';
import { Button } from 'react-bootstrap';
import toastr from 'toastr';
import TimerConfigurationActions from '../../actions/timerconfigurationactions.js';
import TimerConfigurationStore from '../../stores/timerconfigurationstore.js';

class TimerConfigurationContainer extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            timerConfigurationsData: props.timerConfigurations,
            showTimerConfigurationModal: false,
            currentTimerConfiguration: {}
        }

        this.handleAddTimerConfiguration = this.handleAddTimerConfiguration.bind(this);
        this.handleEditTimerConfiguration = this.handleEditTimerConfiguration.bind(this);
        this.handleDeleteTimerConfiguration = this.handleDeleteTimerConfiguration.bind(this);
        this.handleCloseTimerConfigurationModal = this.handleCloseTimerConfigurationModal.bind(this);
        this.handleSaveTimerConfiguration = this.handleSaveTimerConfiguration.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            timerConfigurationsData: nextProps.timerConfigurations
        });
    }
    handleAddTimerConfiguration(){
        this.setState({
            currentTimerConfiguration: {
                id:0,
                name:'',
                pomodoro:0,
                shortBreak:0,
                longBreak:0,
            },
            showTimerConfigurationModal: true
        });
    }
    handleEditTimerConfiguration(timerConfiguration){
        this.setState({
            currentTimerConfiguration: timerConfiguration,
            showTimerConfigurationModal: true
        });
    }
    handleDeleteTimerConfiguration(id){
        TimerConfigurationActions.deleteTimerConfiguration(id);
        toastr.success("Timer configuration deleted");
    }
    handleCloseTimerConfigurationModal(){
        this.setState({
            showTimerConfigurationModal: false
        });
    }
    handleSaveTimerConfiguration(timerConfiguration){
        if(timerConfiguration.id > 0){
            TimerConfigurationActions.updateTimerConfiguration(timerConfiguration)
        } else {
            TimerConfigurationActions.addTimerConfiguration(timerConfiguration)
        }
        toastr.success("Timer configuration saved");
        this.setState({
            showTimerConfigurationModal:false,
        });
    }
    render(){
        return (
            <div>
                <TimerConfigurationList 
                    timerConfigurationItems={ this.state.timerConfigurationsData } 
                    onEditTimerConfiguration={this.handleEditTimerConfiguration}
                    onDeleteTimerConfiguration={this.handleDeleteTimerConfiguration}/>
                <div className="col-md-6 btn-toolbar">
                    <Button bsStyle="primary" onClick={this.handleAddTimerConfiguration}><span className="glyphicon glyphicon-plus"></span> Add Timer Configuration</Button>
                </div>
                <TimerConfigurationModal 
                    show={this.state.showTimerConfigurationModal}
                    timerConfiguration={this.state.currentTimerConfiguration}
                    onSaveTimerConfiguration={this.handleSaveTimerConfiguration}
                    onCancelClick={this.handleCloseTimerConfigurationModal}/>
            </div>
        );
    }
};

TimerConfigurationContainer.propTypes = {
    timerConfigurations: React.PropTypes.array.isRequired,
}

export default TimerConfigurationContainer;