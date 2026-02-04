import "../styles/Header.css";

import logotype from "../images/small-logo.svg";

import ru from "../images/flags/RU.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleHalfStroke, faGlobe, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Header({theme, lang}: {theme: () => void, lang: (lang:string) => void}) {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  const navmenu = {
    0: {title: "Безопасность", href: ""},
    1: {title: "Предложить репортаж", href: ""},
    2: {title: "Контакты", href: ""},
  };

  const languages = {
    0: {language: "Русский", key: "ru", flag: ru}
  };
  
  return (
    <>
      <div id="mobile-navmenu-container" className={!mobileMenu ? "invisible" : "visible"}>
        <div className="mobile-navmenu">
          <nav>
            <img src={logotype} alt="" />
            <button onClick={() => setMobileMenu(!mobileMenu)}>
              <span><FontAwesomeIcon icon={faXmark}/></span>
            </button>
          </nav>

          <div className="mobile-namvenu-content">
            {Object.entries(navmenu).map(([key, index]) => (
                <a key={key} href={"#"+index.href}>{index.title}</a>
            ))}
          </div>
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
          <button className="mobile-menu" onClick={() => setMobileMenu(!mobileMenu)}>
            <span><FontAwesomeIcon icon={faBars}/></span>
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;