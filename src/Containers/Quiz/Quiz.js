import React from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../Components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../Components/FinishedQuiz/FinishedQuiz'

class Quiz extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
            quiz: [
                {
                    question: 'what color is the sky',
                    rightAnswerId: 3,
                    id: 0,
                    answers: [
                        {text: 'black', id: 1},
                        {text: 'white', id: 2},
                        {text: 'blue', id: 3},
                        {text: 'red', id: 4},
                        {text: 'green', id: 5}
                    ]
                },
                {
                    question: 'what color is the ground',
                    rightAnswerId: 1,
                    id: 1,
                    answers: [
                        {text: 'black', id: 1},
                        {text: 'white', id: 2},
                        {text: 'blue', id: 3},
                        {text: 'red', id: 4},
                        {text: 'green', id: 5}
                    ]
                }
            ]
        }
    }
    onAnswerClickHandler  = (AnswerId)=> {
        // console.log(AnswerId);
        if(this.state.answerState){
            const key = Object.keys(this.state.answerState)[0];
            if(key === 'success'){
                return
            }
        }
        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;
        if(question.rightAnswerId === AnswerId){
            if(!results[AnswerId]){
                results[question.id] = 'success'
            }
            this.setState(
                {
                    answerState: {[AnswerId]: 'success'},
                    results: results
                }
            );
            const timeout = window.setTimeout(()=>{
                if(this.isQuizFinished()){
                    this.setState(
                        {isFinished: true}
                    );
                }
                else{
                    this.setState(
                        {
                            activeQuestion: this.state.activeQuestion + 1,
                            answerState: null
                        }
                    )
                }
                window.clearTimeout(timeout);
            }, 1000);

        }
        else{
            results[question.id]='error';
            this.setState({
                answerState: {[AnswerId]: 'error'},
                results: results
            });
        }

    };
    isQuizFinished = ()=> {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    };

    retryHendler = () => {
      this.setState(
          {
              results: {},
              isFinished: false,
              activeQuestion: 0,
              answerState: null
          }
      )
    };


    render(){
        console.log(this.props.match.params.id);
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer all the questions</h1>
                    {
                        this.state.isFinished ?
                            <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                retry={this.retryHendler}
                            /> :
                            <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                onAnswerClick={this.onAnswerClickHandler}
                                activeQuestion={this.state.activeQuestion}
                                quizLength={this.state.quiz.length}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                state={this.state.answerState}
                            />
                    }

                </div>
            </div>
        )
    }
}
export default Quiz