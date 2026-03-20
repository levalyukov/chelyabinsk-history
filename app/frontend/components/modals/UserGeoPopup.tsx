import "../../styles/modals/UserGeoPopup.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaugh } from "@fortawesome/free-solid-svg-icons";

export default function UserGeoPopup():React.ReactNode {
  return (
    <div className="user-geo-popup">
      <span><FontAwesomeIcon icon={faFaceLaugh}/></span>
      <h2>Это Вы!</h2>
      <p>И это прекрасно.</p>
    </div>
  );
};