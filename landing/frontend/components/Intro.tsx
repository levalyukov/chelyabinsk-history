import "../styles/landing/Intro.css";

import small_logotype from "../images/small-logo.svg";

import backgroundLight from "../images/wallpapers/chelyabinsk-0.png";
import backgroundDark from "../images/wallpapers/chelyabinsk-1.png";

function Intro() {
  return (
    <section className="intro">
      <img src={(String(localStorage.getItem("theme")) === "dark" ? backgroundDark : backgroundLight)} alt=""/>
      <div className="info">
        <span className="logotype" ><img src={small_logotype} alt="logotype.svg"/></span>
        <h1 id="anim-element">Экскурсия с доставкой</h1>
        <p id="anim-element">Приглашаем вас на увлекательную экскурсию по столице Южного Урала</p>
      </div>
    </section>
  );
};

export default Intro;