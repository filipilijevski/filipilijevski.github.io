import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import ServiceSearchForm, { type Filters } from '../components/ServiceSearchForm';
import ResultCard from '../components/ResultCard';
import ContactModal from '../components/ContactModal';

import {
  coaches,
  clients,
  type Coach,
  type Client,
} from '../data/sampleEntities';

export default function ServiceSite() {
  const [mode, setMode] = useState<'coach' | 'client'>('coach');
  const [results, setResults] = useState<(typeof coaches | typeof clients)>([]);
  const [selected, setSelected] = useState<Coach | Client | null>(null); // modal target

  /* search button always returns our predefined list since we ain't got no backend here */
  function handleSearch(filters: Filters) {
    console.log('Filters chosen:', filters);
    setResults(mode === 'coach' ? coaches : clients);
  }

  function handleReset() {
    setResults([]);
  }

  return (
    <>
      <Navbar />

      <header
        className="hero-section d-flex align-items-center"
        style={{
          background:
            "linear-gradient(180deg,rgba(15,15,43,.7) 10%,rgba(137,169,238,.3) 90%),url('./assets/servicesitebackground.jpg') center/cover",
        }}
      >
        <div className="container text-center">
          <h1 className="display-3 fw-bold text-white mb-2">
            Table-Tennis Service Marketplace
          </h1>
          <p className="lead fw-bold text-white">
            Connect Coaches &amp; Players for Private Lessons
          </p>
        </div>
      </header>

      <main className="container my-5">
        {/* mode toggle */}
        <div className="btn-group mb-4 coach-player-toggle" role="group">
          <input
            type="radio"
            className="btn-check"
            id="findCoach"
            checked={mode === 'coach'}
            onChange={() => setMode('coach')}
          />
          <label className="btn btn-outline-primary" htmlFor="findCoach">
            Find a Coach
          </label>

          <input
            type="radio"
            className="btn-check"
            id="findStudent"
            checked={mode === 'client'}
            onChange={() => setMode('client')}
          />
          <label className="btn btn-outline-primary" htmlFor="findStudent">
            Find Students
          </label>
        </div>

        {/* search form */}
        <ServiceSearchForm
          mode={mode}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {/* result cards */}
        {results.length > 0 && (
          <>
            <h4 className="mb-3">
              {mode === 'coach' ? 'Coaches' : 'Students'} Found
            </h4>
            <div className="row">
              {results.map(entity => (
                <ResultCard
                  key={entity.id}
                  mode={mode}
                  entity={entity as Coach | Client}
                  onContact={setSelected}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* modal */}
      <ContactModal
        show={!!selected}
        mode={mode}
        entity={selected}
        onClose={() => setSelected(null)}
      />

      <Footer />
    </>
  );
}
