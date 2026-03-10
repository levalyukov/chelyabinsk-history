import "../styles/MapPopup.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faClock, faLocationArrow, faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function MapPopup() {
  return (
    <div className="map-popup">
      <img className="map-popup-image" src="https://chelyabinsk-love.ru/wp-content/uploads/2022/04/KMO_160860_00027_1_t218_182800.jpeg" alt="place-image.jpg" />
      <span className="map-popup-text">
        <h1>Пешеходная улица «Кировка»</h1>
        <p>Кировка — пешеходная часть улицы Кирова в Челябинске, ставшая одной из главных достопримечательностей города.</p>
        <nav className="map-popup-info">
          <p><span><FontAwesomeIcon icon={faLocationDot}/></span> Центральный район, Улица Кирова</p>
          <p><span><FontAwesomeIcon icon={faClock}/></span> Круглосуточно</p>
          <p><span><FontAwesomeIcon icon={faLocationArrow}/></span> 61.40065, 55.163917</p>
        </nav>
        
        <nav className="map-popup-actions">
          <button onClick={() => window.open("https://youtu.be/dQw4w9WgXcQ?si=Ctod-2EQX03FQiaN", "_blank")}>
            Подробнее
          </button>
          <button className="map-popup-actions-report" onClick={
            () => window.open("https://youtu.be/dQw4w9WgXcQ?si=Ctod-2EQX03FQiaN", "_blank")}>
            Смотреть репортаж <span><FontAwesomeIcon icon={faCirclePlay}/></span>
          </button>
        </nav>
      </span>
    </div>
  );
};