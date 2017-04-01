import Dispatcher from '../dispatcher/dispatcher';
import TimerConfigurationApi from '../api/timerconfig-api';
import ActionTypes from '../constants/actiontypes';

class TimerConfigurationActions {
    addTimerConfiguration(timerConfiguration){
        let newTimerConfiguration = TimerConfigurationApi.saveTimerConfiguration(timerConfiguration);

        Dispatcher.dispatch({
            type: ActionTypes.ADD_TIMER_CONFIGURATION,
            timerConfiguration: newTimerConfiguration
        })
    }
    updateTimerConfiguration(timerConfiguration){
        let updatedTimerConfiguration = TimerConfigurationApi.saveTimerConfiguration(timerConfiguration);

        Dispatcher.dispatch({
            type: ActionTypes.UPDATE_TIMER_CONFIGURATION,
            timerConfiguration: updatedTimerConfiguration
        })
    }
    deleteTimerConfiguration(timerConfigurationId){
        TimerConfigurationApi.deleteTimerConfiguration(timerConfigurationId);

        Dispatcher.dispatch({
            type: ActionTypes.DELETE_TIMER_CONFIGURATION,
            timerConfigurationId: timerConfigurationId
        })
    }
}

const timerConfigurationActions = new TimerConfigurationActions();

export default timerConfigurationActions;