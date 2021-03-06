import React from 'react'
import classes from './Layout.css'
import MenuToggle from '../../Components/Navigation/MenuTogle/MenuTogle'
import Drawer from '../../Components/Navigation/Drawer/Drawer'
class Layout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menu: false,
        }
    }
    toggleMenuHandler = () => {
      this.setState({
          menu: !this.state.menu
      })
    };
    closeMenuHandler = () => {
        this.setState({
            menu: false
        })
    };
 render(){

     return (
         <div className={classes.Layout}>
             <Drawer
                 isOpen={this.state.menu}
                 close={this.closeMenuHandler}
             />
             <MenuToggle
                toggle={this.toggleMenuHandler}
                isOpen={this.state.menu}
             />
             <main>
                 {this.props.children}
             </main>
         </div>
     )
 }
}
export default Layout;