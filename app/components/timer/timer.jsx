import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

class Timer extends  React.Component{
    constructor(){
        super();
        this.state = {
            minutesRemaining: 0,
            secondsRemaining: 0,
            timerStart: false
        }
        this.tick = this.tick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.handleStartTimer = this.handleStartTimer.bind(this);
        this.handleStopTimer = this.handleStopTimer.bind(this);
        this.handleResetTimer = this.handleResetTimer.bind(this);
    }
    tick() {
        this.setState({secondsRemaining: this.state.secondsRemaining - 1});
        if (!this.state.timerStart || this.state.secondsRemaining <= 0) {
            this.setState({minutesRemaining: this.state.minutesRemaining - 1 })
            if(this.state.minutesRemaining < 0){
                clearInterval(this.interval);
                this.setState({ minutesRemaining: 0});
                this.props.onTimerExpired();
            }
            else
                this.setState({ secondsRemaining: 59});
        }
    }
    componentWillReceiveProps(nextProps) {
        clearInterval(this.interval);
        this.setState({ 
            minutesRemaining: nextProps.setMinutes,
            secondsRemaining: nextProps.setSeconds,
            timerStart: false
         });
    }
    componentDidMount() {
        this.setState({ 
            minutesRemaining: this.props.setMinutes,
            secondsRemaining: this.props.setSeconds 
        });
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    handleStartTimer(){
        if(!this.state.timerStart){
            this.setState({
                timerStart: true
            });
            this.interval = setInterval(this.tick, 1000);
        }
    }
    handleStopTimer(){
        clearTimeout(this.interval)
        if(this.state.timerStart){
            this.setState({
                timerStart: false
            });
        }
    }
    handleResetTimer(){
        clearInterval(this.interval);
        
        this.setState({
            minutesRemaining: this.props.setMinutes,
            secondsRemaining: this.props.setSeconds,
            timerStart: false
        });
    }
    render() {
        return (
        <div className="panel">
            <div className="text-center">
                <h1 className="timer-digits">
                    {("0" + this.state.minutesRemaining).slice(-2)}:{("0" + this.state.secondsRemaining).slice(-2)}
                </h1>
            </div>
            <div className="text-center">
                <ButtonGroup>
                    <Button bsSize="small" bsStyle="success" onClick={this.handleStartTimer}>Start</Button>
                    <Button bsSize="small" bsStyle="danger" onClick={this.handleStopTimer}>Stop</Button>
                    <Button bsSize="small" onClick={this.handleResetTimer}>Reset</Button>
                </ButtonGroup>
            </div>
        </div>
        );
    }
};

Timer.propTypes = {

};


export default Timer;
