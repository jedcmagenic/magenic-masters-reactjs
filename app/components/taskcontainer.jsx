'use strict'

var React = require('react');
import TaskList from './tasklist';
var TaskApi = require('../api/tasks-api.js');

var TaskContainer = React.createClass({
    getInitialState: function () {
        return {
            tasksData: JSON.parse(TaskApi.getItems())
        };
    },
    handleUpdateTaskRepo: function(taskItems){
        this.setState({
            tasksData: taskItems
        }, function(){
            TaskApi.setItems(this.state.tasksData);
        });
    },
    render: function(){
        return (
            <div className="container-fluid">
                <div className="col-md-12">
                    <h2>Tasks Masterlist</h2>
                    <div className="panel panel-primary">
                        <div className="panel-heading">Task Master List </div>
                        <div className="panel-body">
                            <TaskList 
                                taskItems={ this.state.tasksData } 
                                onSaveChanges={this.handleUpdateTaskRepo}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TaskContainer;