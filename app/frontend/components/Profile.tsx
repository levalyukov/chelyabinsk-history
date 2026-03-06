import "../styles/Profile.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

export default function Profile({setSettings}: 
  {setSettings: (state:boolean) => void}) {
  return (
    <section id="user-profile">
      <div className="profile">
        <div className="profile-main">
          <img className="profile-photo" src="https://i.pinimg.com/736x/b5/46/ce/b546ce5a216eaecbfc4ccfe563750c36.jpg" alt="pfp.jpg" />
          <span className="profile-info">
            <h1>Username</h1>
            <p>/???/</p>
          </span>
        </div>
        <button className="profile-app-settings" onClick={() => setSettings(true)}>
          <FontAwesomeIcon icon={faCog}/>
        </button>
      </div>
    </section>
  );  
};