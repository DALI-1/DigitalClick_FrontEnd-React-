import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import "./styles.css"
import Image1 from '../components/images/Router.jpg'
import Image2 from '../components/images/modem.jpg'
import Image3 from '../components/images/Cables.jpg'
import Image4 from '../components/images/hub.png'
import Image5 from '../components/images/HDMI.jpg'
import ImageDigitalClick from '../components/images/DigitalClick.png'
import Image from 'react-bootstrap/Image'
import Button from '@mui/material/Button';
import Cookies from 'universal-cookie';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { slideInLeft,bounceInRight,fadeInUp,zoomIn,bounceInUp } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import "./styles.css"
import DigitalClick from '../assets/img/Dclick.png'
import Pic1 from '../assets/img/Team1.jpg'
import Pic2 from '../assets/img/Team2.jpg'
import Expertise from '../assets/img/Expertise.jpg'
import CarouselFadeExample from "../components/ImageSlider.jsx";
import {Helmet} from "react-helmet";
export default function App() {


 let state = {
    responsive : {
     desktop: {
       breakpoint: { max: 3000, min: 1024 },
       items: 3,
       slidesToSlide: 3 // optional, default to 1.
     },
     tablet: {
       breakpoint: { max: 1024, min: 464 },
       items: 2,
       slidesToSlide: 2 // optional, default to 1.
     },
     mobile: {
       breakpoint: { max: 464, min: 0 },
       items: 1,
       slidesToSlide: 1 // optional, default to 1.
     }
   }
   }
  return (
    <>

<Helmet>
<script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
<link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />
            </Helmet>
    
<section class="about-section text-center" style={{padding:"70px"}} id="about">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-lg-8">
                        <h2 class="text-white mb-4">Notre expertise</h2>
                        <p class="text-white-50">
                        Infrastructure Informatique, Cloud & Virtualisation, Administration système (Windows & LINUX), Réseaux informatiques, Sécurité, Messagerie Internet, Développement et hébergement web, DevOps et VOIP
                        </p>
                    </div>
                </div>
                <Image  fluid={true} rounded={true } width="60%" class="img-fluid" src={Expertise} alt="..." />
            </div>
        </section>

        <section class="projects-section bg-light" id="projects">
            <div class="container px-4 px-lg-5">
                
                <div class="row gx-0 mb-4 mb-lg-5 align-items-center">
                    <div class="col-xl-8 col-lg-7"><img class="img-fluid mb-3 mb-lg-0" src={DigitalClick} alt="..." /></div>
                    <div class="col-xl-4 col-lg-5">
                        <div class="featured-text text-center text-lg-left">
                            
                            <p class="text-black-50 mb-0">
                            DiGITAL CLICK, est un intégrateur de solutions IT (Développement informatique, téléphonie IP, infrastructures réseau, sécurité, BI…).
Nous accompagnons nos clients dans la conception, le développement et l’évolution de leurs systèmes d’information autour de différents domaines d’intervention au sein de nos quatre pôles d’expertises. 

                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="row gx-0 mb-5 mb-lg-0 justify-content-center">
                    <div class="col-lg-6"><img class="img-fluid" src={Pic1} alt="..." /></div>
                    <div class="col-lg-6">
                        <div class="bg-black text-center h-100 project">
                            <div class="d-flex h-100">
                                <div class="project-text w-100 my-auto text-center text-lg-left">
                                    <h4 class="text-white">Programmation</h4>
                                    <p class="mb-0 text-white-50">Apprendre à écrire des programmes étire votre esprit et vous aide à mieux penser, crée une façon de penser aux choses qui, à mon avis, est utile dans tous les domaines.</p>
                                    <hr class="d-none d-lg-block mb-0 ms-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row gx-0 justify-content-center">
                    <div class="col-lg-6"><img class="img-fluid" src={Pic2} alt="..." /></div>
                    <div class="col-lg-6 order-lg-first">
                        <div class="bg-black text-center h-100 project">
                            <div class="d-flex h-100">
                                <div class="project-text w-100 my-auto text-center text-lg-right">
                                    <h4 class="text-white">Travail en équipe</h4>
                                    <p class="mb-0 text-white-50">La façon dont une équipe joue dans son ensemble détermine son succès. Vous avez peut-être le plus grand groupe de stars individuelles au monde, mais s'ils ne jouent pas ensemble, le club ne vaudra pas un centime</p>
                                    <hr class="d-none d-lg-block mb-0 me-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      <section class="contact-section bg-black">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5">
                    <div class="col-md-4 mb-3 mb-md-0">
                        <div class="card py-4 h-100">
                            <div class="card-body text-center">
                                <i class="fas fa-map-marked-alt text-primary mb-2"></i>
                                <h4 class="text-uppercase m-0">Address</h4>
                                <hr class="my-4 mx-auto" />
                                <div class="small text-black-50">Route l’Afran Km 3, Immeuble l'Afran centre 2, App N°2-5 , Sfax, 3062, TN</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3 mb-md-0">
                        <div class="card py-4 h-100">
                            <div class="card-body text-center">
                                <i class="fas fa-envelope text-primary mb-2"></i>
                                <h4 class="text-uppercase m-0">Email</h4>
                                <hr class="my-4 mx-auto" />
                                <div class="small text-black-50"><a href="#!">DigitalClick@Gmail.com</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3 mb-md-0">
                        <div class="card py-4 h-100">
                            <div class="card-body text-center">
                                <i class="fas fa-mobile-alt text-primary mb-2"></i>
                                <h4 class="text-uppercase m-0">Phone</h4>
                                <hr class="my-4 mx-auto" />
                                <div class="small text-black-50">+216 29 68 07 06</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="social d-flex justify-content-center">
                    <a class="mx-2" href="#!"><i class="fab fa-twitter"></i></a>
                    <a class="mx-2" href="#!"><i class="fab fa-facebook-f"></i></a>
                    <a class="mx-2" href="#!"><i class="fab fa-github"></i></a>
                </div>
            </div>
        </section>

        <footer class="footer bg-black small text-center text-white-50"><div class="container px-4 px-lg-5">Copyright &copy; Digital Click 2022</div></footer>


        
    </>
  );
}