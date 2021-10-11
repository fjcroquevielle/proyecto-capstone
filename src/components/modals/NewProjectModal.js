import { Component } from "react";
import { connect } from "react-redux";
import { addProject, setProjectModal } from "../../actions";
import { Button } from "../Button";
import { TextField } from "../TextField";
import "./styles/Modal.css"
import { IS_INT } from "../../constants";

const mapStateToProps = state => {
    return { 
        isVisible: state.ModalReducer.modalProject,
        users: state.UserReducer.users,
        currentUser: state.UserReducer.currentUser
    };
}

const initialState =  {
    name: '',
    description: '',
    MantainerId: '',
    disabled: false,
};

class NewProjectModal extends Component{

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
        const projectData = {}
        const fields = ['name', 'description', 'MantainerId']
        fields.forEach(field=>{
            if (this.state[field] !== undefined || this.state[field] !== null || this.state[field] !== '') {
                projectData[field] = IS_INT.test(this.state[field]) ? parseInt(this.state[field]) : this.state[field];
            }
        });

        const onSuccess = ()=>{this.closeModal();};
        const onFailure = (error)=>{
            console.error(error.fieldErrors);
            this.setState({...this.state, disabled:false});
        };
        this.props.dispatch(addProject(projectData)).then(onSuccess).catch(onFailure);
    }

    closeModal(){
        this.props.dispatch(setProjectModal(false)).then(this.resetState);
    }

    render(){
        var modalState = 'modal ';
        modalState += this.props.isVisible? 'modal-open':'modal-closed';

        var mantainerVal = "";
        var mantainerLabel = "Select 1";
        if (this.props.placeholder) {
            mantainerVal = this.props.placeholder.MantainerId; 
            mantainerLabel = this.props.users.find(user=>user.id===mantainerVal)?.name;
        }
        else if (this.props.currentUser) {
            mantainerVal = this.props.currentUser.id;
            mantainerLabel = this.props.currentUser.username;
        }


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
                                fieldName="name" 
                                type="text" 
                                value={this.state.name} 
                                placeholder={this.props.placeholder ? this.props.placeholder.name : ""} 
                                onChange={this.handleChange}>
                            Project Name
                        </TextField>
                        
                        <TextField 
                                fieldName="description" 
                                type="text" 
                                value={this.state.description} 
                                placeholder={this.props.placeholder ? this.props.placeholder.description : ""} 
                                onChange={this.handleChange}>
                            Description
                        </TextField>

                        <select id="MantainerId" name="MantainerId"  value={this.state.MantainerId} onChange={this.handleChange}>
                            <option value={mantainerVal} defaultValue disabled hidden>
                                { mantainerLabel }
                            </option>
                            {this.props.users.map(user=>(
                                <option value={user.id} key={user.id}>
                                    {user.username}
                                </option>
                            ))}
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

const connectedNewProjectModal = connect(mapStateToProps)(NewProjectModal);

export { connectedNewProjectModal as NewProjectModal };