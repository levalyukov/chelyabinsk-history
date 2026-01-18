import "../styles/Header.css";
import logotype from "../images/logo.svg";

import ru from "../images/flags/RU.svg";
import us from "../images/flags/US.svg";
import ch from "../images/flags/CN.svg";
import ua from "../images/flags/UA.svg";
import by from "../images/flags/by.svg";
import ko from "../images/flags/KR.svg";
import al from "../images/flags/AL.svg";
import jp from "../images/flags/JP.svg";
import id from "../images/flags/IN.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleHalfStroke, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Header({theme, lang}: {theme: () => void, lang: (lang:string) => void}) {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  const navmenu = {
    0: {title: "О проекте", href: "about"},
    1: {title: "Маршруты", href: "tour"},
    2: {title: "Приложение", href: "start"}
  };

  const languages = {
    0: {language: "Русский", key: "ru", flag: ru},
    1: {language: "Беларускі", key: "us", flag: by},
    2: {language: "Український", key: "us", flag: ua},
    3: {language: "English", key: "us", flag: us},
    4: {language: "中文", key: "zh", flag: ch},
    5: {language: "한국어", key: "us", flag: ko},
    6: {language: "日本語", key: "us", flag: jp},
    7: {language: "Shqiptare", key: "us", flag: al},
    8: {language: "हिन्दी", key: "us", flag: id},
  };
  
  return (
    <>
      <div className="mobile-navmenu-container">
        <div className="mobile-navmenu">
          
        </div>
      </div>

      <header id="navmenu">
        <a className="logotype" href="#app"><span><img src={logotype} alt="logotype.svg" /></span></a>
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
                <button key={key} onClick={() => {lang(parameter.key); setDropdownVisible(false); document.location.reload();}}>
                  <span><img src={parameter.flag} alt=""/></span> {parameter.language}
                </button>
              ))}
            </div>
          </div>
          <button className="mobile-menu"><span><FontAwesomeIcon icon={faBars}/></span></button>
        </nav>
      </header>
    </>
  );
};

export default Header;