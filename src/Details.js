import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import authHeader from './auth-header';
import Footer from './Footer';
import Header from './Header';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Details = () => { 
    const id = useParams();
    const [sig, setSig] = useState();
    const [type, setType] = useState();
    const [utilisateur, setUtilisateur] = useState();
    const [img, setImg] = useState();
    const [isPending, setIsPending] = useState(true);
    const [url, setUrl] = useState("/signalements/"+id.id);
    const [imgUrl, setImgUrl] = useState("/detailsSignalement/"+id.id);

    async function fiche(url){
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'GET',
            headers: {
                'Authorization' : authHeader().Authorization
            }
        };
        
        await fetch(url,options).then(res => {
            if (res.status === 401) throw Error('Acces non autoriser au serveur!');
            else if(res.status === 500) throw Error('Internal Serveur Error !');
            return res.json();

        }).then(data => {
            setIsPending(false);
            console.log(data);
            setSig(data);
            fetch('/typesignalements/'+data.idtype,options).then(res => {
                if (res.status === 401) throw Error('Acces non autoriser au serveur!');
                else if(res.status === 500) throw Error('Internal Serveur Error !');
                return res.json();
    
            }).then(data => {
                setIsPending(false);
                console.log(data);
                setType(data);
            })
            fetch('/utilisateurs/'+data.idutilisateur,options).then(res => {
                if (res.status === 401) throw Error('Acces non autoriser au serveur!');
                else if(res.status === 500) throw Error('Internal Serveur Error !');
                return res.json();
    
            }).then(data => {
                setIsPending(false);
                console.log(data);
                setUtilisateur(data);
            })
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                console.log(err.message);
                // auto catches network / connection error
                setIsPending(false);
                // setLoginErrors(err.message);
            }
        })
    }

    async function images(url){
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'GET',
            headers: {
                'Authorization' : authHeader().Authorization
            }
        };
        
        await fetch(imgUrl,options).then(res => {
            if (res.status === 401) throw Error('Acces non autoriser au serveur!');
            else if(res.status === 500) throw Error('Internal Serveur Error !');
            return res.json();

        }).then(data => {
            setIsPending(false);
            console.log(data);
            setImg(data);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                console.log(err.message);
                // auto catches network / connection error
                setIsPending(false);
                // setLoginErrors(err.message);
            }
        })
    }


    useEffect(() => {
       fiche(url);
    },[url]);

    useEffect(() => {
        images(imgUrl);
     },[imgUrl]);
        return (
            <div>
                <body>
            <header>
                <Header />
            </header>
            <div id="main">
                <article>
                <div class="row">
                    <div class="col-md-6">
                        <div class="block-7">
                            <Carousel>
                            {img &&
                            img.images.map((img)=>
                            <div>
                                <img src={`${img}`}/>
                                
                            </div>
                            )
                            }
                            </Carousel>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="block-7">
                            <div class="text-center p-6">
                            {sig && type && utilisateur &&
                                                                <>
                                <span class="excerpt d-block">{type.titre}</span>
                                <ul class="pricing-text mb-5">
                                    <li>{utilisateur.nom}</li>
                                    <li>Coordonnee X: {sig.coorX}</li>
                                    <li>Coordonnee Y: {sig.coorY}</li>
                                    <li>{sig.date}</li>
                                    <li>{sig.status}</li>
                                    <li>{sig.description}</li>
                                </ul>
                                </>
                            }
                            </div>
                        </div>
                    </div>
                </div>
                </article>
            </div>
            <footer>
                <Footer />
            </footer>
            </body>
            </div>
        );
    
}
export default Details;