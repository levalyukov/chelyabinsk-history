import "../../styles/modals/modal.css"

import { type Licences } from "../../interfaces/licenses-modal.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFontAwesome, faLocationDot, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faOpenstreetmap } from "@fortawesome/free-brands-svg-icons";

export default function LicenseModal({setModalVisible}: {
  setModalVisible: (state:boolean) => void
}):React.ReactNode {

  const licenses:Licences = {
    0: {
      title:    "MapLibre GL",
      license:  "BSD 3-Clause",
      icon:     faLocationDot,
      href:     "github.com/maplibre/maplibre-gl-js"
    },

    1: {
      title:    "OpenStreetMap",
      license:  "ODbL",
      icon:     faOpenstreetmap,
      href:     "openstreetmap.org"
    },

    2: {
      title:    "FontAwesome",
      license:  "CC BY 4.0",
      icon:     faFontAwesome,
      href:     "fontawesome.com"
    }
  };

  return (
    <div className="modal-background">
      <div className="modal">
        <nav className="modal-header">
          <button onClick={() => setModalVisible(false)} className="modal-close">
            <span><FontAwesomeIcon icon={faXmark}/></span>
          </button>
        </nav>
        <div className="modal-content">
          <h2>Лицензии используемых библиотек</h2>
          <p>Благодаря данным библиотекам существует наше приложение:</p>
          <div className="container-license">
            {Object.entries(licenses as Licences).map(([key,index]) => (
              <button key={key} onClick={() => window.open("https://"+index.href, "_blank")}>
                <span className="license-info">
                  <span><FontAwesomeIcon icon={index.icon}/></span>
                  {index.title}
                </span>
                <p>{index.license}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};