import "../styles/App.css";

import Header from "./Header";
import Hero  from "./Hero";
import About  from "./About";
import Tour   from "./Tour";
import Start  from "./Start";
import Footer from "./Footer";

import LicenseModal from "./modals/LicenseModal";
import PrivacyPolicyModal from "./modals/PrivacyPolicyModal";

import { useEffect, useState } from "react";

export default function Landing() {
  const [theme, changeTheme] = useState<boolean>(false);
  const [licenseVisible, setLicenseVisible] = useState<boolean>(false);
  const [policyVisible, setPrivacyPolicyVisible] = useState<boolean>(false);
  const changeLicenseVisible = () => setLicenseVisible(true);
  const changePolicyVisible = () => setPrivacyPolicyVisible(true);

  function setTheme(): void {
    changeTheme(!theme);
    document.documentElement.setAttribute(
      "theme", (!theme) ? "dark" : "light");
    localStorage.setItem("theme", (!theme) ? "dark" : "light");
  };

  function getTheme():boolean {
    return theme;
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

    const browserTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    let link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement("link");
    if (link) {
      link.type = 'image/svg+xml';
      link.rel  = 'icon';
      link.href = browserTheme ? "./logotype-light.svg" : "./logotype-dark.svg";
      document.getElementsByTagName('head')[0].appendChild(link);
    };
  }, []);

  return (
    <main id="app">
      {licenseVisible && (<LicenseModal setModalVisible={setLicenseVisible}/>)}
      {policyVisible && (<PrivacyPolicyModal setModalVisible={setPrivacyPolicyVisible}/>)}

      <Header 
        setTheme={setTheme} 
        getTheme={getTheme} 
        setLang={setLanguage}/>
      <Hero/>
      <About/>
      <Tour/>
      <Start/>
      <Footer
        licenseVisible={changeLicenseVisible}
        policyVisible={changePolicyVisible}/>
    </main>
  );
};