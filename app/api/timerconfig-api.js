import _ from 'lodash';
import { TimerConfigurationData } from './timerconfigurationdata';

class TimerConfigApi {
    getAllTimerConfigurations(){
        return JSON.parse(JSON.stringify(TimerConfigurationData));
    }
    getTimerConfigurationById(id){
        let config = _.find(TimerConfigurationData, {id: id});
        return JSON.parse(JSON.stringify(config));
    }
    saveTimerConfiguration(config){
        if(config.id){
            let existingConfigIndex = _.indexOf(TimerConfigurationData, _.find(TimerConfigurationData, {id: config.id}))
            TimerConfigurationData.splice(existingConfigIndex, 1, config);
        }else{
            let maxObj = _.maxBy(TimerConfigurationData, function(t){return t.id;});
            config.id = maxObj.id + 1;
            TimerConfigurationData.push(config);
        }

        return JSON.parse(JSON.stringify(config));
    }
    deleteTimerConfiguration(id){
        _.remove(TimerConfigurationData, {id: id});
    }
}
const timerConfigApi = new TimerConfigApi();

export default timerConfigApi; 