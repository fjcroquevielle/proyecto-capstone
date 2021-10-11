import { Component } from "react";
import { TextField } from "./TextField";

import { connect } from "react-redux";
import { verifyUser } from "../actions";


const initialState = {
    password: '',
    passwordConfirmation: '',
    disabled: false,
};

class VerifyAccountForm extends Component{
    
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
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation,
        }
        // send request
        this.props.dispatch(verifyUser(body)).then(()=>{
            this.setState(initialState);
            this.props.onSuccess();
        }).catch(error=>{
            console.log(error);
            this.setState({...this.state, disabled: false});
        })
    }


    render() {
        return(
            <div className="verify-account-form">
                <h2>
                Account Verification

                </h2>

                <form onSubmit={this.handleSubmit}>
                    
                    <TextField fieldName="password" type="password" value={this.state.password} onChange={this.handleChange}>
                        New password
                    </TextField>
                    
                    <TextField fieldName="passwordConfirmation" type="password" value={this.state.passwordConfirmation} onChange={this.handleChange}>
                        Password confirmation
                    </TextField>
                    
                    <br/>
                    

                    <input type="submit" value="Submit" disabled={this.state.disabled}/>
                </form> 
            </div>
        );
    }
}

const connectedVerifyAccountForm = connect(null)(VerifyAccountForm);

export {connectedVerifyAccountForm as VerifyAccountForm};