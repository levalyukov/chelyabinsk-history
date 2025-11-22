import "../styles/App.css";

import Header from "./Header";
import Landing from "./Landing";
import Footer from "./Footer";

import { useEffect, useState } from "react";

function App() {
  const [language, changeLanguage] = useState<string>("");
  const [theme, changeTheme] = useState<boolean>(false);
  const [page, changePage] = useState<"landing" | "test">("landing");

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
    }; if (localStorage.getItem("lang")) {
      setLanguage(String(localStorage.getItem("lang")));
      document.documentElement.lang = String(localStorage.getItem("lang"));
    };
  });

  return (
    <>
      <Header theme={setTheme} lang={setLanguage}/>
      {page == "landing" && <Landing/>}
      <main className="app">
        <div className="container">
          {/* <Footer/> */}
        </div>
      </main>
    </>
  );
};

export default App;