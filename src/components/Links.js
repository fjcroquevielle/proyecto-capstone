import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { closeAll } from "../actions";

import './styles/Links.css';

class Links extends Component {

    goTo(routeName) {
        if (this.props.location.pathname === routeName) {
            return;
        }
        this.props.history.push(routeName);
        this.props.dispatch(closeAll(true));
    }
    
    render(){
        var links = [
            {
                link:'#', 
                name:'Home'
            }
        ];
        if (this.props.links) {
            links = [...links, ...this.props.links];
        }
        var nonLastChild = false;
        return(
            <div className="links-list">
                {
                    links.map((link, index)=>{
                        nonLastChild = index !== links.length - 1;
                        return(
                            <span key={index}>
                                <span 
                                        className={`${link.link === '#'?'':'clickable'} ${nonLastChild?'':'last'}`} 
                                        onClick={()=>{this.goTo(link.link)}}>
                                    {link.name}
                                </span>
                                {nonLastChild?' / ':''} 
                                {/* <a href={link.link}>{link.name}</a>{(index !== links.length - 1)?' / ':''}  */}
                            </span>
                        )
                    })
                }
            </div>
        )
    }

}

const ConnectedLinks = connect(null)(Links);

const LinksWithRouter = withRouter(ConnectedLinks);

export { LinksWithRouter as Links };