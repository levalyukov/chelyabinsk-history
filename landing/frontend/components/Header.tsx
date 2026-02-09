import "../styles/Header.css";

import lightLogotype  from "../images/light-logo.svg";
import darkLogotype   from "../images/dark-logo.svg";

import ru from "../images/flags/RU.svg";
import zh from "../images/flags/CN.svg";
import ko from "../images/flags/KR.svg";
import jp from "../images/flags/JP.svg";
import hi from "../images/flags/IN.svg";
import de from "../images/flags/DE.svg";
import pt from "../images/flags/PT.svg";
import en from "../images/flags/US.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleHalfStroke, faGlobe, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Header({setTheme, getTheme, setLang}: {
  setTheme: () => void, getTheme: () => boolean, setLang: (lang:string) => void}) {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  const navmenu = {
    0: {title: "Кнопка #1", href: ""},
    1: {title: "Кнопка #2", href: ""},
    2: {title: "Кнопка #3", href: ""},
    3: {title: "Кнопка #4", href: ""},
    4: {title: "Кнопка #5", href: ""}
  };

  const languages = {
    0: {language: "Русский", key: "ru", flag: ru},
    1: {language: "中文", key: "zh", flag: zh},
    2: {language: "English", key: "en", flag: en}
  };

  return (
    <>
      <div id="mobile-navmenu-container" className={!mobileMenu ? "invisible" : "visible"}>
        <div className="mobile-navmenu">
          
          <nav className="mobile-header">
            <img className="mobile-logotype" src={!getTheme() ? darkLogotype : lightLogotype} alt="" />
            <button onClick={() => setMobileMenu(!mobileMenu)}>
              <span><FontAwesomeIcon icon={faXmark}/></span>
            </button>
          </nav>

          <div className="mobile-namvenu-content">
            <nav className="mobile-navmenu-links">

              <div className="mobile-navmenu-link">
                {Object.entries(navmenu).map(([key, index]) => (
                    <a key={key} href={"#"+index.href}>{index.title}</a>
                ))}
              </div>

              <nav className="mobile-navmenu-footer">
                <button>Открыть приложение</button>
              </nav>

            </nav>
          </div>
        </div>
      </div>

      <header id="navmenu">
        <a className="logotype" href="#app"><span><img src={!getTheme() ? darkLogotype : lightLogotype} alt="logotype.svg" /></span></a>
        <nav className="navmenu">
          {Object.entries(navmenu).map(([key, index]) => (
              <a key={key} href={"#"+index.href}>{index.title}</a>
          ))}
        </nav>
        <nav className="commands">
          <button className="theme" onClick={setTheme}>
            <span><FontAwesomeIcon icon={faCircleHalfStroke}/></span>
          </button>

          <div className="dropdown">
            <button className="dropdown-button" onClick={() => setDropdownVisible(!dropdownVisible)}>
              <span><FontAwesomeIcon icon={faGlobe}/></span>
            </button>
            <div className="dropdown-content" id={(dropdownVisible) ? "visible" : "invisible"}>
              {Object.entries(languages).map(([key, parameter]) => (
                <button key={key} onClick={() => {setLang(parameter.key); setDropdownVisible(false); document.location.reload();}}>
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