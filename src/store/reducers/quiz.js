import {
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE,
    FINISH_QUIZ, QUIZ_NEXT_QUESTION
} from "../actions/actionTypes";

const initialState = {
    quizes: [],
    loading: true,
    error: null,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: 0
};


function quizReducer(state = initialState, action){
  switch(action.type){
      case FETCH_QUIZES_START:
          return {
              ...state, loading: true
          };
      case FETCH_QUIZES_SUCCESS:
          return {
              ...state, loading: false, quizes: action.quizes
          };
      case FETCH_QUIZES_ERROR:
          return {
              ...state, error: action.error
          };
      case FETCH_QUIZ_SUCCESS:
          return {
              ...state, loading: false, quiz: action.quiz
          };
      case QUIZ_SET_STATE:
          return {
              ...state,  answerState: state.answerState, results: state.results
          };
      case FINISH_QUIZ:
          return {
              ...state,  isFinished: true
          };
      case QUIZ_NEXT_QUESTION:
          return {
              ...state, activeQuestion: action.number, answerState: null
          };
      default: return state
  }
}

export default quizReducer;