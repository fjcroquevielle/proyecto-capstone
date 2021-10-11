import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { closeAll, logout, setVisibility } from "../actions";
import { ROUTES } from "../constants";
import { Button } from "./Button";
import { PlaceHolderIcon } from "./Icons";

import {ReactComponent as IconProyects } from './svg/icono_proyectos.svg';
import {ReactComponent as IconAdmin } from './svg/iconos_adm_proyectos.svg';
import {ReactComponent as IconNotes } from './svg/icono_anotaciones.svg';
import {ReactComponent as IconLearned } from './svg/icono_lecciones_aprendidas.svg';
import {ReactComponent as IconConfig } from './svg/icono_ajustes.svg';
import {ReactComponent as IconPayments } from './svg/icono_pagos.svg';
import {ReactComponent as IconHome } from './svg/icono_inicio.svg';


import "./styles/SidePanel.css";

class SidePanel extends Component{

    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
        this.goTo = this.goTo.bind(this);
    }

    goTo(routeName) {
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

    render(){
        return(
            <div className={`side-panel ${this.props.hidden ? 'side-panel-hidden': ''}`}>
                {/* <div className="side-panel-title" onClick={()=> this.goTo(ROUTES.MY_ACCOUNT)}> */}
                {/* <div className="side-panel-title" onClick={()=> this.goTo(ROUTES.MY_ACCOUNT)}>
                    <h1>RE</h1>
                </div> */}
                <Button 
                        className={`button-vertical ${this.props.location.pathname === "home"? 'selected':''}`}
                        onClick={()=> this.goTo(ROUTES.LOGGED_HOME)}>
                    <IconHome/>
                </Button>
                <Button 
                        className={`button-vertical ${this.props.location.pathname === ROUTES.PROJECTS? 'selected':''}`} 
                        onClick={()=> this.goTo(ROUTES.PROJECTS)}>
                    <IconProyects/>
                    
                </Button>
                <Button 
                        className={`button-vertical ${this.props.location.pathname === ROUTES.MY_ORG? 'selected':''}`} 
                        onClick={()=> this.goTo(ROUTES.MY_ORG)}>
                    <IconAdmin/>
                </Button>
                <Button 
                        className={`button-vertical ${this.props.location.pathname === 'Meetings'? 'selected':''}`}>
                    <IconNotes/>
                </Button>
                <Button  
                        className={`button-vertical ${this.props.location.pathname === 'Lessons'? 'selected':''}`} >
                    <IconLearned/>
                </Button>
                <Button 
                        className={`button-vertical ${this.props.location.pathname === 'Settings'? 'selected':''}`} >
                    <IconConfig/>
                </Button>
                <Button 
                     className="move-back">
                    ▶
                </Button>
            </div>
        )
    }
}

const connectedSidePanel =  connect(null)(SidePanel);

const SidePanelWithRouter = withRouter(connectedSidePanel);

export { SidePanelWithRouter as SidePanel};