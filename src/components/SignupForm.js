import { Component } from "react";
import {TextField} from "./TextField";
import { connect } from "react-redux";
import { signup } from "../actions";
import './styles/signup.css';

const initialState = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    orgName: '',
    paymentInfo: '',
    diabled: false
}

class SignupForm extends Component{

    constructor(props) {
        super(props);
        this.state = initialState;
        this.something = '';
    
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
        // send request
        
        const body = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation,
            orgName: this.state.orgName,
            paymentInfo: this.state.paymentInfo
        }
        
        this.props.dispatch(signup(body)).then(()=>{
            this.setState(initialState);
            this.props.onSuccess();
        }).catch(error =>{
            console.error(error);
            this.setState({...this.state, disabled: false});
        });
    }

    render() {
        return(
            <div class="Rectangle-2">
                <div className="sigup-form">
                        <h2 class="signup">
                            Sign Up:
                        </h2>
                        <form onSubmit={this.handleSubmit}>
                            <h3 class="signup">
                                User Information
                            </h3>
                            {this.something}

                            <TextField fieldName="username" type="text" placeholder="Username" value={this.state.username} onChange={this.handleChange}>
                                Username
                            </TextField>
                            
                            <TextField fieldName="email" type="text" placeholder="Email" value={this.state.email} onChange={this.handleChange}>
                                Email
                            </TextField>
                            
                            <TextField fieldName="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}>
                                Password
                            </TextField>
                            
                            <TextField fieldName="passwordConfirmation" type="password" placeholder="Password Confirmation" value={this.state.passwordConfirmation} onChange={this.handleChange}>
                                Password Confirmation
                            </TextField>
                            
                            <h3 class="signup">
                                Organization Information
                            </h3>

                            <TextField fieldName="orgName" type="text" placeholder="Organization Name" value={this.state.orgName} onChange={this.handleChange}>
                                Organization Name
                            </TextField>
                            
                            <TextField fieldName="paymentInfo" type="text" placeholder="Payment Info" value={this.state.paymentInfo} onChange={this.handleChange}>
                                Payment Info
                            </TextField>
                            <br/>
                            <input type="submit" value="Submit" class="submit" disabled={this.state.disabled}/>
                            <br/>
                            <div id="container">
                                <div><a href="" id="first"> Volver atrás </a></div><div><a href=""  id="second"> ¿Tienes problemas? </a></div>
                            </div>
                        </form> 
                    </div>
                </div>
        );
    }
}

const connectedSignupForm = connect(null)(SignupForm)

export {connectedSignupForm as SignupForm};