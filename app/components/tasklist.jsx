'use strict'

var React = require('react');
var TaskItem = require('./task');
var _= require('lodash');

var TaskList = React.createClass({
    propTypes: {
        taskItems: React.PropTypes.array
    },
    getInitialState: function () {
        console.log("tasklist: getInitialState");
        
        return {
            tasksData: []
        };
    },
    componentWillReceiveProps: function(){
        console.log("tasklist: componentWillReceiveProps");
        
    },
    componentWillMount: function(){
        this.setState({ tasksData: this.props.taskItems });
        console.log("tasklist: componentWillMount");
        
    },
    componentWillUpdate: function(){
        console.log("tasklist: componentWillUpdate");
        
    },
    componentDidMount: function(){
        console.log("tasklist: componentDidMount");

    },
    componentDidUpdate: function(){
        console.log("tasklist: componentDidUpdate");

    },
    componentWillUnmount: function(){
        console.log("tasklist: componentWillUnmount");
        
    },
    shouldComponentUpdate: function(){
        console.log("tasklist: shouldComponentUpdate");
        return true;
        
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
            console.log("handleTaskDelete");
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
        console.log("handleTaskEdit");
        
    },
    generateNewId: function(){
        var maxObj = _.maxBy(this.state.tasksData, function(t){return t.id;});
        return maxObj.id + 1;
    },
    handleTaskAdd: function(){
        var newTask = {
            id: this.generateNewId(),
            name: '',
            description: '',
            priorityId: 1,
            statusId: 1,
            isEditable: true
        };
        var updatedTasks = this.state.tasksData.concat(newTask);
        this.setState( {tasksData: updatedTasks} );
        console.log("handleTaskAdd");
    },
    render: function(){
        console.log("tasklist: render");
        
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
                <div className="col-md-6 btn-toolbar">
                    <a href="#/taskList" className="btn btn-primary btn-lg" onClick={this.handleTaskAdd}>
                        <span className="glyphicon glyphicon-plus"></span> Add Task
                    </a>
                </div>
            </div>
            )
    }
});

module.exports = TaskList;