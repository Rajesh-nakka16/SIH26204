import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import PlannerForm from '../components/PlannerForm';
import TripControlCenter from '../components/TripControlCenter';
import TransportAndStaySection from '../components/TransportAndStaySection';
import TasteAndDiscoverSection from '../components/TasteAndDiscoverSection';
import CrowdAvoidanceSection from '../components/CrowdAvoidanceSection';
import ItinerarySection from '../components/ItinerarySection';
import UtilitySuite from '../components/UtilitySuite';
import FinalCTA from '../components/FinalCTA';

export default function HomePage({
  form,
  setForm,
  plan,
  isGenerating,
  generateTrip,
  isSaved,
  saveCurrentTrip,
  selectedTransport,
  setSelectedTransport,
  crowdChoice,
  setCrowdChoice,
  lang,
  setLang,
  chat,
  setChat,
  assistant,
  setAssistant,
  addedStays,
  handleAddStay,
  addedFoods,
  handleAddFood,
  addedGems,
  handleAddGem,
  handleDownloadOffline,
  handleDownloadPack,
}) {
  // Intersection observer for module animations (matching the reference site behavior)
  useEffect(() => {
    const modules = document.querySelectorAll('.section, .signal-strip, .final-cta');
    modules.forEach((module, index) => {
      module.classList.add('module-reveal');
      module.style.setProperty('--module-delay', `${Math.min(index * 70, 420)}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('module-visible');
            observer.unobserve(entry.target);
          }
        }),
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    modules.forEach((module) => observer.observe(module));
    return () => observer.disconnect();
  }, [plan]);

  const scrollToPlanner = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('planner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main id="top">
      <HeroSection onPlanClick={scrollToPlanner} />

      <PlannerForm
        form={form}
        setForm={setForm}
        onGenerate={generateTrip}
        isGenerating={isGenerating}
      />

      {plan && (
        <>
          <TripControlCenter
            plan={plan}
            crowdChoice={crowdChoice}
            onSave={saveCurrentTrip}
            isSaved={isSaved}
          />

          <TransportAndStaySection
            plan={plan}
            selectedTransport={selectedTransport}
            setSelectedTransport={setSelectedTransport}
            onAddStay={handleAddStay}
            addedStays={addedStays}
          />

          <TasteAndDiscoverSection
            plan={plan}
            onAddFood={handleAddFood}
            onAddGem={handleAddGem}
            addedFoods={addedFoods}
            addedGems={addedGems}
          />

          <CrowdAvoidanceSection
            plan={plan}
            crowdChoice={crowdChoice}
            setCrowdChoice={setCrowdChoice}
          />

          <ItinerarySection
            plan={plan}
            onDownloadOffline={handleDownloadOffline}
          />

          <UtilitySuite
            assistant={assistant}
            setAssistant={setAssistant}
            lang={lang}
            setLang={setLang}
            chat={chat}
            setChat={setChat}
            onDownloadPack={handleDownloadPack}
          />
        </>
      )}

      <FinalCTA onPlanClick={scrollToPlanner} />
    </main>
  );
}
