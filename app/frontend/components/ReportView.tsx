import "../styles/ReportView.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ReportView ({setReport, id}: {
  setReport: (index:number) => void, id:number
}) : React.ReactNode {
  return (
    <>
      {id > 0 && (
        <main className="article-background">
          <div className="article">
            <header>
              <span>
                <button onClick={() => setReport(0)}>
                  <FontAwesomeIcon icon={faXmark}/>
                </button>
              </span>
            </header>
            
            <div className="article-content">
              <div className="article-container">
                <h1>Набережная реки Миасс</h1>

                <img src="https://img-fotki.yandex.ru/get/195853/5661614.158/0_c2206_9fd88e76_XL.jpg" alt="" />

                <p>
                  Набережная реки Миасс в центре города: Это, пожалуй, самая 
                  знаковая и посещаемая локация в самом Челябинске, протяжённость 
                  которой составляет около 3 км. Конечно же, потому что находится возле Кирова 
                  (Она же Кировка),Государственного Краеведческого музея и Что сказать по поводу истории набережной? 
                  К началу 810- ых (восемьсот десятых) годах начали возводить первую каменную набережную на реке Миассе. 
                  Поводом для её строительства стала необходимость заменить обветшавший мост и укрепить берега. 
                  Облицовка левого берега началась чуть позже: к середине тех же годов. Остатки этой старинной 
                  кладки можно встретить и сегодня.Современный облик набережная начала приобретать в конце 950-ых 
                  (девятьсот десятых) годах, толчком которого послужил сильнейший нападок 947(девятьсот сорок седьмого) 
                  года, когда сама река Миасс поднялась на 270 сантиметров, тогда берега капитальное укрепили железобетоном. 
                  Вы можете прекрасно это увидеть на снимках, сделанные в те же годы.  
                </p>

              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};