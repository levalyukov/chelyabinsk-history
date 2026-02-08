import "../styles/Tour.css"

export default function Tour() {
  return (
    <section id="tour">
      <div className="container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/%D0%A4%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%8F_%D0%A7%D0%B5%D0%BB%D1%8F%D0%B1%D0%B8%D0%BD%D1%81%D0%BA%D0%B0_%D1%81_%D0%BE%D1%82%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC_%282021%29.jpg" alt="" id="anim-element" className="img-left"/>
        <div className="info">
          <h1 id="anim-element">Ваш гид по городу</h1>
          <p id="anim-element" className="anim-right">
            Позвольте себе изучать город не по списку, а как близкого человека. 
            <br /><br />
            Ваш цифровой спутник поможет услышать его рассказы: от неторопливых историй, которые тихо рассказывают фасады старых зданий, до ярких, страстных спектаклей в его дворцах культуры.
            <br /><br />            
            Вы сможете прикоснуться к его мудрости в тишине музейных залов и понять его характер на оживлённых, солнечных улицах и в уютных парках — там, где жизнь города течёт неспешно и открывается для личного диалога с каждым прохожим.
          </p>
        </div>
      </div>
    </section>
  );
};