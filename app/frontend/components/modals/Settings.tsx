import "../../styles/modals/Settings.css"

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type IconDefinition, faClose, faFileLines, faGear, faShieldHalved, faFontAwesome, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faOpenstreetmap } from "@fortawesome/free-brands-svg-icons";

interface SettingsSection {
  [item:number]: {
    title:string,
    icon:IconDefinition,
    page:"app"|"privacy-policy"|"licenses"
  };
};

interface SocialMedia {
  [item:number]: {
    name:string;
    href:string;
    icon:IconDefinition;
  };
};

interface Licences {
  [item:number]: {
    title:string,
    license:string,
    icon:IconDefinition,
    href:string
  };
};

export default function Settings({setState, getState, getAppTheme, setAppTheme, updateAppTheme}: 
  {
    setState: (state:boolean) => void, 
    setAppTheme: (state:boolean) => void, 
    updateAppTheme: () => void,
    getState:boolean, getAppTheme:boolean,
  }) {

  const [settingPage, setSettingsPage] = useState<"app"|"profile"|"privacy-policy"|"licenses">("app");
  const navmenu:SettingsSection = {
    1: {
      title: "Приложение",
      icon: faGear,
      page: "app"
    },

    2: {
      title: "Конфиденциальность",
      icon: faShieldHalved,
      page: "privacy-policy"
    },

    3: {
      title: "Лицензии",
      icon: faFileLines,
      page: "licenses"
    }
  };

  return (
    <div id="modal-background" className={getState ? "visible" : "invisible"}>
      <div className="modal">
        <div className="modal-header">
          <button onClick={() => {setState(false); setSettingsPage("app")}}>
            <FontAwesomeIcon icon={faClose}/>
          </button>
        </div>

        <div className="modal-content">
          <nav className="navmenu">
            {Object.entries(navmenu).map(([key,index]) => (
              <button 
                key={key} 
                onClick={() => setSettingsPage(index.page)} 
                className={settingPage === index.page ? "active" : ""}
              >
                <span><FontAwesomeIcon icon={index.icon}/></span> {index.title}
              </button>
            ))}
          </nav>

          <section className="modal-page">
            {settingPage === "app" &&  <AppSection setTheme={setAppTheme} getTheme={getAppTheme} updateTheme={updateAppTheme}/>}
            {settingPage === "privacy-policy" && <PrivacyPolicySection/>}
            {settingPage === "licenses" && <LicensesSection/>}
          </section>
        </div>
      </div>
    </div>
  );
};

function AppSection({setTheme, getTheme, updateTheme}: {
  setTheme: (state:boolean) => void, getTheme:boolean, updateTheme: () => void}) {
  const social:SocialMedia = {
    0: {
      name: "github",
      href: "github.com/levalyukov/chelyabinsk-history",
      icon: faGithub
    }
  };


  return (
    <div className="app-section">
      <h3>Настройки приложения</h3>
      <div className="app-settings">
        <span className="app-option">
          <p>Тема: </p> 
          <select value={getTheme ? "dark" : "light"} 
          name="app-theme" onChange={
            (e) => {
              setTheme(e.target.value === "dark"); 
              updateTheme();
            }
          }>
            <option value="dark">Темная</option>
            <option value="light">Светлая</option>
          </select>
        </span>

        <span className="app-option">
          <p>Язык: </p> 
          <select name="app-language">
            <option value="ru">Русский</option>
          </select>
        </span>

        <span className="authors">
          <nav className="social-media">
            {Object.entries(social).map(([key,index]) => (
              <button key={key} onClick={() => window.open("https://"+index.href, "_blank")}><FontAwesomeIcon icon={index.icon}/></button>
            ))}
          </nav>

          <p id="author">&copy; {new Date().getFullYear()} Экскурсия с Доставкой</p>
        </span>
      </div>
    </div>
  );
};

function PrivacyPolicySection() {
  return (
    <div className="privacy-policy-section">
      <h3>Политика Конфиденциальности</h3>
      <div className="policy-container">
        <p>Настоящая политика описывает, как обрабатываются данные в приложении. Приложение разработано в учебных целях и не собирает, не хранит и не передаёт ваши персональные данные.</p>

        <br />
        
        <p><b>1. Хранение данных</b></p>
        <p>Все данные, создаваемые вами (например, избранные места, настройки), сохраняются исключительно на вашем устройстве (локальное хранилище браузера). Мы не отправляем эти данные на наши серверы и не имеем к ним доступа.</p>

        <br />

        <p><b>2. Использование базы данных</b></p>
        <p>Внешняя база данных используется только для загрузки готовых материалов (репортажей, статей о достопримечательностях). Эти материалы не содержат персональных данных и не могут быть изменены вами. Ваши личные данные в базу не передаются.</p>

        <br />

        <p><b>3. Геолокация</b></p>
        <p>Приложение может запрашивать ваше местоположение через встроенный Geolocation API браузера. Это происходит только на вашем устройстве; координаты никуда не передаются и не сохраняются на сервере. Вы можете отозвать разрешение в любой момент через настройки браузера.</p>

        <br />

        <p><b>4. Контакты</b></p>
        <p>Если у вас есть вопросы, вы можете сообщить о них через <a href="https://github.com/levalyukov/chelyabinsk-history/issues">GitHub Issues</a> репозитория проекта.</p>

        <br /><br />

        <p><i>Дата последнего обновления: 24 марта 2026 г.</i></p>
      </div>
    </div>
  );
};

function LicensesSection() {
  const licenses:Licences = {
    0: {
      title:    "MapLibre GL",
      license:  "BSD 3-Clause",
      icon:     faLocationDot,
      href:     "github.com/maplibre/maplibre-gl-js"
    },

    1: {
      title:    "OpenStreetMap",
      license:  "ODbL",
      icon:     faOpenstreetmap,
      href:     "openstreetmap.org"
    },

    2: {
      title:    "FontAwesome",
      license:  "CC BY 4.0",
      icon:     faFontAwesome,
      href:     "fontawesome.com"
    },
  };

  return (
    <div className="licenses-section">
      <h3>Лицензии используемых библиотек</h3>
      <p>Благодаря данным библиотекам существует наше приложение:</p>
      
      <div className="licenses-section-content">
        {Object.entries(licenses).map(([key,index]) => (
        <button key={key} onClick={() => {
          if ((index.href).startsWith("https://")) window.open(index.href, "_blank");
          else window.open("https://"+index.href, "_blank");
        }}>
          <span><FontAwesomeIcon icon={index.icon}/> {index.title}</span> <p className="license">{index.license}</p>
        </button>
        ))}
      </div>
    </div>
  );
};
