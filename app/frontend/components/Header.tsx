import "../styles/Header.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass as compassSolid,   faUser as userSolid,   faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";
import { faCompass as compassRegular, faUser as userRegular, faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";

export default function Header({setPage, getPage}: 
  {setPage: (page:"map" | "favorite" | "profile") => void, getPage:string}) {
  return (
    <>
      <header className="mobile">
        <nav className="links-container">
          
          <button onClick={() => setPage("map")} className={getPage === "map" ? "active" : ""}>
            <span><FontAwesomeIcon icon={getPage === "map" ? compassSolid : compassRegular}/></span>
            <p>Исследовать</p>
          </button>

          <button onClick={() => setPage("favorite")} className={getPage === "favorite" ? "active" : ""}>
            <span><FontAwesomeIcon icon={getPage === "favorite" ? heartSolid : heartRegular}/></span>
            <p>Избранное</p>
          </button>

          <button onClick={() => setPage("profile")} className={getPage === "profile" ? "active" : ""}>
            <span><FontAwesomeIcon icon={getPage === "profile" ? userSolid : userRegular}/></span>
            <p>Профиль</p>
          </button>
        </nav>
      </header>
    </>
  );
};