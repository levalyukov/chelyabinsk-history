import "../styles/Intro.css";

import small_logotype from "../images/test-logo.svg";

import backgroundLight from "../images/wallpapers/chelyabinsk-0.png";
import backgroundDark from "../images/wallpapers/chelyabinsk-1.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function Intro() {
  return (
    <section className="intro">
      <img src={(String(localStorage.getItem("theme")) === "dark" ? backgroundDark : backgroundLight)} alt=""/>
      <div className="info">
        <div className="info-container">
          <span className="logotype" ><img src={small_logotype} alt="logotype.svg"/></span>
          <nav>
            <h1>Экскурсия <br /> с доставкой</h1>
            <p>Присоединяйтесь к нашей экскурсии: погуляем по уютным улицам, узнаем город с новой стороны и просто хорошо проведем время вместе</p>
          </nav>
        </div>

        <span className="info-buttons">
          <a href=""><span><FontAwesomeIcon icon={faDownload}/></span> Установить для Windows</a>
          <a href="">Открыть в браузере</a>
        </span>
      </div>
    </section>
  );
};