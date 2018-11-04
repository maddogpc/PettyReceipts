import { combineReducers } from 'redux';
import nav from './navReducer';
import auth from './loginReducer';
import groups from './groupsReducer';
import tags from './tagsReducer';
import reciepts from './recieptsReducer';

const AppReducer = combineReducers({
  nav,
  auth,
  groups,
  tags,
  reciepts,
});

export default AppReducer;
