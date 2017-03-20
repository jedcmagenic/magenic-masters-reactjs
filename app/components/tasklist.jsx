'use strict'

var React = require('react');
var TaskItem = require('./task');
var _= require('lodash');

var TaskList = React.createClass({
    propTypes: {
        taskItems: React.PropTypes.array
    },
    getInitialState: function () {
        return {
            tasksData: []
        };
    },
    componentWillMount: function(){
        this.setState({ tasksData: this.props.taskItems });
    },
    renderItems: function () {
        return this.state.tasksData.map(function (item) {
            return (
                <TaskItem 
                    key={item.id} 
                    id={item.id} 
                    name={item.name} 
                    description={item.description} 
                    priorityId={item.priorityId} 
                    statusId={item.statusId}
                    isEditable={item.isEditable} 
                    onTaskDelete={this.handleTaskDelete}
                    onTaskEdit={this.handleTaskEdit}/>
            );
        }, this);
    },
    handleTaskDelete: function(taskId){
        if(confirm("Are you sure you want to delete this item?")){
            var index = -1;	
            var taskListCount = this.state.tasksData.length;
            var deletedTask = '';
            var updatedArray = this.state.tasksData; //Don't modify the state's tasksData array directly
            for( var i = 0; i < taskListCount; i++ ) {
                if( updatedArray[i].id === taskId ) {
                    index = i;
                    deletedTask = updatedArray[i].name;
                    break;
                }
            }
            updatedArray.splice( index, 1 );	
            this.setState( {tasksData: updatedArray} );
            alert("Item with task name: '" +deletedTask+"' has been deleted" );
        }
        
    },
    handleTaskEdit: function(){
        var index = -1;	
        var taskListCount = this.state.tasksData.length;
        var updatedArray = this.state.tasksData.slice(); //Don't modify the state's tasksData array directly
        for( var i = 0; i < taskListCount; i++ ) {
            if( updatedArray[i].id === task.id ) {
                updatedArray[i].name = task.name;
                updatedArray[i].description = task.description;
                updatedArray[i].priorityId = task.priorityId;
                updatedArray[i].statusId = task.statusId;
                updatedArray[i].isEditable = false;
                break;
            }
        }
        this.setState( {tasksData: updatedArray} );
    },
    render: function(){
        return (
            <div className="col-md-12">
                <div className="col-md-12">
                <table className="table table-bordered table-responsive table-striped">
                    <thead className="tasks">
                        <tr>
                            <th className="text-center">Task Details</th>
                            <th className="text-center">Priority</th>
                            <th className="text-center">Status</th>
                            <th className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderItems()}
                    </tbody>
                </table>
                </div>
            </div>
            )
    }
});

module.exports = TaskList;