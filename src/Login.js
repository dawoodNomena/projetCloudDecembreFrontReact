import React, { Component } from 'react';
import AuthService from './auth.service';
import { Button, Container, FormGroup, Input, Form } from 'reactstrap';
import authHeader from './auth-header';

class Login extends Component {

    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
        this.state = {
          username: "",
          password: "",
          loading: false,
          message: ""
        };
      }

      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }

    async handleSubmit(event) {
        event.preventDefault();
        //window.location.reload();
        
        this.setState({
            message: "",
            loading: true
          });

          AuthService.login(this.state.username, this.state.password).then(
            () => {
                const user = JSON.parse(localStorage.getItem('user'));
                fetch('/responsables/'+user.id,{
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization' : authHeader().Authorization
                    }
                })
                    .then((response) => {
                        if (response.ok) {
                          return response.json();
                        } else {
                            AuthService.logout();
                            this.props.history.push('/');
                        }
                      })
                    .then(data => {
                       console.log(data.idregion)
                        this.props.history.push('/signalement/'+data.idregion);
                    } );
                
              /*this.props.history.push("/regions/");
              window.location.reload();*/
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              this.setState({
                loading: false,
                message: resMessage
              });
            }
          );
        
    }
    
     
    

    render() {
        return (
            <div className='main-container'>
              <div className='container-login'>
                    <div className='logo'>Responsable</div>
                <div className='login-item'>

                  <Form onSubmit={this.handleSubmit} className='form form-login'>
                    <FormGroup >
                        <div className='input_box'>
                          {/* <label className='user' for="login-username"><span className='hidden'>Username</span></label> */}
                          
                          <Input id="login-username" 
                          type="text" name="username"
                              value={this.state.username}
                              onChange={this.onChangeUsername}
                              autoComplete="username"
                              placeholder="adresse email"
                              required/>
                        <div class="icon"><i className='mdi mdi-account'></i></div>

                        </div>

                        <div className='input_box'>
                        {/* <label className='lock' for="login-password"><span className='hidden'>Password</span></label> */}
                        
                            <Input
                            id="login-password"
                            type="password" name="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            autoComplete="password"
                            placeholder="mot de passe"
                            required/>
                          <div class="icon"><i className='mdi mdi-account-key'></i></div>
                        </div><br></br>

                        <Button type="submit">
                          <i className='mdi mdi-login'></i> Se Connecter </Button>{' '}
                        
                        {this.state.message && (
                        <div className='form-group'>
                            <div className='alert alert-danger' role="alert">
                            {this.state.message}
                            </div>
                        </div>
                        )}
                        {/* <p style="color:red">{{erreur}}</p> */}
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </div>
        );
    }
}

export default Login;