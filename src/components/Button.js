import { Component } from "react";
import "./styles/Button.css";

class Button extends Component{
    // constructor(props){
    //     super(props)

    //     this.getClassName = this.getClassName.bind(this);
    // }

    getClassName(){
        return ["button", "non-select", this.props.className].join(" ");
    }

    renderTooltip(tooltip, tooltipPos = "") {
        if (tooltip) {
            return (
                <span className={`button-tooltip ${ tooltipPos }`}>{tooltip}</span>
            );
        }
    }

    render() {
        return(
            <div className={this.getClassName()} onClick={this.props.onClick}>
                {this.props.children ? this.props.children : "Button"}
                {this.renderTooltip(this.props.tooltip, this.props.tooltipPosition??"")}
            </div>
        );
    }
}

export {Button};