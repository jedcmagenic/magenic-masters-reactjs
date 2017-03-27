
import React from 'react';

export default class Footer extends React.PureComponent{
    render(){
        return (
            <div className="col-xs-12 navbar-fixed-bottom">
                <div className="col-xs-6">
                    <h5 className="text-left">
                        {this.props.footerText}
                    </h5>
                </div>
                <div className="col-xs-6">
                    <h5 className="text-right">
                        &copy; 
                        {this.props.copyrightText}
                    </h5>
                </div>
            </div>
            )
    }
};
