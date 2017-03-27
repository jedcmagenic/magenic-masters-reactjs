
import React from 'react';
import Section from './section';

export default class Body extends React.PureComponent{
    render(){
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
};
