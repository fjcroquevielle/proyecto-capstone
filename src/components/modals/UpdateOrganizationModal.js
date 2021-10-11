import { Component } from "react";
import { connect } from "react-redux";
import { Button } from "../Button";
import "./styles/Modal.css"
import { TextField } from "../TextField";
import { setOrganizationModal, updateOrganization } from "../../actions";

const mapStateToProps = state => {
    return { 
        isVisible: state.ModalReducer.modalOrganization,
        organization: state.OrganizationReducer.organization
    };
}

const initialState =  {
    orgName: '',
    payment_info: '',
    disabled: false,
};

class UpdateOrganizationModal extends Component{

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
        const fields = ["orgName", "payment_info"];
        fields.forEach(field=>{
            if (this.state[field] !== initialState[field]) {
                userData[field] = this.state[field];
            }
        })
            
        const onSuccess = ()=>{this.closeModal();};
        const onFailure = ()=>{this.setState({...this.state, disabled:false});};
        // send request
        this.props.dispatch(updateOrganization(this.props.organization.id, userData)).then(onSuccess).catch(onFailure);
    }

    closeModal(){
        // this.resetState();
        this.props.dispatch(setOrganizationModal(false)).then(this.resetState);
    }

    render(){
        var modalState = 'modal ';
        modalState += this.props.isVisible? 'modal-open':'modal-closed';

        return(
            <div className={modalState}>
                <div className='modal-title'>
                    <Button onClick={this.closeModal}>
                        X
                    </Button>
                </div>
                
                <div className="modal-content">
                    <form onSubmit={this.handleSubmit}>
                        <TextField 
                                fieldName="orgName" 
                                type="text" 
                                value={this.state.orgName}
                                placeholder={this.props.organization ? this.props.organization.name : ""} 
                                onChange={this.handleChange}>
                            Organization Name
                        </TextField>
                        
                        <TextField 
                                fieldName="payment_info" 
                                type="text" 
                                value={this.state.payment_info} 
                                onChange={this.handleChange}>
                            Payment Info
                        </TextField>
                        <br/>
                        <br/>
                        <input type="submit" value="Submit" disabled={this.state.disabled}/>
                    </form> 
                </div>
            </div>
        )
    }
}

const connectedUpdateOrganizationModal = connect(mapStateToProps)(UpdateOrganizationModal);

export { connectedUpdateOrganizationModal as UpdateOrganizationModal };