import "../styles/Settings.css"

import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faFileLines, faGear, faUserPen, faShieldHalved, faFontAwesome, faBolt, faPen } from "@fortawesome/free-solid-svg-icons";
import { faOpenstreetmap, faPagelines, faReact } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

export default function Settings({setState, getState}: 
  {setState: (state:boolean) => void, getState:boolean}) {

  const [settingPage, setSettingsPage] = useState<"app"|"profile"|"privacy-policy"|"licenses">("app");

  interface SettingsSection {
    [item:number]: {
      title:string,
      icon:IconDefinition,
      page:"app"|"profile"|"privacy-policy"|"licenses"
    };
  };
  
  const navmenu:SettingsSection = {
    0: {
      title: "Приложение",
      icon: faGear,
      page: "app"
    },

    1: {
      title: "Профиль",
      icon: faUserPen,
      page: "profile"
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
          <button onClick={() => setState(false)}>
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
            {settingPage === "app" &&  <AppSection/>}
            {settingPage === "profile" && <ProfileSection/>}
            {settingPage === "privacy-policy" && <PrivacyPolicySection/>}
            {settingPage === "licenses" && <LicensesSection/>}
          </section>
        </div>
      </div>
    </div>
  );
};

function AppSection() {
  return (
    <div className="app-section">
      <h3>Настройки приложения</h3>
      <div className="app-settings">
        <span className="app-option">
          <p>Тема: </p> 
          <select name="app-theme">
            <option value="">Системная</option>
            <option value="">Темная</option>
            <option value="">Светлая</option>
          </select>
        </span>

        <span className="app-option">
          <p>Язык: </p> 
          <select name="app-language">
            <option value="">Русский</option>
            <option value="">中文</option>
            <option value="">English</option>
          </select>
        </span>
      </div>
    </div>
  );
};

function ProfileSection() {
  return (
    <div className="profile-section">
      <h3>Профиль</h3>
      <div className="profile-content">
        <span>
          <p>Фотография профиля</p>
          <p><button id="change-label">Обновить</button></p>
        </span>

        <span>
          <p>Имя пользователя</p>
          <p>Username <button id="change"><span><FontAwesomeIcon icon={faPen}/></span></button></p>
        </span>

        <span>
          <p>Электронная почта</p>
          <p>ex****@gmail.com <button id="change"><span><FontAwesomeIcon icon={faPen}/></span></button></p>
        </span>

        <span>
          <p>Пароль</p>
          <p><button id="change-label">Сменить</button></p>
        </span>

        <span>
          <p>Выйти из профиля</p>
          <p><button id="user-delete">Выйти</button></p>
        </span>

        <span>
          <p>Удалить профиль</p>
          <p><button id="user-delete">Удалить</button></p>
        </span>
      </div>
    </div>
  );
};

function PrivacyPolicySection() {
  return (
    <div className="privacy-policy-section">
      <h3>Политика Конфиденциальности</h3>
      <p>
        мы будем продавать ваши данные за 5 рублей и шаурму из гордона.
      </p>
    </div>
  );
};

function LicensesSection() {
  interface Licence {
    [item:number]: {
      title:string,
      license:string,
      icon:IconDefinition,
      href:string
    };
  };

  const licenses:Licence = {
    0: {
      title:    "React",
      license:  "MIT",
      icon:     faReact,
      href:     "react.dev"
    },

    1: {
      title:    "Vite",
      license:  "MIT",
      icon:     faBolt,
      href:     "vite.dev"
    },

    2: {
      title:    "FontAwesome",
      license:  "CC BY 4.0",
      icon:     faFontAwesome,
      href:     "fontawesome.com"
    },

    3: {
      title:    "OpenStreetMap",
      license:  "ODbL",
      icon:     faOpenstreetmap,
      href:     "openstreetmap.org"
    },

    4: {
      title:    "Leaflet",
      license:  "BSD-2-Clause",
      icon:     faPagelines,
      href:     "github.com/leaflet"
    }
  };

  return (
    <div className="licenses-section">
      <h3>Лицензии используемых библиотек</h3>
      <p>Благодаря данным библиотекам существует наше приложение:</p>
      
      <div className="licenses-section-content">
        {Object.entries(licenses).map(([key,index]) => (
        <button key={key} onClick={() => window.open("https://"+index.href, "_blank")}>
          <span><FontAwesomeIcon icon={index.icon}/> {index.title}</span> <p className="license">{index.license}</p>
        </button>
        ))}
      </div>
    </div>
  );
};
