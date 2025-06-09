import { Routes, Route } from 'react-router-dom';

import Home          from './pages/Home';
import ServiceSite   from './pages/ServiceSite';
import AnalyticsSite from './pages/AnalyticsSite';
import SmallGame     from './pages/SmallGame';
import Ecommerce     from './pages/Ecommerce';

export default function App() {
  return (
    <Routes>
      <Route path="/"              element={<Home />} />
      <Route path="/service-site"  element={<ServiceSite />} />
      <Route path="/analytics-site" element={<AnalyticsSite />} />
      <Route path="/small-game"    element={<SmallGame />} />
      <Route path="/ecommerce"     element={<Ecommerce />} />

      {/* fallback (optional) */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
