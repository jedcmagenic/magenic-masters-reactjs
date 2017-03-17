'use strict'

var React = require('react');

var TaskContainer = React.createClass({
    render: function(){
        return (
            <div className="container-fluid">
                <div className="col-md-12">
                    <h2>Tasks Masterlist</h2>
                    <div className="panel panel-primary">
                        <div className="panel-heading">Task Master List </div>
                        <div className="panel-body">
                            Task Container
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TaskContainer;