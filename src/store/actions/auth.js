import axios from 'axios'
import {} from './actionTypes'

export function auth(email, password, islogin){
    return async (dispatch) => {
        const authData = {
          email: email,
          password: password,
          returnSecureToken: true
        };
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDrZdE7bKJHijuicQND_gvnk5qfJoN8PLw";
            if(islogin){
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDrZdE7bKJHijuicQND_gvnk5qfJoN8PLw"
            }
         const response = await axios.post(url, authData);
            console.log(response.data);
    }
}