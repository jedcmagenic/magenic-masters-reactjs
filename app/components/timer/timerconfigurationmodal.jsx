
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import TextInputFormControl from '../common/textinputformcontrol';
import NumericInputFormControl from '../common/numericinputformcontrol';

export default class TimerConfigurationModal extends React.Component {
    constructor(){
        super()
        this.state = {
            id: 0,
            name: '',
            pomodoro: 0,
            shortBreak: 0,
            longBreak: 0,
            nameError: '',
            pomodoroError: '',
            shortBreakError: '',
            longBreakError: ''
        }

        this.handleCloseTimerConfigurationModal = this.handleCloseTimerConfigurationModal.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePomodoroMinutesChange = this.handlePomodoroMinutesChange.bind(this);
        this.handleShortBreakMinutesChange = this.handleShortBreakMinutesChange.bind(this);
        this.handleLongBreakMinutesChange = this.handleLongBreakMinutesChange.bind(this);
        this.handleSaveTimerConfiguration = this.handleSaveTimerConfiguration.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            id: nextProps.timerConfiguration.id,
            name: nextProps.timerConfiguration.name,
            pomodoro: nextProps.timerConfiguration.pomodoro,
            shortBreak: nextProps.timerConfiguration.shortBreak,
            longBreak: nextProps.timerConfiguration.longBreak,
            nameError: '',
            pomodoroError: '',
            shortBreakError: '',
            longBreakError: ''
        })
    }
    handleNameChange(event){
        const inputName = event.target.value
        this.setState({name: inputName});
    }

    handlePomodoroMinutesChange(event){
        const minutesValue = event.target.value ? parseInt(event.target.value) : 0;
        this.setState({pomodoro: minutesValue});
    }
    handleShortBreakMinutesChange(event){
        const minutesValue = event.target.value ? parseInt(event.target.value) : 0;
        this.setState({shortBreak: minutesValue});
    }
    handleLongBreakMinutesChange(event){
        const minutesValue = event.target.value ? parseInt(event.target.value) : 0;
        this.setState({longBreak: minutesValue});
    }
    handleSaveTimerConfiguration(){
        let hasErrors = false;
        if(!this.state.name){
            hasErrors = true;
            this.setState({
                nameError: "Please enter a timer configuration name"
            })
        }

        if(hasErrors)
            return;

        const timerConfigurationObj = {
            id: this.state.id,
            name: this.state.name,
            pomodoro: this.state.pomodoro,
            shortBreak: this.state.shortBreak,
            longBreak: this.state.longBreak
        }
        this.setState({
            id: 0,
            name: '',
            pomodoro: 0,
            shortBreak: 0,
            longBreak: 0
        });
        this.props.onSaveTimerConfiguration(timerConfigurationObj);
    }
    handleCloseTimerConfigurationModal(){
        this.props.onCancelClick();
    }
    render(){
        let mode = this.state.id ? 'Edit Timer Configuration': 'Add Timer Configuration';    
        return (
            <Modal show={this.props.show} onHide={this.handleCloseTimerConfigurationModal}>
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>{mode}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <TextInputFormControl name="timerConfigurationName" label="Timer Configuration Name" onChangeEvent={this.handleNameChange} placeholder="Name"
                            value={this.state.name} error={this.state.nameError}/>

                        <NumericInputFormControl name="pomodoro" label="Pomodoro (minutes)" onChangeEvent={this.handlePomodoroMinutesChange} placeholder="0"
                            value={this.state.pomodoro} error={this.state.pomodoroError} maxValue="60"/>
                        
                        <NumericInputFormControl name="shortBreak" label="Short Break (Minutes)" onChangeEvent={this.handleShortBreakMinutesChange} placeholder="0"
                            value={this.state.shortBreak} error={this.state.shortBreakError} maxValue="60"/>
                        
                        <NumericInputFormControl name="longBreak" label="Long Break (Minutes)" onChangeEvent={this.handleLongBreakMinutesChange} placeholder="0"
                            value={this.state.longBreak} error={this.state.longBreakError} maxValue="60"/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.handleSaveTimerConfiguration}>Save</Button>
                    <Button onClick={this.handleCloseTimerConfigurationModal}>Cancel</Button>
                </Modal.Footer>
            </div>
            </Modal>
            )
    }
}
