import "../styles/Hero.css";

import testLogotype from "../images/test-logo.svg";
import backgroundLight from "../images/wallpapers/chelyabinsk-0.png";
import backgroundDark from "../images/wallpapers/chelyabinsk-1.png";

export default function Hero():React.ReactNode {
  return (
    <section className="intro">
      <img src={(String(localStorage.getItem("theme")) === "dark" ? backgroundDark : backgroundLight)} alt=""/>
      <div className="info">
        <div className="info-container">
          <span className="logotype" ><img src={testLogotype} alt="logotype.svg"/></span>
          <nav>
            <h1>Экскурсия <br /> с доставкой</h1>
            <p>Присоединяйтесь к нашей экскурсии: погуляем по уютным улицам, узнаем город с новой стороны и просто хорошо проведем время вместе</p>
          </nav>
        </div>
      </div>
    </section>
  );
};