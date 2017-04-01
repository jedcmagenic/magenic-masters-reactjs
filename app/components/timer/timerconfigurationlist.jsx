
import React from 'react';
import TimerConfigurationItem from './timerconfiguration'
class TimerConfigurationList extends React.Component {
    constructor(){
        super()

        this.renderItems = this.renderItems.bind(this);
        this.handleTimerConfigurationDelete = this.handleTimerConfigurationDelete.bind(this);
        this.handleTimerConfigurationEdit = this.handleTimerConfigurationEdit.bind(this);
    }
    
    renderItems () {
        if(this.props.timerConfigurationItems.length > 0){
            return this.props.timerConfigurationItems.map(function (item) {
                const timerConfigItemProps = {
                        id: item.id,
                        name: item.name,
                        pomodoro: item.pomodoro,
                        shortBreak: item.shortBreak,
                        longBreak: item.longBreak,
                        onEditClick: this.handleTimerConfigurationEdit,
                        onDeleteClick: this.handleTimerConfigurationDelete,
                }
                return (
                    <TimerConfigurationItem key={item.id} {...timerConfigItemProps}/>
                );
                
            }, this);
        } else {
            return (
                <tr className="text-center"><td colSpan="5">No timer configurations to display</td></tr>
            );
        }
    }
    handleTimerConfigurationDelete(timerConfigurationId){
        this.props.onDeleteTimerConfiguration(timerConfigurationId);
        
    }
    handleTimerConfigurationEdit(timerConfiguration){
        this.props.onEditTimerConfiguration(timerConfiguration);
    }
    render(){
        return (
            <div className="col-md-12">
                <table className="table table-bordered table-responsive table-striped">
                    <thead className="tableHeader">
                        <tr>
                            <th className="text-center">Name</th>
                            <th className="text-center">Pomodoro</th>
                            <th className="text-center">Short Break</th>
                            <th className="text-center">Long Break</th>
                            <th className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderItems()}
                    </tbody>
                </table>
            </div>
            )
    }
}

TimerConfigurationList.propTypes = {
    timerConfigurationItems: React.PropTypes.array.isRequired,
}


export default TimerConfigurationList;