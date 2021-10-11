import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { setOrganizationModal } from "../actions";
import { UserList } from "../components";
import { Links } from "../components/Links";
import { ROUTES, USER_TYPE } from "../constants";

import "./styles/Redico.css";

const mapStateToProps = state => {
    return{
        currentUser : state.UserReducer.currentUser,
        organization: state.OrganizationReducer.organization
    }
}

class UsersRoute extends Component{

    constructor(props){
        super(props);

        this.goTo = this.goTo.bind(this);
        this.UsersRouteSetup = this.UsersRouteSetup.bind(this);
        this.openOrgModal = this.openOrgModal.bind(this);
    }

    openOrgModal(){
        this.props.dispatch(setOrganizationModal(true));
    }
    
    UsersRouteSetup(){
        if (this.props.currentUser ) {
            if (this.props.currentUser.orgUser.type !== USER_TYPE.ADMIN) {
                this.goTo(ROUTES.MY_ACCOUNT);
                return;
            }
        }
    }

    goTo(routeName){
        if (this.props.location.pathname === routeName) {
            return;
        }
        this.props.history.push(routeName);
    }

    componentDidMount(){
        this.UsersRouteSetup();
    }
    
    componentDidUpdate(){
        this.UsersRouteSetup();
    }

    render(){
        const links = [
            {
                link: '#',
                name: 'Administradores de Proyectos'
            }
        ]

        return(
            <div className='main-content  main-active'>
                <Links links={links}/>
                <UserList/>
            </div>
        )
    }
}

const connectedUsersRoute = connect(mapStateToProps)(UsersRoute);

const UsersRouteWithRouter = withRouter(connectedUsersRoute);

export {UsersRouteWithRouter as UsersRoute};