'use strict'

var React = require('react');

var TaskItem = React.createClass({
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
    render: function(){
            return (<tr>
                <td>
                    <h4 className="taskName">{this.state.name}</h4>
                    <h6 className="description">{this.state.description}</h6>
                </td>
                <td className="text-center middle">{this.getPriorityValue(this.state.priorityId)}</td>
                <td className="text-center">{this.getStatusValue(this.state.statusId)}</td>            
            </tr>
            );
    }
});

module.exports = TaskItem;