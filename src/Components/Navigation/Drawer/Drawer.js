import React from 'react'
import classes from './Drawer.css'
import Backdrop from '../Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'

class Drawer extends React.Component{

    clickHandler = ()=> {
      this.props.close()
    };
    renderLinks=(links)=>{
        return links.map((link, index)=>{
            return(
                <li key={index}>
                    <NavLink
                    to={link.to}
                    exact={link.exact}
                    activeClassName={classes.active}
                    onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    };
    render(){
        const cls = [
            classes.Drawer
        ];
        if(! this.props.isOpen){
            cls.push(classes.close)
        }
        const links = [
            {to: '/', label: 'Quiz List', exact: true},
        ];
        console.log(this.props.isAuthentificated);
        if(this.props.isAuthentificated){
            links.push({to: '/quiz-creator', label: 'Create test', exact: false});
            links.push({to: '/logout', label: 'Logout', exact: false});
        }else{
            links.push({to: '/auth', label: 'Auth', exact: false})
        }

        return(
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop close={this.props.close}/> : null}
            </React.Fragment>

        )
    }
}
export default Drawer;