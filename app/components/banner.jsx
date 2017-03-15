'use strict'

var React = require('react');

var Banner = React.createClass({
    render: function(){
        return (
            <div className="text-center">
                <img src="../images/banner.jpg" alt="magenic_banner" className="bannerImage"/> 
            </div>
            )
    }
});

module.exports = Banner;