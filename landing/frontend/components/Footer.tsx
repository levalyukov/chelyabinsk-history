import "../styles/Footer.css";

import { useEffect, useState } from "react";
import { type Footer, type FooterLinks, normalizeLink, foo } from "../interfaces/Footer.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  const [footer, setFooter] = useState<Footer | null>(null);

  useEffect(() => {
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