import "../styles/Start.css"

export default function Start() {
  const tewst = {
    0: {
      name: "Площадь Революции",
      image: "https://s13.stc.yc.kpcdn.net/share/i/12/10326209/wr-960.webp"
    },
    1: {
      name: "Парк Гагарина",
      image: "https://pchela.news/storage/app/uploads/public/2dc/47d/a97/thumb__770_490_0_0_crop.jpg"
    },
    2: {
      name: "Кировка",
      image: "https://files.1mi.media/38ba5dd6ed8325c41f0abffaa2c90e647c4d8d6e/c:1920:1080:nowe:0:0/ac28eedc26e50f92700706a25a7f5f0458f716c2caed27424cebcf4a3cc1.jpg"
    },
    3: {
      name: "Краеведческий музей",
      image: "https://uraloved.ru/images/muzei/chel/chel-muz-5.jpg?1725854614000"
    },
    4: {
      name: "Немецкий квартал",
      image: "https://aif-s3.aif.ru/images/021/101/6b5410f32f834c5b6dfde15ea107d400.jpg"
    },
    5: {
      name: "Дворец культуры ЧМК",
      image: "https://cdn.culture.ru/images/61b5191d-4b2c-5b6c-9546-53e28088930d"
    },
    6: {
      name: "Дом В. Покровского",
      image: "https://npural.chelreglib.ru/image/2cff2542f4e64987a8290a22e8c198f2/medium?format=jpg"
    },
    7: {
      name: "Челябинский бор",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Chelyabinsk_forest_pool_2010.jpg"
    },
    8: {
      name: "Дом Данцигера",
      image: "https://npural.chelreglib.ru/image/f9c8ed578bd44d209769366326be187e/medium?format=jpg"
    }
  };
  
  return (
    <section id="start">
      <h1 id="anim-element">Погрузитесь в историю</h1>
      <p id="anim-element">Все экскурсии и репортажи в одном месте:</p>
      <div className="places-container">
        <div className="places">
        {Object.entries(tewst).map(([key,index]) => (
          <article key={key}>
            <img src={index.image} alt="" id="cover"/>
            <div className="info">
              <h2>{index.name}</h2>
            </div>
          </article>
        ))}
        </div>
      </div>
      <a href="app/">Начать приключение</a>
    </section>
  );
};