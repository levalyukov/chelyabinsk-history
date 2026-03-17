import "../styles/About.css";

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="info">
          <h1 id="anim-element">Сквозь время</h1>
          <p id="anim-element" className="anim-left">
            Челябинск начинался не с камня, а с гарнизона - в 1736 году на 
            этом месте заложили крепость, чтобы защищать Оренбургский тракт. 
            <br /><br />
            Здесь не строили дворцов, здесь ковали характер: город, который стал "воротами в Сибирь", 
            а в XX веке - танкоградом, давшим фронту треть всех "тридцатьчетверок".
            <br /><br />
            Наш проект - приглашение увидеть город иным. Пройти не просто по проспектам, 
            а сквозь эпохи: от купеческих особняков и водонапорной башни, пережившей пожар 1918 года, 
            до бетонных цехов ЧТЗ, где ковалась Победа, и современного стрит-арта на стенах бывших заводов.
          </p>
        </div>
        <img src="https://www.mk.ru/upload/entities/2019/07/05/10/photoreportsImages/detailPicture/a7/68/d7/e5/1027408_8408583.jpg" alt="" id="anim-element" className="img-right"/>
      </div>
    </section>
  );
};