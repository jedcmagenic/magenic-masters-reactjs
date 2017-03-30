
import React from 'react';
import {Popover} from 'react-bootstrap';
import TaskStore from '../stores/taskstore.js';
import { Link } from 'react-router'

class PriorityTasks extends React.Component {
    constructor(){
        super()
        this.state = {
            highPriorityTasks: TaskStore.getTasksByPriorityId(1),
        }

        this.renderItems = this.renderItems.bind(this);
        this.onChange = this.onChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }
    componentWillMount(){
        TaskStore.addChangeListener(this.onChange);
    }
    componentWillUnmount(){
        TaskStore.removeChangeListener(this.onChange);
    }
    onChange(){
        this.setState({
            highPriorityTasks: TaskStore.getTasksByPriorityId(3)
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