
import React from 'react';
import TaskItem from './task';
import _ from 'lodash';
import TaskModal from'./taskmodal';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


class TaskList extends React.Component {
    constructor(){
        super()
        this.state = {
            tasksData: [],
            showAddTaskModal: false,
            isDirty: false
        }

        this.generateNewId = this.generateNewId.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.handleTaskDelete = this.handleTaskDelete.bind(this);
        this.handleTaskEdit = this.handleTaskEdit.bind(this);
        this.handleTaskAdd = this.handleTaskAdd.bind(this);
        this.handleSaveChanges = this.handleSaveChanges.bind(this);
        this.handleOpenAddTaskModal = this.handleOpenAddTaskModal.bind(this);
        this.handleCloseAddTaskModal = this.handleCloseAddTaskModal.bind(this);
    }
    componentWillReceiveProps(){
        console.log("tasklist: componentWillReceiveProps");
        
    }
    componentWillMount(){
        this.setState({ tasksData: this.props.taskItems });
        console.log("tasklist: componentWillMount");
        
    }
    componentWillUpdate(){
        console.log("tasklist: componentWillUpdate");
        
    }
    componentDidMount(){
        console.log("tasklist: componentDidMount");

    }
    componentDidUpdate(){
        console.log("tasklist: componentDidUpdate");
        
    }
    componentWillUnmount(){
        if(this.state.isDirty){
            if(confirm("You are about to lose some unsaved changes. Would like to save them now?")){
                this.handleSaveChanges();
            }
        }
        console.log("tasklist: componentWillUnmount");
        
    }
    shouldComponentUpdate(){
        console.log("tasklist: shouldComponentUpdate");
        return true;
        
    }
    renderItems () {
        return this.state.tasksData.map(function (item) {
            const taskItemProps = {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    priorityId: item.priorityId,
                    statusId: item.statusId,
                    isEditable: item.isEditable,
                    onTaskDelete: this.handleTaskDelete,
                    onTaskEdit: this.handleTaskEdit,
            }
            return (
                    <TaskItem key={item.id} {...taskItemProps}/>
            );
        }, this);
    }
    handleTaskDelete(taskId){
        let index = -1;	
        let taskListCount = this.state.tasksData.length;
        let deletedTask = '';
        let updatedArray = this.state.tasksData; //Don't modify the state's tasksData array directly
        for( let i = 0; i < taskListCount; i++ ) {
            if( updatedArray[i].id === taskId ) {
                index = i;
                deletedTask = updatedArray[i].name;
                break;
            }
        }
        updatedArray.splice( index, 1 );
        let message = "The task: " + deletedTask + " has been deleted.";
        alert(message);
        this.setState( {tasksData: updatedArray, isDirty: true} );
        console.log("handleTaskDelete");
        
    }
    handleTaskEdit(task){
        let index = -1;	
        let taskListCount = this.state.tasksData.length;
        let updatedArray = this.state.tasksData.slice(); //Don't modify the state's tasksData array directly
        for( let i = 0; i < taskListCount; i++ ) {
            if( updatedArray[i].id === task.id ) {
                updatedArray[i].name = task.name;
                updatedArray[i].description = task.description;
                updatedArray[i].priorityId = task.priorityId;
                updatedArray[i].statusId = task.statusId;
                updatedArray[i].isEditable = false;
                break;
            }
        }
        this.setState( {tasksData: updatedArray, isDirty: true} );
        console.log("tasklist: handleTaskEdit");
        
    }
    generateNewId(){
        if(this.state.tasksData.length){
            let maxObj = _.maxBy(this.state.tasksData, function(t){return t.id;});
            return maxObj.id + 1;
        }
        else
            return 1;
    }
    handleTaskAdd(task){
        task.id = this.generateNewId();
        let updatedTasks = this.state.tasksData.concat(task);
        this.setState( {tasksData: updatedTasks, isDirty: true, showAddTaskModal: false} );
        
        console.log("handleTaskAdd");
    }
    handleSaveChanges(){
        if(confirm("Are you sure you want to save your changes to localStorage?")){
            let savedTasksOnly = _.filter(this.state.tasksData, function(t){ return !t.isEditable; });
            this.props.onSaveChanges(savedTasksOnly);
            alert("localStorage updated");
            this.setState({isDirty: false});
        }
    }
    handleOpenAddTaskModal(){
        this.setState({ showAddTaskModal: true });
    }
    handleCloseAddTaskModal(){
        this.setState({ showAddTaskModal: false });
    }
    render(){
        console.log("tasklist: render");
        
        return (
            <div className="col-md-12">
                <div className="col-md-12">
                <table className="table table-bordered table-responsive table-striped">
                    <thead className="tasks">
                        <tr>
                            <th className="text-center">Task Details</th>
                            <th className="text-center">Priority</th>
                            <th className="text-center">Status</th>
                            <th className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderItems()}
                    </tbody>
                </table>
                </div>
                <div className="col-md-6 btn-toolbar">
                    <Button bsStyle="primary" onClick={this.handleOpenAddTaskModal}><span className="glyphicon glyphicon-plus"></span> Add Task</Button>
                    <Button bsStyle="success" onClick={this.handleSaveChanges} title="Save changes to localStorage" disabled={!this.state.isDirty}><span className="glyphicon glyphicon-floppy-disk"></span> Save</Button>
                </div>
                
                <Modal show={this.state.showAddTaskModal} onHide={this.handleCloseAddTaskModal}>
                    <TaskModal 
                        onSaveTask={this.handleTaskAdd}
                        onCancelClick={this.handleCloseAddTaskModal}/>
                </Modal>
            </div>
            )
    }
}

TaskList.propTypes = {
    taskItems: React.PropTypes.array,
    onSaveChanges: React.PropTypes.func.isRequired
}

export default TaskList;