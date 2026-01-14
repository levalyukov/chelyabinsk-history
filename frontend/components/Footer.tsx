import "../styles/Footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faOdnoklassniki, faTelegram, faTiktok, faVk, faYoutube } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const media = {
    0: {id: "vk", icon: faVk, href: ""},
    1: {id: "telegram", icon: faTelegram, href: ""},
    2: {id: "github", icon: faGithub, href: "github.com/levalyukov/chelyabinsk-history"},
    3: {id: "youtube", icon: faYoutube, href: ""},
    4: {id: "tiktok", icon: faTiktok, href: ""},
    5: {id: "ok", icon: faOdnoklassniki, href: ""},
  };
  
  const footer = {
    0: {
      title: "Все экскурсии",
      links: {
        0:{subtitle: "Экскурсия", href: ""},
        1:{subtitle: "Экскурсия", href: ""},
        2:{subtitle: "Экскурсия", href: ""},
        3:{subtitle: "Экскурсия", href: ""}
      },
    },
    2: {
      title: "Важная информация",
      links: {
        0:{subtitle: "Документ", href: ""},
        1:{subtitle: "Документ", href: ""},
        2:{subtitle: "Документ", href: ""}
      },
    },
  };

  return (
    <div className="footer-container">
      <footer>
        <div className="info">
          <p>© {new Date().getFullYear()} Авторы</p>
          <ul className="media">
            {Object.entries(media).map(([key,index]) => (
              <a key={key} href={"https://"+index.href} id={index.id} target="_blank"><FontAwesomeIcon icon={index.icon}/></a>
            ))}
          </ul>
        </div>
        {Object.entries(footer).map(([key,index]) => (
          <div key={key} className="category">
            <h2>{index.title}</h2>
            <div className="content">
              {Object.entries(index.links).map(([key,index]) => (
                <li key={key}><a href={index.href}>{index.subtitle} №{Number(key)+1}</a></li>
              ))}
            </div>
          </div>
        ))}
      </footer>
    </div>
  );
};

export default Footer;