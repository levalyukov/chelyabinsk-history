import "../styles/Footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const media = {
    0: {id: "github", icon: faGithub, href: "https://github.com/levalyukov/chelyabinsk-history"},
  };
  
  const footer = {
    0: {
      title: "Продукт",
      links: {
        1:{subtitle: "Приложение", href: ""},
        2:{subtitle: "Статус серверов", href: ""},
        3:{subtitle: "Брендбук", href: ""},
      },
    },
    2: {
      title: "Важная информация",
      links: {
        0:{subtitle: "Конфиденциальность", href: ""},
        1:{subtitle: "Правила использования cookie", href: ""},
        2:{subtitle: "Предложить репортаж", href: ""},
        3:{subtitle: "Разработчикам", href: ""},
      },
    }
  };

  return (
    <div className="footer-container">
      <footer>
        <div className="info">
          <p>© {new Date().getFullYear()} Экскурсия с Доставкой</p>
          <ul className="media">
            {Object.entries(media).map(([key,index]) => (
              <a key={key} href={"https://"+index.href} id={index.id} target="_blank">
                <FontAwesomeIcon icon={index.icon}/>
              </a>
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
    </div>
  );
};