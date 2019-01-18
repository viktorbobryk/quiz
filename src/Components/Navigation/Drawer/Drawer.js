import React from 'react'
import classes from './Drawer.css'
import Backdrop from '../Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'
const links = [
    {to: '/', label: 'Quiz List', exact: true},
    {to: '/auth', label: 'Auth', exact: false},
    {to: '/quiz-creator', label: 'Create test', exact: false}

];
class Drawer extends React.Component{

    clickHandler = ()=> {
      this.props.close()
    };
    renderLinks=()=>{
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
        return(
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop close={this.props.close}/> : null}
            </React.Fragment>

        )
    }
}
export default Drawer;