'use strict'

var React = require('react');
var Header = require('./header.jsx');
var Footer = require('./footer.jsx');

var MasterPage = React.createClass({
    render: function(){
        return (
            <div>
                <Header text="ReactJS: Kanban App" />
                    {this.props.children}
                <Footer footerText="Magenic Masters: ReactJS - Jed R. Cayetano" copyrightText=" 2017 Magenic Manila" />
            </div>
            )
    }
});

module.exports = MasterPage;