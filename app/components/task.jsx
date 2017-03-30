import React from 'react';

class TaskItem extends React.Component {
    constructor (){
        super()

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }
    handleEditClick(){
        const taskToEdit = {
            id: this.props.id,
            name: this.props.name,
            description: this.props.description,
            priorityId: this.props.priorityId,
            statusId: this.props.statusId
        }
        this.props.onEditClick(taskToEdit);
    }
    handleDeleteClick(){
        this.props.onDeleteClick(this.props.id);
    }
    getStatusValue (statusId){
        let statusValue = "";
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
    }
    getPriorityValue (priorityId){
        let priorityValue = "";
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
    }
    render (){
        console.log("task: render");
        
        return (
            <tr>
                <td>
                    <input type="hidden" value={this.props.id} />
                    <h4 className="taskName">{this.props.name}</h4>
                    <h6 className="description">{this.props.description}</h6>
                </td>
                <td className="text-center middle">{this.getPriorityValue(this.props.priorityId)}</td>
                <td className="text-center">{this.getStatusValue(this.props.statusId)}</td>
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

TaskItem.propTypes = {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    priorityId: React.PropTypes.number.isRequired,
    statusId: React.PropTypes.number.isRequired,
    onEditClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired
};


export default TaskItem;