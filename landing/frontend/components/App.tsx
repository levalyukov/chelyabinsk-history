import "../styles/App.css";

import Header from "./Header";
import Intro  from "./Intro";
import About  from "./About";
import Tour   from "./Tour";
import Start  from "./Start";
import Footer from "./Footer";

import { useEffect, useState } from "react";

export default function Landing() {
  const [theme, changeTheme] = useState<boolean>(false);

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

    const elements = document.querySelectorAll('#anim-element');
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anim-visible');
          observer.unobserve(entry.target);
        };
      });
    }, { threshold: 0.1 });
    elements.forEach(el => observer.observe(el));
  });

  return (
    <main id="app">
      <Header theme={setTheme} lang={setLanguage}/>
      <Intro/>
      <About/>
      <Tour/>
      <Start/>
      <Footer/>
    </main>
  );
};