import React from 'react'
import classes from './MenuTogle.css'
const MenuTogle = (props) => {
    const cls = [
        classes.MenuTogle,
        'fa',
    ];

    if(props.isOpen){
        cls.push('fa-times');
        cls.push(classes.isOpen);
    }
    else{
        cls.push('fa-bars')
    }
    return(
        <i
            className={cls.join(' ')}
            onClick={props.toggle}
        />
    )
};
export default MenuTogle;