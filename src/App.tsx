import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

/* Existing page modules */
import Home        from "./pages/Home";
import ServiceSite from "./pages/ServiceSite";
import SmallGame   from "./pages/SmallGame";
import Ecommerce   from "./pages/Ecommerce";

/**
 * The analytics page IS the market dashboard.
 * We lazy-load it so the Recharts bundle is fetched only on demand.
 */
const MarketDashboard = lazy(
  () => import("./features/market-dashboard") // default export = Dashboard wrapper
);

export default function App() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading…</div>}>
      <Routes>
        <Route path="/"               element={<Home             />} />
        <Route path="/service-site"   element={<ServiceSite      />} />
        <Route path="/small-game"     element={<SmallGame        />} />
        <Route path="/ecommerce/*"    element={<Ecommerce        />} />

        {/* Analytics route now renders the market dashboard */}
        <Route path="/analytics-site" element={<MarketDashboard  />} />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Suspense>
  );
}
