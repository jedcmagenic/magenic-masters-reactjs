import React from 'react';

class TimerConfigurationItem extends React.Component {
    constructor (){
        super()

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }
    handleEditClick(){
        const timerConfigurationToEdit = {
            id: this.props.id,
            name: this.props.name,
            pomodoro: this.props.pomodoro,
            shortBreak: this.props.shortBreak,
            longBreak: this.props.longBreak,
        }
        this.props.onEditClick(timerConfigurationToEdit);
    }
    handleDeleteClick(){
        if(confirm("Are you sure you want to delete the timer configuration " + this.props.name + "?"))
            this.props.onDeleteClick(this.props.id);
    }
    render (){
        return (
            <tr>
                <td>
                    <input type="hidden" value={this.props.id} />
                    <h4 className="timerConfigurationName">{this.props.name}</h4>
                </td>
                <td className="text-center">{this.props.pomodoro}</td>
                <td className="text-center">{this.props.shortBreak}</td>
                <td className="text-center">{this.props.longBreak}</td>
                <td className="text-center">
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary glyphicon glyphicon-edit" onClick={this.handleEditClick}></button>
                        <button type="button" className="btn btn-danger glyphicon glyphicon-trash" onClick={this.handleDeleteClick}></button>
                    </div>
                </td>                
            </tr>
        );
    }
}

TimerConfigurationItem.propTypes = {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    pomodoro: React.PropTypes.number.isRequired,
    shortBreak: React.PropTypes.number.isRequired,
    longBreak: React.PropTypes.number.isRequired,
    onEditClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired
};


export default TimerConfigurationItem;