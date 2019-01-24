import React, { Component } from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import Quiz from './Containers/Quiz/Quiz'
import QuizList from './Containers/QuizList/QuizList'
import QuizCreator from './Containers/QuizCreator/QuizCreator'
import Auth from './Containers/Auth/Auth'
import Logout from './Components/Logout/Logout'
import './App.css';
import {connect} from 'react-redux'
import {autoLogin} from "./store/actions/auth";

class App extends Component {
    componentDidMount(){
        this.props.autoLogin()
    }
  render() {
      let routes = (
      <Switch>
          <Route path='/auth' component={Auth}/>
          <Route path='/quiz/:id' component={Quiz}/>
          <Route path='/' exact component={QuizList}/>
          <Redirect to={'/'}/>
      </Switch>
      );

      if(this.props.isAuthentificated){
           routes = (
          <Switch>
              <Route path='/quiz-creator' component={QuizCreator}/>
              <Route path='/quiz/:id' component={Quiz}/>
              <Route path='/logout' component={Logout}/>
              <Route path='/' exact  component={QuizList}/>
              <Redirect to={'/'}/>
          </Switch>
          )
      }

    return (
        <Layout>
            {routes}
        </Layout>
    );
  }
}

function mapStateToProps(state){
    return {
        isAuthentificated: !!state.auth.token
    }
}
function mapDispatchToProps(dispatch){
    return{
        autoLogin: ()=> dispatch(autoLogin())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
