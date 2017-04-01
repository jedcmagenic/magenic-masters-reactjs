import Dispatcher from '../dispatcher/dispatcher';
import TaskApi from '../api/tasks-api';
import TimerConfigurationApi from '../api/timerconfig-api';
import ActionTypes from '../constants/actiontypes';

class InitializeActions {
    initApp(){
        Dispatcher.dispatch({
            type: ActionTypes.INITIALIZE,
            initialData: {
                tasks: TaskApi.getAllTasks(),
                timerConfigurations: TimerConfigurationApi.getAllTimerConfigurations()
            }
        })
    }
}

const initializeActions = new InitializeActions();

export default initializeActions;