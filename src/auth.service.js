import axios from "axios";
import { Redirect } from 'react-router-dom'

const API_URL = "http://localhost:555/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin/responsable", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();

