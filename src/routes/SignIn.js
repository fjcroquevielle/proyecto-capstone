import { Component } from "react";
import { withRouter } from "react-router";

import { ROUTES } from "../constants";
import { SigninForm } from "../components";

import {ReactComponent as RedicoLogo } from '../components/Icons/logo_redico.svg';
import {ReactComponent as LoginLogo } from '../components/Icons/logo_login.svg';

import "./styles/SignUp.css";

class SignIn extends Component{

    goTo(routeName){
        if (this.props.location.pathname === routeName) {
            return;
        }
        this.props.history.push(routeName);
    }

    render(){
        return(
            <div className='grid'>
                <div className='first-mid-row'>
                    <LoginLogo className='login-logo'/>
                </div>
                <div className='mid-grid'>
                    <SigninForm onSuccess={()=>this.goTo(ROUTES.PROJECTS)}/> 
                </div>
                <div className='third-third-row'>
                    <RedicoLogo className='redico-logo'/>
                </div>
            </div>
        )
    }
}

const SignInWithRouter = withRouter(SignIn);

export {SignInWithRouter as SignIn};