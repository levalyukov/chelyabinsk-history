import "../../styles/modals/UserGeolocation.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";

export default function UserGeolocation({errorTitle, errorText, UGvisible, setUG}: {
  errorTitle:string, errorText:string, UGvisible:boolean, setUG: (state:boolean) => void
}):React.ReactNode {
  return (
    <div className="user-geolocation-background" id={!UGvisible ? "visible" : ""}>
      <div className="user-geolocation">
        <span className="user-geolocation-icon"><FontAwesomeIcon icon={faFaceFrown}/></span>
        <span className="user-geolocation-text">
          <h1>{errorTitle}</h1>
          <p>{errorText}</p>
        </span>
        <button onClick={() => setUG(false)}>ОК</button>
      </div>
    </div>
  );
};