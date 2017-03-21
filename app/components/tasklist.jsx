'use strict'

var React = require('react');
var TaskItem = require('./task');
var _= require('lodash');
var TaskModal = require('./taskmodal');
import { Button } from 'react-bootstrap';

var TaskList = React.createClass({
    propTypes: {
        taskItems: React.PropTypes.array,
        onSaveChanges: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        console.log("tasklist: getInitialState");
        
        return {
            tasksData: [],
            showAddTaskModal: false
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
        var latestItem = _.maxBy(this.state.tasksData, function(t){return t.id;});
        console.log(latestItem.isEditable)
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
        console.log("handleTaskDelete");
        
    },
    handleTaskEdit: function(task){
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
        console.log("tasklist: handleTaskEdit");
        
    },
    generateNewId: function(){
        var maxObj = _.maxBy(this.state.tasksData, function(t){return t.id;});
        return maxObj.id + 1;
    },
    handleTaskAdd: function(task){
        task.id = this.generateNewId();
        var updatedTasks = this.state.tasksData.concat(task);
        this.setState( {tasksData: updatedTasks} );
        console.log("handleTaskAdd");
    },
    handleSaveChanges: function(){
        if(confirm("Are you sure you want to save your changes to localStorage?")){
            var savedTasksOnly = _.filter(this.state.tasksData, function(t){ return !t.isEditable; });
            this.props.onSaveChanges(savedTasksOnly);
            alert("localStorage updated");
        }
    },
    handleOpenAddTaskModal: function(){
        this.setState({ showAddTaskModal: true });
    },
    handleCloseAddTaskModal: function(){
        this.setState({ showAddTaskModal: false });
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
                    <Button bsStyle="primary" onClick={this.handleOpenAddTaskModal}><span className="glyphicon glyphicon-plus"></span> Add Task</Button>
                    <Button bsStyle="success" onClick={this.handleSaveChanges} title="Save changes to localStorage"><span className="glyphicon glyphicon-floppy-disk"></span> Save</Button>
                </div>
                <TaskModal showAddTaskModal={this.state.showAddTaskModal}
                    onSaveTask={this.handleTaskAdd}
                    id="0"
                    name=""
                    description=""
                    priorityId="1"
                    statusId="1"
                    />
            </div>
            )
    }
});

module.exports = TaskList;