import { Component } from "react";
import { connect } from "react-redux";
import { closeAll, getUsers, selectUser, setDeleteUserModal, setUserModal} from "../actions";
import { Button } from "./Button";
import { DeleteConfirmModalModal } from "./modals";
import { ListItem } from "./ListItem";
import { NewUserModal } from "./modals/NewUserModal";
import "./styles/List.css";
import { SidePanel } from ".";
import { withRouter } from "react-router";
import { PARAMS, ROUTES } from "../constants";
import "./styles/List.css";
import iconos_adm_proyectos from './Icons/svg/iconos_adm_proyectos.svg';
import icono_consulta from './Icons/icono_consulta.svg';
import icono_lupa from './Icons/icono_lupa.svg';
import icono_invitado from './Icons/icono_invitado.svg';
import icono_menor_mayor from './Icons/icono_menor_mayor.svg';
import icono_filtrar from './Icons/icono_filtrar.svg';
import icono_proyectos from './Icons/svg/icono_proyectos.svg';


const mapStateToProps = state => {
    return { 
        currentUser: state.UserReducer.currentUser, 
        users: state.UserReducer.users 
    };
};
  

class UserList extends Component{

    constructor(props) {
        super(props);
        
        this.renderContent = this.renderContent.bind(this);
        this.openModal = this.openModal.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.openModalFor = this.openModalFor.bind(this);
        this.renderDeleteButton = this.renderItemButtons.bind(this);
    }

    openModal() {
        this.props.dispatch(selectUser(-1));
        this.props.dispatch(setUserModal(true));
    }

    openModalFor(userIndex) {
        if (!this.props.currentUser || this.props.currentUser.id === this.props.users[userIndex].id) {
            return;
        }
        this.props.dispatch(selectUser(userIndex));
        this.props.dispatch(setUserModal(true));
    }

    goToUser(userIndex) {
        return;
        this.props.dispatch(selectUser(userIndex)).then(()=>{
            this.props.history.push(ROUTES.USER_PAGE.replace(PARAMS.USER_ID, this.props.users[userIndex].id));
            this.props.dispatch(closeAll(true));
        });
    }

    componentDidMount() {
        this.props.dispatch(getUsers());
    }

    onDeleteClick(event, userIndex) {
        event.stopPropagation();
        this.props.dispatch(selectUser(userIndex));
        this.props.dispatch(setDeleteUserModal(true));
    }

    renderItemButtons(index){
        if (!this.props.currentUser || this.props.users[index].id === this.props.currentUser.id) {
            return;
        }
        return(
            <div className="move-right">
            <Button className='list-button' onClick={()=>{this.openModalFor(index)}}>
                E
            </Button>
            <Button className='list-button ' onClick={event => this.onDeleteClick(event, index)}>
                X
            </Button>
            </div>
        )

    }

    renderContent() {
        /* const { users } = this.props; DESCOMENTAR ESTO PARA LA APLICACION, COMENTADO SOLO PARA TENER USUSARIOS FALSOS*/ 
        let users = [
            {
                name: "Juan Sebastián Jara Pitters",
                MantainerId: 2,
                createdAt: new Date().toString(),
                asignado: "01-03-2020",
                description: "Proyecto 1"
            },
            {
                name: "Andrés Neyem",
                MantainerId: 4,
                createdAt: new Date().toString(),
                asignado: "04-04-2020",
                description: "Proyecto 1"
            },
            {
                name: "Claudio Mourgues Álvarez",
                MantainerId: 4,
                createdAt: new Date().toString(),
                asignado: "01-03-2020",
                description: "Proyecto 1"
            },
            {
                name: "Oscar Nicolás Avila Polanco",
                MantainerId: 7,
                createdAt: new Date().toString(),
                asignado: "01-03-2020",
                description: "Proyecto 1"
            },
            {
                name: "Pedro Vargas",
                MantainerId: 7,
                createdAt: new Date().toString(),
                asignado: "01-03-2020",
                description: "Proyecto 1"
            }

        ]
        return(
            <div className="list-content">
                {
                    users &&
                    users.map((user, index) => (
                        <ListItem key={index} className='adm' onClick={()=>{ this.goToUser(index) }}>
                            {user.alias}
                            {this.renderItemButtons(index)}
                            <span>
                                <img src={icono_invitado} alt="" class='amd-ind-logo'></img>
                            </span>
                            <div className='project-data'>
                                <div className='user-name'>
                                    {user.name}
                                </div>
                            </div>

                            <span className='right-line'>
                                <img src={icono_proyectos} alt="" class='projects-logo-2'></img>
                           </span>
                            <div className='user-context'>
                                    <span>
                                        <b class="Asign"> Asignado: </b> 
                                    </span>
                                    <br/>
                                    <span>
                                        <b class="Asign-date"> {user.asignado} </b>{/* ?.split('T')[0] */} 
                                    </span>
                            </div>
                            <Button className='move-right' onClick={()=>{this.goToProject(index)}}>
                                ▶
                            </Button>
                        </ListItem>
                        )
                    )
                }
            </div>
        )
    }
    
    render(){
        return(
            <div className='list-container'>
                <div className="list-header">
                    <h3 class="title-pag">
                        ADMINISTRADORES DE PROYECTO
                    </h3>
                    <span className='left-line'>
                        <img src={iconos_adm_proyectos} alt="" class='adm-logo'></img>
                    </span>
                    <span id="span_2">
                        08
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
                        <img src={icono_lupa} alt="" class='lupa-logo-2'></img>
                    </a>
                    <a href="">
                        <img src={icono_menor_mayor} alt="" class='minor-major-logo'></img>
                    </a>
                    <a href="">
                        <img src={icono_filtrar} alt="" class='filter-logo'></img>
                    </a>
                    {/* 
                    <Button className='list-button move-right' onClick={this.openModal}>
                        + Add User
                    </Button>
                    */}
                </div>
                {this.renderContent()}
                <NewUserModal/>
                <DeleteConfirmModalModal/>
            </div>
        )
    }
}

const ConnectedUserList = connect(mapStateToProps)(UserList);

const UserListWithRouter = withRouter(ConnectedUserList);

export {UserListWithRouter as UserList};