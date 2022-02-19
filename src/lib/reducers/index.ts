import {combineReducers} from 'redux';
import onBoarding from './onBoarding';
import theme from './theme';

export default combineReducers({
  onBoarding,
  theme,
});
