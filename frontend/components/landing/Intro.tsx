import "../../styles/landing/Intro.css"
import lightImage from "../../images/chelyabink-0.png"

function Intro() {
  return (
    <section id="intro">
      <img src={lightImage} alt=""/>
      <div className="info">
        <h1>Lorem ipsum</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam dolor dolores, veniam facilis!</p>
      </div>
    </section>
  );
};

export default Intro;