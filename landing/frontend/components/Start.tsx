import "../styles/Start.css"

import { places } from "../interfaces/Places.interface"

export default function Start() {
  return (
    <section id="start">
      <h1 id="anim-element">Погрузитесь в историю</h1>
      <p id="anim-element">Все экскурсии и репортажи в одном месте:</p>
      <div className="places-container">
        <div className="places">
        {Object.keys(places).length !== 0 ? (
        <>
          {Object.entries(places).map(([key,index]) => (
            <article key={key} className="place-card">
              <img src={index.image} alt=""/>
              <span className="place-info">
                <h2>{index.name}</h2>
                <p>{index.description}</p>
              </span>
            </article>
          ))}
        </>
        ) : (
          <>
            <article id="empty"></article>
            <article id="empty"></article>
            <article id="empty"></article>
            <article id="empty"></article>
            <article id="empty"></article>
          </>
        )}
        </div>
      </div>
      <a href="app/">Начать приключение</a>
    </section>
  );
};