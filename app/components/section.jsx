
import React from 'react';
import Card  from './card';

export default class Section extends React.PureComponent{
    render(){
        return (
            <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-heading"><b>{this.props.title}</b> - {this.props.description}</div>
                    <div className="panel-body">
                        <div className="panel-body">
                            <div className="col-md-12">
                                <div className="col-md-4">
                                    <Card title="Card 1" description="Card 1 description" buttonText="Details"/>
                                </div>
                                <div className="col-md-4">
                                    <Card title="Card 2" description="Card 2 description" buttonText="Details"/>
                                </div>
                                <div className="col-md-4">
                                    <Card title="Card 3" description="Card 3 description" buttonText="Details"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
    }
};
