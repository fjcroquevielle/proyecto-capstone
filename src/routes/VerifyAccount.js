import { Component } from "react";
import { withRouter } from "react-router";

import { ACCESS_TOKEN, ROUTES } from "../constants";

import { VerifyAccountForm } from "../components";

import "./styles/SignUp.css";
import { connect } from "react-redux";
import { getUserData } from "../actions";

const mapStateToProps = state => {
    return {
        currentUser : state.UserReducer.currentUser,
    }
}

class VerifyAccount extends Component{

    componentDidMount() {
        
        if (!this.props.currentUser) {
            // deal with store reset
            if (localStorage.getItem(ACCESS_TOKEN) === null) {
                this.goTo(ROUTES.HOME);
                return;
            } 
            // get user data
            this.props.dispatch(getUserData()).then(()=>{
                if (!this.props.currentUser.verified) {
                    this.goTo(ROUTES.MY_PAGE);
                }
            }).catch(error=>{
                localStorage.removeItem(ACCESS_TOKEN);
                this.goTo(ROUTES.HOME);
            });
            return;
        }
        if (!this.props.currentUser.verified) {
            this.goTo(ROUTES.MY_PAGE);
        }
    }

    goTo(routeName){
        if (this.props.location.pathname === routeName) {
            return;
        }
        this.props.history.push(routeName);
    }

    render(){
        return(
            <div>
                <div className="signin-content">
                   <VerifyAccountForm onSuccess={()=>this.goTo(ROUTES.MY_PAGE)}/> 
                </div>
            </div>
        )
    }
}

const VerifyAccountWithRouter = withRouter(VerifyAccount);

const ConnectedVerifyAccount = connect(mapStateToProps)(VerifyAccountWithRouter);

export {ConnectedVerifyAccount as VerifyAccount};