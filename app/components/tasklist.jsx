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