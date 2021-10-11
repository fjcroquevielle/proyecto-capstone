import { Component } from "react";
import { connect } from "react-redux";
import { USER_TYPE } from "../constants";

const mapStateToProps = state => {
    return {
        currentUser : state.UserReducer.currentUser
    }
}

class MyInfo extends Component{

    constructor(props){
        super(props);

        this.renderInfo = this.renderInfo.bind(this);
    }

    renderInfo(){
        if(this.props.currentUser){
            return(
                <div>
                    Username:
                    <br/>
                    {this.props.currentUser.username}
                    <br/>
                    <br/>
                    Email:
                    <br/>
                    {this.props.currentUser.email}
                    <br/>
                    <br/>
                    User Type:
                    <br/>
                    { USER_TYPE[this.props.currentUser.orgUser.type]}
                    <br/>
                    <br/>
                    Company:
                    <br/>
                    {this.props.currentUser.orgUser.company}
                    <br/>
                </div>
            )
        }
        return;
    }

    render(){
        return(
            <div className='my-info'>
                {this.renderInfo()}
            </div>
        )
    }
}

const connectedMyInfo = connect(mapStateToProps)(MyInfo);

export { connectedMyInfo as MyInfo };