'use strict'

var React = require('react');

var Footer = React.createClass({
    render: function(){
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
});

module.exports = Footer;