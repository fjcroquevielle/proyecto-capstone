import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { ProjectList } from "../components";
import { Links } from "../components/Links";
import { ROUTES, USER_TYPE } from "../constants";

import "./styles/Redico.css";

const mapStateToProps = state => {
    return{
        currentUser : state.UserReducer.currentUser
    }
}

class Projects extends Component{

    constructor(props){
        super(props);

        this.goTo = this.goTo.bind(this);
        this.UsersRouteSetup = this.UsersRouteSetup.bind(this);
    }

    UsersRouteSetup(){
        if (this.props.currentUser ) {
            if (!(this.props.currentUser.orgUser.type === USER_TYPE.ADMIN || this.props.currentUser.orgUser.type === USER_TYPE.MAINTAINER)) {
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
                name: 'Projects'
            }
        ]

        return(
            <div className='main-content' selected='Projects' >
                <Links links={links}/>
                <ProjectList />
            </div>
        )
    }
}

const connectedProjects = connect(mapStateToProps)(Projects);

const ProjectsWithRouter = withRouter(connectedProjects);

export {ProjectsWithRouter as Projects};