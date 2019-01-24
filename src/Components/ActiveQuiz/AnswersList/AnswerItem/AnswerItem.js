import React from 'react'
import classess from './AnswerItem.css'
 const AnswerItem =(props)=> {
     const cls = [classess.AnswerItem];
     if(props.state){
         cls.push(classess[props.state]);
     }
     return (
         <li
             className={cls.join(' ')}
             onClick={() => props.onAnswerClick(props.answer.id)}
         >{props.answer.text}</li>
         )

 };
export default AnswerItem