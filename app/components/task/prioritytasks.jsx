
import React from 'react';
import {Popover} from 'react-bootstrap';
import TaskStore from '../../stores/taskstore.js';
import { Link } from 'react-router'
import _ from 'lodash';

class PriorityTasks extends React.Component {
    constructor(){
        super()
        this.state = {
            highPriorityTasks: this._getTasks(),
        }

        this.renderItems = this.renderItems.bind(this);
        this.onChange = this.onChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }
    _getTasks(){
        return _.filter(TaskStore.getTasksByPriorityId(3), taskItem => {
            return taskItem.statusId != 3 ;
        });
    }
    componentWillMount(){
        TaskStore.addChangeListener(this.onChange);
    }
    componentWillUnmount(){
        TaskStore.removeChangeListener(this.onChange);
    }
    onChange(){
        this.setState({
            highPriorityTasks: this._getTasks()
        })
    }
    renderItems(){
        return this.state.highPriorityTasks.map(task => {
            return(
                <li key={task.id}>{task.name}</li>
                )
        }, this)
    }
    render(){
        return (
            <div>
                <ul>
                    {this.renderItems()}
                </ul>
                    <br/>
                <div className="text-center" >
                    <Link to="/taskList">View All</Link>
                </div>
            </div>
            )
    }
}

// TaskList.propTypes = {
//     taskItems: React.PropTypes.array.isRequired,
// }


export default PriorityTasks;