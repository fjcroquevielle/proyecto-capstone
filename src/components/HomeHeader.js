import { Component } from "react";
import { withRouter } from "react-router";
import { ROUTES } from "../constants";
import { Button } from "./Button";
import "./styles/HomeHeader.css";

class HomeHeader extends Component{

    goTo(routeName){
        if (this.props.location.pathname === routeName) {
            return;
        }
        this.props.history.push(routeName);
    }

    showDownloadButton(showButton){
        if (showButton) {
            return(
                    <Button className='button-horizontal' onClick={()=>this.goTo(ROUTES.FREE_DOWNLOADS)}>
                        Free Downloads
                    </Button>
            )
        }
    }

    showSignupButton(showButton){
        if (showButton) {
            return(
                    <Button className='button-horizontal' onClick={()=>this.goTo(ROUTES.SIGN_UP)}>
                        Sign Up
                    </Button>
            )
        }
    }

    showSigninButton(showButton){
        if (showButton) {
            return(
                    <Button className='button-horizontal' onClick={()=>this.goTo(ROUTES.SIGN_IN)}>
                        Sign In
                    </Button>
            )
        }
    }


    render(){
        return(
            <div className="home-header">
                <h1 className="title" onClick={()=> this.goTo(ROUTES.HOME)}>
                    RVIP
                </h1>
                <div className="right-buttons">
                    {this.showDownloadButton(this.props.showDownloadButton)}
                    {this.showSigninButton(this.props.signin)}
                    {this.showSignupButton(this.props.signup)}
                </div>
            </div>
        )
    }
}

const HomeHeaderWithRouter = withRouter(HomeHeader)

export { HomeHeaderWithRouter as HomeHeader};