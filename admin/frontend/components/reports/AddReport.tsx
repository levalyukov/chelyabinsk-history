import "../../styles/reports/AddReport.css"

import TextEditor from "../TextEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faClock, faLocationDot, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { type PlaceSchedules } from "../../interfaces/addreports.interface";

export default function AddReport () : React.ReactNode {
  const [error, setError] = useState<string>("");

  const [words, setWordsCounter] = useState<number>(0);
  const [markerImage, setMarkerImage] = useState<string|null>(null);
  const [markerTitle, setMarkerTitle] = useState<string>("Пример заголовка");
  const [markerDescription, setMarkerDescription] = useState<string>("Вот вам яркий пример современных тенденций — высококачественный прототип будущего проекта однозначно фиксирует необходимость системы массового участия.");
  const [markerAddress, setMarkerAddress] = useState<string>("Центральный район, пл. Ярославского 1");
  const [hasVideo, setVideoFlag] = useState<boolean>(false);
  const [lngLat, setLngLat] = useState<[number,number]>([61.1339,55.0116]);

  const [schedule, setPlaceSchedule] = useState<PlaceSchedules>();
  const datetime = new Date();
  const dayIndex:number = datetime.getDay() === 0 ? 6 : datetime.getDay() - 1;
  
  useEffect(() => {
    const articleContent = document.getElementById("article-content") as HTMLTextAreaElement;
    const imageMarker = document.getElementById("marker-cover") as HTMLInputElement;
    const titleMarker = document.getElementById("marker-title") as HTMLInputElement;
    const descriptionMarker = document.getElementById("marker-description") as HTMLInputElement;
    const addressMarker = document.getElementById("marker-address") as HTMLInputElement;

    articleContent?.addEventListener('input', () => wordsCounter(articleContent, setWordsCounter));
    imageMarker?.addEventListener('input', () => _MarkerImage(imageMarker, setMarkerImage));
    titleMarker?.addEventListener('input', () => _MarkerTitle(titleMarker, setMarkerTitle));
    descriptionMarker?.addEventListener('input', () => _MarkerDescription(descriptionMarker, setMarkerDescription));
    addressMarker?.addEventListener('input', () => _MarkerAddress(addressMarker, setMarkerAddress));

    return () => {
      articleContent?.removeEventListener('input', () => wordsCounter);
      titleMarker?.removeEventListener('input', () => _MarkerTitle(titleMarker, setMarkerTitle));
      descriptionMarker?.removeEventListener('input', () => _MarkerDescription(descriptionMarker, setMarkerDescription));
      addressMarker?.removeEventListener('input', () => _MarkerAddress(addressMarker, setMarkerAddress));
    };
  }, [markerImage, markerTitle, markerDescription, markerAddress, hasVideo, words]);

  return (
    <div className="add-report">
      {error.trim() !== "" && error.trim().split(/\s+/).length > 0 && (
        <div className="error-tablet">
          Ошибка сервера: {error}
        </div>
      )}

      <h1>Новый репортаж

        <span className="add-report-actions">
          {/* <button><span><FontAwesomeIcon icon={faEye}/></span> Предпосмотр</button> */}

          <button onClick={() => {
            const title = document.getElementById("article-title") as HTMLInputElement;
            const description = document.getElementById("article-description") as HTMLTextAreaElement;
            const content = document.getElementById("article-content") as HTMLTextAreaElement;
            const image = document.getElementById("article-cover") as HTMLInputElement;
            const video = document.getElementById("article-video") as HTMLInputElement;

            addReport(title, content, description, image, video, setError);
          }} className="button-ghost">
            Опубликовать
          </button>
        </span>
      </h1>

      <div className="report-form">
        <div style={{display: "flex", gap: 10, width: '100%', marginBottom: 25}}>
          <div style={{display: "flex", gap: 10, flexDirection: "column", width: '100%'}}>
            <input type="text" className="title" id="article-title" placeholder="Название репортажа..."/>
            <textarea id="article-description" maxLength={256} placeholder="Короткое описание репортажа"></textarea>
            <label style={{marginTop: 24}} htmlFor="">Координаты</label>
            <span style={{display: "flex", width: '100%', gap: 12}}>
              <input style={{width: '100%'}} type="number" step={0.0001} min={61.1339} max={61.6443} className="title" id="article-coords" placeholder="Долгота: 61.4025"/>
              <input style={{width: '100%'}} type="number" step={0.0001} min={55.0116} max={55.3217} className="title" id="article-coords" placeholder="Ширина: 55.1599"/>
            </span>
          </div>

          <div style={{display: "flex", gap: 10, flexDirection: "column", width: '100%'}}>
            <div className="file-section">
              <span>
                <h1>Загрузить обложку</h1>
              </span>
              <input id="article-cover" type="file" accept="image/*"/>
            </div>

            <div className="file-section">
              <span>
                <h1>Загрузить видео-репортаж</h1>
              </span>
              <input id="article-video" onChange={(e) => {
                const files = e.target.files?.length ?? 0;
                if (files > 0) {
                  setVideoFlag(true);
                } else {
                  setVideoFlag(false);
                }
              }} type="file" accept="video/*"/>
            </div>
          </div>

        </div>

        <div style={{display:"flex", flexDirection:"column", gap: 12, width: '100%', marginBottom: 50}}>
          <label htmlFor="">Время работы</label>
          <span style={{display: "flex", gap: 12, flexDirection: "column", width: '100%'}}>
            <span style={{display: "flex", gap: 12}}>
              <span style={{display: "flex", flexDirection: "column", width: '100%'}}>
                <label className="subtitle" htmlFor="">Понедельник</label>
                <span style={{display: "flex", gap: 12, width: '100%'}}>
                  <input id="monday-open"  style={{width: '100%'}} onChange={() => ScheduleTrigger(setPlaceSchedule)} type="time" />
                  <input id="monday-close" style={{width: '100%'}} onChange={() => ScheduleTrigger(setPlaceSchedule)} type="time" />
                </span>
              </span>

              <span style={{display: "flex", flexDirection: "column", width: '100%'}}>
                <label className="subtitle" htmlFor="">Вторник</label>
                <span style={{display: "flex", gap: 12, width: '100%'}}>
                  <input id="tuesday-open"  style={{width: '100%'}} onChange={() => ScheduleTrigger(setPlaceSchedule)} type="time" />
                  <input id="tuesday-close" style={{width: '100%'}} onChange={() => ScheduleTrigger(setPlaceSchedule)} type="time" />
                </span>
              </span>

              <span style={{display: "flex", flexDirection: "column", width: '100%'}}>
                <label className="subtitle" htmlFor="">Среда</label>
                <span style={{display: "flex", gap: 12, width: '100%'}}>
                  <input id="wednesday-open"  style={{width: '100%'}} onChange={() => ScheduleTrigger(setPlaceSchedule)} type="time" />
                  <input id="wednesday-close" style={{width: '100%'}} onChange={() => ScheduleTrigger(setPlaceSchedule)} type="time" />
                </span>
              </span>
            </span>
            <span style={{display: "flex", gap: 12}}>
              <span style={{display: "flex", flexDirection: "column", width: '100%'}}>
                <label className="subtitle" htmlFor="">Четверг</label>
                <span style={{display: "flex", gap: 12, width: '100%'}}>
                  <input id="thursday-open"  style={{width: '100%'}} onChange={() => ScheduleTrigger(setPlaceSchedule)} type="time" />
                  <input id="thursday-close" style={{width: '100%'}} onChange={() => ScheduleTrigger(setPlaceSchedule)} type="time" />
                </span>
              </span>

              <span style={{display: "flex", flexDirection: "column", width: '100%'}}>
                <label className="subtitle" htmlFor="">Пятница</label>
                <span style={{display: "flex", gap: 12, width: '100%'}}>
                  <input id="friday-open"  style={{width: '100%'}} onChange={() => ScheduleTrigger(setPlaceSchedule)} type="time" />
                  <input id="friday-close" style={{width: '100%'}} onChange={() => ScheduleTrigger(setPlaceSchedule)} type="time" />
                </span>
              </span>

              <span style={{display: "flex", flexDirection: "column", width: '100%'}}>
                <label className="subtitle" htmlFor="">Суббота</label>
                <span style={{display: "flex", gap: 12, width: '100%'}}>
                  <input id="saturday-open"  style={{width: '100%'}} onChange={() => ScheduleTrigger(setPlaceSchedule)} type="time" />
                  <input id="saturday-close" style={{width: '100%'}} onChange={() => ScheduleTrigger(setPlaceSchedule)} type="time" />
                </span>
              </span>
            </span>

            <span style={{display: "flex", flexDirection: "column", width: '100%'}}>
              <label className="subtitle" htmlFor="">Воскресенье</label>
                <span style={{display: "flex", gap: 12, width: '100%'}}>
                  <input id="sunday-open"  style={{width: '100%'}} onChange={() => ScheduleTrigger(setPlaceSchedule)} type="time" />
                  <input id="sunday-close" style={{width: '100%'}} onChange={() => ScheduleTrigger(setPlaceSchedule)} type="time" />
                </span>
            </span>
          </span>
        </div>

        <div style={{display:"flex", flexDirection:"column", gap: 12, width: '100%'}}>
          <TextEditor/>
          <span style={{display: "flex", gap: 10}}>
            <p>Кол-во слов: {words}</p>
          </span>
          <textarea name="" id="article-content" style={{width: '100%', height: 750}} maxLength={10000} placeholder="Творить здесь!"></textarea>
        </div>


        <div style={{display:"flex", flexDirection:"column", gap: 12, width: '100%', marginTop: 50}}>
          <label htmlFor="">Поп-ап/Маркер</label>
          <div style={{display:"flex", gap: 32}}>
            <div style={{display:"flex", width: "100%", flexDirection:"column", gap: 12}}>
              <div className="file-section">
                <span>
                  <h1>Загрузить картинку</h1>
                </span>
                <input id="marker-cover" type="file" accept="image/*"/>
              </div>

              <span style={{display:"flex", flexDirection:"column", gap: 12}}>
                <label htmlFor="" className="subtitle">Название</label>
                <input id="marker-title" type="text" />
              </span>

              <span style={{display:"flex", flexDirection:"column", gap: 12}}>
                <label htmlFor="" className="subtitle">Описание</label>
                <textarea id="marker-description" />
              </span>

              <span style={{display:"flex", flexDirection:"column", gap: 12}}>
                <label htmlFor="" className="subtitle">Адрес места</label>
                <input id="marker-address" type="text" />
              </span>
            </div>

            <div style={{display:"flex", width: "100%", flexDirection:"column", gap: 12}}>
              <article className="test-modal">
                <span className="marker-content">
                  <img className="map-popup-image" src={String(markerImage)} alt="" />
                  <span className="map-popup-text">
                    <h1>{markerTitle}</h1>
                    <p>{markerDescription}</p>
                    <nav className="map-popup-info">
                      <p><span><FontAwesomeIcon icon={faLocationDot}/></span>{markerAddress}</p>
                      <p><span><FontAwesomeIcon icon={faClock}/></span>
                        {(schedule?.[dayIndex]?.[0][0] == null && schedule?.[dayIndex]?.[0][1] == null)
                        || (schedule?.[dayIndex]?.[1][0] == null && schedule?.[dayIndex]?.[1][1] == null)
                        ? (<>Круглосуточно</>)
                        : (<>
                        {String(schedule?.[dayIndex]?.[0][0]).padStart(2,"0")}:{String(schedule?.[dayIndex]?.[0][1]).padStart(2,"0")}
                        &nbsp;-&nbsp; 
                        {String(schedule?.[dayIndex]?.[1][0]).padStart(2,"0")}:{String(schedule?.[dayIndex]?.[1][1]).padStart(2,"0")}
                        </>)}
                      </p>
                      <p><span><FontAwesomeIcon icon={faLocationArrow}/></span>{lngLat[0]}, {lngLat[1]}</p>
                    </nav>
                    {hasVideo && (
                      <nav className="map-popup-actions">
                        <button className="map-popup-actions-report">
                          Смотреть репортаж <span><FontAwesomeIcon icon={faCirclePlay}/></span>
                        </button>
                      </nav>
                    )}
                  </span>
                </span>
              </article>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

async function addReport (title:HTMLInputElement, description:HTMLTextAreaElement,
  content:HTMLTextAreaElement, image:HTMLInputElement, video:HTMLInputElement, setError: (error: string) => void
) : Promise<void> {
  try {
    const request = await fetch(`http://localhost:3000/api/add_report`, {
      method: "POST",
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        content: content.value,
        cover: image.files?.[0],
        video: video.files?.[0]
      })
    });

    const result = await request.json();
    console.log(result);
  } catch (err) {
    setError(String(err));
  }
};

function wordsCounter (textarea: HTMLTextAreaElement, 
  setWords: (counter:number) => void) : void {
  const text = textarea.value.trim();

  if (text === "") {
    setWords(0);
    return;
  };

  setWords(text.split(/\s+/).length);
};

function _MarkerImage (input:HTMLInputElement, setValue: (data:string|null) => void) : void {
  const file = input.files?.[0];
  if (input.value.trim().split(/\s+/).length > 0 && file && file.type.startsWith('image/')) {
    setValue(URL.createObjectURL(file));
  } else {
    setValue(null);
  };
};

function _MarkerTitle (input:HTMLInputElement, setValue: (data:string) => void) : void {
  if (input.value.trim().split(/\s+/).length > 0) {
    setValue(input.value);
  } else {
    setValue("Пример заголовка");
  };
};

function _MarkerDescription (input:HTMLInputElement, setValue: (data:string) => void) : void {
  if (input.value.trim().split(/\s+/).length > 0) {
    setValue(input.value);
  } else {
    setValue("Вот вам яркий пример современных тенденций — высококачественный прототип будущего проекта однозначно фиксирует необходимость системы массового участия.");
  };
};

function _MarkerAddress (input:HTMLInputElement, setValue: (data:string) => void) : void {
  if (input.value.trim().split(/\s+/).length > 0) {
    setValue(input.value);
  } else {
    setValue("Центральный район, пл. Ярославского 1");
  };
};

function ScheduleTrigger (setSchedule: (schedule:PlaceSchedules) => void) : void {
  const mondayOpen      = document.getElementById("monday-open")      as HTMLInputElement;
  const mondayClose     = document.getElementById("monday-close")     as HTMLInputElement;
  const tuesdayOpen     = document.getElementById("tuesday-open")     as HTMLInputElement;
  const tuesdayClose    = document.getElementById("tuesday-close")    as HTMLInputElement;
  const wednesdayOpen   = document.getElementById("wednesday-open")   as HTMLInputElement;
  const wednesdayClose  = document.getElementById("wednesday-close")  as HTMLInputElement;
  const thursdayOpen    = document.getElementById("thursday-open")    as HTMLInputElement;
  const thursdayClose   = document.getElementById("thursday-close")   as HTMLInputElement;
  const fridayOpen      = document.getElementById("friday-open")      as HTMLInputElement;
  const fridayClose     = document.getElementById("friday-close")     as HTMLInputElement;
  const saturdayOpen    = document.getElementById("saturday-open")    as HTMLInputElement;
  const saturdayClose   = document.getElementById("saturday-close")   as HTMLInputElement;
  const sundayOpen      = document.getElementById("sunday-open")      as HTMLInputElement;
  const sundayClose     = document.getElementById("sunday-close")     as HTMLInputElement;

  const data:PlaceSchedules = {
    0: (mondayOpen && mondayClose) 
    ? [[Number(mondayOpen?.value.split(':')[0]), Number(mondayOpen?.value.split(':')[1])], 
    [Number(mondayClose?.value.split(':')[0]), Number(mondayClose?.value.split(':')[1])]] 
    : null,

    1: (tuesdayOpen && tuesdayClose) 
    ? [[Number(tuesdayOpen?.value.split(':')[0]), Number(tuesdayOpen?.value.split(':')[1])], 
    [Number(tuesdayClose?.value.split(':')[0]), Number(tuesdayClose?.value.split(':')[1])]] 
    : null,

    2: (wednesdayOpen && wednesdayClose) 
    ? [[Number(wednesdayOpen?.value.split(':')[0]), Number(wednesdayOpen?.value.split(':')[1])], 
    [Number(wednesdayClose?.value.split(':')[0]), Number(wednesdayClose?.value.split(':')[1])]] 
    : null,

    3: (thursdayOpen && thursdayClose) 
    ? [[Number(thursdayOpen?.value.split(':')[0]), Number(thursdayOpen?.value.split(':')[1])], 
    [Number(thursdayClose?.value.split(':')[0]), Number(thursdayClose?.value.split(':')[1])]] 
    : null,

    4: (fridayOpen && fridayClose) 
    ? [[Number(fridayOpen?.value.split(':')[0]), Number(fridayOpen?.value.split(':')[1])], 
    [Number(fridayClose?.value.split(':')[0]), Number(fridayClose?.value.split(':')[1])]] 
    : null,

    5: (saturdayOpen && saturdayClose) 
    ? [[Number(saturdayOpen?.value.split(':')[0]), Number(saturdayOpen?.value.split(':')[1])], 
    [Number(saturdayClose?.value.split(':')[0]), Number(saturdayClose?.value.split(':')[1])]] 
    : null,

    6: (sundayOpen && saturdayClose) 
    ? [[Number(sundayOpen?.value.split(':')[0]), Number(sundayOpen?.value.split(':')[1])], 
    [Number(sundayClose?.value.split(':')[0]), Number(sundayClose?.value.split(':')[1])]] 
    : null,
  };
  
  setSchedule(data);
};