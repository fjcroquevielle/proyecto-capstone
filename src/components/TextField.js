import { Component } from "react";

class TextField extends Component{


    render() {
        return(
            <div class="signup">
                <label hrmlfor={this.props.fieldName} hidden="true">
                    {this.props.children ? this.props.children : "Field"}
                </label>
                <br/>
                <input
                    className="login-field" 
                    type={this.props.type} 
                    id={this.props.fieldName} 
                    name={this.props.fieldName} 
                    value={this.props.value} 
                    placeholder={this.props.placeholder?this.props.placeholder:""}
                    onChange={this.props.onChange}/>
                <br/>
            </div>
        );
    }
}

export {TextField};