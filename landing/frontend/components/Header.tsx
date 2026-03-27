import "../styles/Header.css";

import ru from "../images/flags/RU.svg";

import lightLogotype  from "../images/light-logo.svg";
import darkLogotype   from "../images/dark-logo.svg";

import { useState } from "react";
import { type LanguageKeys } from "../interfaces/App.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleHalfStroke, faGlobe, faXmark } from "@fortawesome/free-solid-svg-icons";

interface Navmenu {
  [index:number]: {
    title:string;
    href?: string;
    state?: (state:boolean) => void;
  };
};

export default function Header({setTheme, getTheme, setLang}: {
  setTheme: () => void, 
  getTheme: () => boolean, 
  setLang: (lang:string) => void
}) {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  const navmenu:Navmenu = {
    0: {
      title: "Памятка туристу",
    },

    1: {
      title: "Обратная связь", 
    },

    2: {
      title: "Контакты", 
    }
  };

  const languages:LanguageKeys = {
    0: {
      language: "Русский", 
      key: "ru", 
      flag: ru
    }
  };

  return (
    <>
      {(Object.keys(navmenu).length > 0) && (

      <div id="mobile-navmenu-container" className={!mobileMenu ? "invisible" : "visible"}>
        <div className="mobile-navmenu">
          
          <nav className="mobile-header">
            <img data-testid="logotype-mobile" className="mobile-logotype" src={!getTheme() ? darkLogotype : lightLogotype} alt="logotype.svg" />
            <button onClick={() => setMobileMenu(!mobileMenu)}>
              <span><FontAwesomeIcon icon={faXmark}/></span>
            </button>
          </nav>

          <div className="mobile-namvenu-content">
            <nav className="mobile-navmenu-links">
              <div className="mobile-navmenu-link" data-testid="mobile-navmenu">
                {Object.entries(navmenu).map(([key, index]) => (<>
                  {index.href !== undefined ? (
                    <a key={key} href={"#"+index.href}>{index.title}</a>
                  ) : (<>
                      {index.state !== undefined && (
                        <button key={key} onClick={index.state}>{index.title}</button>
                      )}
                  </>)}
                </>))}
              </div>

              <nav className="mobile-navmenu-footer">
                <button onClick={() => window.open("app/")}>Открыть приложение</button>
              </nav>
            </nav>
          </div>
          
        </div>
      </div>

      )}

      <header id="navmenu">
        <div className="navmenu-container">
          <a data-testid="logotype-pc" className="logotype" href="#app">
            <span><img src={!getTheme() ? darkLogotype : lightLogotype} alt="logotype.svg" /></span>
          </a>

          <nav className="navmenu">
            {Object.entries(navmenu).map(([key, index]) => (<>
              {index.href !== undefined ? (
                <a key={key} href={"#"+index.href}>{index.title}</a>
              ) : (<>
                  {index.state !== undefined && (
                    <button key={key} onClick={index.state}>{index.title}</button>
                  )}
              </>)}
            </>))}
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

            {Object.entries(navmenu as Navmenu).filter(([key,index]) => (
              (key && index.href !== undefined)||(key && index.state !== undefined)
            )).length > 0 && (
              <button className="mobile-menu" onClick={() => setMobileMenu(!mobileMenu)}>
                <span><FontAwesomeIcon icon={faBars}/></span>
              </button>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};