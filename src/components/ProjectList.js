import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Header, SidePanel } from ".";
import { closeAll, getProjects, getProjectsAssigned, getUsers, selectProject, setProjectModal } from "../actions/";
import { PARAMS, ROUTES, USER_TYPE } from "../constants";
import { Button } from "./Button";
import { ListItem } from "./ListItem";
import { NewProjectModal } from "./modals";
import "./styles/List.css";
import icono_proyectos from './Icons/svg/icono_proyectos.svg';
import icono_lupa from './Icons/icono_lupa.svg';
import icono_consulta from './Icons/icono_consulta.svg';
import icono_menor_mayor from './Icons/icono_menor_mayor.svg';
import icono_filtrar from './Icons/icono_filtrar.svg';

const mapStateToProps = state => {
    return { 
        currentUser: state.UserReducer.currentUser, 
        projects: state.ProjectReducer.projects,
        users: state.UserReducer.indexedUsers
    };
};
  

class ProjectList extends Component{

    constructor(props) {
        super(props);
        
        this.renderContent = this.renderContent.bind(this);
        this.SetProjectList = this.SetProjectList.bind(this);
        this.openModal = this.openModal.bind(this);
        this.renderOpenModalButton = this.renderOpenModalButton.bind(this);
    }
    
    componentDidMount() {
        this.SetProjectList()
    }
    
    SetProjectList() {
        if (this.props.targetUser) {
            this.props.dispatch(getProjectsAssigned(this.props.targetUser.id));
            return;
        }
        this.props.dispatch(getProjects());
        if (Object.keys(this.props.users).length === 0) {
            this.props.dispatch(getUsers());
        }
    }

    openModal() {
        this.props.dispatch(setProjectModal(true));
    }

    goToProject(projectIndex) {
        this.props.dispatch(selectProject(projectIndex)).then(()=>{
            this.props.history.push(ROUTES.PROJECT_PAGE.replace(PARAMS.PROJECT_ID, this.props.projects[projectIndex].id));
            this.props.dispatch(closeAll(true));
        });
    }

    renderContent() {
        var {  users } = this.props; {/* var {  proyects, users } = this.props; */}
        let projects = [
            {
                name: "Pedro",
                MantainerId: 2,
                createdAt: new Date().toString(),
                description: "Proyecto 1"
            },
            {
                name: "Pedro",
                MantainerId: 4,
                createdAt: new Date().toString(),
                description: "Proyecto 1"
            },
            {
                name: "Pedro",
                MantainerId: 4,
                createdAt: new Date().toString(),
                description: "Proyecto 1"
            },
            {
                name: "Pedro",
                MantainerId: 7,
                createdAt: new Date().toString(),
                description: "Proyecto 1"
            }

        ]
        return(
            <div className="list-content">
                <div id="view-projects-list">
                <div id="view-projects-row">
                <div id="link_home">
                   <p className="Home-Projects"> <a href="" >Inicio</a> /Proyectos</p> 
                </div>
                    <div className="list-header">
                        <h3 className="title-pag-projects">
                            {this.props.targetUser? `Projects Assigned to ${this.props.targetUser.username}`: "Projects"}
                        </h3>
                        <span className='left-line'>
                                <img src={icono_proyectos} alt="" class='projects-logo'></img>
                        </span>
                        <span id="span_1">
                            100
                        </span>
                        <span className='left-line'>
                            <button className="Rectangle">
                                <span class="ADD"> + Agregar </span>
                            </button>
                        </span>
                        <a href="">
                            <img src={icono_consulta} alt="" class='consult-logo'></img>
                        </a>
                        <a href="">
                            <img src={icono_lupa} alt="" class='lupa-logo'></img>
                        </a>
                        <a href="">
                        <img src={icono_menor_mayor} alt="" class='minor-major-logo'></img>
                        </a>
                        <a href="">
                            <img src={icono_filtrar} alt="" class='filter-logo'></img>
                        </a>
                    </div>
                {
                    projects &&
                    projects.length > 0 &&
                    projects.map((project, index) => (
                        <ListItem key={index} className='project' >
                            <div className='project-data'>
                                <div className='project-name'>
                                    {project.name}
                                </div>
                                <div className='project-context'>
                                    <span>
                                        <b> Created At: </b> {project.createdAt}{/* ?.split('T')[0] */} 
                                    </span>
                                    &nbsp;
                                    <span>
                                        <b> Admin:  </b> {users[project.MantainerId]?.username}
                                    </span>
                                </div>
                                <div className='project-description'>
                                    {project.description}

                                </div>

                            </div>
                            <Button className='move-right' onClick={()=>{this.goToProject(index)}}>
                                ▶
                            </Button>
                        </ListItem>
                        )
                    )
                }
                </div>
                </div>
            </div>
        )
    }

    renderOpenModalButton() {
        // prevent the current user from opening this modal if the circunstances don't allow it
        if (!this.props.currentUser || this.props.currentUser.orgUser.type !== USER_TYPE.ADMIN || this.props.targetUser) {
            return;
        }
        return(
            <Button className='list-button move-right' onClick={this.openModal}>
                + Add Project
            </Button>
        )
    }
    
    render(){
        return(
            <div className='list-container'>
                {this.renderOpenModalButton()}
                {this.renderContent()}
                <NewProjectModal/>
            </div>
        )
    }
}

const ConnectedProjectList = connect(mapStateToProps)(ProjectList);

const ProjectListWithRouter = withRouter(ConnectedProjectList);

export {ProjectListWithRouter as ProjectList};