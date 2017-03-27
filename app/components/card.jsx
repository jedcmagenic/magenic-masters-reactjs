
import React from 'react';

export default class Card extends React.PureComponent{
    render(){
        return (
            <div className="card">
                <div className="container">
                    <h4><b>{this.props.title}</b></h4> 
                    <p>{this.props.description}</p> 
                    <a href="#" className="btn btn-primary">{this.props.buttonText}</a>
                </div>
            </div>
        )
    }
};
