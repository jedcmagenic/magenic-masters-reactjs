'use strict'

var React = require('react');

var TaskItem = React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        priorityId: React.PropTypes.number.isRequired,
        statusId: React.PropTypes.number.isRequired,
        isEditable: React.PropTypes.bool,
        onTaskEdit: React.PropTypes.func.isRequired,
        onTaskDelete: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            id: 0,
            name: '',
            description: '',
            priorityId: 1,
            statusId: 1,
            isEditable: false
        };
    },
    componentWillMount: function(){
        this.setState({
            id: this.props.id,
            name: this.props.name,
            description: this.props.description,
            priorityId: this.props.priorityId,
            statusId: this.props.statusId,
            isEditable: this.props.isEditable
        });
    },
    getStatusValue: function(statusId){
        var statusValue = "";
        switch (statusId) {
            case 1:
                statusValue = "To do"
                break;
            case 2:
                statusValue = "In Progress"
                break;
            case 3:
                statusValue = "Done"
                break;
            default:
                statusValue = "To do"
                break;
        }

        return statusValue;
    },
    getPriorityValue: function(priorityId){
        var priorityValue = "";
        switch (priorityId) {
            case 1:
                priorityValue = "Low"
                break;
            case 2:
                priorityValue = "Medium"
                break;
            case 3:
                priorityValue = "High"
                break;
            default:
                priorityValue = "Low"
                break;
        }

        return priorityValue;
    },
    handleEditClick: function(){
        this.setState( {isEditable: true} );
    },
    handleEditSaveClick: function(){
        var updatedTask = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            priorityId: this.state.priorityId,
            statusId: this.state.statusId
        }
        this.setState( {isEditable: false} );
    },
    handleEditCancelClick: function(){
        this.setState({
            name: this.props.name,
            description: this.props.description,
            priorityId: this.props.priorityId,
            statusId: this.props.statusId,
            isEditable: false
        });
    },
    handleDeleteTask: function(){
        this.props.onTaskDelete(this.props.id);
    },
    handleNameChange: function(event){
        this.setState({name: event.currentTarget.value});
    },
    handleDescriptionChange: function(event){
        this.setState({description: event.currentTarget.value});
    },
    handlePriorityChange: function(event){
        var selectedPriorityId = parseInt(event.currentTarget.selectedOptions[0].value);
        this.setState({priorityId: selectedPriorityId});
    },
    handleStatusChange: function(event){
        var selectedStatusId = parseInt(event.currentTarget.selectedOptions[0].value);
        this.setState({statusId: selectedStatusId});
    },
    render: function(){
            if (this.state.isEditable) {
            return (<tr>
                <td>
                    Name: <input className="form-control" value={this.state.name} onChange={this.handleNameChange} />
                    Description: <input className="form-control" value={this.state.description} onChange={this.handleDescriptionChange}/>
                </td>
                <td className="text-center middle">
                    <select className="form-control" value={this.state.priorityId} onChange={this.handlePriorityChange}>
                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                    </select>
                </td>
                <td className="text-center">
                    <select className="form-control" value={this.state.statusId} onChange={this.handleStatusChange}>
                        <option value="1">To Do</option>
                        <option value="2">In Progress</option>
                        <option value="3">Done</option>
                    </select>   
                </td>
                <td className="text-center">
                    <div className="btn-group">
                        <button type="button" className="btn btn-success glyphicon glyphicon-ok" onClick={this.handleEditSaveClick}></button>
                        <button type="button" className="btn btn-danger glyphicon glyphicon-remove" onClick={this.handleEditCancelClick}></button>
                    </div>
                </td>                
            </tr>);
            }else{
            return (<tr>
                <td>
                    <h4 className="taskName">{this.state.name}</h4>
                    <h6 className="description">{this.state.description}</h6>
                </td>
                <td className="text-center middle">{this.getPriorityValue(this.state.priorityId)}</td>
                <td className="text-center">{this.getStatusValue(this.state.statusId)}</td>
                <td className="text-center">
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary glyphicon glyphicon-edit" onClick={this.handleEditClick}></button>
                        <button type="button" className="btn btn-danger glyphicon glyphicon-trash" onClick={this.handleDeleteTask}></button>
                    </div>
                </td>                
            </tr>);
            }
    }
});

module.exports = TaskItem;