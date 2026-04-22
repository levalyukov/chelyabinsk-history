import "../../styles/modals/MapPopup.css"

import { type PlaceContent } from "../../interfaces/reports.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faClock, faLocationDot, faNewspaper } from "@fortawesome/free-solid-svg-icons";

export default function MapPopup ({place, placeID, setReportView}: 
  {place:PlaceContent, placeID:number, setReportView: (id:number) => void}) : React.ReactNode {
  const datetime = new Date();
  const dayIndex:number = datetime.getDay() === 0 ? 6 : datetime.getDay() - 1;

  return (
    <div className="map-popup">
      <img className="map-popup-image" src={place.popup.image} alt="place-image.jpg" />
      <span className="map-popup-text">
        <h1>{place.popup.title}</h1>
        <p>{place.popup.description}</p>
        <nav className="map-popup-info">
          <p><span><FontAwesomeIcon icon={faLocationDot}/></span> {place.popup.address}</p>
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

        {place.hasReport !== undefined && (
          <nav className="map-popup-actions">
            <button className="map-popup-actions-report" onClick={() => setReportView(placeID+1)}>
              Прочитать репортаж <span><FontAwesomeIcon icon={faNewspaper}/></span>
            </button>
          </nav>
        )}
      </span>
    </div>
  );
};