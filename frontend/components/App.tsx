import "../styles/App.css";

import Header   from "./Header";
import Intro  from "./landing/Intro";
import About  from "./landing/About";
import Tour   from "./landing/Tour";
import Start  from "./landing/Start";
/* main app */
import Tours    from "./app/Tours";
/* -------- */
import Footer   from "./Footer";

import { useEffect, useState } from "react";


function App() {
  const [language, changeLanguage] = useState<string>("ru");
  const [theme, changeTheme] = useState<boolean>(false);
  const [page, changePage] = useState<"landing" | "all-tours">("landing");

  function setPage(page:"landing"|"all-tours"): void {
    changePage(page);
  };

  function setTheme(): void {
    changeTheme(!theme);
    document.documentElement.setAttribute(
      "theme", (!theme) ? "dark" : "light");
    localStorage.setItem("theme", (!theme) ? "dark" : "light");
  };

  function setLanguage(lang:string): void {
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  };

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      changeTheme((localStorage.getItem("theme") === "dark") ? true : false);
      document.documentElement.setAttribute(
        "theme", String(localStorage.getItem("theme")));
    }; 
    
    if (localStorage.getItem("lang")) {
      setLanguage(String(localStorage.getItem("lang")));
      document.documentElement.lang = String(localStorage.getItem("lang"));
    };
  });

  return (
    <main id="app">
      <Header theme={setTheme} lang={setLanguage}/>
      {page === "landing" && (
        <>
          <Intro/>
          <About/>
          <Tour/>
          <Start onChangePage={changePage}/>
        </>
      )}
      {page === "all-tours" && <Tours/>}
      <main className="app">
        <div className="container">
          <Footer/>
        </div>
      </main>
    </main>
  );
};

export default App;