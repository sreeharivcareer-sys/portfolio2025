import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { HeaderBanner } from './components/HeaderBanner/HeaderBanner';
import { DarkHeader } from './components/HeaderBanner/DarkHeader';
import { MainContainer } from './components/MainContainer/MainContainer';
import { ExperienceContainer } from './components/ExperienceContainer/ExperienceContainer';
import Skills from './components/Skills/Skills';
import { Tools } from './components/Tools/Tools';
import { Education } from './components/Education/Education';
import { Reference } from './components/Reference/Reference';
import { Connect } from './components/Connect/Connect';


function App() {

  const [blackMenu, setBlackMenu] = useState(false);
  const [blackWish, setBlackWish] = useState(false);
  const [animateScore, setAnimateScore] = useState(false);
  const [notMain, setNotMain] = useState(false);

  const refExp = useRef(null);
  const refTools = useRef(null);
  const refEdu = useRef(null);
  const refConnect = useRef(null);
  const refMain = useRef(null);
  const refSkills = useRef(null);
  const refReference = useRef(null);
  


  const sectionRefs = {
    refMain: refMain,       // Corresponds to Index menu item
    refSkills: refSkills,    // Corresponds to Skills menu item
    refTools: refTools,       // Corresponds to Gear menu item
    refEdu: refEdu,    // Corresponds to Education menu item
    refReference: refReference, // Corresponds to Reference menu item
    refContact: refConnect,
    refExp:refExp   // Corresponds to Contact menu item
  };

  const scrollToSection = (refKey) => {
    const ref = sectionRefs[refKey];
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {

          if (entry.target === refExp.current) {
            setBlackWish(entry.isIntersecting);
          }

          if (entry.target === refTools.current) {
          }

          if (entry.target === refEdu.current) {
            setAnimateScore(entry.isIntersecting);
          }
          if (entry.target === refConnect.current) {
            setBlackMenu(entry.isIntersecting);
            setBlackWish(entry.isIntersecting);
          }
          if (entry.target === refMain.current) {
            setNotMain(!entry.isIntersecting);
          }

        });
      },
      { threshold: 0.2 }
    );

    if (refExp.current) observer.observe(refExp.current);
    if (refTools.current) observer.observe(refTools.current);
    if (refEdu.current) observer.observe(refEdu.current);
    if (refConnect.current) observer.observe(refConnect.current);
    if (refMain.current) observer.observe(refMain.current);

    return () => observer.disconnect();
  }, []);



  useEffect(() => {
    console.log("Black Menu:", blackMenu);
  }, [blackMenu]);

  return (
    <div className="App">
      <div className='stickey-header'>
        <HeaderBanner scrollToSection={scrollToSection} notMain={notMain} blackWish={blackWish} blackMenu={blackMenu} />
      </div>


      <div ref={refMain} className="scroll-section">
        <MainContainer />
      </div>

      <div ref={refSkills} className="scroll-section">
        <Skills />
      </div>
      <div ref={refTools} className="scroll-section">
        <Tools />
      </div>
      <div ref={refExp} className="scroll-section">
        <ExperienceContainer />
      </div>
      <div ref={refEdu} className="scroll-section">
        <Education animate={animateScore} />
      </div>
      <div ref={refReference}  className="scroll-section">
        <Reference />
      </div>
      <div ref={refConnect}  className="scroll-section">
        <Connect />
      </div>
    </div>
  );
}

export default App;
