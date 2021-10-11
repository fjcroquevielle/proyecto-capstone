import { Component } from "react";
import { withRouter } from "react-router";

import { HomeHeader } from "../components";
import { SignupForm } from "../components";

import { ROUTES } from "../constants";
import logo_login from"../components/Icons/logo_login.svg";
import logo_redico from"../components/Icons/logo_redico.svg";
import "./styles/SignUp.css";

class SignUp extends Component{

    goTo(routeName){
        if (this.props.location.pathname === routeName) {
            return;
        }
        this.props.history.push(routeName);
    }

    render(){
        return(

            <div class="Rectangle-Copy">
                <div className='main-content'>
                    <figure class="logo-imagen">
                       <img src={logo_login} alt=""></img>
                    </figure>
                    {/*<HomeHeader showDownloadButton={true} signup={false} signin={true}/>*/}
                    <div className="signup-content">
                        <SignupForm onSuccess={()=>this.goTo(ROUTES.SIGN_IN)}/> 
                    </div>
                </div>
                <div className='footer-signup'>
                    <img src={logo_redico} alt="" class='logo-redico'></img>
                </div>
            </div>

        )
    }
}

const SginUpWithRouter = withRouter(SignUp);

export {SginUpWithRouter as SignUp};