import "../../styles/reports/AddReport.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function AddReport () : React.ReactNode {
  return (
    <div className="add-report">
      <h1>Добавить новый репортаж

        <span className="add-report-actions">
          <button>
            <span><FontAwesomeIcon icon={faEye}/></span> Предпосмотр
          </button>

          <button className="button-ghost">
            Опубликовать
          </button>
        </span>
      </h1>

      <div className="report-form">
        <input type="text" className="title" placeholder="Название репортажа..."/>

        <div className="video-report">
          {/* <input type="file" accept="video/*"/> */}
        </div>
      </div>
    </div>
  );
};