import { Component } from "react";
import { connect } from "react-redux";
import { setDesregisterModal, setSelected } from "../actions";

import { Button, MyInfo, UpdateInfoForm } from "../components";
import { DesregisterConfirmModalModal } from "../components";

import "./styles/Redico.css";

const initialState = {
    update: false
}

class MyPage extends Component{
    constructor(props){
        super(props);
        this.state = initialState;

        this.renderContent = this.renderContent.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.setUpdateFalse = this.setUpdateFalse.bind(this);
        this.setDesregisterModal = this.setDesregisterModal.bind(this);
    }

    renderContent() {
        if (this.state.update) {
            return(<UpdateInfoForm onSuccess={this.setUpdateFalse}/>);
        }
        return(<MyInfo/>);
    }

    setUpdateFalse(){
        this.setState({...this.state, update: false});
    }

    toggleUpdate(){
        this.setState({...this.state, update: !this.state.update});
    }

    setDesregisterModal(){
        this.props.dispatch(setDesregisterModal(true));
    }

    render(){
        return(
            <div className='main-content' selected='Settings'>

                    <div className='redico-header'>
                        <h2>
                            My Account
                        </h2>
                        <div className='redico-header-right-buttons'>
                            <Button onClick={this.setDesregisterModal}>
                                Desregister
                            </Button>
                            <Button onClick={this.toggleUpdate}>
                                {this.state.update?'Return':'Edit Info'}
                            </Button>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    {this.renderContent()}
                    <DesregisterConfirmModalModal/>
            </div>
        )
    }
}

const ConnectedMyPage = connect(null)(MyPage);

export {ConnectedMyPage as MyPage};