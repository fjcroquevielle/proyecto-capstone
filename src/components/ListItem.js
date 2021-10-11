import { Component } from "react";
import "./styles/List.css";

class ListItem extends Component{

    getClassName(){
        return ["list-item", this.props.className].join(" ");
    }

    render(){
        return(
            <div className={this.getClassName()} onClick={this.props.onClick} >
                {this.props.children ? this.props.children : "ListItem"}
            </div>
        )
    }
}

export { ListItem };