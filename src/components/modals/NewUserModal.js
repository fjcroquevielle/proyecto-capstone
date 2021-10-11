import { Component } from "react";
import { connect } from "react-redux";
import { Button } from "../Button";
import { addUser, setUserModal, updateUser } from "../../actions"
import { TextField } from "../TextField";
import { IS_INT, USER_TYPE } from "../../constants";

import "./styles/Modal.css"

const mapStateToProps = state => {
    return { 
        isVisible: state.ModalReducer.modalUser,
        placeholder: state.UserReducer.selectedUser 
    };
}

const initialState =  {
    username: '',
    email: '',
    company: '',
    userType: '',
    disabled: false,
};

class NewUserModal extends Component{

    constructor(props){
        super(props);
        this.state = initialState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    componentDidMount(){
        if (!this.props.isVisible) {
            this.setState(initialState);
        }
    }

    handleChange(event) {
        if (this.state.disabled) {
            return;
        }
        var newState = this.state;
        newState[event.target.name] = event.target.value
        this.setState(newState);
    }

    resetState(){
        this.setState(initialState);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.disabled) {
            return;
        }
        this.setState({...this.state, disabled:true});

        const userData = {}
        const fields = ['username', 'email', 'company']
        fields.forEach(field=>{
            if (this.state[field] !== undefined || this.state[field] !== null || this.state[field] !== '') {
                userData[field] = IS_INT.test(this.state[field]) ? parseInt(this.state[field]) : this.state[field];
            }
        })

        const onSuccess = ()=>{this.closeModal();};
        const onFailure = ()=>{this.setState({...this.state, disabled:false});};
        // send request
        if (this.props.placeholder) {
            // this.setState({...this.state, disabled:false});
            userData.alias = userData.username;
            this.props.dispatch(updateUser(this.props.placeholder.id, userData)).then(onSuccess).catch(onFailure);
            return;
        }

        this.props.dispatch(addUser(userData, this.state.userType === `${USER_TYPE.MAINTAINER}`)).then(onSuccess).catch(onFailure);
    }

    closeModal(){
        // this.resetState();
        this.props.dispatch(setUserModal(false)).then(this.resetState);
    }

    render(){
        var modalState = 'modal ';
        modalState += this.props.isVisible? 'modal-open':'modal-closed';

        return(
            <div className={modalState}>
                <div className='modal-title'>
                    <Button className='move-right' onClick={this.closeModal}>
                        X
                    </Button>
                </div>
                
                <div className="modal-content">
                    <form onSubmit={this.handleSubmit}>
                        <TextField 
                                fieldName="username" 
                                type="text" 
                                value={this.state.username} 
                                placeholder={this.props.placeholder ? this.props.placeholder.alias : ""} 
                                onChange={this.handleChange}>
                            User Name
                        </TextField>
                        
                        <TextField 
                                fieldName="email" 
                                type="text" 
                                value={this.state.email} 
                                placeholder={this.props.placeholder ? this.props.placeholder.User.email : ""} 
                                onChange={this.handleChange}>
                            Email
                        </TextField>
                        
                        <TextField 
                                fieldName="company" 
                                type="text" 
                                value={this.state.company} 
                                placeholder={this.props.placeholder ? this.props.placeholder.company : ""} 
                                onChange={this.handleChange}>
                            Role
                        </TextField>
                        
                        <label hrmlfor="userType">
                            User Type
                        </label>
                        <br/>
                        <select id="userType" name="userType"  value={this.state.userType} onChange={this.handleChange}>
                            <option value="" defaultValue disabled hidden>
                                {this.props.placeholder ? USER_TYPE[ this.props.placeholder.type] : 'Select one'}
                            </option>
                            <option value="2">
                                {USER_TYPE[2]}
                            </option>
                            <option value="3">
                                {USER_TYPE[3]}
                            </option>
                        </select>
                        
                        
                        <br/>
                        <br/>
                        <input type="submit" value="Submit" disabled={this.state.disabled}/>
                    </form> 
                </div>
            </div>
        )
    }
}

const connectedNewUserModal = connect(mapStateToProps)(NewUserModal);

export { connectedNewUserModal as NewUserModal };