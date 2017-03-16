'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Bootstrap = require('bootstrap/dist/css/bootstrap.css');
var Header = require('./components/header.jsx');
var Banner = require('./components/banner.jsx');
var Body = require('./components/body.jsx');
var Footer = require('./components/footer.jsx');

var KanbanApplication = React.createClass({
    render: function(){
        return (
            <div>
                <Header text="React JS"/>
                <Banner />
                <Body />
                <Footer footerText="Magenic Master ReactJS" copyrightText="2017" />
            </div>
        );
    }
});


ReactDOM.render(
        <KanbanApplication />, document.getElementById('root')
);