import { Component } from "react";
import { TextField } from "./TextField";

import { connect } from "react-redux";
import { updateSelf } from "../actions";


const mapStateToProps = state => {
    return{
        placeholder: state.UserReducer.currentUser 
    }
}

const initialState = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    disabled: false,
};

class UpdateInfoForm extends Component{
    
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
        const userData = {}
        Object.keys(this.state).forEach(key=>{
            if (this.state[key] !== initialState[key]) {
                userData[key] = this.state[key];
            }
        })
        // send request
        this.props.dispatch(updateSelf(userData)).then(()=>{
            this.setState(initialState);
            this.props.onSuccess();
        }).catch(error=>{
            console.log(error);
            this.setState({...this.state, disabled: false});
        })
    }


    render() {
        return(
            <div>
                <h2>
                    Update User Information
                </h2>

                <form onSubmit={this.handleSubmit}>
                    
                    <TextField 
                            fieldName="username" 
                            type="text" 
                            value={this.state.username} 
                            placeholder={this.props.placeholder ? this.props.placeholder.username : ""}
                            onChange={this.handleChange}>
                        Username
                    </TextField>
                    
                    <TextField 
                            fieldName="email" 
                            type="text" 
                            value={this.state.email} 
                            placeholder={this.props.placeholder ? this.props.placeholder.email : ""}
                            onChange={this.handleChange}>
                        Email
                    </TextField>
                    
                    <TextField fieldName="password" type="password" value={this.state.password} onChange={this.handleChange}>
                        New Password
                    </TextField>
                    
                    <TextField fieldName="passwordConfirmation" type="password" value={this.state.passwordConfirmation} onChange={this.handleChange}>
                        Password Confirmation
                    </TextField>
                    
                    <br/>
                    

                    <input type="submit" value="Submit" disabled={this.state.disabled}/>
                </form> 
            </div>
        );
    }
}

const connectedUpdateInfoForm = connect(mapStateToProps)(UpdateInfoForm);

export {connectedUpdateInfoForm as UpdateInfoForm};