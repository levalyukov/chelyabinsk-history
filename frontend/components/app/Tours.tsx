import "../../styles/app/Tours.css"

import kirovka from "../../images/wallpapers/kirovka.png"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard, faNewspaper } from "@fortawesome/free-solid-svg-icons";

function Tours() {
  return (
    <section id="tours">
      <div className="main-container">
        <h1 id="title">Заголовок</h1>
        <p id="subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="container-tours">
          <article>
            <img src={kirovka} alt="kirovka.png"/>
            <div className="info">
              <h2>Lorem ipsum</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, beatae, quis!</p>
              <div className="buttons">
                <button><FontAwesomeIcon icon={faClapperboard}/> Репортаж</button>
                <button className="ghost"><FontAwesomeIcon icon={faNewspaper}/> Подробнее</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Tours;