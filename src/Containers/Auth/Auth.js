import React, {Component} from 'react';
import classes from './Auth.css'
import Button from '../../Components/UI/Button/Button'
import Input from '../../Components/UI/Input/Input'
import is from 'is_js'
import {auth} from '../../store/actions/auth'
import {connect} from 'react-redux'

class Auth extends Component {

  state = {
      isFormValid: false,
      formControls: {
          email: {
              value: '',
              type: 'email',
              label: 'Email',
              errorMessage: 'Enter valid email',
              valid: false,
              touched: false,
              validation: {
                  required: true,
                  email: true
              }
          },
          password: {
              value: '',
              type: 'password',
              label: 'Password',
              errorMessage: 'Enter valid password',
              valid: false,
              touched: false,
              validation: {
                  required: true,
                  minLength: 6
              }
          }
      }
  };
    loginHandler = ()=>{
        this.props.auth(
          this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        );
    };
    registerHandler = ()=>{
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        );

    };
    submitHandler = (event)=>{
      event.preventDefault()
    };
    validateControl = (value, validation)=>{
        if(!validation){
            return true
        }
        let isValid = true;

        if(validation.required){
            isValid = value.trim() !== ' ' && isValid
        }
        if(validation.email){
            isValid = is.email(value) && isValid
        }
        if(validation.minLength){
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    };
    onChangeHandler = (event, controlName)=>{
        const formControls = this.state.formControls;
        const control = formControls[controlName];
        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].valid && isFormValid
        });
        this.setState({
            formControls, isFormValid

        })
    };

    renderInputs =()=>{
        return Object.keys(this.state.formControls).map((controlName, index)=>{
            const control = this.state.formControls[controlName];
            return(
                <Input
                    key={index}
                    value={control.value}
                    type={control.type}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    valid={control.valid}
                    touched={control.touched}
                    shouldValidate={!!control.validation}
                    onChange={(event)=>{this.onChangeHandler(event, controlName)}}
                />
            )
        });
    };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
            <h1>Authentification</h1>
            <form className={classes.AuthForm} onSubmit={this.submitHandler}>
                {this.renderInputs()}
                <Button
                    onClick={this.loginHandler}
                    type='succsess'
                    disabled={!this.state.isFormValid}
                >Enter</Button>
                <Button
                    onClick={this.registerHandler}
                    type='primary'
                    disabled={!this.state.isFormValid}
                >Register</Button>
            </form>
        </div>

      </div>
    );
  }
}
// function mapStateToProps(state){
//     return{
//
//     }
// }
function mapDispatchToProps(dispatch){
    return{
        auth: (email, password, isLogin) => (dispatch(auth(email, password, isLogin)))
    }
}

export default connect(null, mapDispatchToProps)(Auth);