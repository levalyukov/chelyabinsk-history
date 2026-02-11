import "../styles/Start.css"

export default function Start() {
  const tewst = {
    0: {name: "Площадь Революции"},
    1: {name: "Парк Гагарина"},
    2: {name: "Кировка"},
    3: {name: "Краеведческий музей"},
    4: {name: "Немецкий квартал"},
    5: {name: "Дворец культуры ЧМК"},
    6: {name: "Точка интереса"},
    7: {name: "Точка интереса"},
    8: {name: "Точка интереса"},
    9: {name: "Точка интереса"}
  };
  
  return (
    <section id="start">
      <h1 id="anim-element">Погрузитесь в историю</h1>
      <p id="anim-element">Все экскурсии и репортажи в одном месте:</p>
      <div className="places-container">
        <div className="places">
        {Object.entries(tewst).map(([key,index]) => (
          <article key={key}>
            <img src="" alt="" id="cover"/>
            <div className="info">
              <h2>{index.name}</h2>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            </div>
          </article>
        ))}
        </div>
      </div>
      <a href="app/">Начать приключение</a>
    </section>
  );
};