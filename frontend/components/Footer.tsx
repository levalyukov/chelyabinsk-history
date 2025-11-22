import "../styles/Footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTelegram, faVk } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const media = {
    1:{id: "telegram",  icon: faTelegram,  href: ""},
    2:{id: "vk",        icon: faVk,        href: ""},
    3:{id: "github",    icon: faGithub,    href: ""}
  };

  const footer = {
    1: {
      title: "Заголовок",
      links: {
        1:{subtitle: "Ссылка №1", href: ""},
        2:{subtitle: "Ссылка №1", href: ""},
        3:{subtitle: "Ссылка №1", href: ""}
      },
    },
    2: {
      title: "Заголовок",
      links: {
        1:{subtitle: "Ссылка №1", href: ""},
        2:{subtitle: "Ссылка №1", href: ""},
        3:{subtitle: "Ссылка №1", href: ""}
      },
    },
    3: {
      title: "Заголовок",
      links: {
        1:{subtitle: "Ссылка №1", href: ""},
        2:{subtitle: "Ссылка №1", href: ""},
        3:{subtitle: "Ссылка №1", href: ""}
      },
    }
  };

  return (
    <footer>
      <div className="info">
        <ul className="media">
          {Object.entries(media).map(([key,index]) => (
            <a key={key} href={index.href} id={index.id}><FontAwesomeIcon icon={index.icon}/></a>
          ))}
        </ul>
      </div>
      {Object.entries(footer).map(([key,index]) => (
        <div key={key} className="category">
          <h2>{index.title}</h2>
          <div className="content">
            {Object.entries(index.links).map(([key,index]) => (
              <li key={key}><a href={index.href}>{index.subtitle}</a></li>
            ))}
          </div>
        </div>
      ))}
    </footer>
  );
};

export default Footer;