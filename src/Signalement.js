import React, { Component } from 'react';
import { NavLink,withRouter } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table , Form,Input, FormGroup} from 'reactstrap';
import Leaflet from 'leaflet';
import {MapContainer, TileLayer, Marker, Popup, LayerGroup,CircleMarker,Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import authHeader from './auth-header';
import Footer from './Footer';
import Header from './Header';
import Pagination from './Pagination';
import AuthService from './auth.service';

Leaflet.Icon.Default.imagePath ='../node_modules/leaflet'

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class Signalement extends Component {

    
    emptyItem = {
        idregion: '',
        datemin: '',
        datemax: '',
        idtype: '',
        status: ''
    };

    emptyItem2 = {
        status: ''
    };

    emptySign = {
        idregion: '',
        datemin: '',
        datemax: '',
        idtype: '',
        status: ''
    };

    carteEmpty ={
        lat: '',
        long: '',
        nom: ''
    };

    constructor(props) {
        super(props);
        this.state = {signalement: this.emptySign,item2: this.emptyItem2,item: this.emptyItem,types: [],regions: [], listes: [],carte: this.carteEmpty,
            redirect: null,
            userReady: false,
            currentUser: { username: "" },
            nbPage : null,
            colors : ["red","green","yellow","blue","grey","white"],
            type:[],utilisateur:[],
            urlPhoto:['../build/assets/img/accident.jpg','../build/assets/img/route.jpg','../build/assets/img/ordures.jpg','../build/assets/img/innondation.jpg']};
        //this.carte = this.carte.bind(this);
        this.search = this.search.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.changer = this.changer.bind(this);
        
        this.changePage = (data) => {
            this.setState({type:[]})
        var url = '/lisignalements?idregion='+this.props.match.params.id;
        if(this.state.item['idtype']!=='') url = url+ '&&idtype='+this.state.item['idtype'];
        if(this.state.item['status']!=='') url = url+ '&&status='+this.state.item['status'];
        if(this.state.item['datemin']!=='') url = url+ '&&datemin='+this.state.item['datemin'];
        if(this.state.item['datemax']!=='') url = url+ '&&datemax='+this.state.item['datemax'];

        console.log(url)
        fetch(url+'&&pageNumber='+(data.selected),{
            
        //fetch('/lisignalements?idregion=0'+'&&pageNumber=0',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : authHeader().Authorization
            }
        }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
                AuthService.logout();
                this.props.history.push('/');
                window.location.reload();
            }
          })
        .then(data => this.setState({listes: data.content,nbPage: data.totalPages}));
        
        fetch(url+'&&pageNumber='+(data.selected),{
            headers: {
                'Authorization' : authHeader().Authorization
            }
        }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
                AuthService.logout();
                this.props.history.push('/');
                window.location.reload();
            }
          })
        .then(data => data.content.forEach(si => {
            fetch(`/typesignalements/${si.idtype}`,{
                headers: {
                    'Authorization' : authHeader().Authorization
                }
            }).then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                    AuthService.logout();
                    this.props.history.push('/');
                    window.location.reload();
                }
              })
            .then(data => this.setState({type:this.state.type.concat(data)}));
        }));
        }
    }

    componentDidMount() {
        this.setState({type:[]})
        console.log('/lisignalements?idregion='+this.props.match.params.id+'&&pageNumber=0');
        const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true })
        fetch('/typesignalements',{
            headers: {
                'Authorization' : authHeader().Authorization
            }
        }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
                AuthService.logout();
                this.props.history.push('/');
                window.location.reload();
            }
          })
        .then(data => this.setState({types: data}));
        console.log(this.state.item)
        //console.log('/lisignalements?idregion='+this.props.match.params.id+'&&pageNumber=0');
        fetch('/lisignalements?idregion='+this.props.match.params.id+'&&pageNumber=0',{
            headers: {
                'Authorization' : authHeader().Authorization
            }
        }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
                AuthService.logout();
                this.props.history.push('/');
                window.location.reload();
            }
          })
        .then(data => this.setState({listes: data.content,nbPage: data.totalPages}));

        fetch('/lisignalements?idregion='+this.props.match.params.id+'&&pageNumber=0',{
            headers: {
                'Authorization' : authHeader().Authorization
            }
        }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
                AuthService.logout();
                this.props.history.push('/');
                window.location.reload();
            }
          })
        .then(data => data.content.forEach(si => {
            fetch(`/typesignalements/${si.idtype}`,{
                headers: {
                    'Authorization' : authHeader().Authorization
                }
            }).then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                    AuthService.logout();
                    this.props.history.push('/');
                    window.location.reload();
                }
              })
            .then(data => this.setState({type:this.state.type.concat(data)}));
        }));

        fetch('/regions',{
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
                    window.location.reload();
                }
              })
            .then(data => this.setState({regions: data}));

            fetch('/utilisateurs',{
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
                        window.location.reload();
                    }
                  })
                .then(data => this.setState({utilisateur: data}));
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const nom = target.name;
        let item = {...this.state.item};
        item[nom] = value;
        this.setState({item});
        console.log(this.state.item)
    }

    handleChange2(event) {
        const target = event.target;
        const value = target.value;
        const nom = target.name;
        let item2 = {...this.state.item2};
        item2[nom] = value;
        this.setState({item2});
        console.log(this.state.item2)
    }

    async changer(id){
        await fetch(`/signalements/${id}`,{
            headers: {
                'Authorization' : authHeader().Authorization
            }
        }).then((response) => {
            if (!response.ok){
                AuthService.logout();
                this.props.history.push('/');
                window.location.reload();
            }
          })
        
        const sign = await (await fetch(`/signalements/${id}`,{
            headers: {
                'Authorization' : authHeader().Authorization
            }
        })).json();
        this.setState({signalement: sign});
        let item2 = {...this.state.item2};
        let signalement = {...this.state.signalement};
        signalement['status'] = item2['status'];
        this.setState({signalement});
        await fetch('/signalements' + (signalement.id ? '/' + signalement.id : ''), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : authHeader().Authorization
            },
            body: JSON.stringify(signalement),
        }).then((response) => {
            if (!response.ok){
                AuthService.logout();
                this.props.history.push('/');
                window.location.reload();
            }
          })

          fetch('/typesignalements',{
            headers: {
                'Authorization' : authHeader().Authorization
            }
        }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
                AuthService.logout();
                this.props.history.push('/');
                window.location.reload();
            }
          })
        .then(data => this.setState({types: data}));
        console.log(this.state.item)
        //console.log('/lisignalements?idregion='+this.props.match.params.id+'&&pageNumber=0');
        fetch('/lisignalements?idregion='+this.props.match.params.id+'&&pageNumber=0',{
            headers: {
                'Authorization' : authHeader().Authorization
            }
        }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
                AuthService.logout();
                this.props.history.push('/');
                window.location.reload();
            }
          })
        .then(data => this.setState({listes: data.content,nbPage: data.totalPages}));

        fetch('/lisignalements?idregion='+this.props.match.params.id+'&&pageNumber=0',{
            headers: {
                'Authorization' : authHeader().Authorization
            }
        }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
                AuthService.logout();
                this.props.history.push('/');
                window.location.reload();
            }
          })
        .then(data => data.content.forEach(si => {
            fetch(`/typesignalements/${si.idtype}`,{
                headers: {
                    'Authorization' : authHeader().Authorization
                }
            }).then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                    AuthService.logout();
                    this.props.history.push('/');
                    window.location.reload();
                }
              })
            .then(data => this.setState({type:this.state.type.concat(data)}));
        }));

        fetch('/regions',{
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
                    window.location.reload();
                }
              })
            .then(data => this.setState({regions: data}));
    }
    

    async search(event){
        event.preventDefault();
        console.log(this.state.item)
        var url = '/lisignalements?idregion='+this.props.match.params.id;
        if(this.state.item['idtype']!=='') url += '&&idtype='+this.state.item['idtype'];
        if(this.state.item['status']!=='') url += '&&status='+this.state.item['status'];
        if(this.state.item['datemin']!=='') url += '&&datemin='+this.state.item['datemin'];
        if(this.state.item['datemax']!=='') url += '&&datemax='+this.state.item['datemax'];
        fetch(url+'&&pageNumber=0',{
            headers: {
                'Authorization' : authHeader().Authorization
            }
        }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
                AuthService.logout();
                this.props.history.push('/');
                window.location.reload();
            }
          })
        .then(data => this.setState({listes: data.content,nbPage: data.totalPages}));
        fetch(url+'&&pageNumber=0',{
            headers: {
                'Authorization' : authHeader().Authorization
            }
        }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
                AuthService.logout();
                this.props.history.push('/');
                window.location.reload();
            }
          })
        .then(data => data.content.forEach(si => {
            fetch(`/typesignalements/${si.idtype}`,{
                headers: {
                    'Authorization' : authHeader().Authorization
                }
            }).then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                    AuthService.logout();
                    this.props.history.push('/');
                    window.location.reload();
                }
              })
            .then(data => this.setState({type:this.state.type.concat(data)}));
        }));
    }

    render() {
        if (this.state.redirect) {
            this.props.history.push('/');
                    window.location.reload();
          }
          
        const {item} = this.state;
        const {nbPage,types, listes,carte,regions,colors} = this.state;

    
        const typeListe = types.map(type => {
            return (<option value={type.id} >{type.titre}</option>)
        });
        
        const signalementListe = listes.map(liste =>{
            var typesig = ""
            for(var j = 0;j<this.state.type.length;j++){
                if(this.state.type[j].id==liste.idtype){
                    typesig = this.state.type[j].titre
                }
            }
            var util = ""
            for(var j = 0;j<this.state.utilisateur.length;j++){
                if(this.state.utilisateur[j].id==liste.idutilisateur){
                    util = this.state.utilisateur[j].nom
                }
            }
            return <div class="col-md-4 ftco-animate fadeInUp ftco-animated">
                    <div class="block-7">
                        <div class="img"><img src={this.state.urlPhoto[liste.idtype-1]} width={350} height={240}></img></div><br></br>
                            <div class="text-center p-4">
                                {/* type */}
                                <span class="excerpt d-block">{typesig}</span>
                                <ul class="pricing-text mb-8">
                                    <li>{util}</li>
                                    <li class="status">{liste.status}</li>
                                </ul>
                                <select name="status" onChange={this.handleChange2}>
                                <option value="" >Choisissez un status</option>
                                <option value="nouveau" >Nouveau</option>
                                <option value="en cours" >En cours</option>
                                <option value="resolu" >Résolu</option>
                                </select>
                                <div className='my-2 my-lg-2'>
                                <button class="btn btn-outline-success my-md-2" onClick={() => this.changer(liste.id)}>Changer</button>
                                <button class="btn btn-outline-danger my-md-2" onClick={() => this.props.history.push("/detailsSignalements/" + liste.id)}>Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
            
        });
        const point = listes.map(liste => {
            var typesig = ""
            for(var j = 0;j<this.state.type.length;j++){
                if(this.state.type[j].id==liste.idtype){
                    typesig = this.state.type[j].titre
                }
            }
            const color = { color:colors[liste.idtype-1],fillColor:colors[liste.idtype-1]}
            return <LayerGroup>
                <CircleMarker
                center={[liste.coorX, liste.coorY]}
                pathOptions={color}
                radius={10}
                eventHandlers={{
                    click: () => {
                        this.props.history.push("/detailsSignalements/" + liste.id);
                    },
                  }}
                >
                    <Tooltip>
                        Signalement n°{liste.id} <br></br> {typesig} du {liste.date}
                    </Tooltip>

                </CircleMarker>
            </LayerGroup>
        })

   
        
    
        return (
            <div>
                <header>
                <Header />
            </header>
            <div id="main">
                <article>
                <section class="ftco-section bg-light">
                    <div class="container">
                  
                        <div class="row justify-content-center pb-5 mb-3">
                            <div class="col-md-7 heading-section text-center ftco-animate fadeInUp ftco-animated">
                                <h2>Liste de signalements</h2>
                            </div>
                            <div class="my-2 my-lg-0">
                                <form onSubmit={this.search} class="form-inline my-2 my-lg-0">
                                    <select  class="form-control mr-sm-2" name="idtype" onChange={this.handleChange} defaultValue={item.idtype || ''} autoComplete="idtype" id="typesignalement">
                                    <option value="" >Type Signalement</option>
                                                        {typeListe}
                                    </select>

                                    <select  class="form-control mr-sm-2" name="status" onChange={this.handleChange} defaultValue={item.status || ''} autoComplete="status" id="status">
                                    <option value="">Status</option>
                                    <option value="nouveau" >nouveau</option>
                                    <option value="en cours" >en cours</option>
                                    <option value="resolu" >resolu</option>
                                    </select>

                                    <input class="form-control mr-sm-2" type="date" name="datemin" onChange={this.handleChange} defaultValue={item.datemin || ''} autoComplete="datemin"></input>
                                    <input class="form-control mr-sm-2" type="date" name="datemax" onChange={this.handleChange} defaultValue={item.datemax || ''} autoComplete="datemax"></input>
                                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </form>
                            </div>
                        </div>

                        {/* liste signalement */}
                        <div class="row">
                            {signalementListe}
                        </div>
                    </div>
                    <Pagination  pages={nbPage} onChange={this.changePage} currentPage="0" />
                    
                </section>
                
            <div style={{ width: '750px', height: '900px'}} className="center">
                                                            
                    <MapContainer center={[	-18.766947, 46.869107]} zoom={6} scrollWheelZoom={false} style={{width: '750px', height: '900px'}}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {point}
                    </MapContainer>
                </div>
                </article>
                <nav>
                </nav>
                <aside>
                    
                </aside>
                
            </div>
            <footer>
                <Footer />
            </footer>
            </div>
        );
    }
}

export default withRouter(Signalement);