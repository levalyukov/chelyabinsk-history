import "../styles/Settings.css"

import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faFileLines, faGear, /* faUserPen, */ faShieldHalved, faFontAwesome, faBolt, faPen, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faReact } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

interface SettingsSection {
  [item:number]: {
    title:string,
    icon:IconDefinition,
    page:"app"|"profile"|"privacy-policy"|"licenses"
  };
};

interface SocialMedia {
  [item:number]: {
    name:string;
    href:string;
    icon:IconDefinition;
  };
};

interface Licence {
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
    // 0: {
    //   title: "Профиль",
    //   icon: faUserPen,
    //   page: "profile"
    // },
    
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
            {settingPage === "profile" && <ProfileSection/>}
            {settingPage === "privacy-policy" && <PrivacyPolicySection/>}
            {settingPage === "licenses" && <LicensesSection/>}
          </section>
        </div>
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
          <p><button id="change-label">Изменить</button></p>
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
              console.log(e.target.value)
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
            <option value="">Русский</option>
            <option value="">中文</option>
            <option value="">English</option>
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
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos perspiciatis quisquam maxime eius debitis iusto dicta harum reprehenderit voluptate repellat. Rerum omnis soluta aliquam iste. Dolor veniam blanditiis a rerum.
        Architecto, ipsam ullam rerum vitae numquam, illo dolorem deserunt amet unde tempora distinctio. Doloremque nesciunt laborum illum porro fugit est qui necessitatibus praesentium aliquid, iste neque repellat sequi eaque architecto.
        Blanditiis veniam ut commodi aliquid dolores porro reiciendis, quaerat perferendis quis ratione, aspernatur dolorum ea. Inventore, quo quia! Mollitia tenetur minima consequuntur iure velit voluptas quam officiis corporis exercitationem sit!
        Minus dignissimos, voluptatem numquam autem laudantium sequi sapiente modi, consequatur nam enim totam officiis. Fugit omnis sed repudiandae quis dolorum praesentium nisi, natus recusandae est explicabo velit voluptatum obcaecati id.
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos perspiciatis quisquam maxime eius debitis iusto dicta harum reprehenderit voluptate repellat. Rerum omnis soluta aliquam iste. Dolor veniam blanditiis a rerum.
        Architecto, ipsam ullam rerum vitae numquam, illo dolorem deserunt amet unde tempora distinctio. Doloremque nesciunt laborum illum porro fugit est qui necessitatibus praesentium aliquid, iste neque repellat sequi eaque architecto.
        Blanditiis veniam ut commodi aliquid dolores porro reiciendis, quaerat perferendis quis ratione, aspernatur dolorum ea. Inventore, quo quia! Mollitia tenetur minima consequuntur iure velit voluptas quam officiis corporis exercitationem sit!
        Minus dignissimos, voluptatem numquam autem laudantium sequi sapiente modi, consequatur nam enim totam officiis. Fugit omnis sed repudiandae quis dolorum praesentium nisi, natus recusandae est explicabo velit voluptatum obcaecati id.
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos perspiciatis quisquam maxime eius debitis iusto dicta harum reprehenderit voluptate repellat. Rerum omnis soluta aliquam iste. Dolor veniam blanditiis a rerum.
        Architecto, ipsam ullam rerum vitae numquam, illo dolorem deserunt amet unde tempora distinctio. Doloremque nesciunt laborum illum porro fugit est qui necessitatibus praesentium aliquid, iste neque repellat sequi eaque architecto.
        Blanditiis veniam ut commodi aliquid dolores porro reiciendis, quaerat perferendis quis ratione, aspernatur dolorum ea. Inventore, quo quia! Mollitia tenetur minima consequuntur iure velit voluptas quam officiis corporis exercitationem sit!
        Minus dignissimos, voluptatem numquam autem laudantium sequi sapiente modi, consequatur nam enim totam officiis. Fugit omnis sed repudiandae quis dolorum praesentium nisi, natus recusandae est explicabo velit voluptatum obcaecati id.
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos perspiciatis quisquam maxime eius debitis iusto dicta harum reprehenderit voluptate repellat. Rerum omnis soluta aliquam iste. Dolor veniam blanditiis a rerum.
        Architecto, ipsam ullam rerum vitae numquam, illo dolorem deserunt amet unde tempora distinctio. Doloremque nesciunt laborum illum porro fugit est qui necessitatibus praesentium aliquid, iste neque repellat sequi eaque architecto.
        Blanditiis veniam ut commodi aliquid dolores porro reiciendis, quaerat perferendis quis ratione, aspernatur dolorum ea. Inventore, quo quia! Mollitia tenetur minima consequuntur iure velit voluptas quam officiis corporis exercitationem sit!
        Minus dignissimos, voluptatem numquam autem laudantium sequi sapiente modi, consequatur nam enim totam officiis. Fugit omnis sed repudiandae quis dolorum praesentium nisi, natus recusandae est explicabo velit voluptatum obcaecati id.
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos perspiciatis quisquam maxime eius debitis iusto dicta harum reprehenderit voluptate repellat. Rerum omnis soluta aliquam iste. Dolor veniam blanditiis a rerum.
        Architecto, ipsam ullam rerum vitae numquam, illo dolorem deserunt amet unde tempora distinctio. Doloremque nesciunt laborum illum porro fugit est qui necessitatibus praesentium aliquid, iste neque repellat sequi eaque architecto.
        Blanditiis veniam ut commodi aliquid dolores porro reiciendis, quaerat perferendis quis ratione, aspernatur dolorum ea. Inventore, quo quia! Mollitia tenetur minima consequuntur iure velit voluptas quam officiis corporis exercitationem sit!
        Minus dignissimos, voluptatem numquam autem laudantium sequi sapiente modi, consequatur nam enim totam officiis. Fugit omnis sed repudiandae quis dolorum praesentium nisi, natus recusandae est explicabo velit voluptatum obcaecati id.
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos perspiciatis quisquam maxime eius debitis iusto dicta harum reprehenderit voluptate repellat. Rerum omnis soluta aliquam iste. Dolor veniam blanditiis a rerum.
        Architecto, ipsam ullam rerum vitae numquam, illo dolorem deserunt amet unde tempora distinctio. Doloremque nesciunt laborum illum porro fugit est qui necessitatibus praesentium aliquid, iste neque repellat sequi eaque architecto.
        Blanditiis veniam ut commodi aliquid dolores porro reiciendis, quaerat perferendis quis ratione, aspernatur dolorum ea. Inventore, quo quia! Mollitia tenetur minima consequuntur iure velit voluptas quam officiis corporis exercitationem sit!
        Minus dignissimos, voluptatem numquam autem laudantium sequi sapiente modi, consequatur nam enim totam officiis. Fugit omnis sed repudiandae quis dolorum praesentium nisi, natus recusandae est explicabo velit voluptatum obcaecati id.
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos perspiciatis quisquam maxime eius debitis iusto dicta harum reprehenderit voluptate repellat. Rerum omnis soluta aliquam iste. Dolor veniam blanditiis a rerum.
        Architecto, ipsam ullam rerum vitae numquam, illo dolorem deserunt amet unde tempora distinctio. Doloremque nesciunt laborum illum porro fugit est qui necessitatibus praesentium aliquid, iste neque repellat sequi eaque architecto.
        Blanditiis veniam ut commodi aliquid dolores porro reiciendis, quaerat perferendis quis ratione, aspernatur dolorum ea. Inventore, quo quia! Mollitia tenetur minima consequuntur iure velit voluptas quam officiis corporis exercitationem sit!
        Minus dignissimos, voluptatem numquam autem laudantium sequi sapiente modi, consequatur nam enim totam officiis. Fugit omnis sed repudiandae quis dolorum praesentium nisi, natus recusandae est explicabo velit voluptatum obcaecati id.
        Voluptatum aspernatur nemo tempore in culpa ut eius temporibus repellat ea? Magnam, sed. Pariatur aliquam magnam est ipsum. Similique sint aliquam amet? Quos, sequi tenetur? Aperiam debitis tempora expedita inventore!
      </p>
    </div>
  );
};

function LicensesSection() {
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
      title:    "MapLibre",
      license:  "BSD 3-Clause",
      icon:     faLocationDot,
      href:     "github.com/maplibre"
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
