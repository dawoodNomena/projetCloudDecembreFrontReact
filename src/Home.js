import React, { Component } from 'react';
import Footer from './Footer';
import Header from './Header';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class Home extends Component {
    render() {
        return (
            <body>
            <header>
                <Header />
            </header>
            <div id="main">
                <article>
                <Carousel>
                <div>
                    <img src="../build/assets/img/route.jpg" />
                    <p className="legend">Route abîmee</p>
                </div>
                <div>
                    <img src="../build/assets/img/ordures.jpg" />
                    <p className="legend">Débordement d'ordures</p>
                </div>
                <div>
                    <img src="../build/assets/img/innondation.jpg" />
                    <p className="legend">Innondation</p>
                </div>
                </Carousel>
                <h3>Projet de Signalement</h3>
                <p>   Pour enrichir les relations entre le peuple et le gouvernement</p>
                <p>      Pour être à l'écoute du peuple</p>
                <p>          Regler les problemes du peuple en peu de temps</p>
                <p>Le lorem ipsum est, en imprimerie, 
                    une suite de mots sans signification 
                    utilisée à titre provisoire pour calibrer
                     une mise en page, le texte définitif
                      venant remplacer le faux-texte dès qu'il
                       est prêt ou que la mise en page est achevée. 
                       Généralement, on utilise un texte en faux latin, 
                       le Lorem ipsum ou Lipsum.</p><p>Le lorem ipsum est, en imprimerie, 
                    une suite de mots sans signification 
                    utilisée à titre provisoire pour calibrer
                     une mise en page, le texte définitif
                      venant remplacer le faux-texte dès qu'il
                       est prêt ou que la mise en page est achevée. 
                       Généralement, on utilise un texte en faux latin, 
                       le Lorem ipsum ou Lipsum.</p><p>Le lorem ipsum est, en imprimerie, 
                    une suite de mots sans signification 
                    utilisée à titre provisoire pour calibrer
                     une mise en page, le texte définitif
                      venant remplacer le faux-texte dès qu'il
                       est prêt ou que la mise en page est achevée. 
                       Généralement, on utilise un texte en faux latin, 
                       le Lorem ipsum ou Lipsum.</p><p>Le lorem ipsum est, en imprimerie, 
                    une suite de mots sans signification 
                    utilisée à titre provisoire pour calibrer
                     une mise en page, le texte définitif
                      venant remplacer le faux-texte dès qu'il
                       est prêt ou que la mise en page est achevée. 
                       Généralement, on utilise un texte en faux latin, 
                       le Lorem ipsum ou Lipsum.</p>
                </article>
                <nav></nav>
                <aside></aside>
            </div>
            <footer>
                <Footer />
            </footer>
            </body>
        );
    }
}

export default Home;