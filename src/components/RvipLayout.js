import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Header } from "./Header";
import { Links } from "./Links";
import { SidePanel } from "./SidePanel";

import './styles/RvipLayout.css';

const mapStateToProps = state => {
    return {
        sidePanelVisible: state.SidePanelReducer.visible,
    };
}

class RvipLayout extends Component {
    render(){
        return(
            <div className='fill-screen'>
                <Header/>
                <div className={`redico-content ${!this.props.sidePanelVisible?'':'hidden'}`}>
                    <SidePanel selected={this.props.selected??''} />
                    <div className={`current-content`}>
                        {this.props.children??this.props.pageName??"Unfinished"}
                    </div>
                </div>
            </div>
        )
    }
}

const ConnectedRvipLayout = connect(mapStateToProps)(RvipLayout);

const RvipLayoutWithRouter = withRouter(ConnectedRvipLayout);

export { RvipLayoutWithRouter as RvipLayout };