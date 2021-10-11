import { Component } from "react";
import { TextField } from "./TextField";

import { connect } from "react-redux";
import { signin } from "../actions";


const initialState = {
    usernameEmail: '',
    password: '',
    disabled: false,
};

class SigninForm extends Component{
    
    constructor(props) {
        super(props);
        this.state = initialState;
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState(initialState);
    }

    handleChange(event) {
        if (this.state.disabled) {
            return;
        }
        var newState = this.state;
        newState[event.target.name] = event.target.value

        this.setState(newState);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.disabled) {
            return;
        }
        this.setState({...this.state, disabled: true});
        // handle validation
        const body = {
            username: this.state.usernameEmail,
            email: this.state.usernameEmail,
            password: this.state.password
        }
        // send request
        this.props.dispatch(signin(body)).then(()=>{
            this.setState(initialState);
            this.props.onSuccess();
        }).catch(error=>{
            console.log(error);
            this.setState({...this.state, disabled: false});
        })
    }


    render() {
        return(
            <div className="signin-content signin-box center-div">
                <span class="Login-Usuario">
                    Login Usuario
                </span>
                <form onSubmit={this.handleSubmit}>
                
                    <TextField className="login-field" placeholder="Nombre Usuario" fieldName="usernameEmail" type="text" value={this.state.usernameEmail} onChange={this.handleChange}></TextField>
                    
                    <TextField className="login-field" placeholder="Contraseña Usuario" fieldName="password" type="password" value={this.state.password} onChange={this.handleChange}> </TextField>

                    <br/>
                    
                    <div className="button-div"> 
                        <a href="/home">
                            <input className="login-button" type="button" value="INGRESAR" disabled={this.state.disabled}/>
                        </a>
                    </div>

                    <div className="forgot-buttons"> 
                        <div className="forgot-password-button"> 
                            ¿Olvido su clave?
                        </div>
                        <div className="forgot-password-button"> 
                            <a href="/">Volver atrás</a>
                        </div>
                    </div>
                </form> 
            </div>
        );
    }
}

const connectedSigninForm = connect(null)(SigninForm);

export {connectedSigninForm as SigninForm};