'use strict'

var React = require('react');
var Section = require('./section.jsx');

var Body = React.createClass({
    render: function(){
        return (
            <div className="container-fluid">
                <h3>
                    {this.props.text}
                </h3>
                <div className="row">
                    <div className="col-md-4">
                        <Section title="To Do Items" description="Your new tasks" />
                    </div>
                    <div className="col-md-4">
                        <Section title="In Progress" description="What you are currently doing" />
                    </div>
                    <div className="col-md-4">
                        <Section title="Done" description="Completed tasks" />
                    </div>
                </div>
            </div>
            )
    }
});

module.exports = Body;