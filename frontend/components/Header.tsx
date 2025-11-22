import "../styles/Header.css";
import logotype from "../images/logo.svg";

import ru from "../images/flags/RU.svg";
import us from "../images/flags/US.svg";
import de from "../images/flags/DE.svg";
import ch from "../images/flags/CN.svg";
import fr from "../images/flags/FR.svg";
import ko from "../images/flags/KR.svg";
import ua from "../images/flags/UA.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleHalfStroke, faGlobe, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Header({theme, lang}: {theme: () => void, lang: (lang:string) => void}) {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [mobileVisible, setMobileVisible] = useState<boolean>(false);

  const navmenu = {
    0: {title: "О проекте", href: "about"}
  };

  const languages = {
    1: {language: "Русский", key: "ru", flag: ru},
    2: {language: "中文", key: "zh", flag: ch},
    3: {language: "English", key: "us", flag: us},
    4: {language: "Український", key: "ua", flag: ua},
    5: {language: "Deutsch", key: "de", flag: de},
    6: {language: "Français", key: "fr", flag: fr},
    7: {language: "한국어", key: "ko", flag: ko}
  };
  
  return (
    <>
      <div className="mobile-background" id={(mobileVisible) ? "visible" : "invisible"}>
        <div className="mobile-navmenu">
          <nav className="mobile-header">
            <span className="logotype"><img src={logotype} alt="logotype.svg" /></span>
            <button className="mobile-close" onClick={() => setMobileVisible(!mobileVisible)}>
              <span><FontAwesomeIcon icon={faXmark}/></span>
            </button>
          </nav>
          <div className="mobile-navmenu-content">
            {Object.entries(navmenu).map(([key, index]) => (
              <a key={key} href={"#"+index.href} onClick={() => setMobileVisible(!mobileVisible)}>{index.title}</a>
            ))}
          </div>
        </div>
      </div>

      <header>
        <span className="logotype"><img src={logotype} alt="logotype.svg" /></span>
        <nav className="navmenu">
          {Object.entries(navmenu).map(([key, index]) => (
              <a key={key} href={"#"+index.href}>{index.title}</a>
          ))}
        </nav>
        <nav className="commands">
          <button className="theme" onClick={theme}><span><FontAwesomeIcon icon={faCircleHalfStroke}/></span></button>
          <div className="dropdown">
            <button className="dropdown-button" onClick={() => setDropdownVisible(!dropdownVisible)}><span><FontAwesomeIcon icon={faGlobe}/></span></button>
            <div className="dropdown-content" id={(dropdownVisible) ? "visible" : "invisible"}>
              {Object.entries(languages).map(([key, parameter]) => (
                <button key={key} onClick={() => {lang(parameter.key); setDropdownVisible(false)}}>
                  <span><img src={parameter.flag} alt=""/></span> {parameter.language}
                </button>
              ))}
            </div>
          </div>
          <button className="mobile-open" onClick={() => setMobileVisible(true)}><span><FontAwesomeIcon icon={faBars}/></span></button>
        </nav>
      </header>
    </>
  );
};

export default Header;