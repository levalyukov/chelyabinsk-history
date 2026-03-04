import "../styles/Profile.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Profile({setSettings}: {setSettings: (state:boolean) => void}) {
  return (
    <section className="profile">
      <div className="profile-card">
        <div className="profile-main">
          <img src="https://i.pinimg.com/1200x/41/e9/20/41e92004ca4c93d08b8dc33583cb9751.jpg" alt="profile.jpg"/>
          <span className="profile-card-info">
            <h1>Username</h1>
            <p>Статус</p>
          </span>
        </div>

        <div className="profile-info">
          <div className="profile-statistic">
            <span>
              <h1>999</h1>
              <p>???</p>
            </span>

            <span>
              <h1>999</h1>
              <p>???</p>
            </span>
          </div>

          <div className="profile-panel" onClick={() => setSettings(true)}>
            <button>Редактировать</button>
          </div>
        </div>
        
      </div>

      <div className="profile-feed">
        <h1>Любимые места</h1>
        <div className="place-container">
          <article>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/%D0%A4%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%8F_%D0%A7%D0%B5%D0%BB%D1%8F%D0%B1%D0%B8%D0%BD%D1%81%D0%BA%D0%B0_%D1%81_%D0%BE%D1%82%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC_%282021%29.jpg" alt="image.jpg"/>
            <div className="place-card">
              <span className="place-rating">
                <FontAwesomeIcon icon={faStar} className="place-star"/>
                <p>5.0</p>
              </span>
              
              <span className="place-info">
                <h2>Белый Рынок</h2>
                <p>Ваше любимое место</p>
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );  
};