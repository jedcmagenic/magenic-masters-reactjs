import Dispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../constants/actiontypes';
import Store from './store';
import _ from 'lodash';

let _timerConfigurations = [];

class TimerConfigurationStore extends Store {
    constructor(){
        super();
    }

    getAllTimerConfigurations(){
        return _timerConfigurations;
    }

    getTimerConfigurationById(timerConfigurationId){
        return _.find(_timerConfigurations, {id: timerConfigurationId});
    }

    getTimerConfigurationsForTasks(tasks){
        let _timerConfigurationsCopy = _.cloneDeep(_timerConfigurations);
        const configs = _.map(tasks, task =>{
            let configItem = _.find(_timerConfigurationsCopy, {id: task.timerConfigurationId})
            let taskConfig = {
                id: task.id,
                name: task.name,
                pomodoro: configItem.pomodoro,
                shortBreak: configItem.shortBreak,
                longBreak: configItem.longBreak
            }
            return taskConfig;
        });
        return configs;
    }
}

let timerConfigurationStore = new TimerConfigurationStore();

Dispatcher.register(action => {

    switch(action.type) {
        case ActionTypes.INITIALIZE:
            _timerConfigurations = action.initialData.timerConfigurations;
            break;
        case ActionTypes.ADD_TIMER_CONFIGURATION:
            _timerConfigurations.push(action.timerConfiguration);
            break;
        case ActionTypes.UPDATE_TIMER_CONFIGURATION:
            let existingTimerConfigurationIndex = _.indexOf(_timerConfigurations, _.find(_timerConfigurations, {id: action.timerConfiguration.id}))
            _timerConfigurations.splice(existingTimerConfigurationIndex, 1, action.timerConfiguration);
            break;
        case ActionTypes.DELETE_TIMER_CONFIGURATION:
            _.remove(_timerConfigurations, {id: action.timerConfigurationId});
            break;    
        default:
            return;
    }

    timerConfigurationStore.emitChange();
});


export default timerConfigurationStore;