import "../styles/Favorite.css"

export default function Favorite() {
  const favorite = {};
  
  if (Object.keys(favorite).length > 0) {
    return (
      <section className="favorite">
        <h1>Избранные места</h1>
        {/* {Object.entries(favorite).map(([key,index]) => (
          <article>
            <img src={index.image} alt="image.jpg"/>
            <div className="card-favorite-info">
              <h1>{index.title}</h1>
              <p>Lorem Ipsum</p>
            </div>
          </article>
        ))} */}
      </section>
    );
  }

  else {
    return (
      <section className="favorite" id="empty">
        <p className="favorite-empty">Пустой список избранных</p>
      </section>
    );  
  };
};