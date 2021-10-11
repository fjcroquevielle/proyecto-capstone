import { combineReducers } from "redux";
import UserReducer from './UserReducer';
import ModalReducer from './ModalReducer';
import OrganizationReducer from './OrganizationReducer';
import ProjectReducer from './ProjectReducer';
import SidePanelReducer from "./SidePanelReducer";

export default combineReducers({
    UserReducer,
    ModalReducer,
    OrganizationReducer,
    ProjectReducer,
    SidePanelReducer
})