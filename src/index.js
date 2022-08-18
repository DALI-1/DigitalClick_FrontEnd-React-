import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ManageServer from './components/ManageServer';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.title="Digital Click Management"


root.render(
<>
   {/*<Navbar/> */} 
   <helmet>

   
   <head>
    <meta charset="utf-8" />
    
    <link rel="icon" href="http://example.com/favicon.png"/>
    
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Oxygen:300,400,500,700,400italic"/>
</head>
</helmet>
    <App/>
    {(window.location.pathname!="/UnauthorizedAccess" &&window.location.pathname!="/SignUp" && window.location.pathname!="/SignIn")?<Footer/>:<></>}
    
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
