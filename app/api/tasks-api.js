import _ from 'lodash';
import { TasksData } from './tasksdata';

class TaskApi {
    getAllTasks(){
        return JSON.parse(JSON.stringify(TasksData));
    }
    getTaskById(id){
        let task = _.find(TasksData, {id: id});
        return JSON.parse(JSON.stringify(task));
    }
    saveTask(task){
        if(task.id){
            let existingTaskIndex = _.indexOf(TasksData, _.find(TasksData, {id: task.id}))
            TasksData.splice(existingTaskIndex, 1, task);
        }else{
            let maxObj = _.maxBy(TasksData, function(t){return t.id;});
            task.id = maxObj.id + 1;
            TasksData.push(task);
        }

        return JSON.parse(JSON.stringify(task));
    }
    deleteTask(id){
        _.remove(TasksData, {id: id});
    }
}
const taskApi = new TaskApi();

export default taskApi; 
