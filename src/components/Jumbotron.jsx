import React from "react";
import { Link } from "react-router-dom";

const jumbostyle = {
  background: "linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2) ), url('https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  minHeight: "30vh",
  color: "white"
}

const FlashMessage = () => {

  return (
    <div className="jumbotron jumbotron-fluid" style={jumbostyle}>
      <div class="container">
        <h1 className="display-4">Découvrez Form You !</h1>
        <p className="lead">Une plateforme unique pour apprendre les compétences de vos rêves.</p>
        <hr className="my-4" />
        <p>Suivez un cursus à votre rythme en choississant votre planning de formation.</p>
        <Link to="/signup" className="btn btn-primary btn-lg" href="#" role="button">Rejoindre Form You</Link>
      </div>
    </div>
  );
};

export default FlashMessage;