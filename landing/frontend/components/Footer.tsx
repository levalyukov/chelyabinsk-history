import "../styles/Footer.css";

import { useEffect, useState } from "react";
import { type Footer, type FooterLinks, normalizeLink } from "../interfaces/Footer.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faClock, faEarthAsia, faHammer, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const [footer, setFooter] = useState<Footer | null>(null);

  useEffect(() => {

    //! This misunderstanding needs to be changed in a more concise way ! //
    const foo:Footer = {
      authors: {
        created: "Экскурсия с Доставкой"
      },

      content: {
        0: {
          links: false,
          title: "Информация",
          items: {
            0: {
              name: "Город Трудовой Доблести",
              href: "",
              icon: faHammer
            },
            1: {
              name: "1.2 млн жителей",
              href: "",
              icon: faPeopleGroup
            },
            2: {
              name: "Часовой пояс: МСК+2",
              href: "",
              icon: faClock
            },
            3: {
              name: "Основан в 1736 г.",
              href: "",
              icon: faEarthAsia
            },
          }
        },

        1: {
          links: true,
          title: "Продукт",
          items: {
            0: {
              name: "Приложение",
              href: ""
            },
            1: {
              name: "Статус серверов",
              href: ""
            },
            2: {
              name: "Брендбук",
              href: ""
            }
          }
        },

        2: {
          links: true,
          title: "Юридическое",
          items: {
            0: {
              name: "Конфиденциальность",
              href: ""
            },
            1: {
              name: "Лицензии",
              href: ""
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

    setFooter(foo);
  }, []);

  if (!footer) return null;
  if (Object.keys(footer).length === 0) return null;
  
  return (
    <footer>
      <section className="footer-container">
        <div className="footer-app-authors">
          <p>&copy; {new Date().getFullYear()} {footer.authors.created}</p>
          {footer.media !== undefined && (
            (Object.keys(footer.media).length > 0) && (
              <ul className="footer-app-social">
                {Object.entries(footer.media).map(([key,item]) => (
                  <a key={key} id={item.id} href={normalizeLink(item.href)}><FontAwesomeIcon icon={item.icon}/></a>
                ))}
              </ul>
            )
          )}
        </div>

        {Object.entries(footer.content).map(([key,index]) => (
          <div key={key} className="footer-block">
            <h1>{index.title}</h1>
            <div className="footer-block-content">
              {index.links ? (
              <>
                {Object.entries(index.items as FooterLinks).map(([id,item]) => (
                  <a key={id} href={normalizeLink(item.href)}>
                    {item.icon !== undefined && 
                    (<span><FontAwesomeIcon icon={item.icon}/></span>)}
                    {item.name}
                  </a>
                ))}
              </>
              ) : (
              <>
                {Object.entries(index.items as FooterLinks).map(([id,item]) => (
                  <p key={id}>
                    {item.icon !== undefined && 
                    (<span><FontAwesomeIcon icon={item.icon}/></span>)}
                    {item.name}
                  </p>
                ))}
              </>
              )}
            </div>
          </div>
        ))}
      </section>
    </footer>
  );
};