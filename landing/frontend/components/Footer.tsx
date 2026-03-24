import "../styles/Footer.css";

import {  
  type Footer, 
  type FooterLinks, 
  type FooterSocialMedia, 
  type FooterContent, 
  normalizeLink 
} from "../interfaces/Footer.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faClock, faEarthAsia, faHammer, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

export default function Footer({licenseVisible, policyVisible}:{
  policyVisible: () => void,
  licenseVisible: () => void
}):React.ReactNode {
  //! This misunderstanding needs to be changed in a more concise way ! //
  const footer:Footer = {
    authors: {
      created: "Экскурсия с Доставкой"
    },

    content: {
      0: {
        title: "Информация",
        items: {
          0: {
            name: "Город Трудовой Доблести",
            icon: faHammer
          },
          1: {
            name: "1.2 млн жителей",
            icon: faPeopleGroup
          },
          2: {
            name: "Часовой пояс: МСК+2",
            icon: faClock
          },
          3: {
            name: "Основан в 1736 г.",
            icon: faEarthAsia
          },
        }
      },

      1: {
        title: "Юридическое",
        items: {
          0: {
            name: "Конфиденциальность",
            lambda: policyVisible
          },
          1: {
            name: "Лицензии",
            lambda: licenseVisible
          }
        }
      }
    },

    media: {
      0: {
        id: "github",
        icon: faGithub,
        href: "github.com/levalyukov/chelyabinsk-history"
      }
    }
  };
  //! ---------------------------------------------------- //

  return (
    <footer>
      <section className="footer-container">
        <div className="footer-app-authors">
          <p>&copy; {new Date().getFullYear()} {footer.authors.created}</p>
          {footer.media !== undefined && (
            (Object.keys(footer.media as FooterSocialMedia).length > 0) && (
            <ul className="footer-app-social">
              {Object.entries(footer.media).map(([key,item]) => (
                <a key={key} id={item.id} href={normalizeLink(item.href)}><FontAwesomeIcon icon={item.icon}/></a>
              ))}
            </ul>
          ))}
        </div>

        {Object.entries(footer.content as FooterContent).map(([key,index]) => (
          <div key={key} className="footer-block">
            <h1>{index.title}</h1>
            <div className="footer-block-content">
              {Object.entries(index.items as FooterLinks).map(([id,item]) => (
                <>
                  {item.lambda !== undefined ? (
                    <button key={id} onClick={item.lambda}>
                      {item.icon !== undefined && 
                      (<span><FontAwesomeIcon icon={item.icon}/></span>)}
                      {item.name}
                    </button>
                  ) : (
                    <>
                      {item.href !== undefined ? (
                        <a key={id} href={normalizeLink(item.href)}>
                          {item.icon !== undefined && 
                          (<span><FontAwesomeIcon icon={item.icon}/></span>)}
                          {item.name}
                        </a>
                      ) : (
                        <p key={id}>
                          {item.icon !== undefined && 
                          (<span><FontAwesomeIcon icon={item.icon}/></span>)}
                          {item.name}
                        </p>
                      )}
                    </>
                  )}
                </>
              ))}
            </div>
          </div>
        ))}
      </section>
    </footer>
  );
};