import { Component } from "react";

class PlaceHolderIcon extends Component{
    render() {
        return(
            <svg 
                    xmlns="http://www.w3.org/2000/svg"   
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#5344c1" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="feather feather-square">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
        )
    }
}

export {PlaceHolderIcon};