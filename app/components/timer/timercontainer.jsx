import React from 'react';
import Timer from './timer';
import TaskCombo from '../task/taskcombo';
import TimerMode from '../../constants/timermodes';
import toastr from 'toastr';
import SelectFormControl from '../common/selectformcontrol';
import { ButtonGroup, Button } from 'react-bootstrap';
import TimerConfigurationStore from '../../stores/timerconfigurationstore.js';
import TaskActions from '../../actions/taskactions';

class TimerContainer extends React.Component {
    constructor (props){
        super(props)
        const timerConfigurationId = props.timerConfigurationOptions[0] ? props.timerConfigurationOptions[0].id : 1;
        
        const timerConfiguration = TimerConfigurationStore.getTimerConfigurationById(timerConfigurationId);
        this.state={
            setMinutes: timerConfiguration ? timerConfiguration.pomodoro : 25,
            setSeconds: 0,
            timerMode: TimerMode.POMODORO,
            timerStarted: false,
            timerConfigurationOptions: props.timerConfigurationOptions,
            selectedTimerConfigurationOption: timerConfiguration ? timerConfiguration.id: 0,
            pomodoroMinutes: timerConfiguration ? timerConfiguration.pomodoro : 25,
            shortBreakMinutes: timerConfiguration ? timerConfiguration.shortBreak : 5,
            longBreakMinutes: timerConfiguration ? timerConfiguration.longBreak : 15
        }
        this.handlePomodoroClick = this.handlePomodoroClick.bind(this)
        this.handleShortBreakClick = this.handleShortBreakClick.bind(this)
        this.handleLongBreakClick = this.handleLongBreakClick.bind(this)
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
        this.handleTimerConfigurationOptionChange = this.handleTimerConfigurationOptionChange.bind(this)
        this.handleTimerStop = this.handleTimerStop.bind(this)
        this.handleTimerStart = this.handleTimerStart.bind(this)
    }
    componentWillReceiveProps(nextProps){
        if(this.state.selectedTimerConfigurationOption == 1 
                && nextProps.timerConfigurationOptions.length == 1){
            const config = nextProps.timerConfigurationOptions[0]
            this.setState({
                setMinutes: config.pomodoro,
                setSeconds: 0,
                timerMode: TimerMode.POMODORO,
                timerConfigurationOptions: nextProps.timerConfigurationOptions,
                selectedTimerConfigurationOption: config.id,
                pomodoroMinutes: config.pomodoro,
                shortBreakMinutes: config.shortBreak,
                longBreakMinutes: config.longBreak
            });
        }
        else{
            this.setState({
                timerConfigurationOptions: nextProps.timerConfigurationOptions,
                selectedTimerConfigurationOption: nextProps.timerConfigurationOptions[0].id
            });
        }
        
    }
    handlePomodoroClick(){
        this.setState({
            setMinutes: this.state.pomodoroMinutes,
            setSeconds: 0,
            timerMode: TimerMode.POMODORO
        });
    }
    handleShortBreakClick(){
        this.setState({
            setMinutes: this.state.shortBreakMinutes,
            setSeconds: 0,
            timerMode: TimerMode.SHORT_BREAK
            
        });
    }
    handleLongBreakClick(){
        this.setState({
            setMinutes: this.state.longBreakMinutes,
            setSeconds: 0,
            timerMode: TimerMode.LONG_BREAK
            
        });
    }
    handleTimerExpired(){
        toastr.info("Time's up!");
    }
    handleTimerStart(){
        this.setState({
            timerStarted: true
        })
    }
    handleTimerStop(totalElapsedSeconds){
        if(this.state.timerMode != TimerMode.LONG_BREAK){
            TaskActions.logTaskDuration(this.state.selectedTimerConfigurationOption, totalElapsedSeconds);
        }
    }
    handleTimerConfigurationOptionChange(task){
        const timerConfiguration = TimerConfigurationStore.getTimerConfigurationById(task.timerConfigurationId);
        this.setState({
            pomodoroMinutes: timerConfiguration.pomodoro,
            shortBreakMinutes: timerConfiguration.shortBreak,
            longBreakMinutes: timerConfiguration.longBreak,
            selectedTimerConfigurationOption: selectedId
        });

        switch (this.state.timerMode) {
            case TimerMode.POMODORO:
                this.setState({ setMinutes: timerConfiguration.pomodoro});
                break;
            case TimerMode.SHORT_BREAK:
                this.setState({ setMinutes: timerConfiguration.shortBreak});
                break;
            case TimerMode.LONG_BREAK:
                this.setState({ setMinutes: timerConfiguration.longBreak});
                break;
            default:
                this.handlePomodoroClick();
                break;
        }
    }
    render (){
        return (
            <div className=" panel panel-primary">
                <div className="panel-heading">Pomodoro Timer </div>
                <div className="panel-body">
                    <TaskCombo onOptionChange={this.handleTimerConfigurationOptionChange} />
                    <div className="text-center">
                        <ButtonGroup>
                            <Button onClick={this.handlePomodoroClick} className={(this.state.timerMode == TimerMode.POMODORO ? 'active': '')}>Pomodoro</Button>
                            <Button onClick={this.handleShortBreakClick} className={(this.state.timerMode == TimerMode.SHORT_BREAK ? 'active': '')}>Short Break</Button>
                            <Button onClick={this.handleLongBreakClick} className={(this.state.timerMode == TimerMode.LONG_BREAK ? 'active': '')}>Long Break</Button>
                        </ButtonGroup>
                    </div>
                    <div className="text-center">
                        <Timer setMinutes={this.state.setMinutes} 
                            setSeconds={this.state.setSeconds}
                            onTimerExpired={this.handleTimerExpired}
                            onTimerStart={this.handleTimerStart}
                            onTimerStop={this.handleTimerStop}/>
                    </div>
                </div>
            </div>
        );
    }
}

TimerContainer.propTypes = {
    timerConfigurationOptions: React.PropTypes.array
};


export default TimerContainer;