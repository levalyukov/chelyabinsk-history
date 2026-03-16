import "../../styles/modals/PlaceScheduleModal.css"

import { type PlaceSchedule } from "../PlacesStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";

export default function PlaceScheduleModal(
  {schedule, visible, changeVisible}: 
  {schedule:PlaceSchedule | null, visible:boolean, changeVisible: (state:boolean) => void}
) {
  if (!schedule) return null;
  const datetime = new Date();
  const todayIndex = datetime.getDay() === 0 ? 6 : datetime.getDay() - 1;
  const date = ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"]
  
  return (
    <div className="place-schedule-background" id={!visible ? "invisible" : ""}>
      <div className="place-schedule-modal">
        <nav className="place-schedule-header">
          <button onClick={() => changeVisible(false)}>
            <FontAwesomeIcon icon={faXmark}/>
          </button>
        </nav>
        <div className="place-schedule-content">
          {Object.entries(schedule).map(([key,index]) => (
            <p key={key} className="place-schedule-time"
            id={(todayIndex === Number(key)) ? "active" : "" }>

              {date[Number(key)]} 
              <span>
                {String(index.openHours).padStart(2, "0")}:
                {String(index.openMinutes).padStart(2, "0")}
                &nbsp;-&nbsp;
                {String(index.closeHours).padStart(2, "0")}:
                {String(index.closeMinutes).padStart(2, "0")}
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};