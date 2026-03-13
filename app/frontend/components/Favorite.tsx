import "../styles/Favorite.css"

import { AppContext } from "./PlacesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";

export default function Favorite() {
  const context = useContext(AppContext);
  if (!context) return null;
  const { appPlaces } = context;
  const placesEntries = Object.entries(appPlaces).filter(([key,index]) => (key && index.liked));

  if (placesEntries.length > 0) {
    return (
      <section className="favorite">
        {placesEntries.map(([key,index]) => (
          <article key={key} className="favorite-place">
            <img src={index.image} alt="favorite-image.jpg"/>
            <div className="favorite-place-info">
              <h2>{index.title}</h2>
            </div>
          </article>
        ))}
      </section>
    );
  };

  return (
    <section className="favorite" id="empty">
      <span><FontAwesomeIcon icon={faHeartCrack}/></span>
      <p>Нету избранных мест</p>
    </section>
  );
};