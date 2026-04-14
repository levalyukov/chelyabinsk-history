import "../styles/Reports.css"

import AddReport from "./reports/AddReport";
import ChangeReport from "./reports/ChangeReport";
import DeleteReport from "./reports/DeleteReport";
import AllReport from "./reports/AllReports";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrow, faChevronRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { type AppPages } from "../interfaces/app.interface";
import { type AdminButtons, type AllReports, buttons } from "../interfaces/reports.interface"

export default function Reports ({setPage, getPage}: 
  {setPage: (page:AppPages) => void, getPage: string}) : React.ReactNode {
  const [reports, setReports] = useState<AllReports>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function getReports () {
      try {
        const request = await fetch("http://localhost:3000/api/all_reports");
        const result = await request.json();
        setReports(result);
        setLoading(false);
        setError(false);
      } catch (e) {
        setError(true);
        setLoading(false);
        console.log("API error: ", e);
      };
    }; 

    getReports();
  }, []);

  return (  
    <section className="report-config">
      {getPage === "all" 
      ? (<h1>Репортажи <span>Всего репортажей: {Object.keys(reports).length }</span></h1>)
      : (
        <button className="back-button" onClick={() => setPage("all")}>
          <FontAwesomeIcon icon={faArrowLeft}/>
        </button>
      )}
      <div className="report-content">
        {getPage === "all" && (<>
          <div className="report-actions">
            {Object.entries(buttons as AdminButtons).map(([key,index]) => (
              <button key={key} onClick={() => setPage(index.page)}>
                <span style={{color: (index.iconColor !== undefined && index.iconColor)}}>
                  <FontAwesomeIcon icon={index.icon}/>
                </span> {index.title}
              </button>
            ))}
          </div>

          {Object.keys(reports).length > 0 
          ? (<>
            <div className="articles">
              <div className="article-container">
                <article id="empty">
                  <span><FontAwesomeIcon icon={faCrow} /></span>
                  <p>Нету статьей!</p>
                </article>
              </div>

              {Object.keys(reports).length > 3 && (
              <button onClick={() => setPage("allReports")}>
                Показать все статьи <span><FontAwesomeIcon icon={faChevronRight} /></span>
              </button>
              )}
            </div>
          </>)
          
          : (<>
            <div className="articles">
              <div className="article-container">
                <article id="empty">
                  <span><FontAwesomeIcon icon={faCrow} /></span>
                  <p>Нету статьей!</p>
                </article>
              </div>
            </div>
          </>)}
        </>)}

        {getPage === "addReport" && (
          <AddReport/>
        )}

        {getPage === "changeReport" && (
          <ChangeReport/>
        )}

        {getPage === "deleteReport" && (
          <DeleteReport/>
        )}

        {getPage === "allReports" && (
          <AllReport/>
        )}
      </div>
    </section>
  );
};