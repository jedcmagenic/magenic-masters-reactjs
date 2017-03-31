import React from 'react';
import Timer from './timer';
import TimerMode from '../../constants/timermodes';
import toastr from 'toastr';

import { ButtonGroup, Button } from 'react-bootstrap';

class TimerContainer extends React.Component {
    constructor (){
        super()
        this.state={
            setMinutes: 25,
            setSeconds: 0,
            timerMode: TimerMode.POMODORO
        }
        this.handlePomodoroClick = this.handlePomodoroClick.bind(this)
        this.handleShortBreakClick = this.handleShortBreakClick.bind(this)
        this.handleLongBreakClick = this.handleLongBreakClick.bind(this)
    }
    handlePomodoroClick(){
        this.setState({
            setMinutes: 25,
            setSeconds: 0,
            timerMode: TimerMode.POMODORO
        });
    }
    handleShortBreakClick(){
        this.setState({
            setMinutes: 1,
            setSeconds: 0,
            timerMode: TimerMode.SHORT_BREAK
            
        });
    }
    handleLongBreakClick(){
        this.setState({
            setMinutes: 15,
            setSeconds: 0,
            timerMode: TimerMode.LONG_BREAK
            
        });
    }
    handleTimerExpired(){
        toastr.info("Time's up!");
    }
    render (){
        return (
            <div className=" panel panel-primary">
                <div className="panel-heading">Pomodoro Timer </div>
                <div className="panel-body text-center">
                <ButtonGroup>
                    <Button onClick={this.handlePomodoroClick} className={(this.state.timerMode == TimerMode.POMODORO ? 'active': '')}>Pomodoro</Button>
                    <Button onClick={this.handleShortBreakClick} className={(this.state.timerMode == TimerMode.SHORT_BREAK ? 'active': '')}>Short Break</Button>
                    <Button onClick={this.handleLongBreakClick} className={(this.state.timerMode == TimerMode.LONG_BREAK ? 'active': '')}>Long Break</Button>
                </ButtonGroup>
                <Timer setMinutes={this.state.setMinutes} 
                        setSeconds={this.state.setSeconds}
                        onTimerExpired={this.handleTimerExpired}/>
                </div>
            </div>
        );
    }
}

TimerContainer.propTypes = {
    
};


export default TimerContainer;