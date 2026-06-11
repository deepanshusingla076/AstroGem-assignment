import { useState } from 'react';
import { Header } from './components/Header';
import { CelestialBackground } from './components/CelestialBackground';
import { GemstoneRecommendationForm } from './components/GemstoneRecommendationForm';
import { GemstoneResult } from './components/GemstoneResult';
import { GemstoneCatalog } from './components/GemstoneCatalog';
import { AstroChat } from './components/AstroChat';
import { GemstoneCompatibility } from './components/GemstoneCompatibility';
import { calculateRecommendation } from './utils/astrologyEngine';
import type { UserDetails, RecommendationResult } from './utils/astrologyEngine';

function App() {
  const [activeTab, setActiveTab] = useState('finder');
  const [result, setResult] = useState<RecommendationResult | null>(null);

  const handleCalculate = (details: UserDetails) => {
    const recs = calculateRecommendation(details);
    setResult(recs);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <>
      <CelestialBackground />
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main style={{ paddingBottom: '40px' }}>
        {activeTab === 'finder' && (
          <>
            {!result ? (
              <GemstoneRecommendationForm onCalculate={handleCalculate} />
            ) : (
              <GemstoneResult result={result} onReset={handleReset} />
            )}
          </>
        )}

        {activeTab === 'catalog' && <GemstoneCatalog />}
        
        {activeTab === 'compatibility' && <GemstoneCompatibility />}

        {activeTab === 'chat' && <AstroChat />}
      </main>
    </>
  );
}

export default App;
