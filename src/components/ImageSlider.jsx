import Carousel from 'react-bootstrap/Carousel';

function CarouselFadeExample() {
  return (
    <Carousel fade variant="dark">
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src={require('./images/Slider3.jpg')}
          alt="First slide"
        />
        <Carousel.Caption>
          <h2>
Développement de logiciels</h2>
          <p>La perfection est atteinte non pas lorsqu'il n'y a plus rien à ajouter, mais plutôt lorsqu'il n'y a plus rien à enlever.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img 
          className="d-block w-100" 
          src={require('./images/Slider2.jpg')}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h2 style={{color:"white"}}>Déploiement et monitoring des serveurs</h2>
          <p style={{color:"white"}}>Faites-le fonctionner, faites-le bien, faites-le vite.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100" 
          src={require('./images/Slider1.jpg')}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h2 >Mise en réseau et interconnexion</h2>
          <p>
            
Le réseautage ne consiste pas seulement à connecter les gens. Il s'agit de connecter les gens avec les gens, les gens avec des idées et les gens avec des opportunités
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFadeExample;