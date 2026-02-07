import "../styles/About.css";

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="info">
          <h1 id="anim-element">Идея проекта</h1>
          <p id="anim-element" className="anim-left">
            Каждый город — это собрание историй, рассказанных камнем, краской и памятью. 
            <br /><br />
            Наш проект — это приглашение услышать Челябинск. 
            Пройти не просто улицами, а сквозь время: от отголосков прошлого в 
            старинных зданиях до живого пульса в стрит-арте и современных сценах. 
            Это бесплатный ключ к культурному коду города для каждого — и для того, 
            кто живёт здесь годами, и для того, кто впервые увидел его горизонт. 
            <br /><br />
            К 2027 году мы хотим, чтобы статус Челябинска как культурной столицы России
            был не просто словами, а пережитым опытом тысяч людей.
          </p>
        </div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/%D0%A4%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%8F_%D0%A7%D0%B5%D0%BB%D1%8F%D0%B1%D0%B8%D0%BD%D1%81%D0%BA%D0%B0_%D1%81_%D0%BE%D1%82%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC_%282021%29.jpg" alt="" id="anim-element" className="img-right"/>
      </div>
    </section>
  );
};