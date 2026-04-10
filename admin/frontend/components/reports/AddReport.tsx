import "../../styles/reports/AddReport.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import TextEditor from "../TextEditor";

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
        <TextEditor/>
        <textarea name="" id="" maxLength={10000} placeholder="Творить здесь!"></textarea>
        <div className="video-report">
          <span>
            <h1>Загрузите видео-репортаж</h1>
          </span>
          <input type="file" accept="video/*"/>
        </div>
      </div>
    </div>
  );
};