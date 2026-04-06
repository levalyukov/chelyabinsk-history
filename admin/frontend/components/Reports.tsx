import "../styles/Reports.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare, faTrashCan, faCrow, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { type AdminButtons } from "../interfaces/app.interface";

export default function Reports () : React.ReactNode {
  const buttons:AdminButtons = {
    0: {
      title: "Добавить репортаж",
      icon:  faSquarePlus,
      iconColor: "#78F58F"
    },

    1: {
      title: "Редактировать репортаж",
      icon:  faPenToSquare,
      iconColor: "#57AEFF"
    },

    2: {
      title: "Удалить репортаж",
      icon:  faTrashCan,
      iconColor: "#FF5A5A"
    }
  };

  return (
    <section className="report-config">
      <h1>Репортажи <span>Всего репортажей: 0</span></h1>
      <div className="report-content">
        <div className="report-actions">
          {Object.entries(buttons as AdminButtons).map(([key,index]) => (
            <button key={key}>
              <span style={{color: (index.iconColor !== undefined && index.iconColor)}}>
                <FontAwesomeIcon icon={index.icon}/>
              </span> {index.title}
            </button>
          ))}
        </div>

        <div className="articles">
          <div className="article-container">
            <article id="empty">
              <span><FontAwesomeIcon icon={faCrow} /></span>
              <p>Нету статьей!</p>
            </article>
          </div>

          <button>
            Показать все статьи <span><FontAwesomeIcon icon={faChevronRight} /></span>
          </button>
        </div>
      </div>
    </section>
  );
};