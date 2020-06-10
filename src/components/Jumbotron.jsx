import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const jumbostyle = {
  background: "linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2) ), url('https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  minHeight: "30vh",
  color: "white"
}

const FlashMessage = () => {
  const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  return (
    <div className="jumbotron jumbotron-fluid" style={jumbostyle}>
      <div className="container">
        {isAuthenticated ?
          <>
            <h1 className="display-4">Bonjour {user.first_name}, ravi de vous revoir sur Form You !</h1>
            <p className="lead">Que souhaitez-vous apprendre aujourd'hui ?</p>
          </>
          :
          <>
            <h1 className="display-4">Découvrez Form You !</h1>
            <p className="lead">Une plateforme unique pour apprendre les compétences de vos rêves.</p>
            <hr className="my-4" />
            <p>Suivez un cursus à votre rythme en choississant votre planning de formation.</p>
            <Link to="/signup" className="btn btn-primary btn-lg" href="#" role="button">Rejoindre Form You</Link>
          </>
        }
      </div>
    </div>
  );
};

export default FlashMessage;