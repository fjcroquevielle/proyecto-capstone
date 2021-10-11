import { Component } from "react";
import { connect } from "react-redux";
import { Button } from "../Button";
import { desregister, setDesregisterModal } from "../../actions"
import "./styles/Modal.css"

const mapStateToProps = state => {
    return { 
        isVisible: state.ModalReducer.modalDesregister
    };
}

const initialState = {
    disabled: false,
};

class DesregisterConfirmModalModal extends Component{

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
        this.props.dispatch(desregister()).then(()=>{
            this.closeModal();
        }).catch(()=>{
            this.setState({...this.state, disabled:false});
        })
    }

    closeModal(){
        // this.resetState();
        // this.props.dispatch(selectUser(-1));
        this.props.dispatch(setDesregisterModal(false)).then(this.resetState);
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
                    Are you sure?
                    <br/>
                    <Button onClick={this.handleSubmit}>
                        Accept
                    </Button>
                </div>
                
            </div>
        )
    }
}

const connectedDesregisterConfirmModalModal = connect(mapStateToProps)(DesregisterConfirmModalModal);

export { connectedDesregisterConfirmModalModal as DesregisterConfirmModalModal };