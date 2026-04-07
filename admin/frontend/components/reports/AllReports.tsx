import "../../styles/reports/AllReports.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function AllReport () : React.ReactNode {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  useEffect(() => {
    async function getReports () {
      try {
        const request = await fetch("http://localhost:3000/api/reports");
        const result = await request.json();
        setData(result);
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

  if (loading) {
    return (
      <div className="place-container" id="empty">
        <article id="empty"></article>
        <article id="empty"></article>
        <article id="empty"></article>
        <article id="empty"></article>
      </div>
    );
  };

  if (Object.keys(data).length === 0 || error) {
    return (
      <div className="place-container" id="error">
        <span><FontAwesomeIcon icon={faMagnifyingGlassLocation}/></span>
        <h1>Ой, а тут ничего нету!</h1>
        <p>Произошла ошибка при загрузке репортажей.</p>
      </div>
    );
  };

  return (
    <></>
  );
};