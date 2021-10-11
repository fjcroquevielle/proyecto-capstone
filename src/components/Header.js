import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { closeAll, getUserData, logout, setVisibility, toggleVisibility } from "../actions";
import { ROUTES, USER_TYPE } from "../constants";
import { Button } from "./Button";

import {ReactComponent as RedicoLogo } from './Icons/isotipo_redico.svg';
import {ReactComponent as LogoHeader } from './Icons/logo_header.svg';

import './styles/Header.css';

const mapStateToProps = state => {
    return {
        currentUser: state.UserReducer.currentUser,
    };
};

const initialState = {
    userOptionsIsActive: false
}

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.toggleUserOptions = this.toggleUserOptions.bind(this);
        this.setUserOptions = this.setUserOptions.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.logout = this.logout.bind(this);
        this.goTo = this.goTo.bind(this);
    }

    componentDidMount() {
        if (!this.props.currentUser) {
            this.props.dispatch(getUserData());
        }
        document.addEventListener("mouseup", this.handleMouseUp);
    }
    
    componentWillUnmount() {
        document.removeEventListener("mouseup", this.handleMouseUp)
    }

    goTo(routeName) {
        this.setUserOptions(false);
        if (this.props.location.pathname === routeName) {
            return;
        }
        this.props.history.push(routeName);
        this.props.dispatch(closeAll(true));
        this.props.dispatch(setVisibility(false));
    }

    logout() {
        this.props.dispatch(logout()).then(()=>{
            this.goTo(ROUTES.HOME);
        })
    }

    handleMouseUp(event) {
        if (typeof event.target.className === 'string' && ! event.target.className.includes('header-mouse-up')) {
            this.setUserOptions(false);
        }
    }

    toggleUserOptions() {
        this.setState({...this.state, userOptionsIsActive: !this.state.userOptionsIsActive});
    }

    setUserOptions(visibility) {
        this.setState({...this.state, userOptionsIsActive: visibility});
        
    }

    render() {
        /*if (!this.props.currentUser) {
            return(<div/>);
        }*/

        return(
            <div className='header'>
                <div className='header-logo' onClick={()=>{this.props.dispatch(toggleVisibility())}}>
                    <RedicoLogo fill='current'/>
                </div>
                <div className='logo-header'>
                    <LogoHeader fill='current'/>
                </div>
                <div className='header-user-info'>
                    <div className='header-user-icon'></div>
                    <div>
                        <div className='header-user-name'>
                            {this.props.currentUser? this.props.currentUser.username : "User Name"}
                        </div>
                        <div className='header-user-type'>
                            {this.props.currentUser? USER_TYPE[this.props.currentUser.orgUser.type] : "User Type"}
                        </div>
                    </div>
                </div>
                <div className='header-user-options-button'>
                    <Button className='vertical-button header-mouse-up' onClick={()=>this.toggleUserOptions()} >
                        ...
                    </Button>
                    <div 
                            className={`header-user-options header-mouse-up ${this.state.userOptionsIsActive? 'active' : 'hidden'}`}
                            // onBlur={()=>{this.setUserOptions(false)}}
                            >
                        <Button className='button-vertical header-mouse-up'  onClick={()=> this.goTo(ROUTES.MY_ACCOUNT)}>
                            My Account
                        </Button>
                        <a href="/">
                            <Button className='button-vertical header-mouse-up'  onClick={this.logout}>
                                Log out
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

const ConnectedHeader = connect(mapStateToProps)(Header);

const HeaderWithRouter = withRouter(ConnectedHeader);

export {HeaderWithRouter as Header};