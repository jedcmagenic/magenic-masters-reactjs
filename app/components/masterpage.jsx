
import React from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';

export default class MasterPage extends React.PureComponent {
    render(){
        return (
            <div>
                <Header text="Pomodoro App" />
                    {this.props.children}
                <Footer footerText="Magenic Masters: ReactJS - Jed R. Cayetano" copyrightText=" 2017 Magenic Manila" />
            </div>
            )
    }
};
