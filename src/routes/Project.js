import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getProject } from "../actions";
import { Button } from "../components";
import { PlaceHolderIcon } from "../components/Icons/PlaceholderIcon";
import { Links } from "../components/Links";
import { PARAMS, ROUTES } from "../constants";

import "./styles/Redico.css";


const mapStateToProps = state => {
    return { 
        selectedProject: state.ProjectReducer.selectedProject,
        selectedUser: state.UserReducer.selectedUser,
    };
}

const VIEW_MODES = {
    VIEW_3D : "3d-views",
    MEETINGS: "meetings",
    MARKERS: "markers"
}

const initialState = {
    viewMode: VIEW_MODES.VIEW_3D,
};

class Project extends Component{

    constructor(props) {
        super(props);

        this.state = initialState;
    }

    checkViewMode(viewMode) {
        if (!viewMode) {
            return VIEW_MODES.VIEW_3D;
        }

        var valid = false;
        Object.keys(VIEW_MODES).some(key=>{
            valid = VIEW_MODES[key] === viewMode;
            return valid;
        });

        return valid ? viewMode : VIEW_MODES.VIEW_3D;
    }

    ProjectSetup() {
        const { selectedProject, selectedUser } = this.props
        var { projectId } = this.props.match.params;
        projectId = parseInt(projectId);
        
        if (!selectedProject || selectedProject.id !== projectId) {
            this.props.dispatch(getProject(projectId))
        }
        
        if (selectedProject && (!selectedUser || selectedUser.id !== selectedProject.MantainerId)) {

            // to-do: get mantainers
            // this.props.dispatch(getUser(selectedProject.MantainerId))
        }
    }
    
    componentDidMount() {
        var { projectView } = this.props.match.params;
        this.setView(this.checkViewMode(projectView))
        
        this.ProjectSetup();
    }

    componentDidUpdate() {
        this.ProjectSetup();
    }

    setView(view){
        if (view === this.state.viewMode) {
            return;
        }
        var { projectId } = this.props.match.params;
        var newRoute = ROUTES.PROJECT_PAGE_VIEW;
        newRoute = newRoute.replace(PARAMS.PROJECT_ID, projectId) 
        newRoute = newRoute.replace(PARAMS.PROJECT_VIEW, view) 
        this.props.history.replace(newRoute);
        this.setState({...this.state, viewMode: view});
    }

    renderView(){
        switch (this.state.viewMode) {
            case VIEW_MODES.MARKERS:
                return(<div>Markers</div>);
            case VIEW_MODES.MEETINGS:
                return(<div>Meetings</div>);
            case VIEW_MODES.VIEW_3D:
            default:
                return(<div>View 3D</div>);
        }
    }
    
    render(){
        const { selectedProject, selectedUser } = this.props
        const { projectId } = this.props.match.params;
        const projectName = selectedProject ? selectedProject.name : `Project ${projectId}`;
        
        const creationDate = selectedProject ? selectedProject.createdAt?.split('T')[0] : 'yyyy-mm-dd';
        
        const adminName = selectedUser?.username

        const links = [
            {
                link: ROUTES.PROJECTS,
                name: 'Projects'
            },
            {
                link: '#',
                name: projectName
            },
        ]


        return(
            <div className='main-content'>
                <Links links={links} />
                <div className='project-page'>
                    <div className='project-header'>
                        <div className='project-logo'></div>
                        <div className='project-data'>
                            <div className='project-name'>
                                {projectName}
                            </div>
                            <div className='project-context'>
                                <span>
                                    <b> Created At: </b> {creationDate}
                                </span>
                                &nbsp;
                                <span>
                                    <b> Admin:  </b> {adminName}
                                </span>
                            </div>
                            <div className='project-description'>
                                {selectedProject?.description}

                            </div>

                        </div>
                        <Button className='move-right'>
                            ...
                        </Button>
                    </div>
                    <div className='project-content'>
                        <div className='mini-side-panel'>
                            <Button 
                                    className={`${this.state.viewMode===VIEW_MODES.VIEW_3D?'selected':''}`}
                                    tooltip='3D Views' 
                                    onClick={()=>{this.setView(VIEW_MODES.VIEW_3D)}}>
                                <PlaceHolderIcon/>
                            </Button>
                            <Button 
                                    className={`${this.state.viewMode===VIEW_MODES.MEETINGS?'selected':''}`}
                                    tooltip='Meetings' 
                                    onClick={()=>{this.setView(VIEW_MODES.MEETINGS)}}>
                                <PlaceHolderIcon/>
                            </Button>
                            <Button 
                                    className={`${this.state.viewMode===VIEW_MODES.MARKERS?'selected':''}`}
                                    tooltip='Markers' 
                                    onClick={()=>{this.setView(VIEW_MODES.MARKERS)}}>
                                <PlaceHolderIcon/>
                            </Button>

                            <Button className='move-to-bottom' tooltip='back' tooltipPosition='top'>
                                <b>◂</b> 
                            </Button>
                        </div>
                        {this.renderView()}
                    </div>
                </div>
            </div>
        )
    }
}

const ConnectedProject = connect(mapStateToProps)(Project);

const ProjectWithRouter = withRouter(ConnectedProject);

export {ProjectWithRouter as Project};