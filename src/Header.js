import React, { Component } from 'react';
import { NavLink,Redirect,withRouter,useHistory } from 'react-router-dom';
import AuthService from './auth.service';
import { Button, Container, FormGroup, Input, Form } from 'reactstrap';
import authHeader from './auth-header';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {currentUser: { username: "" },loading:false,};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
        
    }

    componentDidMount() {
            this.setState({type:[]})
            const currentUser = AuthService.getCurrentUser();
            console.log("userrrrrrrrrrrrrrrrrrrr"+this.state.currentUser.id);

        if (!currentUser){
            this.setState({ redirect: "/" }); 
        } else{
            this.setState({currentUser:currentUser})
        }
    }

    async handleSubmit(event) {
        event.preventDefault(); 
        AuthService.logout();
        this.props.history.push('/')
    }
    async handleSubmit2(event) {
        event.preventDefault(); 
        const currentUser = AuthService.getCurrentUser();
        fetch('/responsables/'+currentUser.id,{
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
    }

    render() {
        return (
            <body>
                <header id="header" class="fixed-top">
                    <div class="container d-flex align-items-center">

                    <h1 class="logo mr-auto"><a href="index.html">Responsable</a></h1>
                    <a href="index.html" class="logo mr-auto"><img src="#" alt="" class="img-fluid"></img></a>
                    
                    <div className='button-header'>
                        <nav class="nav-menu d-none d-lg-block">
                            <ul className='my-2 my-lg-0'>
                            <Button id="btn1"><NavLink to={"/Home"}>Accueil</NavLink></Button>
                            <Form onSubmit={this.handleSubmit2}>
                            <Button id="btn1" type="submit" value="Signalement">Signalement</Button>{' '}
                            </Form>
                            <Form onSubmit={this.handleSubmit}>
                            <Button id="btn1" type="submit" >Se deconnecter</Button>{' '}
                            </Form>
                            </ul>
                        </nav>
                    </div>
                    </div>
                </header>
            </body>
        );
    }
}
export default withRouter(Header);