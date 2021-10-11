import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getUser } from "../actions";
import { ProjectList } from "../components";
import { Links } from "../components/Links";
import { ROUTES } from "../constants";

import "./styles/Redico.css";


const mapStateToProps = state => {
    return { 
        selectedUser: state.UserReducer.selectedUser 
    };
};

const initialState = {
    ready: false,
}

class User extends Component{
    constructor(props){
        super(props);
        this.state = initialState;

        this.renderProjectList = this.renderProjectList.bind(this);
    }


    componentDidMount() {
        this.setState({...this.state, ready: false});
        const { userId } = this.props.match.params;
        if (userId && (!this.props.selectedUser || this.props.selectedUser.id !== userId)) {
            this.props.dispatch(getUser(userId)).then(() => {
                this.setState({...this.state, ready: true});
            }).catch((err) => {
                console.error(err);
            });
            return;
        } else {
            this.setState({...this.state, ready: true});
        }
    }

    renderProjectList() {
        const { userId } = this.props.match.params;
        if (this.state.ready && this.props.selectedUser && this.props.selectedUser.id === parseInt(userId)) {
            return(
                <ProjectList targetUser={this.props.selectedUser}/>
            )
        }
        return;
    }
    
    render(){
        var userDisplayed = this.props.currentUser? this.props.currentUser.username : "";
        userDisplayed = this.props.selectedUser ? this.props.selectedUser.username : userDisplayed;

        const links = [
            {
                link: ROUTES.MY_ORG,
                name: 'Users'
            },
            {
                link: '#',
                name: userDisplayed
            },
        ]


        return(
            <div className='main-content'>

                <Links links={links}/>
                    <div className='content-align'>
                        <div className='mini-side-panel'>

                        </div>
                        <div className='content-content'>
                            {this.renderProjectList()}
                        </div>
                    </div>
            </div>
        )
    }
}

const ConnectedUser = connect(mapStateToProps)(User);

const UserWithRouter = withRouter(ConnectedUser)

export {UserWithRouter as User};