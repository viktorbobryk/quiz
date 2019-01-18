import React, {Component} from 'react';
import classes from './QuizList.css'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

class QuizList extends Component {
  constructor(props){
  super(props);
  this.state = {
  
  };
  }
    renderQuizes = ()=> {
        return [1,2,3].map((quiz, index)=>{
            return(
                <li key={index}>
                    <NavLink to={'/quiz/'+ quiz}>
                        test {quiz}
                    </NavLink>
                </li>
            )
        })
    };
  componentDidMount(){
    axios.get("https://react-quiz-37b66.firebaseio.com/quiz.json").then((response)=>{console.log(response)})
}
  render() {
    return (
      <div className={classes.QuizList}>
          <h1>Quiz List</h1>
          <ul>
              {this.renderQuizes()}
          </ul>
      </div>
    );
  }
}

export default QuizList;