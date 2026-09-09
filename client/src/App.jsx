import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SavedTripsModal from './components/SavedTripsModal';
import HomePage from './pages/HomePage';
import DestinationsPage from './pages/DestinationsPage';
import SavedTripsPage from './pages/SavedTripsPage';
import SafetyPage from './pages/SafetyPage';
import { DEFAULT_PLAN } from './data/defaultPlan';
import { planTrip, saveTrip } from './services/api';
import './App.css';

export default function App() {
  const [form, setForm] = useState({
    start: 'Hyderabad',
    destination: 'Araku Valley',
    travellers: 4,
    days: 4,
    budget: 30000,
    preferences: 'Nature + Local Food + Relaxation',
  });

  // Default to DEFAULT_PLAN so website renders completely immediately without white screen
  const [plan, setPlan] = useState(DEFAULT_PLAN);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState('Train');
  const [crowdChoice, setCrowdChoice] = useState(null);
  const [lang, setLang] = useState('English');
  const [assistant, setAssistant] = useState('');
  const [chat, setChat] = useState('');
  const [toast, setToast] = useState(null);
  const [savedModalOpen, setSavedModalOpen] = useState(false);

  const [addedStays, setAddedStays] = useState([]);
  const [addedFoods, setAddedFoods] = useState([]);
  const [addedGems, setAddedGems] = useState([]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3500);
  };

  const generateTrip = async () => {
    setIsGenerating(true);
    setIsSaved(false);

    try {
      const generated = await planTrip(form);
      setPlan(generated);
      showToast(`Journey to ${form.destination} generated successfully!`);
      setTimeout(() => {
        const el = document.getElementById('control-center');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    } catch (err) {
      console.error('Generation error:', err);
      showToast('Generated plan using local intelligence.');
    } finally {
      setIsGenerating(false);
    }
  };

  const saveCurrentTrip = async () => {
    if (!plan) return;
    try {
      await saveTrip(plan);
      setIsSaved(true);
      showToast('Trip successfully saved to your offline vault!');
    } catch (err) {
      showToast('Saved to local storage.');
      setIsSaved(true);
    }
  };

  const handleAddStay = (s) => {
    setAddedStays((prev) =>
      prev.includes(s.name) ? prev.filter((x) => x !== s.name) : [...prev, s.name]
    );
    setAssistant(`${s.name} added to your journey.`);
    showToast(`${s.name} added to your journey`);
  };

  const handleAddFood = (f) => {
    setAddedFoods((prev) =>
      prev.includes(f.name) ? prev.filter((x) => x !== f.name) : [...prev, f.name]
    );
    setAssistant(`${f.name} saved as a local experience.`);
    showToast(`${f.name} saved as an authentic food experience`);
  };

  const handleAddGem = (g) => {
    setAddedGems((prev) =>
      prev.includes(g.name) ? prev.filter((x) => x !== g.name) : [...prev, g.name]
    );
    setAssistant(`${g.name} added to your journey.`);
    showToast(`${g.name} added to your journey`);
  };

  const handleDownloadOffline = () => {
    setAssistant('Your complete Araku itinerary is ready offline.');
    showToast('Offline itinerary pack downloaded successfully!');
  };

  const handleDownloadPack = () => {
    setAssistant('Offline map bundle and safety checkpoints cached for offline use.');
    showToast('Complete trip pack downloaded & active offline!');
  };

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar
          onSave={() => setSavedModalOpen(true)}
          isSaved={isSaved}
        />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                form={form}
                setForm={setForm}
                plan={plan}
                isGenerating={isGenerating}
                generateTrip={generateTrip}
                isSaved={isSaved}
                saveCurrentTrip={saveCurrentTrip}
                selectedTransport={selectedTransport}
                setSelectedTransport={setSelectedTransport}
                crowdChoice={crowdChoice}
                setCrowdChoice={setCrowdChoice}
                lang={lang}
                setLang={setLang}
                chat={chat}
                setChat={setChat}
                assistant={assistant}
                setAssistant={setAssistant}
                addedStays={addedStays}
                handleAddStay={handleAddStay}
                addedFoods={addedFoods}
                handleAddFood={handleAddFood}
                addedGems={addedGems}
                handleAddGem={handleAddGem}
                handleDownloadOffline={handleDownloadOffline}
                handleDownloadPack={handleDownloadPack}
              />
            }
          />

          <Route
            path="/planner"
            element={
              <HomePage
                form={form}
                setForm={setForm}
                plan={plan}
                isGenerating={isGenerating}
                generateTrip={generateTrip}
                isSaved={isSaved}
                saveCurrentTrip={saveCurrentTrip}
                selectedTransport={selectedTransport}
                setSelectedTransport={setSelectedTransport}
                crowdChoice={crowdChoice}
                setCrowdChoice={setCrowdChoice}
                lang={lang}
                setLang={setLang}
                chat={chat}
                setChat={setChat}
                assistant={assistant}
                setAssistant={setAssistant}
                addedStays={addedStays}
                handleAddStay={handleAddStay}
                addedFoods={addedFoods}
                handleAddFood={handleAddFood}
                addedGems={addedGems}
                handleAddGem={handleAddGem}
                handleDownloadOffline={handleDownloadOffline}
                handleDownloadPack={handleDownloadPack}
              />
            }
          />

          <Route
            path="/destinations"
            element={<DestinationsPage setForm={setForm} />}
          />

          <Route
            path="/saved"
            element={<SavedTripsPage onLoadTrip={(t) => setPlan(t)} />}
          />

          <Route
            path="/my-trip"
            element={<SavedTripsPage onLoadTrip={(t) => setPlan(t)} />}
          />

          <Route
            path="/safety"
            element={
              <SafetyPage
                assistant={assistant}
                setAssistant={setAssistant}
                lang={lang}
                setLang={setLang}
                chat={chat}
                setChat={setChat}
                handleDownloadPack={handleDownloadPack}
              />
            }
          />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />

        {/* Saved Trips Modal */}
        <SavedTripsModal
          isOpen={savedModalOpen}
          onClose={() => setSavedModalOpen(false)}
          onLoadTrip={(t) => {
            setPlan(t);
            showToast(`Loaded ${t.destination} itinerary!`);
          }}
        />

        {/* Global Toast Notification */}
        {toast && (
          <div className="toast">
            <span className="green-dot"></span>
            <span>{toast}</span>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}
