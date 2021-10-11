import { Component } from "react";
import { connect } from "react-redux";
import { deleteUser, setDeleteUserModal } from "../../actions"
import { Button } from "../Button";
import "./styles/Modal.css"

const mapStateToProps = state => {
    return { 
        isVisible: state.ModalReducer.modalDeleteUser,
        selectedUser: state.UserReducer.selectedUser 
    };
}

const initialState = {
    disabled: false,
};

class DeleteConfirmModalModal extends Component{

    constructor(props){
        super(props);
        this.state = initialState;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    componentDidMount(){
        if (!this.props.isVisible) {
            this.setState(initialState);
        }
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
        if (this.props.selectedUser) {
            this.props.dispatch(deleteUser(this.props.selectedUser.id)).then(()=>{
                this.closeModal();
            }).catch(()=>{
                this.setState({...this.state, disabled:false});
            })
            return;
        }
        this.setState({...this.state, disabled:false});
    }

    closeModal(){
        // this.resetState();
        // this.props.dispatch(selectUser(-1));
        this.props.dispatch(setDeleteUserModal(false)).then(this.resetState);
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
                    {this.props.selectedUser?`Are you sure you want to delete user ${this.props.selectedUser.username}?`:""}
                    <br/>
                    <Button onClick={this.handleSubmit}>
                        Accept
                    </Button>
                </div>
                
            </div>
        )
    }
}

const connectedDeleteConfirmModalModal = connect(mapStateToProps)(DeleteConfirmModalModal);

export { connectedDeleteConfirmModalModal as DeleteConfirmModalModal };