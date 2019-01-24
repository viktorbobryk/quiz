import axios from 'axios'
import {AUTH_SUCCESS,
    AUTH_LOGOUT
} from './actionTypes'

export function auth(email, password, islogin){
    return async (dispatch) => {
        const authData = {
          email: email,
          password: password,
          returnSecureToken: true
        };
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDrZdE7bKJHijuicQND_gvnk5qfJoN8PLw";
            if(islogin){
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDrZdE7bKJHijuicQND_gvnk5qfJoN8PLw"
            }
         const response = await axios.post(url, authData);
            // console.log(response.data);
            const data = response.data;
            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
            console.log('data: ', expirationDate);
            localStorage.setItem('token', data.idToken);
            localStorage.setItem('userId', data.localId);
            localStorage.setItem('expirationDate', expirationDate);

            dispatch(authSuccess(data.idToken));
            dispatch(autoLogout(data.expiresIn));
    }
}

export function autoLogout(time){
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout())
        }, time * 1000)
    }
}
export function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return{
        type: AUTH_LOGOUT
    }
}

export function autoLogin(){
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout())
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logout())
            }
            else{
                dispatch(authSuccess(token));
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export function authSuccess(token){
    return{
        type: AUTH_SUCCESS,
        token: token
    }
}