import { Component } from "react";
import {Header} from "../components";
import { ROUTES } from "../constants";
import "./styles/Home.css";
import {ReactComponent as IconProyects } from './svg/icono_proyectos.svg';
import {ReactComponent as IconAdmin } from './svg/iconos_adm_proyectos.svg';
import {ReactComponent as IconNotes } from './svg/icono_anotaciones.svg';
import {ReactComponent as IconLearned } from './svg/icono_lecciones_aprendidas.svg';
import {ReactComponent as IconConfig } from './svg/icono_ajustes.svg';
import {ReactComponent as IconPayments } from './svg/icono_pagos.svg';

function LoggedHome() {
        return(
            <div className='main-content main-active main-home'>
                {/*  Topbar */ }
                <div class="frame">
                    <div class="modules">
                        <div class="proyects-module"> 
                            <span class="module-name"> Proyectos </span>
                            <span class="module-number"> 20 </span>
                            <IconProyects fill='current'/>
                            <button class="module-button" onClick={()=> this.goTo(ROUTES.PROJECTS)}> VER DETALLES </button>
                        </div>
                        <div class="admin-module">
                            <span class="module-name"> Administrador de Sistema </span>
                            <span class="module-number"> 10 </span>
                            <IconAdmin fill='current'/>
                            <button class="module-button"> VER DETALLES </button>
                        </div>
                        <div class="notes-module"> 
                            <span class="module-name"> Anotaciones </span>
                            <span class="module-number"> 28 </span>
                            <IconNotes fill='current'/>
                            <button class="module-button"> VER DETALLES </button>
                        </div>
                        <div class="learned-module">
                            <span class="module-name"> Lecciones Aprendidas </span>
                            <span class="module-number"> 05 </span>
                            <IconLearned fill='current'/>
                            <button class="module-button"> VER DETALLES </button>
                        </div>
                        <div class="config-module"> 
                            <span class="module-name"> Ajustes </span>
                            <span class="module-number">-</span>
                            <IconConfig fill='current'/>
                            <button class="module-button"> VER DETALLES </button>
                        </div>
                        <div class="payments-module"> 
                            <span class="module-name"> Suscripción RVIP </span>
                            <span class="payment-state"> Pendiente </span>
                            <IconPayments fill='current'/>
                            <button class="payment-state-button">PENDIENTE</button>
                        </div>
                        <div class="blank-module1"> </div>
                        <div class="blank-module2"> </div>
                    </div>
                </div> 
            </div>     
        
        
        )
    }

export {LoggedHome};