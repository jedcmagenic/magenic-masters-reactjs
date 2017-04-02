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
    constructor (){
        super()
        
        this.state={
            setMinutes:  25,
            setSeconds: 0,
            timerMode: TimerMode.POMODORO,
            timerStarted: false,
            pomodoroMinutes: 25,
            shortBreakMinutes: 5,
            longBreakMinutes: 15,
            selectedTaskId: 0
        }
        this.handlePomodoroClick = this.handlePomodoroClick.bind(this);
        this.handleShortBreakClick = this.handleShortBreakClick.bind(this);
        this.handleLongBreakClick = this.handleLongBreakClick.bind(this);
        this.handleTimerStop = this.handleTimerStop.bind(this);
        this.handleTimerStart = this.handleTimerStart.bind(this);
        this.handleTaskComboOptionChange = this.handleTaskComboOptionChange.bind(this);
        this.handleTaskComboLoad = this.handleTaskComboLoad.bind(this);
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
        
    }
    handleTimerStop(totalElapsedSeconds){
        if(this.state.timerMode != TimerMode.LONG_BREAK){
            TaskActions.logTaskDuration(this.state.selectedTaskId, totalElapsedSeconds);
        }
    }
    handleTaskComboOptionChange(task){
        if(task){
            const timerConfiguration = TimerConfigurationStore.getTimerConfigurationById(task.timerConfigurationId);
            this.setState({
                pomodoroMinutes: timerConfiguration.pomodoro,
                shortBreakMinutes: timerConfiguration.shortBreak,
                longBreakMinutes: timerConfiguration.longBreak,
                selectedTaskId: task.id
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
        }else{
            switch (this.state.timerMode) {
                case TimerMode.POMODORO:
                    this.setState({ setMinutes: 25});
                    break;
                case TimerMode.SHORT_BREAK:
                    this.setState({ setMinutes: 5});
                    break;
                case TimerMode.LONG_BREAK:
                    this.setState({ setMinutes: 15});
                    break;
                default:
                    this.handlePomodoroClick();
                    break;
            }
        }


    }
    handleTaskComboLoad(selectedTask){
        this.handleTaskComboOptionChange(selectedTask);
    }
    render (){
        return (
            <div className=" panel panel-primary">
                <div className="panel-heading">Pomodoro Timer </div>
                <div className="panel-body">
                    <TaskCombo 
                        onOptionChange={this.handleTaskComboOptionChange}
                        onOptionsLoad={this.handleTaskComboLoad}
                        />
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
};


export default TimerContainer;