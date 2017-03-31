
import React from 'react';
import TaskItem from './task';

class TaskList extends React.Component {
    constructor(){
        super()

        this.renderItems = this.renderItems.bind(this);
        this.handleTaskDelete = this.handleTaskDelete.bind(this);
        this.handleTaskEdit = this.handleTaskEdit.bind(this);
    }
    
    renderItems () {
        if(this.props.taskItems.length > 0){
            return this.props.taskItems.map(function (item) {
                const taskItemProps = {
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        priorityId: item.priorityId,
                        statusId: item.statusId,
                        duration: item.hours + " hrs " + item.minutes + " mins",
                        onEditClick: this.handleTaskEdit,
                        onDeleteClick: this.handleTaskDelete,
                }
                return (
                    <TaskItem key={item.id} {...taskItemProps}/>
                );
                
            }, this);
        } else {
            return (
                <tr className="text-center"><td colSpan="5">No tasks to display</td></tr>
            );
        }
    }
    handleTaskDelete(taskId){
        this.props.onDeleteTask(taskId);
        
    }
    handleTaskEdit(task){
        this.props.onEditTask(task);
    }
    render(){
        return (
            <div className="col-md-12">
                <table className="table table-bordered table-responsive table-striped">
                    <thead className="tasks">
                        <tr>
                            <th className="text-center">Task Details</th>
                            <th className="text-center">Priority</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Duration</th>
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

TaskList.propTypes = {
    taskItems: React.PropTypes.array.isRequired,
}


export default TaskList;