import React from 'react'
import classes from './FinishedQuiz.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishedQuiz = (props)=>{
    const successCount = Object.keys(props.results).reduce((total, index)=>{
        if(props.results[index] === 'success'){
            total++;
        }
        return total;
    }, 0);
    return(
        <div className={classes.FinishedQuiz}>
            <ul>
                {
                    props.quiz.map((quizItem, index)=>{
                        const cls = [
                          'fa',
                            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                            classes[props.results[quizItem.id]]
                        ];
                        return (
                            <li key={index}>
                                <strong>{index +1}</strong>. &nbsp; {quizItem.question}
                                <i className={cls.join(' ')} />
                            </li>
                        )
                      }
                  )
                }
            </ul>
            <p>Right {successCount} from {props.quiz.length}</p>
            <Button onClick={props.retry} type='primary'>Retry</Button>
            <Link to='/'>
                <Button type='succsess'>List of questions</Button>
            </Link>

        </div>
    )
};
export  default FinishedQuiz;