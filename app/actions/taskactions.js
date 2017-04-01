import Dispatcher from '../dispatcher/dispatcher';
import TaskApi from '../api/tasks-api';
import ActionTypes from '../constants/actiontypes';

class TaskActions {
    addTask(task){
        let newTask = TaskApi.saveTask(task);

        Dispatcher.dispatch({
            type: ActionTypes.ADD_TASK,
            task: newTask
        })
    }
    updateTask(task){
        let updatedTask = TaskApi.saveTask(task);

        Dispatcher.dispatch({
            type: ActionTypes.UPDATE_TASK,
            task: updatedTask
        })
    }
    deleteTask(taskId){
        TaskApi.deleteTask(taskId);

        Dispatcher.dispatch({
            type: ActionTypes.DELETE_TASK,
            taskId: taskId
        })
    }
    completeTask(taskId){
        let updatedTask = TaskApi.completeTask(taskId);

        Dispatcher.dispatch({
            type: ActionTypes.COMPLETE_TASK,
            task: updatedTask
        })
    }
    logTaskDuration(taskId, elapsedSeconds){
        let updatedTask = TaskApi.logTaskDuration(taskId, elapsedSeconds);

        Dispatcher.dispatch({
            type: ActionTypes.LOG_TASK_DURATION,
            task: updatedTask
        })
    }
}

const taskActions = new TaskActions();

export default taskActions;