import "../../styles/MapPopup.css"

import { type PlaceContent } from "../../interfaces/reports.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faLocationArrow, faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function MapPopup({place}: {place:PlaceContent}):React.ReactNode {
  const TITLE_MAX:number = 26;
  const DESCRIPTION_MAX:number = 128;
  const PLACE_INFO:number = 64;

  const datetime = new Date();
  const dayIndex:number = datetime.getDay() === 0 ? 6 : datetime.getDay() - 1;

  return (
    <div className="map-popup">
      <img className="map-popup-image" src={place.popup.image} alt="place-image.jpg" />
      <span className="map-popup-text">
        <h1>{((place.popup.title).length > TITLE_MAX) ? (place.popup.title).slice(0,TITLE_MAX) : place.popup.title}</h1>
        <p>{((place.popup.description).length > DESCRIPTION_MAX) ? 
        (place.popup.description).slice(0,DESCRIPTION_MAX) : place.popup.description}</p>
        <nav className="map-popup-info">
          <p><span><FontAwesomeIcon icon={faLocationDot}/></span> {((place.popup.address).length > PLACE_INFO) 
          ? (place.popup.address).slice(0,PLACE_INFO) : place.popup.address}</p>
          <p><span><FontAwesomeIcon icon={faClock}/></span> {place.popup.schedule === undefined 
          ? ("Круглосуточно") : (
            <>
              {String(place.popup.schedule[dayIndex].openHours).padStart(2, "0")}:
              {String(place.popup.schedule[dayIndex].openMinutes).padStart(2, "0")}
              &nbsp;-&nbsp;
              {String(place.popup.schedule[dayIndex].closeHours).padStart(2, "0")}:
              {String(place.popup.schedule[dayIndex].closeMinutes).padStart(2, "0")}
            </>
          )}</p>
          <p><span><FontAwesomeIcon icon={faLocationArrow}/></span> {place.coords[1]} {place.coords[0]}</p>
        </nav>
        
        <nav className="map-popup-actions">
          <button className="map-popup-actions-report" onClick={() => console.log("")}>
            Смотреть репортаж <span><FontAwesomeIcon icon={faCirclePlay}/></span>
          </button>
        </nav>
      </span>
    </div>
  );
};