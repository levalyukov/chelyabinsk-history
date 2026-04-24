import "../styles/Hero.css";

import video from "../images/video.mp4"
import logotype from "../images/test-logo.svg";

export default function Hero():React.ReactNode {
  return (
    <section className="hero">
      <video className="video-bg" autoPlay muted loop playsInline>
        <source src={video} type="video/mp4"/>
      </video>
      <div className="info">
        <div className="info-container">
          <span className="logotype" ><img src={logotype} alt="logotype.svg"/></span>
          
          <nav>
            <h1>Экскурсия <br /> с доставкой</h1>
            <p>Присоединяйтесь к нашей экскурсии: погуляем по уютным улицам, узнаем город с новой стороны и просто хорошо проведем время вместе</p>
          </nav>
        </div>

        <div className="info-buttons">
          <a href="app/">
            Открыть приложение
          </a>
        </div>
      </div>
    </section>
  );
};