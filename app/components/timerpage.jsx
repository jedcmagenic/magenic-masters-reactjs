import React from 'react';
import Timer from './timer';

class TimerPage extends React.Component {
    constructor (){
        super()

    }
    
    render (){
        return (
            <div>
                Wrapper here...
                <Timer />
            </div>
        );
    }
}

TimerPage.propTypes = {

};


export default TimerPage;