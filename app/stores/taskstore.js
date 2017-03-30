import Dispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../constants/actiontypes';
import Store from './store';
import _ from 'lodash';

let _tasks = [];

class TaskStore extends Store {
    constructor(){
        super();
    }

    getAllTasks(){
        return _tasks;
    }

    getTaskById(taskId){
        return _.find(_tasks, {id: taskId});
    }

    getTasksByStatusId(statusId){
        return _.filter(_tasks, {statusId: statusId});
    }

    getTasksByPriorityId(priorityId){
        let tasks = _.filter(_tasks, {priorityId: priorityId});
        return tasks;
    }
}

let taskStore = new TaskStore();

Dispatcher.register(action => {

    switch(action.type) {
        case ActionTypes.INITIALIZE:
            _tasks = action.initialData.tasks;
            break;
        case ActionTypes.ADD_TASK:
            _tasks.push(action.task);
            break;
        case ActionTypes.UPDATE_TASK:
            let existingTaskIndex = _.indexOf(_tasks, _.find(_tasks, {id: action.task.id}))
            _tasks.splice(existingTaskIndex, 1, action.task);
            break;
        case ActionTypes.DELETE_TASK:
            _.remove(_tasks, {id: action.taskId});
            break;    
        default:
            return;
    }

    taskStore.emitChange();
});


export default taskStore;