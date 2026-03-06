import "../styles/Profile.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Profile({setSettings}: 
  {setSettings: (state:boolean) => void}) {
  return (
    <section id="user-profile">
      <div className="profile">
        <img src="https://i.pinimg.com/736x/b5/46/ce/b546ce5a216eaecbfc4ccfe563750c36.jpg" alt="pfp.jpg" />
        <h1>Username</h1>
      </div>
    </section>
  );  
};